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
                story.author = "me";
                //content author title
                api.community.postStory(story).then(function(post) {
                    service.exports.list.push(post);
                });
            });
        };

        service.upvote = function(post) {
            api.community.upvote(post.id).then(function(res) {
                post.votes++;
            });
        };

        service.sendComment = function(post, text) {
            api.community.postComment(post.id, text).then(function(comment) {
                post.comments.push(comment);
            });;
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
