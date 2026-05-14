const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000"),
  debug: process.env.APP_DEBUG === "true",

  getDatabaseConfig: () => ({
    database: process.env.DB,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
  }),

  databaseUrl: process.env.DATABASE_URL,
};

export default config;
