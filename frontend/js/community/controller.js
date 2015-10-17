'use strict';

var plusCommunityControllers = angular.module('plus.community', []);

plusCommunityControllers.controller('communityCtrl', function($scope, api) {
    api.profile.current().success(function(profile) {
        $scope.profile = profile;
    });
});
