var MyApp = angular.module('MyApp', []);

MyApp.controller('diretivasController', function ($scope) {
    $scope.mouseenter = function () {
        alert('mouse enter')
    }
    $scope.mouseclick = function () {
        alert('mouse click')
    }
    $scope.kdown = function () {
        alert('teclada')
    }
});
