(function () {
    'use strict';
    angular.module('opendatacyl2014', ['ui.router', 'ui.bootstrap'])
        .config(['$stateProvider', '$urlRouterProvider', stateProvider])
        .controller('MainController', ['$scope', '$state', MainController]);


    function MainController($scope, $state) {
        var vm = this;
        vm.hola = 'HOLA!';
    }

    function stateProvider($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider.state('error', {
            url: '/error/:statusError',
            templateUrl: 'error.html'
        });
    }
})();