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

        service.upvote = function(post, $event) {
            api.community.upvote(post.id).then(function(res) {
                if (!post.upvotes)
                    post.upvotes = 0;
                post.upvotes++;
            });
            $event.stopImmediatePropagation();
        };

        service.flag = function(post, $event) {
            api.community.flag(post.id);
            $event.stopImmediatePropagation();
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

        service.showLeaders = function() {
            api.users.leaders().then(function(res) {
                var leaders = _.filter(res.data.leaders, function(leader) {
                    return true;
                });
                var modalInstance = $uibModal.open({
                    templateUrl: 'js/community/leader-modal.html',
                    controller: 'LeaderCtrl',
                    resolve: {
                        leaders: function() {
                            return leaders;
                        }
                    }
                });
            });
        };

        return service;
    });
