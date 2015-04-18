var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
//var adminpage = require('./routes/admin');
//var recipe = require('./routes/recipe');
//var sale = require('./routes/sale');
var userinfoRoute = require('./routes/userinfoRoute');
//var common = require('./routes/common');
//var seasonpage = require('./routes/season');
var dishRoute = require('./routes/dishRoute');
var moment = require('./routes/moment');
var friends = require('./routes/friends');
var dateRoute =  require('./routes/dateRoute');
var pushmsg = require('./routes/pushMsg');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'keyboard cat'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/admin',adminpage);
//app.use('/season',seasonpage);
//app.use('/sale',sale);
userinfoRoute(app);
//recipe(app);
//common(app);
dishRoute(app);
moment(app);
friends(app);
dateRoute(app);
pushmsg(app);
//dishRoute(APP);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
