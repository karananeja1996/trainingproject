
// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
//var mongoose = require('mongoose');
var morgan = require('morgan');
var config = require('./config/config')('development');
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100, //important
    host: config.mysql.host,
    user: config.mysql.username,
    password: config.mysql.pass,
    database: config.mysql.dbname,
    debug: false
});

pool.getConnection(function (err, connection) {
    if (err) {
        res.json({"code": 100, "status": "Error in connection database"});
        return;
    }
    global.db = connection;
    connection.on('error', function (err) {
        res.json({"code": 100, "status": "Error in connection database"});
        return;
    });
});
//app.get("/", function (req, res) {
//    handle_database(req, res);
//});
// config files
//var db = require('./config/db');

// set our port
var port = process.env.PORT || 8000;

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
//mongoose.connect(db.url);
//app.set('superSecret', db.secret);
// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
// use morgan to log requests to the console
app.use(morgan('dev'));
// more routes for our API will happen here

// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;

