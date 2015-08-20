var chat = require('../../app/controllers/chat.server.controller');

module.exports = function(app) {
	app.route('/api/chatUsers')
		.get(chat.usersConnected);

};