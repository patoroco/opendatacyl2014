(function () {
    'use strict';
    angular.module('opendatacyl2014', ['ui.router', 'ui.bootstrap', 'jobs.service', 'jobs.controller', 'email.service', 'email.controller'])
        .config(['$stateProvider', '$urlRouterProvider', stateProvider])
        .config(["$locationProvider", function ($locationProvider) {
            $locationProvider.html5Mode(true);
        }])
        .controller('MainController', ['$scope', '$state', MainController]);

    var api = 'http://178.62.198.195/api/';

    //FIXME * mapa de cartodb

    //FIXME * llamadas de backend
    //TODO Call To Action
    //TODO allow links in new window
    //TODO revisar maquetacion
    //TODO paginador

    //FIXME * emails
    //FIXME * estadisticas

    //TODO dominio


    function MainController($rootScope, $state) {
        var vm = this;
        vm.regions = ['Ávila', 'Burgos', 'León', 'Palencia', 'Salamanca', 'Segovia', 'Soria', 'Valladolid', 'Zamora'];
        vm.search = search;

        $rootScope.$watch('region', function (data) {
            if (data) {
                center_in_province(data);
            }
        });

        function search() {
            $state.go('jobs', {region: $rootScope.region, text: $rootScope.text});
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