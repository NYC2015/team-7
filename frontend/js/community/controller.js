'use strict';

var plusCommunityControllers = angular.module('plus.community', ['plus.api']);

plusCommunityControllers.controller('communityCtrl', function($scope, communityService) {
    $scope.community = communityService.exports;
    communityService.ready.promise.then(function() {
        // do setup;
    });

    $scope.postStory = communityService.postStory;
});
