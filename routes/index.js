var Rdio = require('node-rdio');

exports.index = function(req, res){
	var rdio = new Rdio([process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET]);
	rdio.call('search', {'query': 'all night longer', 'types': 'Track'}, function(err, songs) {
		res.render('music', { title: 'Musica', id: songs.result.results[0].key });
	});
};