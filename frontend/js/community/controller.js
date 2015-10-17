'use strict';

var plusCommunity = angular.module('plus.community', ['plus.api']);

plusCommunity.controller('communityCtrl',
    function($scope, communityService) {
        $scope.community = communityService.exports;
        communityService.ready.promise.then(function() {
            console.log(communityService.exports);
        });

        $scope.upvote = function(post) {
            console.log(post);
            communityService.upvote(post); 
        };

        $scope.postStory = communityService.postStory;
    });
