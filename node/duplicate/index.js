const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

const adminRoutes = require(path.join(__dirname, './routes/adminRouter'));
const shopRoutes = require(path.join(__dirname, './routes/shopRouter'));

app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({extended: false}));

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'not-found.html'));
});

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}...`);
});