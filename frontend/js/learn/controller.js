'use strict';

var plusLearnControllers = angular.module('plus.learn');

plusLearnControllers.controller('learnCtrl', function($scope, api) {
    api.profile.current().success(function(profile) {
        $scope.profile = profile;
    });
});
