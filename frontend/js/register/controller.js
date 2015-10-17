'use strict';

var registerCtrls = angular.module('plus.registration', ['plus.api']);

registerCtrls.controller('registerCtrl', function($scope, api, $state) {
    $scope.register = function() {
        api.login.register({
            username: $scope.username,
            password: $scope.password,
            'phone_number': $scope.number,
            disease: $scope.status
        }).then(function() {
            $state.go('login');
        });
    };
});
