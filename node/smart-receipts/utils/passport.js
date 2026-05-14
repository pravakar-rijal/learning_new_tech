const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const { ROLES } = require('../config/constants');

passport.use(new GoogleStrategy ({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
},
    async (accessToken, refreshToken, profile, done) => {
        try{
            const googleProfileId = profile.id;

            let user = await prisma.user.findUnique({
                where:{
                    googleProfileId
                }
            });

            if(!user){
                user = await prisma.user.create({
                    data:{
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleProfileId: profile.id,
                        roleId: ROLES.member,
                    }
                });
            }

            done(null, user);
        }catch(error){
            done(error, null);
        }
    }
));