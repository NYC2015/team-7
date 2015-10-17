'use strict';

var plusProfileControllers = angular.module('plus.profile');

plusProfileControllers.controller('profileCtrl', function($scope, api) {
    api.profile.current().success(function(profile) {
        $scope.profile = profile;
    });
});
