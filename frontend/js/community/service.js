'use strict';

angular.module('plus.community').service('communityService',
    function(api, $q, $uibModal, Session) {
        var service = {};

        service.ready = $q.defer();

        service.exports = {
            list: []
        };

        api.community.all().then(function(res) {
            service.exports.list = res.data['posts'];
            service.ready.resolve();
        });

        service.postStory = function(story) {
            var modalInstance = $uibModal.open({
                templateUrl: 'js/community/create-content-modal.html',
                controller: 'StoryCreateCtrl'
            });
            modalInstance.result.then(function(story) {
                story.author = Session.user.id;
                //content author title
                api.community.postStory(story).then(function(res) {
                    story.id = res.data['post_id'];
                    service.exports.list.push(story);
                });
            });
        };

        service.upvote = function(post) {
            api.community.upvote(post.id).then(function(res) {
                if(!post.upvotes)
                    post.upvotes = 0;
                post.upvotes++;
            });
        };

        service.flag = function(post) {
            api.community.flag(post.id);
        };

        service.sendComment = function(post, text) {
            console.log(post, text);
            api.community.postComment(post.id, text).then(function(res) {
                var comment = {
                    content: text,
                    post: post,
                    id: res.data['comment_id']
                };

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
