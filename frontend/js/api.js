'use strict';

var plusApi = angular.module('plus.api');

var fakeAPICall = function(response, args) {
    return function() {
        var defer = $q.defer();

        setTimeout(function() {
            defer.resolve(response);
        }, 0);

        return defer.promise;
    }
}

plsApi.factory('plusAPI', function($q) {
    return {
        profile: {
            current: function() {
                return {
                    name: "Hunter Leath",
                    picture: "http://google.com",
                    privacy: {
                        none: true,
                        hiv: true,
                        aids: false,
                    }
                }
            }
        },
        chat: {
            sendMessage: function(conversationId, message) {
                // TODO: Replace with a promise.
                return true;
            }
        }
    }
})
