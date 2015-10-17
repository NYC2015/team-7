'use strict';

var plusCommunity = angular.module('plus.community', ['plus.api']);

plusCommunity.controller('communityCtrl',
        function($scope, communityService, Session, profileService) {
            $scope.community = communityService.exports;

            $scope.upvote = communityService.upvote;
            $scope.flag = communityService.flag;
            $scope.visibleName = function(author) {
                return profileService.visibleName(Session.user, author);
            };
            $scope.Session = Session;
            $scope.showLeaders = communityService.showLeaders;
            $scope.postStory = communityService.postStory;
            $scope.viewComments = communityService.viewComments;
        })
    .controller('CommentCtrl',
        function($scope, communityService, post, Session) {
            $scope.post = post;
            $scope.commentText = "";
            $scope.Session = Session;
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
        })
    .controller('LeaderCtrl',
                function($scope, $rootScope, Session, profileService, communityService, $state, leaders) {
            $scope.leaders = _.filter(leaders, function(leader) {
                return leader.id !== Session.user.id;
            });
            $scope.visibleName = function(leader) {
                return profileService.visibleName(Session.user, leader);
            };
            $scope.startChat = function(leader) {
                communityService.referChat = leader;
                $scope.$close();
                $state.go('chat');
            };
        });
