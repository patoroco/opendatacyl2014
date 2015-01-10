(function () {
    'use strict';
    angular.module('jobs.controller', ['ui.router', 'ui.bootstrap', 'jobs.service'])
        .config(['$stateProvider', '$urlRouterProvider', stateProvider])
        .controller('MainController', ['$scope', '$state', 'jobsService', JobsController]);

    function JobsController($scope, $state, jobsService) {
        var vm = this;

        //jobsService.getJobsWithRegionAndText()
    }

    function stateProvider($stateProvider, $urlRouterProvider) {
        $stateProvider.state('error', {
            url: '/error/:statusError',
            templateUrl: 'error.html'
        })
    }
})();