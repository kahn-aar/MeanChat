angular.module('profile')
	.controller("HomeCtrl", ['$scope', 'Authentication', function($scope, Authentication) {
		$scope.name = Authentication.user ? Authentication.user.fullName :
'MEAN Application';
	}]);