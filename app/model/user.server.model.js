var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	username: {
		type: String,
		unique: true,
		required: true
	},
	role: {
		type: String,
		enum: ['Admin', 'User'],
		required: true
	},
	password: String,
	created: {
		type: date,
		default: Date.now
	}
});

UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
})

UserSchema.statics.findOneByUsername = function (username, callback) {
	this.findOne({username: new RexExp(username, 'i')}, callback)
}

UserSchema.methods.authenticate = function(password) {
	return this.password === password;
}

UserSchema.post('save', function(next) {
	if (this.isNew) {
		console.log("A new user was created.");
	} else {
		console.log("A user updated is details.")
	}
})

UserSchema.set('toJSON', {virtuals: true});

mongoose.model('User', UserSchema);