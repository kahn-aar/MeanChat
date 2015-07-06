angular.module('profile', [])
	.controller("ProfileCtrl", ['$scope', 'http', function($scope, http) {
		http.get('/users/id', function(data) {
			$scope.user = date
		});
	}]);