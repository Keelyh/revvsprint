
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , models = require('./models')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
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

app.get('/', routes.homepage);
app.get('/newRoutine', routes.index);
app.get('/myroutines', routes.myroutines);
//app.post('/search', routes.getSongKey);
app.post('/showsongs', routes.showsongs);
app.get('/playsongs', routes.playsongs);
//app.post('/addsong', routes.addsong);
app.post('/newRoutine', routes.addToMongo);
app.post('/songsinroutine', routes.songsinroutine);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
