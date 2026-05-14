const express = require('express');

const app = express();
const PORT = 6900;

app.use(express.json());

const database = require("./database");
const userRoutes = require("./routes/userRoutes");

app.use("/users", userRoutes);

app.listen(PORT, () => {
    database.authenticate()
    .then(() => {
        database.sync({logging: console.log});
        console.log("Database connected successfully")})
    .catch(error => console.error("Database could not connect " + error));
    console.log(`Server is listening on port ${PORT}...`);
})