var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);

	require('../app/model/user.server.model');

	return db;
};