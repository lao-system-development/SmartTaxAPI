var createError = require('http-errors');
var bodyParser = require('body-parser');
var compress = require('compression');
var express = require('express');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var cors = require('cors');
var passport = require('./passport')
var config = require('./dotenvconfig');
var serverRouter = require('../router/index');


var app = express();

if (config.env === 'development') {
    app.use(logger('dev'));
}


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// cookie
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.use(bodyParser.json())
app.use(passport.initialize());


app.use('/api', serverRouter);



// 500 - Any server error
app.use(function (err, req, res, next) {
    return res.status(500).send({ error: err });
});


app.use(function (err, req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('404', { url: req.url });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
})
// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// 404
app.use(function (req, res, next) {
    return res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
});

module.exports = app;
