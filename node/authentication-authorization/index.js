import express from 'express';
import { PrismaClient } from './generated/prisma/index.js';
import bcrypt from 'bcrypt';
import { configDotenv } from 'dotenv';
import jwt from 'jsonwebtoken';
import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import crypto from 'crypto';
import NodeCache from 'node-cache';

configDotenv();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("REST API: Authentication and Authorization");
});

app.post('/api/auth/register', async (req, res) => {
    try{

        if(!req.body)
            return res.status(422).json({message: "All fields are required: (Name, Email and Password)"});
    
        const { name, email, password, roleId } = req.body;
    
        if(!name || !email || !password)
            return res.status(422).json({message: "All fields are required: (Name, Email and Password)"});
    
        if(await prisma.user.findUnique({where: {email}}))
            return res.status(422).json({message: "Email already exists"});

        if(roleId && !await prisma.role.findUnique({where: {id: roleId}})){
            return res.status(422).json({message: "Invalid Role Id"});
        }
    
        if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/).test(password))
            return res.status(422).json({message: "Enter strong password"});
    
        const password_hash = await bcrypt.hash(password, 10);
    
        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                role_Id: roleId || "08e15900-54ad-4b88-a054-be1cde0702ab",
                password_hash
            },
            include:{
                role: true
            },
            omit:{
                role_Id: true,
                password_hash: true,
                isActive: true,
                enable2Fa: true,
                secret2Fa: true
            }
        });
    
        return res.status(201).json({newUser}); 

    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

app.post('/api/auth/login', async (req, res) => {

    try{

        const { email, password } = req.body;
    
        if(!email || !password){
            return res.status(422).json({error: "All fields are required."});
        }
    
        const user = await prisma.user.findUnique({where:{email}});
    
        if(!user){
            return res.status(401).json({error: "Invalid email or password"});
        }
    
        if(!await bcrypt.compare(password, user.password_hash)){
            return res.status(422).json({error: "Invalid email or password"});
        }

        if(user.enable2Fa){
            const temporaryToken = crypto.randomUUID();
            cache.set(`temporaryToken: ${temporaryToken}`, user.id, + process.env.TEMP_TOKEN_EXPIRES_IN);
            return res.status(200).json({temporaryToken, expiresInSeconds: process.env.TEMP_TOKEN_EXPIRES_IN})
        }
    
        const accessToken = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY, {subject: "accessApi", expiresIn: process.env.JWT_EXPIRES_IN});

        const refreshToken = jwt.sign({userId: user.id}, process.env.REFRESH_TOKEN_SECRET_KEY, {subject: "refreshToken", expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN});

        await prisma.userRefreshToken.create({
            data:{
                token: refreshToken,
                userId: user.id
            }});

        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken,
            refreshToken
        });

    }catch(error){
        return res.status(500).json({error: error.message});
    }

});

app.post('api/auth/login/2fa', async (req, res) => {
    try{
        const { temporaryToken, totp } = req.body;

        if(!temporaryToken || !totp){
            return res.status(422).json({message: "Please fill in all the fields (temporaryToken and totp"})
        }

        const userId = cache.get(`temporaryToken: ${temporaryToken}`);

        if(!userId){
            return res.status(401).json({message: "The provided temporary token is incorrect or expired"});
        }

        const user = await prisma.user.findUnique({where: {id: userId}});

        const verified = authenticator.check(totp, user.secret2Fa);

        if(!verified){
            return res.status(401).json({message: "The provided totp is incorrect or expired"});
        }

        const accessToken = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY, {subject: "accessApi", expiresIn: process.env.JWT_EXPIRES_IN});

        const refreshToken = jwt.sign({userId: user.id}, process.env.REFRESH_TOKEN_SECRET_KEY, {subject: "refreshToken", expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN});

        await prisma.userRefreshToken.create({
            data:{
                token: refreshToken,
                userId: user.id
            }});

        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken,
            refreshToken
        });

    }catch(error){
        return res.status(500).json({error: error.message});
    }
})

app.get('/api/auth/logout', ensureAuthenticated, async(req, res) => {
    try{
        const userId = req.body.userId;

        await prisma.userRefreshToken.deleteMany({
            where:{
                userId
            }
        });

        await prisma.userInvalidToken.create({
            data:{
                userId,
                expirationTime: req.accessToken.exp,
                accessToken: req.accessToken.value
        }});

        return res.status(204).send();

    }catch(error){
        return res.status(500).json({error: error.message});
    }

    //Current Access Token Invalid
    
});

app.post('/api/auth/refresh-token', async (req, res) => {
    try{
        const { refreshToken } = req.body;

        if(!refreshToken)
            return res.status(401).json({message: "No Refresh Token Found"});

        const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
        const userId = decodedRefreshToken.userId;

        const userRefreshToken = await prisma.userRefreshToken.findFirst({
            where:{
                token: refreshToken,
                userId
            } 
        });

        if(!userRefreshToken){
            return res.status(401).json({message: "Refresh Token Invalid or Expired"});
        }

        await prisma.userRefreshToken.delete({
            where:{
                id: userRefreshToken.id
            }
        });

        const newAccessToken = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {subject: "accessApi", expiresIn: process.env.JWT_EXPIRES_IN});

        const newRefreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET_KEY, {subject: "refreshToken", expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN});

        await prisma.userRefreshToken.create({
            data:{
                token: newRefreshToken,
                userId
            }});

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });

    }catch(error){
        if(error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError){
            return res.status(401).json({"message": "Refresh Token Invalid or Expired"});
        }
        res.status(500).json({error: error.message});
    }
});

app.post('/api/auth/2fa/generate', ensureAuthenticated, async (req, res) =>{
    try{
        const userId = req.body.userId;

        const user = await prisma.user.findUnique({
            where: {id: userId}
        });

        const secret = authenticator.generateSecret();
        const uri = authenticator.keyuri(user.email, "Smart Receipts API", secret);

        await prisma.user.update({
            data:{
                secret2Fa: secret
            },
            where:{
                id: userId
            }
        });

        const qrCode = await qrcode.toBuffer(uri, { type: "image/png", margin: 1});

        res.setHeader("Content-Disposition", "attachment; filename=qrcode.png");
        return res.status(200).type('image/png').send(qrCode);


    }catch(error){
        return res.status(500).json({error: error.message});
    }
} );

app.post('/api/generate/2fa/validate', ensureAuthenticated, async(req, res) => {
    try{
        const { totp } = req.body;
        const userId = req.body.userId;

        if(!totp){
            return res.status(422).json({message: "OTP is required"});
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        const verified = authenticator.check(totp, user.secret2Fa);

        if(!verified){
            return res.status(400).json({message: "OTP is invalid"});
        }

        await prisma.user.update({
            data:{
                enable2Fa: true
            }
        });

        return res.status(200).json({message: "OTP validated successfully"});


    }catch(error){
        return res.status(500).json({error: error.message});    
    }
});

app.get('/api/current', ensureAuthenticated, async (req, res) => {
    try{
        const userId = req.body.userId;

        const currentUser = await prisma.user.findFirst({
            where:{
                id: userId
            },
            omit:{
                password_hash: true,
                isActive: true
            }
        });

        return res.status(200).json(currentUser);

    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

app.get('/api/admin', ensureAuthenticated, authorize(['03a94c53-1308-48ae-9d52-ee9330fd72d6']), async(req, res) => {
    try{
        return res.status(401).json({message: "Only admin can access the route"});

    }catch(error){
        return res.status(500).error({error: error.message});
    }
})

app.get('/api/anyone', ensureAuthenticated, authorize(['03a94c53-1308-48ae-9d52-ee9330fd72d6','08e15900-54ad-4b88-a054-be1cde0702ab']), (req, res) => {
    try{
        return res.status(200).json({message: "You can access this"});

    }catch(error){
        return res.status(500).json({error: error.message});
    }
})

async function ensureAuthenticated(req, res, next){
    
    const accessToken = req.headers.authorization;

    if(!accessToken){
        return res.status(401).json({message: "Access token not found"});
    }

    if(await prisma.userInvalidToken.findFirst({where: {accessToken}})){
        return res.status(401).json({
            message: "Access token invalid",
            code: "AccessTokenInvalid"
        });
    }

    try{
        const decodedWebToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        req.accessToken = { value: accessToken, exp: decodedWebToken.exp };
        req.body = { userId: decodedWebToken.userId };
        next();
        
    }catch(error){
        if(error instanceof jwt.TokenExpiredError){
            return res.status(401).json({
                message: "Access token expired",
                code: "AccessTokenExpired"
            });
        }else if(error instanceof jwt.JsonWebTokenError){
            return res.status(401).json({
                message: "Access token invalid",
                code: "AccessTokenInvalid"
            });
        }
        else{
            return res.status(500).json({message: error.message});
        }
    }
}

function authorize(roles = []){
    return async function (req, res, next){
        const userId = req.body.userId;

        const user = await prisma.user.findUnique({
            where:{
                id: userId
            }
        });

        if(!user || !roles.includes(user.role_Id)){
            return res.status(403).json({message: "Access denied"});
        }

        next();
    }
}

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}...`);
})