'use strict';

var moveArray = function(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
};

var numbers = function(str) {
    var res = 0,
        len = str.length;
    for (var i = 0; i < len; i++) {
        res = ((res * 31 + str.charCodeAt(i)) % 65537);
    }
    return res;
}

var normalize = function(body, to) {
    return numbers(to) + "-" + numbers(body) + "-" + (new Date()).getTime();
}

var chatApp = angular.module('plus.chat', [
    'plus.api',
    'firebase',
]);

chatApp.controller('chatCtrl', function($scope, $timeout, $firebaseObject, Session) {
    var ref = new Firebase('https://plusapp.firebaseio.com');

    var id = Session.user.id;
    if (id == null) {
        // probably dev box
        id = -1;
    }

    // get a reference to the current objects
    var ourMessages = ref.child(id);
    
    $scope.newMessage = "";

    $scope.loading = true;

    var users = [];
    $scope.users = users;

    var handleMessage = function(k, front) {
        var key = "";
        var profile = {};

        if(k["self"] === true) {
            // key = k.to[0].fingerprint;
            key = k.to[0].alias;
            profile = k.to[0];
        } else {
            // key = k.from.fingerprint;
            key = k.from.alias;
            profile = k.from;
        }

        var foundObj = undefined;
        for(var i in users) {
            if(users[i].key === key) {
                foundObj = users[i];
                break;
            }
        }

        if(foundObj === undefined) {
            foundObj = {
                key: key,
                name: profile.name,
                alias: profile.alias,
                fingerprint: profile.fingerprint,
                messages: [],
            }
            users.push(foundObj);
        } else {
            if(foundObj.name == "" && profile.name != profile.alias) {
                foundObj.name = profile.name;
            }
        }

        var msgDate = new Date(k.date);
        if(msgDate > foundObj.latest || foundObj.latest === undefined) {
            foundObj.latest = msgDate;
        }

        var doIt = function(data) { foundObj.messages.push(data); }
        if(front === true) { doIt = function(data) { foundObj.messages.unshift(data); } }

        var theMessage = {
            sender: k["self"],
            message: k.components["airdispat.ch/chat/body"],
            timestamp: msgDate,
        }
        doIt(theMessage);
        return {
            from: foundObj,
            message: theMessage,
        };
    }

    ourMessages.on('value', function(obj) {
        // get the val
        obj = obj.val();
        
        console.log(obj);
        
        // load the conversations into the system
        for(var i in obj) {
            handleMessage(obj[i]);
        }
    });

    ourMessages.on('child_added', function(obj) {
        var msg = obj.val();
        // We already populated self messages earlier. This assumes a one-device
        // model of the user.
        if(msg.self) { return; }

        var theMessage = handleMessage(msg, true);
        if($scope.notifications) {
            var note = new Notification(theMessage.from.name, {body: theMessage.message.message.string});
        }

        $timeout(function() {
            msgDiv.scrollTop = msgDiv.scrollHeight;
        }, 0);
    });

    var msgDiv = document.getElementById("messages");

    $scope.newConversation = function() {
        var obj = {
            name: "",
            messages: [],
            isNew: true,
        }

        $scope.selected = obj;
    }

    $scope.selectConversation = function(obj) {
        $scope.selected = obj;

        $timeout(function() {
            msgDiv.scrollTop = msgDiv.scrollHeight;
        }, 0);
    }

    $scope.send = function() {
        var sendingDate = (new Date()).toISOString();

        if($scope.newMessage === "") { return }
        console.log($scope.selected.alias);

        if($scope.selected.isNew === true) {
            $scope.users.unshift($scope.selected);
            $scope.selectedIndex = 0;
        } else {
            moveArray($scope.users, $scope.selectedIndex, 0)
                $scope.selectedIndex = 0;
        }

        $scope.sending = true;

        var toUser = $scope.selected.alias;

        var msg = {
            to: [{
                alias: $scope.selected.alias,
            }],
            name: "chat/" + normalize($scope.newMessage, $scope.selected.alias),
            date: sendingDate,
            public: false,
            components: {
                "airdispat.ch/chat/body": {string: $scope.newMessage},
            },    
        }

        ref.child(toUser).push(msg, function() {
            // callback
            $scope.sending = false;

            $scope.selected.messages.unshift({
                sender: true,
                timestamp: sendingDate,
                message: {
                    string: $scope.newMessage,
                },
            });

            $timeout(function() {
                msgDiv.scrollTop = msgDiv.scrollHeight;
                document.getElementById("newMessageText").focus();
            }, 0);

            $scope.newMessage = "";

            // this can just sort of happen, no worries
            ourMessages.push(msg);
        });
    }


    $scope.notifications = true;
});

chatApp.filter('reverse', function() {
    return function(items) {
        if (!angular.isArray(items)) return [];
        return items ? items.slice().reverse() : [];
    };
});
