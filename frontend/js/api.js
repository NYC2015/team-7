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
    name: undefined,
    participants: [profile, profile],
    messages: [
        {
            from: 10,
            time: "5 seconds ago",
            body: "Hello, world",
        }
    ]
}

var profile = {
    id: 10,
    name: "Hunter Leath",
    picture: "http://google.com",
    privacy: {
        none: true,
        hiv: true,
        aids: false,
    }
}

var post = {
    title: "free screenings + counseling at 123 roadd",
    body: "so there i was at the gorcery store",
    poster: profile,
    comments: [comment, comment, comment]
}

var comment = {
    body: "blah blah blah, comment",
    poster: profile
}

plsApi.factory('api', function($q) {
    return {
        profile: {
            current: fakeAPICall(profile)
        },
        chat: {
            sendMessage: fakeAPICall(
                true,
                ["conversationId", "message"]
            ),
            all: fakeAPICall({
                [conversation, conversation]
            })
        },
        community: {
            postComment: fakeAPICall(
                true,
                ["postId", "message"]
            ),
            postStory: fakeAPICall(
                true,
                ["title", "body"]
            ),
            all: fakeAIPCall([post, post])
        }
    }
})
