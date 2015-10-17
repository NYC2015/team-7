'use strict';

var plusCommunity = angular.module('plus.community', ['plus.api']);

plusCommunity.controller('communityCtrl',
        function($scope, communityService, Session, profileService) {
            $scope.community = communityService.exports;

            $scope.upvote = communityService.upvote;
            $scope.flag = communityService.upvote;
            $scope.visibleName = function(author) {
                return profileService.visibleName(Session.user, author);
            };

            $scope.postStory = communityService.postStory;
            $scope.viewComments = communityService.viewComments;
        })
    .controller('CommentCtrl',
        function($scope, communityService, post) {
            $scope.post = post;
            $scope.commentText = "";
            $scope.submit = function() {
                communityService.sendComment(post, $scope.commentText);
            };
        })
    .controller('StoryCreateCtrl',
        function($scope) {
            $scope.post = {
                content: "",
                title: ""
            };
        });
