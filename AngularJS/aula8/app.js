var MyApp = angular.module('MyApp', []);

MyApp.controller('listaController', function ($scope) {
    $scope.tarefas = [
        {'nome': 'ir trabalhar', 'prioridade': 5},
        {'nome': 'ir a praia', 'prioridade': 1}
    ];
});

MyApp.directive('myTarefas', function () {//vc pode nomear do jeito que vc quiser, mas é bom começar por ng
    return{ 
        template: "Eu quero como {{tarefa.nome}} com prioridade {{tarefa.prioridade}}!"
    };
});


//chamando template (code) de html externo
MyApp.directive('myTemplate', function () {
    return{
        //templateurl funciona apenas aloocado em um server
        //pois envia dados por Post
        templateUrl: function (elem, attr) {
            return 'template-' + attr.type + '.html';
        }
    };
});