const logger = require("../utils/logger");

function errorHandler(error, req, res, next){
    logger.error(`${req.method} ${req.originalUrl} - ${error.message}`, {
        status: error.statusCode,
        stack: error.stack,
      });

    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
    });
}

module.exports = errorHandler;