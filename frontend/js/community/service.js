'use strict';

angular.module('plus.community').service('communityService',
    function(api, $q) {
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
            api.commmunity.postStory().then(function(res) {
                console.log(res);
            });
        };

        service.upvote = function(post) {
            api.community.upvote(post).then(function(res) {
                console.log(post.id);
            });
        };

        return service;
    });
