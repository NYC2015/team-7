'use strict';

var plusProfileControllers = angular.module('plus.profile', []);

plusProfileControllers.controller('profileCtrl', function($scope, api) {
    $scope.status = {
        none: "Prefer Not to Disclouse",
        negative: "HIV Negative",
        positive: "HIV Postivie",
        aids: "AIDS",
    };

    $scope.privacy = {
        none: "Anonymous to All Users",
        positive: "Known to HIV Positive Users",
        negative: "Known to All Users",
    };
    
    api.profile.current().then(function(profile) {
        $scope.profile = profile;
    });
});
