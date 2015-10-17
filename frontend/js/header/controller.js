'use strict';

angular.module('plus.header', [])
    .controller('headerCtrl', function($scope, $state, Session) {
        function setHeader() {
            $scope.stateName = $state.current.name;
        }

        $scope.Session = Session;
        $scope.$on("$stateChangeSuccess", setHeader);
    });
