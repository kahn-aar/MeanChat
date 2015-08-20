angular.module('chat').service('Socket', ['$http', 'Authentication', '$location', '$timeout', function($http, Authentication, $location, $timeout) {
	


	if (Authentication.user) {
		this.socket = io();
	} else {
		$location.path('/');
	}

	this.on = function(eventName, callback) {
		if (this.socket) {
			this.socket.on(eventName, function(data) {
				$timeout(function() {
					callback(data);
				});
			});
		}
	};

	this.emit = function(eventName, data) {
		if (this.socket) {
			this.socket.emit(eventName, data);
		}
	};

	this.removeListener = function(eventName) {
		if (this.socket) {
			this.socket.removeListener(eventName);
		}
	};

	this.getUsersConnected = function(callback) {
		return $http.get('/api/chatUsers', callback)
	}
}]);
