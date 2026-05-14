const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000;

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, './views/not-found.html'));
});

// app.use('/users', (req, res, next) => {
    //     res.send("User");
    // });
    
    // app.use('/', (req, res, next) => {
//     res.send("This is the home.");
// });




app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})