'use strict';

var plusApi = angular.module('plus.api');

var fakeAPICall = function(response, args) {
    return function() {
        var defer = $q.defer();

        setTimeout(function() {
            defer.resolve(response);
        }, 15);

        return defer.promise;
    }
}

var conversation = {
    id: 10,
    participants: [{
        name: "Hunter Leath",
        picture: "/img",
    }, {
        name: "Brent Baumgartner",
        picture: "/img/2",
    }]
}



plsApi.factory('api', function($q) {
    return {
        profile: {
            current: fakeAPICall({
                name: "Hunter Leath",
                picture: "http://google.com",
                privacy: {
                    none: true,
                    hiv: true,
                    aids: false,
                }
            })
        },
        chat: {
            sendMessage: fakeAPICall(
                true,
                ["conversationId", "message"]
            ),
            all: fakeAPICall({
                
            }, [])
        }
    }
})
