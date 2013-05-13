var Rdio = require('node-rdio')
  , mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Routine = mongoose.model('Routine')
  , Activity = mongoose.model('Activity');

exports.index = function(req, res){
	res.render('index', {title: 'Tempo', username: req.session.user.name});
}

exports.searchSongs = function(req, res){
	var rdio = new Rdio([process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET]);
	rdio.call('search', {'query': req.query.query, 'types': 'Track', 'never_or': 'true', 'count': 5}, function(err, songs) {
		res.send(songs.result.results);
	});
}

exports.playsongs = function(req, res){
	res.render('playsongs', {title: 'Tempo', idlist:req.query.ids, durations:req.query.durations, playbackToken:process.env.PLAYBACK_TOKEN});
}

exports.homepage = function(req, res) {
	res.render('homepage', { title: 'Tempo'});
}

exports.addToMongo = function(req, res){
	new Routine({
		title: req.body.routine
	}).save(function(err, routine){
		if (err) throw err;
		console.log(routine);
		req.body.activities.forEach(function(activity, order) {
			new Activity({
				name: activity[0],
				playOrder: activity[1],
				songName: activity[2],
				songKey: activity[3],
				duration: activity[4],
				songArtist: activity[5]
			}).save(function(err, actDoc){
				if (err) throw err;
				routine.update( { $push: {_activities: actDoc}}, function(err){
					if (err) throw err;
				});
			});
		});
		console.log('session user', req.session.user.name);
		User.findOne({name: req.session.user.name}).exec(function(err, user){
			if (err) throw err;
			console.log('db user', user);
			user.update( { $push: {_routines: routine}}, function(err){
					if (err) throw err;
					// res.redirect('/myroutines');
					res.send({redirect: '/myroutines'});
				});
		})
	});
}

exports.populate = function(req, res){
	new Routine({
		title: 'Sample Routine'
	}).save(function(err, routine){
		new Activity({
			name: 'wake up',
			playOrder: 0,
			songName: 'All Night Longer',
			songKey: 't19725891',
			duration: 30,
			songArtist: 'Sammy Adams'
		}).save(function(err, actDoc){
			if (err) throw err;
			routine.update( { $push: {_activities: actDoc}}, function(err){
				if (err) throw err;
				res.send('Routine added!');
			});
		});
	});
}
