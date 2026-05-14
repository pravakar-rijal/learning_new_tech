const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const constant = require("./config/constants");

const app = express();

const PORT = constant.port;
const apiVersion = constant.apiVersion;

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");

app.use(express.json());

app.use(`/api/${apiVersion}/auth`, authRoutes);
app.use(`/api/${apiVersion}/users`, userRoutes);
app.use(`/api/${apiVersion}/roles`, roleRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}...`);
})

