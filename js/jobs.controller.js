(function () {
    'use strict';
    angular.module('jobs.controller', ['ui.router', 'ui.bootstrap', 'jobs.service'])
        .controller('JobsController', ['$state', '$stateParams', 'jobsService', JobsController])
        .controller('ViewJobController', ['$scope', '$state', 'jobsService', ViewJobController]);

    function JobsController($state, $stateParams, jobsService) {
        var vm = this;
        vm.when = $stateParams.when || 'whenever';
        vm.text = $stateParams.text;
        vm.region = $stateParams.region;

        jobsService.getJobsByRegionAndText(vm.region, vm.text, vm.when).success(function (data) {
            vm.jobs = data;
        }).error(treatError);
    }

    function ViewJobController($scope, $state, jobsService) {
        var vm = this;

        jobsService.getJobById().success(function (data, status) {
            if (status == 200) {
                vm.job = data[0];
            }
        });

        jobsService.getJobsByRegionAndText(vm.region, vm.text, vm.when).success(function (data) {
            vm.jobs = data;
        }).error(treatError);
    }

    function treatError(data, status) {
        $state.go('error');
    }

})();