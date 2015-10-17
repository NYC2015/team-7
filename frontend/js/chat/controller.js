'use strict';

var plusChatControllers = angular.module('plus.chat');

plusChatControllers.controller('chatCtrl', function($scope, chatService) {
    $scope.messages = chatService.messages;
});
