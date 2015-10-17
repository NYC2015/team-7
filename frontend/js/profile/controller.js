'use strict';

var plusProfileControllers = angular.module('plus.profile', []);

plusProfileControllers.controller('profileCtrl', function($scope, api, Session) {
    $scope.status = {
        none: "Prefer Not to Disclouse",
        negative: "HIV Negative",
        positive: "HIV Postivie",
        aids: "AIDS"
    };

    $scope.privacy = {
        none: "Anonymous to All Users",
        positive: "Known to HIV Positive Users",
        negative: "Known to All Users"
    };

    $scope.submitName = function() {
        console.log($scope.profile);
        api.profile.nameChange($scope.profile).then(function(res) {
            console.log(res);
        });
    };
    
    $scope.profile = Session.user;
    console.log(Session.user);
});
