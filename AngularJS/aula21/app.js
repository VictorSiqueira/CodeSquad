//o carregamento dos aquivos é feito de maneira assincrona, pois é em Ajax

//recebe um objeto
requirejs.config({
	//declaração do diretorio base
	baseUrl:'js',
	//objeto de Arquivos a serem utilizados
	paths:{
		//crio um alias e indico o nome do arquivo no diretorio com uma String
		//não é necessario por a extensao do arquivo
		requireJS: 'require',
		angularJS: 'angular.min',
		angularJSRoute: 'angular-resource.min',
		angularJSResource: 'angular-route.min',
		jquery: 'jquery-1.11.3.min',
		bootstrap: 'bootstrap.min',
		//declaração dos meu modulos
		mtarefas :'modules/app-tarefas',
		musuarios :'modules/app-usuarios',
		mbootstrap :'modules/app-bootstrap'
	},
	// aqui coloca todas as config que preciso dos arquivos
	shim: {
		angularJS:{
			exports : 'angular'
		},
		//declaração de dependencia
		angularJSRoute:{
			//colocar as String referenciando os nomes dados acima
			//necessario colocar entre colchetes
			deps:['angularJS'],
		},
		angularJSResource:{
			deps:['angularJS'],
		},
		mtarefas:{
			deps:['angularJS'],
		},
		musuarios:{
			//declare-se tambem os arquivos que estão na injecção de dependencia da declaração do modulo
			deps:['angularJS','angularJSResource','angularJSRoute'],
		},
		mbootstrap:{
			deps:['angularJS'],
		},
		bootstrap:{
			deps:['jquery']
		}
	}
});

require(
	//aqui coloca os objetos que tem maior depencia, 
	//pois eles mesmo ja chamam os outros arquivos neceasarios para carregar
	// ou seja, eles chamam os menos dependentes que foram declarados dentro deles no shim
	['bootstrap','mbootstrap', 'musuarios','mtarefas'],
	//function para criar um modulo centralizador
	function (bootstrap,mbootstrap,musuarios,mtarefas){
		//necessario injetar todos os modulos declarados acima
		var app = angular.module('MinhaApp',['Usuarios','Tarefas','TBootstrap']);
		//para setar o atributo "ng-app" no documento escolhido
		angular.bootstrap(document,['MinhaApp']);
		return angular;
	}
	);