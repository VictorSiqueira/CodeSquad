var MyApp = angular.module('MyApp', []);

MyApp.controller('listaController', function ($scope) {
    $scope.tarefas = [
        {'nome': 'ir trabalhar', 'prioridade': 5},
        {'nome': 'ir a praia', 'prioridade': 1}
    ];
});

MyApp.directive('myTarefas', function () {
    return{
        restrict: " AEC", //A - atributes, E - elemento, C - classe, 3 juntos ou 1 de cada isso limita a forma como ele vai aparecer
        template: "Eu quero como {{tarefa.nome}} com prioridade {{tarefa.prioridade}}!"
    };
});