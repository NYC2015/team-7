'use strict';

angular.module('plus.community').service('communityService',
    function(api, $q, $uibModal) {
        var service = {};

        service.ready = $q.defer();

        service.exports = {
            list: []
        };

        api.community.all().then(function(res) {
            service.exports.list = res.list;
            service.ready.resolve();
        });

        service.postStory = function(story) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/community/create-content-modal.html',
                controller: 'StoryCreateCtrl'
            });
            modalInstance.result.then(function(story) {
                //content author title
                api.commmunity.postStory().then(function(res) {
                    console.log(res);
                });
            });
        };

        service.upvote = function(post) {
            api.community.upvote(post).then(function(res) {
                console.log(post.id);
            });
        };

        service.viewComments = function(post) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/community/comment-modal.html',
                controller: 'CommentCtrl',
                resolve: {
                    post: function() {
                        return post;
                    }
                }
            });
        };

        return service;
    });
