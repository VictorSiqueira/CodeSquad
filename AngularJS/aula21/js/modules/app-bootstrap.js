//Não deixar modulos ligados um ao outro
//É recomendado criar um modulo para integrar eles
//Pois assim posso criar aqui , o que deve ficar disponivel globalmente
//Por exemplos as diretivas
//Pelo que entendi esse modulo faria o papel da camada B.O. do design MVC

//var MyApp = angular.module('MyApp',['Usuarios','Tarefas']);

var TBootstrap = angular.module('TBootstrap',[]);

TBootstrap.directive('tbBtn', [function (){
	return {
		restrict: 'A',
		link: function($scope, elm, attr){
			elm.addClass('btn btn-'+attr.tbBtn);//quando o atributo for separado por hifen coloque ele com camel case
			if (attr.tbBtnSize) {
				elm.addClass('btn-'+attr.tbBtnSize);
			}
		}
	};
}]);

TBootstrap.directive('tbForm',[ function () {
	return {
		restrict: 'A',
		link: function ($scope, elm, attr){
			elm.find('input')// no Angular SQlite o find é limitado a procrar apenas tags
				.addClass('form-control');// no Angular SQlite o find é limitado a procrar apenas tags
		}
	}
}]);

