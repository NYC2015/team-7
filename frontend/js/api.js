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
    id: 1,
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

    var path = "http://localhost:8000";

    var postData = function(path, data) {
        return $http({
            method: 'POST',
            url: path,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: data,
        });
    };

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
            upvote: function(postId) {
                return postData(path + "/upboat", {"post_id": postId});
            },
            postComment: function(postId, commentText) {
                return $http.post(path + "/comment", {
                    'content': commentText,
                    'post_id': postId
                });
            },
            postStory: function(story) {
                return $http.post(path + "/post", story);
            },
            all: fakeAPICall({list: [post, post]})
        },
        learn: {
            all: fakeAPICall([resource, resource])
        },
        login: {
            login: function(username, password) {
                return postData(path + "/login", {
                    username: username,
                    password: password,
                });
            },
            register: function(registerInfo) {
                return postData(path + "/register", registerInfo);
            }
        },
    };
});

