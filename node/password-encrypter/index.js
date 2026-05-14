import express from 'express';
import { configDotenv } from 'dotenv';
import crypto from 'crypto';

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
    return res.json({ status: "ok", message: "Password Encrypter Service is running" });
});

app.post('/encrypt', (req, res) => {
    const password = req.body.password;
    const publicKey = process.env.publicKey;

    const encryptedPassword = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(password, 'utf-8')
    );

    return res.json({ encryptedPassword: encryptedPassword.toString('base64') });
});

app.listen(PORT, () => {
  console.log(`Password Encrypter Server running on port ${PORT}`);
});