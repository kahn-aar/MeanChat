angular.module('chat').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/chat', {
				templateUrl: 'chat/partials/chat.html'
		});
	}
]);