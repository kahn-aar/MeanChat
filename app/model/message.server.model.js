var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MessageSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	text: {
		type: String,
		default: '',
		required: 'Text is required'
	},
	type: {
		type: String,
		default: 'message',
		required: 'Type is required'
	},
	writer: {
		type: Schema.ObjectId,
		ref: 'User',
		required: 'writer is required'
	},
	room: {
		type: String,
		default: "global"
	}
});

MessageSchema.statics.findByRoom = function(roomName, callback) {
	return this.find({ room: roomName }, callback);

}

mongoose.model('Message', MessageSchema);
