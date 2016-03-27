var Usuarios = angular.module('Usuarios', ['ngRoute','ngResource']);

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

//para usar 0o resoucer é necessario criar um factory
//resource é utilizado para acessar servidores Rest
//um server Rest se comporta conforme o metodo que vc usa para acessar ele
// GET - te retorna um dado
// POST¨- salva os dados
// POST + id - atualiza dados (mas deve verificar se o server da suporte a isso)
// PUT - atualiza dados
// DELETE - deleta dados

Usuarios.factory('Usuarios', ['$resource', function ($resource) {
	//o primeiro parametro é o url, o segundo é o valor para o id, p terceiro é o metodo de envio
	return $resource('http://localhost:8080/server/usuarios/:id', null, {
		'update':{
			method: 'PUT'
		}
	});
} ])


Usuarios.controller('UsuariosController', ['$scope', '$http', function ($scope, $http) {
    
}]);

