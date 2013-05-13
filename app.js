
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , models = require('./models')
  , routes = require('./routes')
  , users = require('./routes/users')
  , routine = require('./routes/routines')
  , http = require('http')
  , path = require('path')
  , bcrypt = require('bcrypt');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  var uristring = 
    process.env.MONGODB_URI ||
    process.env.MONGOLAB_URI ||
    'mongodb://localhost/revv';
  var mongoOptions = { db: { safe: true }};

  mongoose.connect(uristring, mongoOptions, function (err, res) {
    if (err) {
      console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
      console.log('Succeeded connecting to:' + uristring + '.');
    }
  });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

function checkLoggedIn() {
  return function(req, res, next) {
    if (!req.session.user){
      res.render('please', {title: 'Tempo'});
    } else {
      next();
    };
  }
}

app.get('/', routes.homepage);
app.get('/newRoutine', checkLoggedIn(), routes.index);
app.get('/myroutines', checkLoggedIn(), routine.myroutines);
app.get('/searchSongs', checkLoggedIn(), routes.searchSongs);
app.get('/playsongs', checkLoggedIn(), routes.playsongs);
app.post('/newRoutine', checkLoggedIn(), routes.addToMongo);
app.post('/songsinroutine', checkLoggedIn(), routine.songsinroutine);
app.post('/removeRoutine', checkLoggedIn(), routine.removeRoutine);
app.get('/populate', checkLoggedIn(), routes.populate);
app.get('/sign_in', users.signin);
app.get('/sign_up', users.signup);
app.get('/editRoutine', checkLoggedIn(), routine.editRoutine);
app.post('/newuser', checkLoggedIn(), users.create);
app.post('/verify', users.login);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
