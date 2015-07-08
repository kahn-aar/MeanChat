angular.module('chat').controller('ChatController', ['$scope', 'Socket', 'Authentication', function($scope, Socket, Authentication) {
	
	$scope.authentication = Authentication;

	$scope.messages = [];

	Socket.on('chatMessage', function(message) {
		$scope.messages.push(message);
	});

	$scope.sendMessage = function() {
		var message = {
			text: this.messageText,
		};
		Socket.emit('chatMessage', message);
		this.messageText = '';
	}

	$scope.$on('$destroy', function() {
		Socket.removeListener('chatMessage');
	})
}]);