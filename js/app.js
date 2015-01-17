(function () {
    'use strict';
    angular.module('opendatacyl2014', ['ui.router', 'ui.bootstrap', 'jobs.service', 'jobs.controller', 'email.service',
        'email.controller', 'date.service', 'evolution.controller', 'ui.slider', 'hosts.service', 'employment.controller'
        , 'inactives.controller', 'infrastructure.controller', 'unemployment.controller', 'nvd3ChartDirectives', 'parse.service'])
        .config(['$stateProvider', '$urlRouterProvider', stateProvider])
        .config(["$locationProvider", function ($locationProvider) {
            $locationProvider.html5Mode(false)
        }])
        .controller('MainController', ['$scope', '$state', 'dateService', MainController]).filter('capitalize', function () {
            return function (input, all) {
                return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
            }
        });

    var api = 'http://178.62.198.195/api/';

    //TODO ui-router y html5mode (allow links in new window)

    function MainController($rootScope, $state, dateService) {
        var vm = this;
        vm.regions = ['Ávila', 'Burgos', 'León', 'Palencia', 'Salamanca', 'Segovia', 'Soria', 'Valladolid', 'Zamora'];
        vm.search = search;
        vm.differenceBetweenDays = dateService.differenceBetweenDays;
        vm.goToDetail = goToDetail;

        $rootScope.evolution = false;

        $rootScope.$watch('region', function (data) {
            if (data) {
                center_in_province(data);
            }
        });

        function search() {
            $state.go('jobs', {region: $rootScope.region, text: $rootScope.text});
        }

        function goToDetail(id) {
            $state.go('jobDetail', {id: id})
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
        }).state('evolution_unemployment', {
            url: '/evolution_unemployment',
            templateUrl: 'pages/evolution_unemployment.html'
        }).state('evolution_inactives', {
            url: '/evolution_inactives',
            templateUrl: 'pages/evolution_inactives.html'
        }).state('evolution_infrastructure', {
            url: '/evolution_infrastructure',
            templateUrl: 'pages/evolution_infrastructure.html'
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