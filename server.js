require('dotenv').load();
var cors = require('cors')
const express = require('express');
const BACKEND_PORT = process.env.PORT || 5000;
const pool = require('./postgres');

var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(BACKEND_PORT, () => console.log('serving backend on port: ' + BACKEND_PORT));



app.use('/', require('./api/returnAllFights'));

