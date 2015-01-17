(function () {
    'use strict';
    angular.module('jobs.controller', ['ui.router', 'ui.bootstrap', 'jobs.service', 'date.service'])
        .controller('JobsController', ['$scope', '$rootScope', '$stateParams', 'jobsService', 'dateService', '$state', JobsController])
        .controller('ViewJobController', ['$scope', '$state', 'jobsService', '$rootScope', '$sce', ViewJobController]);

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
        $rootScope.evolution = false;


        function search() {
            var page = vm.currentPage ? (vm.currentPage - 1) * 10 : 0;
            jobsService.getJobsByRegionAndText($rootScope.region, $rootScope.text, vm.when, page).success(function (data) {
                vm.jobs = data;
            }).error(treatError);

            jobsService.getJobsByRegionAndText($rootScope.region, $rootScope.text, vm.when).success(function (data) {
                vm.total = data[0] ? data[0]['total'] : 0;
            }).error(treatError);
        };

        function updateSearch(variable) {
            return function (newValue, oldValue) {
                if (($rootScope[variable] && newValue != oldValue) || (oldValue && !newValue)) {
                    search();
                }
            };
        }

        function pageChanged() {
            search()
        }

        function showCallToAction(home) {
            $rootScope.callToAction = home;
            vm.when = home ? 'week' : 'whenever';
        }

        function treatError(data, status) {
            $state.go('error');
        }
    }

    function ViewJobController($scope, $state, jobsService, $rootScope, $sce) {
        var vm = this;
        vm.viewDifficulty = viewDifficulty;
        vm.showCallToAction = showCallToAction;
        $rootScope.evolution = false;

        jobsService.getJobById($state.params.id).success(function (data) {
            vm.job = data;
            vm.job.descripcion =
                $sce.trustAsHtml(vm.job.descripcion);

            searchByRegionAndText(data.provincia ? data.provincia.toLowerCase() : '', data.titulo.toLowerCase());
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

        function viewDifficulty() {
            return difficulty(vm.job);
        }

        function showCallToAction(home) {
            $rootScope.callToAction = home;
            vm.when = home ? 'week' : 'whenever';
        }
    }


    function difficulty(job) {
        if (job) {
            if (job.titulacion || job.minusvalia) {
                return ['Difícil', 'red'];
            } else if (job.requisitos_necesarios || job.procedimiento_de_seleccion) {
                return ['Media', 'orange'];
            } else {
                return ['Fácil', 'green'];
            }
        }
    }


})();

