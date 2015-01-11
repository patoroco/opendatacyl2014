(function () {
    'use strict';
    angular.module('opendatacyl2014', ['ui.router', 'ui.bootstrap', 'jobs.service', 'jobs.controller', 'email.service', 'email.controller'])
        .config(['$stateProvider', '$urlRouterProvider', stateProvider])
        .controller('MainController', ['$scope', '$state', 'jobsService', MainController]);

    var api = 'http://178.62.198.195/api/';

    //FIXME * mapa de cartodb
    //FIXME * llamadas de backend

    //FIXME * estadisticas

    //FIXME * maquetar
    //FIXME * emails
    //FIXME dominio

    function MainController($scope, $state, jobsService) {
        var vm = this;

        vm.regions = ['Ávila', 'Burgos', 'León', 'Palencia', 'Salamanca', 'Segovia', 'Soria', 'Valladolid', 'Zamora'];

        vm.search = search;

        $scope.$watch('mainController.regionToSearch', function (data) {
        });



        function search() {
            $state.go('jobs', {region: vm.regionToSearch, text: vm.textToSearch});
        }
    }

    function stateProvider($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider.state('error', {
            url: '/error/:statusError',
            templateUrl: 'pages/error.html'
        }).state('jobs', {
            url: '/jobs?region&text&when',
            templateUrl: 'pages/jobs.html'
        }).state('about', {
            url: '/about',
            templateUrl: 'pages/about.html'
        }).state('evolution', {
            url: '/evolution',
            templateUrl: 'pages/evolution.html'
        }).state('home', {
            url: '/home',
            templateUrl: 'pages/home.html'
        }).state('jobDetail', {
            url: '/jobDetail/:id/:text',
            templateUrl: 'pages/jobDetail.html'
        }).state('unsubscribe', {
            url: '/unsubscribe/:email',
            templateUrl: 'pages/unsubscribe.html'
        });
    }
})();