'use strict';

angular.module('plus.header', [])
    .controller('headerCtrl', function($scope, $state) {
        function setHeader() {
            console.log($state.current.name);
            $scope.stateName = $state.current.name;
        }

        $scope.$on("$stateChangeSuccess", setHeader);
    });
