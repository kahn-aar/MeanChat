angular.module('chat').controller('ChatController', ['$scope', 'Socket', 'Authentication', function($scope, Socket, Authentication) {
	
	$scope.authentication = Authentication;

	$scope.messages = [];

	$scope.roomNames = [];

	Socket.on('chatMessage', function(message) {
		$scope.messages.push(message);
	});

	$scope.sendMessage = function(roomName) {
		var message = {
			text: this.messageText,
			room: roomName
		};
		Socket.emit('chatMessage', message);
		this.messageText = '';
	}

	$scope.openNewRoom = function() {
		console.log("hello");
		Socket.emit('join', $scope.newRoomName);
		$scope.roomNames.push($scope.newRoomName);
		$scope.newRoomName = "";
	}

	$scope.leaveChat = function(roomName) {
		Socket.emit('leave', roomName);
		$scope.roomNames.remove(roomName);
	}

	$scope.isMessageRoom = function(message, roomName) {
		return message.room === roomName;
	}

	$scope.$on('$destroy', function() {
		Socket.removeListener('chatMessage');
	})
}]);