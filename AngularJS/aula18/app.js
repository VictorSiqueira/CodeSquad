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

Usuarios.factory('Usuarios', ['$resource', function ($resource) {
	//o primeiro parametro é o url, o segundo é o valor para o id, p terceiro é o metodo de envio
	return $resource('http://localhost:8080/server/usuarios/:id', null, {
		'update':{
			method: 'PUT'
		}
	});
} ])

//injetando o factory no controller
Usuarios.controller('UsuariosController', ['$scope', 'Usuario', '$location','$routeParams', function ($scope, $Usuarios, $location, $routeParams) {
    $scope.usuarios = Usuario.query();
    $scope.novo = function () {
    	Usuario.save(
    			{}, //model id - identifica a ocorrencia do banco a ser mexida
    			$scope.usuario, //dados a serem salvos
    			function (){ // o primeiro fucntion é sucess
    				$scope.usuario = ''; //zerar a model para ficar livre receber novos dados caso ele clicque em cancelar da linha de baixo 
    				if (confim ('Salvo com sucesso. Voltar para a index?'))
    					$location.path('/usuarios');//chamar recurso de rota, e por estar usando ele aqui é necessario declarar ele no controller
    			}, 
    			function(data, status) {
    				alert('não foi possivel salver' + status +" | "+ data);
    			}
    	);
    }
    
    $scope.ver = function () {
    	$scope.usuario = Usuario.get({id:$routeParams.id});
    }
    
    $scope.editar = function () {
    	Usuario.update (
    		{id:routeParams.id},//colocar o id é opcional, mas neste caso é ncessario
    		$scope.usuario,
    		function (){ // o primeiro fucntion é sucess
				if (confim ('Salvo com sucesso. Voltar para a index?'))
					$location.path('/usuarios');//chamar recurso de rota, e por estar usando ele aqui é necessario declarar ele no controller
			}, 
			function(data, status) {
				alert('não foi possivel salver' + status +" | "+ data);
			}
    	);
    }
    $scope.remover =  function (id){
    	if(confirm('Tem Certeza?'))
    	Usuario.remove(
    			{id:id}, // associação param : var
    			{}, // não há necessidade
    			function ()	{
    				alert('Removido com sucesso"')
    				$scope.usuarios = Usuario.query(); // para recarregar a lista
    			},
    			function (data, status) {
    				alert ('Não pode ser removido, erro'+status);
    			}
    	
    	);
    }
}]);

