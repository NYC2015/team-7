'use strict';

var plusApi = angular.module('plus.api', []);

var conversation = {
    id: 10,
    name: undefined,
    participants: [profile, profile],
    messages: [{
        from: 10,
        time: "5 seconds ago",
        body: "Hello, world"
    }]
};

var profile = {
    id: 10,
    name: "Hunter Leath",
    picture: "http://google.com",
    privacy: {
        none: true,
        hiv: true,
        aids: false
    },
    status: "hiv"
};

var comment = {
    body: "blah blah blah, comment",
    author: profile
};

var post = {
    title: "free screenings + counseling at 123 roadd",
    body: "so there i was at the gorcery store",
    author: profile,
    votes: 50,
    id: 'post',
    comments: [comment, comment, comment]
};

var resource = {
    title: "hello, world",
    body: "howdy",
    locality: 2,
    from: "doctor kwon"
};

plusApi.factory('api', function($q, $http) {
    var fakeAPICall = function(response, args) {
        return function() {
            var defer = $q.defer();

            setTimeout(function() {
                defer.resolve(response);
            }, 15);

            return defer.promise;
        };
    };

    var path = "localhost:8000";

    return {
        profile: {
            current: fakeAPICall(profile)
        },
        chat: {
            sendMessage: fakeAPICall(
                ["conversationId", "message"]
            ),
            all: fakeAPICall(
                [conversation, conversation]
            )
        },
        community: {
            postComment: fakeAPICall(
                ["postId", "message"]
            ),
            upvote: function() {
                return $http.post(path + "/upboat");
            },
            postStory: fakeAPICall(
                ["title", "body"]
            ),
            all: fakeAPICall({list: [post, post]})
        },
        learn: {
            all: fakeAPICall([resource, resource])
        }
    };
});
