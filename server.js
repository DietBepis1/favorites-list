const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


//init express
const app = express();


//bodyParser middleware
app.use(bodyParser.json());


//connect to MongoDB
const connectDB = require('./config/db.js');
connectDB();

//import and use routes
const items = require('./routes/api/items.js');
app.use('/api/items', items)

//serve static assets in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


//add PORT
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    const host = server.address().address
    const port = server.address().port

    console.log(`App listening on port ${port}`)
})