const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Smart Receipts API",
        version: "1.0.0",
        description: "API with JWT Authentication",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./routes/*.js"],
  };

exports.specs = swaggerJsDoc(options);