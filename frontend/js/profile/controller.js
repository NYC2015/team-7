'use strict';

var plusProfileControllers = angular.module('plus.profile', []);

plusProfileControllers.controller('profileCtrl', function($scope, api) {
    api.profile.current().then(function(profile) {
        $scope.profile = profile;
    });
});
