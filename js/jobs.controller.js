(function () {
    'use strict';
    angular.module('jobs.controller', ['ui.router', 'ui.bootstrap', 'jobs.service'])
        .controller('JobsController', ['$state', '$stateParams', 'jobsService', 'emailService', JobsController])
        .controller('ViewJobController', ['$scope', '$state', 'jobsService', ViewJobController]);

    function JobsController($state, $stateParams, jobsService, emailService) {
        var vm = this;
        vm.sendEmails = sendEmails;
        vm.when = $stateParams.when || 'whenever';

        var text = $stateParams.text;
        var region = $stateParams.text;

        if (text || region || vm.when) {
            jobsService.getJobsByRegionAndText(region, text, vm.when).success(function (data, status) {
                vm.jobs = data;
            }).error(function (data, status) {
                $state.go('error');
            });
        } else {
            jobsService.getAllJobs().success(function (data, status) {
                if (status == 200) {
                    vm.jobs = data;
                }
            }).error(treatError);
        }

        function sendEmails() {
            if (vm.email) {
                emailService.sendEmailWithCriteria(vm.email, region, text).success(function (data, status) {
                    vm.joined = 'Se ha apuntado a las alertas de nuevas ofertas' + (text ? ' de ' + text : '') + (region ? 'para la provincia ' + region : '');
                }).error(function (data, status) {
                    vm.emailFailed = 'No se pudo realizar la operación en este momento. Inténtelo más tarde';
                });
            }
        }
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