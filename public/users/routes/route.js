angular.module('users').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/users', {
				templateUrl: 'chat/partials/profile.html'
		})
	}
]);