module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "POSTgres@6969",
    database: process.env.DB || "cr_learning",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "postgres",
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
    database: process.env.DB || "cr_learning",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "postgres",
  },
  production: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
    database: process.env.DB || "cr_learning",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "postgres",
  }
}
