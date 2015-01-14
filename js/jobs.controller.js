(function () {
    'use strict';
    angular.module('jobs.controller', ['ui.router', 'ui.bootstrap', 'jobs.service', 'date.service'])
        .controller('JobsController', ['$scope', '$rootScope', '$stateParams', 'jobsService', 'dateService', '$state', JobsController])
        .controller('ViewJobController', ['$scope', '$state', 'jobsService', '$rootScope', ViewJobController]);

    function JobsController($scope, $rootScope, $stateParams, jobsService, dateService, $state) {
        var vm = this;
        vm.when = $stateParams.when || 'whenever';
        vm.difficulty = difficulty;
        vm.showCallToAction = showCallToAction;
        vm.differenceBetweenDays = dateService.differenceBetweenDays;
        vm.pageChanged = pageChanged;

        $rootScope.region = $stateParams.region;
        $rootScope.text = $stateParams.text;

        $scope.$watch('jobsController.when', search);
        $rootScope.$watch('region', updateSearch('region'));
        $rootScope.$watch('text', updateSearch('text'));

        function search() {
            jobsService.getJobsByRegionAndText($rootScope.region, $rootScope.text, vm.when, vm.currentPage).success(function (data) {
                vm.jobs = data;
            }).error(treatError);

            jobsService.getJobsByRegionAndText($rootScope.region, $rootScope.text, vm.when).success(function (data) {
                vm.total = data[0] ? data[0]['total'] : 0;
            }).error(treatError);
        };

        function updateSearch(variable) {
            return function (newValue, oldValue) {
                if ($rootScope[variable] && newValue != oldValue) {
                    search();
                }
            };
        }

        function pageChanged() {
            search()
        }

        function showCallToAction(show) {
            $rootScope.callToAction = show;
        }
        function treatError(data, status) {
            $state.go('error');
        }
    }

    function ViewJobController($scope, $state, jobsService, $rootScope) {
        var vm = this;
        vm.difficulty = difficulty;

        jobsService.getJobById($state.params.id).success(function (data) {
            vm.job = data;

            searchByRegionAndText(data.provincia.toLowerCase(), data.titulo.toLowerCase());
        });

        function searchByRegionAndText(region, text) {
            jobsService.getJobsByRegionAndText(region, text).success(function (data) {
                vm.jobs = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].identificador != vm.job.identificador) {
                        vm.jobs.push(data[i]);
                    }
                }
                if (!vm.jobs.length && text) {
                    searchByRegionAndText(region);
                }
            }).error(treatError);
        }
        function treatError(data, status) {
            $state.go('error');
        }

    }



    function difficulty(job) {
        if (job.titulacion || job.minusvalia) {
            return ['Difícil', 'red'];
        } else if (job.requisitos_necesarios || job.procedimiento_de_seleccion) {
            return ['Media', 'orange'];
        } else {
            return ['Fácil', 'green'];
        }
    }



})();

