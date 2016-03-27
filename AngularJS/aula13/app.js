var MyApp = angular.module('MyApp', []);
var INTEGER_REGEXP = /^\-?\d+$/;
var idade;

MyApp.directive (idade, function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attr, ctrl) {
            ctrl.$validators.idade = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return false;
                }
                if (INTEGER_REGEXP.test(viewValue)) {
                    if (viewValue >= 13) {
                        return true;
                    }
                    return false;
                }
                
                return false;
            };
        }
    };
});

MyApp.controller('formularioController', function ($scope) {
    $scope.reset = function () {
        $scope.formulario = '';
    };
    
    $scope.salvar = function () {
        $scope.salvo = $scope.formulario;
    };

});
