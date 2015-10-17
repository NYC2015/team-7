'use strict';

var plusProfileControllers = angular.module('plus.profile', []);

plusProfileControllers.controller('profileCtrl', function($scope, api) {
    $scope.status = {
        none: "Prefer Not to Disclouse",
        negative: "HIV Negative",
        positive: "HIV Postivie",
        aids: "AIDS",
    };
    
    api.profile.current().then(function(profile) {
        $scope.profile = profile;
    });
});
