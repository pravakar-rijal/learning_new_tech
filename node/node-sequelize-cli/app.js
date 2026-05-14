const express = require("express");
require("dotenv").config();
const Constants = require("./config/constants");

const app = express();
app.use(express.json());
const PORT = Constants.port;

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/users", userRoutes);
app.use("/products", productRoutes);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})