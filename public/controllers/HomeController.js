angular.module('profile')
	.controller("HomeCtrl", ['$scope', 'Authentication', function($scope, Authentication) {
		$scope.authentication = Authentication;
	}]);