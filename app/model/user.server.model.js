var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
	},
	username: {
		type: String,
		unique: true,
		required: 'username id required',
		trim: true
	},
	role: {
		type: String,
		enum: ['Admin', 'User'],
		required: true
	},
	password: {
		type: String,
		validate: [
			function(password) {
				return password && password.length > 6;
			}, 'password should be longer'
		]
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'provider is required'
	},
	providerId: String,
	providerData: {},
	created: {
		type: Date,
		default: Date.now
	},
	chatRooms: Array
});

UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullname) {
	var splitName = fullname.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');
	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
}

UserSchema.post('save', function(next) {
	if (this.isNew) {
		console.log("A new user was created.");
	} else {
		console.log("A user updated is details.")
	}
})

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

mongoose.model('User', UserSchema);