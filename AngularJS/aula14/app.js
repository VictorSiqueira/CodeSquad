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

//Para poder realizar comunicação com o Back-End basta adicionar o parametro $http
MyApp.controller('formularioController', function ($scope, $http) {
    $http.get('http://localhost:8080/usuarios')//url do server
        //Callback de sucesso
        //os paramentros são todos disponiveis
        .sucess(function (data, status, headers, config) {
            if (data.length !== 0) {
                $scope.formulario = data;
            }
        })
        //Callback de erro
        .error(function (data, status, headers, config) {
            console.log('Algo deu errado:'+ status);
        });
    
    $scope.reset = function () {
        $scope.formulario = '';
    };
    
    
    $scope.salvar = function () {
       
        
        var config = {
            headers : {'Content-Type' : 'application/x-www-form-urlencoded'}
        };
        var dados;
        
        dados.form = $scope.formulario;
        
        //em post o primeiro paramentro é a url do Service e o segundo os dados a serem enviados,os dois do ultimo são opcionais
        //o metodo post tambem tem acesso aos callbacks success e error
        $http.post('http://localhost:8080/usuarios/save', dados, config)
             .sucess(function (data, status, headers, config) {
                $scope.salvo = $scope.formulario;
             })
             .error(function (data, status, headers, config) {
                $scope.salvo = 'Verifique o console';
                console.log('Status:'+ status);
                console.log('\nData:'+ data);
                console.log('\nHeaders:'+ status);
                console.log('\nConfig:'+ status);
            });
    };

});
