var mongoose = require('mongoose'),
	Message = mongoose.model('Message');

var connectedUsers = [];

var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) {
				return err.errors[errName].message;
			} else {
				return 'Unknown server error';
			}
		}
	}
};

exports.usersConnected = function(req, res, next) {
	res.json(connectedUsers);
}

exports.connect = function(io, socket) {

	io.emit('chatMessage', {
		type: 'status',
		text: 'connected',
		created: Date.now(),
		username: socket.request.user.username,
		picture: socket.request.user.providerData.picture
	});

	connectedUsers.push({
		userId: socket.request.user._id,
		username: socket.request.user.username
	});

	messageBdd = createNewBddEntry({
		type: 'status',
		text: 'connected',
		created: Date.now(),
		userId: socket.request.user._id
	});
	messageBdd.save(function(err) {
	});

	io.on('connection', function(socket){
		socket.on('join', function(roomData) {
			socket.join(roomData);

			console.log(socket.request.user.username + " a rejoint la salle " + roomData);

			

			Message.findByRoom(roomData).populate('writer').sort('-created').limit(5).exec(function(err, articles) {
				if (err) {
					return res.status(400).send({
						message: getErrorMessage(err)
					});
				} else {
					for (var i = articles.length - 1; i >= 0 ; i--) {
						socket.emit('chatMessage', {
							type: articles[i].type,
							text: articles[i].text,
							room: roomData,
							created: articles[i].created,
							username: articles[i].writer.username,
							picture: articles[i].writer.providerData.picture
						});
					}

					io.in(roomData).emit('chatMessage', {
						type: 'status',
						text: 'join',
						room: roomData,
						created: Date.now(),
						username: socket.request.user.username,
						picture: socket.request.user.providerData.picture
					});

					messageBdd = createNewBddEntry({
						type: 'status',
						text: 'join',
						created: Date.now(),
						room: roomData,
						userId: socket.request.user._id
					});
					messageBdd.save(function(err) {
					});
					
				}
			})
		})

		socket.on('leave', function(roomData) {
			socket.leave(roomData);
			console.log(socket.request.user.username + " a quitté la salle " + roomData);
			io.emit('chatMessage', {
				type: 'status',
				text: 'leave',
				room: roomData,
				created: Date.now(),
				username: socket.request.user.username,
				picture: socket.request.user.providerData.picture
			});

			messageBdd = createNewBddEntry({
				type: 'status',
				text: 'leave',
				created: Date.now(),
				room: roomData,
				userId: socket.request.user._id
			});
			messageBdd.save(function(err) {
			});
		})
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

		io.in(message.room).emit('chatMessage', message);
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

		var index = connectedUsers.indexOf({
			userId: socket.request.user._id,
			username: socket.request.user.username
		});
		if (index > -1) {
		    connectedUsers.splice(index, 1);
		}
	});
};

var createNewBddEntry = function(message) {
	messageBdd = new Message();
	messageBdd.text = message.text;
	messageBdd.created = message.created;
	messageBdd.type = message.type;
	messageBdd.writer = message.userId;
	messageBdd.room = message.room;

	return messageBdd;
}