(function () {
    'use strict';
    angular.module('jobs.controller', ['ui.router', 'ui.bootstrap', 'jobs.service'])
        .controller('JobsController', ['$scope', '$state', 'jobsService', JobsController])
        .controller('ViewJobController', ['$scope', '$state', 'jobsService', ViewJobController]);

    function JobsController($scope, $state, jobsService) {
        var vm = this;

        jobsService.getJobsByRegionAndText($state.params.text, $state.params.region).success(function (data, status) {
            if (status == 200) {
                vm.jobs = data;
            }
        })
    }

    function ViewJobController($scope, $state, jobsService) {
        var vm = this;

        jobsService.getJobById().success(function (data, status) {
            if (status == 200) {
                vm.job = data[0];
            }
        })
    }

})();