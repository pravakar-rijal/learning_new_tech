module.exports = {
    port: process.env.APP_PORT || "3000",

    database: {
        port: process.env.DB_PORT,
        username: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "",
        host: process.env.DB_HOST || "localhost",
        database: process.env.DB,
        dialect: "postgres"
    },

    database_Url: process.env.DB_URI,

    saltRounds: +process.env.SALT || 10,
}