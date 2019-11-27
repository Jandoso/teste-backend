const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const representatives = require('./routes/representativesRoutes');
const purchases = require('./routes/purchasesRoutes');

mongoose.connect('mongodb+srv://jandosoGeneral:12345@omnistack-34kgb.mongodb.net/boticario?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'Connection error: '));
db.once("open", () => {
    console.log('Successfully connected to DB');
});

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  })

app.use('/representatives', representatives);
app.use('/purchases', purchases);

module.exports = app;