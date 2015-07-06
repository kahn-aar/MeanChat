angular.module('profile').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'partials/home.html'
			}).
			when('/profile:id', {
				templateUrl: 'partials/profile.html'
			}).
			otherwise({
				redirectTo: '/'
			});
	}
]);