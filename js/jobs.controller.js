(function () {
    'use strict';
    angular.module('jobs.controller', ['ui.router', 'ui.bootstrap', 'jobs.service'])
        .controller('JobsController', ['$scope', '$rootScope', '$stateParams', 'jobsService', JobsController])
        .controller('ViewJobController', ['$scope', '$state', 'jobsService', ViewJobController]);

    function JobsController($scope, $rootScope, $stateParams, jobsService) {
        var vm = this;
        vm.when = $stateParams.when || 'whenever';
        vm.difficulty = difficulty;
        $rootScope.region = $stateParams.region;
        $rootScope.text = $stateParams.text;

        $scope.$watch('jobsController.when', search);
        $rootScope.$watch('region', search);
        $rootScope.$watch('text', search);

        function search() {
            jobsService.getJobsByRegionAndText($rootScope.region, $rootScope.text, vm.when).success(function (data) {
                vm.jobs = data;
            }).error(treatError);
        };

    }

    function ViewJobController($scope, $state, jobsService) {
        var vm = this;
        vm.difficulty = difficulty;

        //FIXME revisar propiedades

        jobsService.getJobById($state.params.id).success(function (data, status) {
            vm.job = data;
        });

        jobsService.getJobsByRegionAndText(vm.region, vm.text).success(function (data) {
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