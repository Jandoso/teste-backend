const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dealers = require('./routes/dealersRoutes');
const purchases = require('./routes/purchasesRoutes');


mongoose.connect('mongodb://localhost:27017/boticario', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'Connection error: '));
db.once("open", () => {
    console.log('Successfully connected to DB');
});

app.use(bodyParser.json());

app.use('/dealers', dealers);
app.use('/purchases', purchases);


module.exports = app;