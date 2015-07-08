exports.render = function(req, res) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}

	req.session.lastVisit = new Date();


	res.render('index', {
		title: 'MEAN chat',
		user: req.user ? JSON.stringify(req.user) : '',
		userFullName: req.user ? req.user.fullName : '',
		userId: req.user ? req.user._id : ''
	});
}