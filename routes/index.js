var Rdio = require('node-rdio');

exports.index = function(req, res){
	res.render('index', {title: 'Musicify'});
}

exports.showsongs = function(req, res){
	var rdio = new Rdio([process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET]);
	rdio.call('search', {'query': req.body.song, 'types': 'Track'}, function(err, songs) {
		res.render('_songList', {title: 'Song List', songs: songs.result.results});
	});
};

exports.playSong = function(req, res){
	res.render('music', { title: 'Musica', id: req.params.key });
}

exports.test = function(req, res) {
	res.render('test', {title: 'Test'})
}


