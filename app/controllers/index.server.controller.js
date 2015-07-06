exports.render = function(req, res) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}

	req.session.lastVisit = new Date();


	console.log(req.user);
	console.log("hello");
	console.log(JSON.stringify(req.user));
	res.render('index', {
		title: 'Hello World',
		user: req.user ? JSON.stringify(req.user) : '',
		userFullName: req.user ? req.user.fullName : '',
		userId: req.user ? req.user._id : ''
	});
}