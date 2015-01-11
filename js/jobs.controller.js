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
        vm.difficulty = difficulty;

        jobsService.getJobsByRegionAndText(vm.region, vm.text, vm.when).success(function (data) {
            vm.jobs = data;
        }).error(treatError);

    }

    function ViewJobController($scope, $state, jobsService) {
        var vm = this;
        vm.difficulty = difficulty;

        //FIXME revisar propiedades

        jobsService.getJobById().success(function (data, status) {
            vm.job = data[0];
        });

        jobsService.getJobsByRegionAndText(vm.region, vm.text, vm.when).success(function (data) {
            vm.jobs = data;
        }).error(treatError);
    }

    function treatError(data, status) {
        $state.go('error');
    }

    function difficulty(job) {
        if (job.titulacion || job.minusvalia) {
            return 'Difícil';
        } else if (job.requisitos_necesarios || job.procedimiento_de_seleccion) {
            return 'Media';
        } else {
            return 'Fácil';
        }
    }

})();