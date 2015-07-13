angular.module('users').controller('UserController', ['$scope', 'Socket', 'Authentication', function($scope, Socket, Authentication) {
	
	$scope.authentication = Authentication;

}]);