var mongoose = require('mongoose'),
	Message = mongoose.model('Message');

var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) 
				return err.errors[errName].message;
			}
		} else {
			return 'Unknown server error';
	}
};

module.exports = function(io, socket) {

	io.emit('chatMessage', {
		type: 'status',
		text: 'connected',
		created: Date.now(),
		username: socket.request.user.username,
		picture: socket.request.user.providerData.picture
	});

	messageBdd = createNewBddEntry({
		type: 'status',
		text: 'connected',
		created: Date.now(),
		userId: socket.request.user._id
	});
	messageBdd.save(function(err) {
		});

	socket.on('chatMessage', function(message) {
		message.type = 'message';
		message.created = Date.now();
		message.username = socket.request.user.username;
		message.picture = socket.request.user.providerData.picture;
		message.userId = socket.request.user._id;

		messageBdd = createNewBddEntry(message);
		messageBdd.save(function(err) {
		});

		io.emit('chatMessage', message);
	});

	socket.on('disconnect', function() {

		messageBdd = createNewBddEntry({
			type: 'status',
			text: 'disconnected',
			created: Date.now(),
			userId: socket.request.user._id
		});
		messageBdd.save(function(err) {
			});
		io.emit('chatMessage', {
			type: 'status',
			text: 'disconnected',
			created: Date.now(),
			username: socket.request.user.username,
			picture: socket.request.user.providerData.picture
		});
	});
};

var createNewBddEntry = function(message) {
	messageBdd = new Message();
	messageBdd.text = message.text;
	messageBdd.created = message.created;
	messageBdd.type = message.type;
	messageBdd.writer = message.userId;

	return messageBdd;
}