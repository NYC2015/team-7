'use strict';

var plusApi = angular.module('plus.api');

plsApi.factory('plusAPI', function() {
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
                return true;
            }
        }
    }
})
