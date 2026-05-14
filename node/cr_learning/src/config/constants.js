module.exports = {
    //App Configuration
    port: process.env.PORT || "3456",
    apiVersion: process.env.API_VERSION || "v1",

    //Auth Configuration
    saltRounds: process.env.SALT_ROUNDS || 10,

    //JWT Configuration
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",

    //Refresh Token Configuration
    refreshTokenSecretKey: process.env.REFRESH_KEY_SECRET_KEY,
    refreshTokenExpiresIn: process.env.REFRESH_KEY_EXPIRES_IN || "1w",
}