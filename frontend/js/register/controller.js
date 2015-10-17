'use strict';

var registerCtrls = angular.module('plus.registration', ['plus.api']);

registerCtrls.controller('registerCtrl', function($scope, api) {
    $scope.register = function() {
        api.login.register({
            username: $scope.username,
            password: $scope.password,
            'phone_number': $scope.number,
        })
    }
});
