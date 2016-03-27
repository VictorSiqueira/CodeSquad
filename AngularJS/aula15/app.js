//para utilizar o Route é necessario injetar ele no modulo
//para fazer isso basta colocar ngRoute dentro dos colchetes

//não minificar um arquivo angular qualquer, pois com as alterações de parametros ele quebra
//para previnir isso, quando criar um controller, diretiva ou um config, inves de declarar o function, jogue ele em um array, e coloque o nome dos elementos do function exatamente na mesma ordem que são delcarados em formato String
var Usuarios = angular.module('Usuarios', ['ngRoute']);

Usuarios.config(['$routeProvider', function ($routeProvider) {
    //criando uma rota
    $routeProvider
        .when('/usuarios', {
            templateUrl: 'templates/usuarios/lista.html',
            controller : 'UsuariosController'
        })
        .when('/usuarios/:id/edita', {
            templateUrl: 'templates/usuarios/editar.html',
            controller : 'UsuariosController'
        })
        .when('/usuarios/:id/remove', {
            controller : 'UsuariosController'
        })
        .when('/usuarios/add', {
	        templateUrl: 'templates/usuarios/add.html',
	        controller : 'UsuariosController'
	    });
}]);

Usuarios.controller('UsuariosController', ['$scope', '$http', function ($scope, $http) {
    
}]);