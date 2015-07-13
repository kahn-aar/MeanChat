angular.module('chat')
.filter('isMessageRoom', function() {
  return function(input, messageRoom) {
    var out = [];
      for (var i = 0; i < input.length; i++){
          if(input[i].room == messageRoom)
              out.push(input[i]);
      }      
    return out;
  };
});