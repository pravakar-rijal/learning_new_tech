const express = require('express');
const passport = require('passport');
const swaggerUI = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');

const { specs } = require('./utils/swagger');
require('./utils/passport');

const app = express();
const limiter = rateLimit({
    windowMs: 5*60*1000,
    limit: 50,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});
const { API_VERSION } = require('./config');

app.use(limiter);
app.use(express.json());
app.use(passport.initialize());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

const billRoutes = require('./routes/billRoutes');
const groupRoutes = require('./routes/groupRoutes');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(`/api/${API_VERSION}/bills`, billRoutes);
app.use(`/api/${API_VERSION}/groups`, groupRoutes);
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/payments`, paymentRoutes);

app.use(errorMiddleware);

module.exports = app;
