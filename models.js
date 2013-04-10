var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	routines: [{ type: Schema.Types.ObjectId, ref: 'Routine' }]
});

mongoose.model('User', userSchema);

var routineSchema = new Schema({
	activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
	title: String
});

mongoose.model('Routine', routineSchema);

var activitySchema = new Schema({
	name: String,
	playOrder: Number,
	duration: Number,
	songName: String,
	songArtist: String,
	songKey: String
});

mongoose.model('Activity', activitySchema);

