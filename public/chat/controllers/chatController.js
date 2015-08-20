angular.module('chat').controller('ChatController', ['$scope', 'Socket', 'Authentication', function($scope, Socket, Authentication) {
	
	$scope.authentication = Authentication;

	$scope.messages = [];

	$scope.roomNames = [];

	$scope.usersConnected = [];

	Socket.on('chatMessage', function(message) {
		$scope.messages.push(message);
		console.log(message);
		if (message.username === $scope.authentication.user.username && message.room != undefined) {
			setTimeout(function(){ document.getElementById(message.room).scrollTop = document.getElementById(message.room).scrollHeight + 100; }, 100);
		}
	});

	$scope.sendMessage = function(roomName) {
		if (this.messageText != '') {
			var message = {
				text: this.messageText,
				room: roomName
			};
			Socket.emit('chatMessage', message);
			this.messageText = '';
		}
	}

	$scope.openNewRoom = function() {
		Socket.emit('join', $scope.newRoomName);
		$scope.roomNames.push($scope.newRoomName);
		$scope.newRoomName = "";
	}

	$scope.leaveChat = function(roomName) {
		Socket.emit('leave', roomName);
		$scope.roomNames.splice($scope.roomNames.indexOf(roomName), 1);
	}

	$scope.isMessageRoom = function(message, roomName) {
		return message.room === roomName;
	}

	Socket.getUsersConnected(function(data) {
		$scope.usersConnected = data;
	});

	$scope.$on('$destroy', function() {
		Socket.removeListener('chatMessage');
	})
}]);