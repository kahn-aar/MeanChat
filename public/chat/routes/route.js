angular.module('chat').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/chats', {
				templateUrl: 'chat/partials/chat.html'
		})
	}
]);