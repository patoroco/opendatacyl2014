(function () {
    'use strict';
    angular.module('unemployment.controller', ['ui.router'])
        .controller('UnemploymentController', ['$scope', 'parseService', '$q', '$rootScope', UnemploymentController]);

    function UnemploymentController($scope, parseService, $q, $rootScope) {
        var vm = this;
        vm.inactives = [];
        $rootScope.evolution = true;

    }
})();

