var http = require('http');
var express = require('express');
var config = require('./config/config');
const port = config.port


var app = express();

// app.set('port', process.env.PORT || 3000);

require('./config/express')(app, config);
var path = require('path');

app.use(express.static(path.normalize(__dirname) + '/public'));

app.use(function (req, res, next) {
    console.log('Request from ' + req.ip);

    next()

});

app.get('/', function (req, res) {

    console.log('on ')
    res.send('Hello World!');
});

app.get('/about', function (req, res) {
    console.log('about');
    res.send('About Us!');
});

app.get('/about/directions', function (req, res) {
    res.send('How to Find Us!');
});


app.use(function (req, res) {
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
});

require('http').createServer(app).listen(port, function () {
    console.log("HTTP Server listening on port: %d, in %s mode", port, app.get('env'));
});

module.exports = app