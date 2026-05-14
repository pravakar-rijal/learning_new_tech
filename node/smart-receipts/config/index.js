require('dotenv').config();

module.exports = {
    //App Configuration
    NODE_ENV: process.env.NODE_ENV || "development",
    
    //Server Configuration
    API_VERSION: process.env.API_VERSION || "v1",
    PORT: process.env.PORT || 3000,

    //Database Configuration
    DATABASE_URL: process.env.DATABASE_URL,

    //JWT Configuration
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_SUBJECT: process.env.JWT_SUBJECT || "Smart Receipts API",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",

    //Refresh Token Configuration
    REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_SUBJECT: process.env.REFRESH_TOKEN_SUBJECT || "Smart Receipts API",
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || "1w",

    //Temporary Token Configuration
    TEMP_TOKEN_EXPIRES_IN: process.env.TEMP_TOKEN_EXPIRES_IN || "180",

    //2FA ISSUER
    ISSUER: process.env.ISSUER || "Smart Receipts API",

    //Google OAuth Configuration
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/api/v1/auth/google/callback",

}