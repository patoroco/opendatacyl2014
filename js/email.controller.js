(function () {
    'use strict';
    angular.module('email.controller', ['ui.router', 'ui.bootstrap', 'email.service'])
        .controller('EmailController', ['$scope', '$stateParams', 'emailService', '$rootScope', EmailController]);

    function EmailController($scope, $stateParams, emailService, $rootScope) {
        var vm = this;
        vm.sendEmails = sendEmails;
        vm.sendContactEmail = sendContactEmail;
        vm.unsubscribe = unsubscribe;
        vm.email = $stateParams.email || $scope.email;

        function sendEmails() {
            if (vm.email) {
                var text = $rootScope.text;
                var region = $rootScope.region;
                emailService.sendEmailWithCriteria(vm.email, region, text).success(function (data, status) {
                    vm.sent = 'Se ha apuntado a las alertas de nuevas ofertas' + (text ? (' de ' + text) : '') + (region ? (' para la provincia ' + region) : '');
                }).error(function (data, status) {
                    vm.fail = 'No se pudo realizar la operación en este momento. Inténtelo más tarde';
                });
            }
        }

        function sendContactEmail() {
            if (vm.email && vm.text && vm.name) {
                emailService.sendContactEmail(vm.email, vm.name, vm.text).success(function (data, status) {
                    vm.sent = 'Has enviado tu mensaje correctamente';
                }).error(function (data, status) {
                    vm.fail = 'No se pudo realizar la operación en este momento. Inténtelo más tarde';
                });
            }
        }

        function unsubscribe() {
            if (vm.email) {
                emailService.unsubscribe(vm.email, vm.text).success(function (data, status) {
                    vm.sent = 'Te has dado de baja correctamente';
                }).error(function (data, status) {
                    vm.fail = 'No se pudo realizar la operación en este momento. Inténtelo más tarde';
                });
            }
        }
    }

})();