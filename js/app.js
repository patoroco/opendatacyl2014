(function () {
    'use strict';
    angular.module('opendatacyl2014', ['ui.router', 'ui.bootstrap'
        , 'jobs.service'
    ])
        .config(['$stateProvider', '$urlRouterProvider', stateProvider])
        .controller('MainController', ['$scope', '$state',
            'jobsService'
            , MainController]);

    var api = 'http://178.62.198.195/api/';


    function MainController($scope, $state, jobsService) {
        var vm = this;

        vm.regions = ['Ávila', 'Burgos', 'León', 'Palencia', 'Salamanca', 'Segovia', 'Soria', 'Valladolid', 'Zamora'];
        navigator.geolocation.getCurrentPosition(location);
        vm.regionToSearch = 'Ávila';
        vm.search = search;

        jobsService.getAllJobs().success(function (data, status) {
            if (status == 200) {
                vm.lastJobs = data;
            }
        }).error(treatError);

        function location(location) {
            //FIXME procesar localización
            /*  alert(location.coords.latitude);
             alert(location.coords.longitude);
             alert(location.coords.accuracy);*/
        }

        function search() {
            jobsService.getJobsWithRegionAndText(vm.textToSearch, vm.regionToSearch).success(function (data, status) {
                if (status == 200) {
                    vm.newJobs = data;
                }
            }).error(treatError);
        }

        function treatError(data, status) {
            $state.go('error');
        }
    }

    function stateProvider($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider.state('error', {
            url: '/error/:statusError',
            templateUrl: 'error.html'
        }).state('jobs', {
            url: '/jobs',
            templateUrl: 'jobs.html'
        }).state('about', {
            url: '/about',
            templateUrl: 'about.html'
        }).state('evolution', {
            url: '/evolution',
            templateUrl: 'evolution.html'
        }).state('home', {
            url: '/home',
            templateUrl: 'index.html'
        }).state('detail', {
            url: '/detail',
            templateUrl: 'detail.html'
        });
        //FIXME baja y resto páginas
    }
})();