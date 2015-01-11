(function () {
    'use strict';
    angular.module('email.controller', ['ui.router', 'ui.bootstrap', 'email.service'])
        .controller('EmailController', ['$scope', '$stateParams', 'emailService', EmailController]);

    function EmailController($scope, $stateParams, emailService) {
        var vm = this;
        vm.sendEmails = sendEmails;
        vm.sendContactEmail = sendContactEmail;

        var text = $stateParams.text || $scope.text;
        var region = $stateParams.region  || $scope.region;

        console.log(region)

        function sendEmails() {
            if (vm.email) {
                //FIXME sacar region y texto
                emailService.sendEmailWithCriteria(vm.email, region, text).success(function (data, status) {
                    vm.joined = 'Se ha apuntado a las alertas de nuevas ofertas' + (text ? ' de ' + text : '') + (region ? 'para la provincia ' + region : '');
                }).error(function (data, status) {
                    vm.emailFailed = 'No se pudo realizar la operación en este momento. Inténtelo más tarde';
                });
            }
        }

        function sendContactEmail() {
            if (vm.email && vm.text && vm.name) {
                emailService.sendContactEmail(vm.email, vm.name, vm.message).success(function (data, status) {
                    vm.sent = 'Has enviado tu mensaje correctamente';
                }).error(function (data, status) {
                    vm.fail = 'No se pudo realizar la operación en este momento. Inténtelo más tarde';
                });
            }
        }

    }

})();