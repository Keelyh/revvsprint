var Rdio = require('node-rdio')
  , mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Routine = mongoose.model('Routine')
  , models = require('../models')
  , Activity = mongoose.model('Activity');

exports.index = function(req, res){
	res.render('index', {title: 'Musicify'});
}

exports.showsongs = function(req, res){
	var rdio = new Rdio([process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET]);
	rdio.call('search', {'query': req.body.query, 'types': 'Track', 'never_or': 'true', 'count': 7}, function(err, songs) {
		res.render('_songList', {title: 'Song List', songs: songs.result.results});
	});
}

exports.playSong = function(req, res){
	res.render('music', { title: 'Musica', id: req.params.key });
}

exports.homepage = function(req, res) {
	res.render('homepage', { title: 'Musicify'});
}

exports.addToMongo = function(req, res){
	new Routine({
		title: req.body.routine
	}).save(function(err, routine){
		req.body.activities.forEach(function(activity, order) {
			new Activity({
				name: activity[0],
				playOrder: activity[1],
				songName: activity[2],
				songKey: activity[3]
			}).save(function(err, actDoc){
				if (err) throw err;
				routine.update( { $push: {_activities: actDoc}}, function(err){
					if (err) throw err;
				});
			});
		});
	});
}

exports.myroutines = function(req, res){
	Routine.find().populate('_activities').exec(function (err, routines){
		res.render('myroutines', {title:'Musicify', routines: routines});
	});
}


exports.songsinroutine = function(req, res){
  console.log("partial function");
  console.log(req.body);
	Routine.find({title:req.body}).populate('_activities').exec(function (err, songs){
		console.log(songs);
		res.render('_songsinroutine', {title:'Musicify', songs: songs});
	});
	//res.render('_songsinroutine', {title:'Musicify'});
};