/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes/recipe')
    , user = require('./routes')
    , http = require('http')
    , path = require('path')
    , fs = require('fs')
    , colors = require('colors')
    , favicon = require('static-favicon')
    , logger = require('morgan')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser');

var app = express();
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    //app.use(express.methodOverride());
    app.use(cookieParser('your secret here'));
    //app.use(express.session());
    //app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    /*  app.use(express.static(path.join(__dirname, 'resources')));
      app.use(express.static(path.join(__dirname, 'views/partials')));*/

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
	    message: err.message,
	    error: err
	});
   });
}

routes(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
