//para começar precisa criar um modulo
//sendo o primeiro parametro o nome do modulo que está na tag ng-app no html
// e o sendo os modulos que ele é dependente (Depence injectio)
// é opcional usar em variavel, da para extender .metodo()
var MyApp = angular.module('MyApp', []);

MyApp.controller('listaController', function ($scope) {
    
    //armazenado um json para ser percorrido pelo repeat
    $scope.tarefas = [
        {'nome' : 'ir trabalhar', 'prioridade': 5},
        {'nome' : 'ir a praia', 'prioridade': 1}
    ];
    
    $scope.adicionar = function() {
        //está chamando o t que está no escopo (html) para seta-lo em tarefas
        $scope.tarefas.push($scope.t);
        //zerando o conteudo de t
        $scope.t = '';
        
    }
    
    $scope.remover = function(i) {
        //splice remove sendo o primeiro parametro o indice, e o segundo parametro a quantidades de itens a serem removido a partir do indice
        $scope.tarefas.splice(i, 1);
        
    }
});