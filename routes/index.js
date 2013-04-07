var Rdio = require('node-rdio');

exports.index = function(req, res){
	res.render('index', {title: 'Express'});
}

exports.getSongKey = function(req, res){
	// To run this, you need to create a .env file with the following content:
	
	//CONSUMER_KEY=asjdkfljahie
	//CONSUMER_SECRET=aajsfdlji3r4u8t

	// except with the appropriate text from our rdio account
	var rdio = new Rdio([process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET]);
	rdio.call('search', {'query': req.body.query, 'types': 'Track'}, function(err, songs) {
		res.render('songList', {title: 'Song List', songs: songs.result.results});
	});
};

exports.playSong = function(req, res){
	res.render('music', { title: 'Musica', id: req.params.key });
}