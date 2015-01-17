(function () {
    'use strict';
    angular.module('infrastructure.controller', ['ui.router'])
        .controller('InfrastructureController', ['$scope', 'parseService', '$q', '$rootScope', InfrastructureController]);

    function InfrastructureController($scope, parseService, $q, $rootScope) {
        var vm = this;
        vm.inactives = [];
        vm.xAxisTickFormat = xAxisTickFormat;
        vm.toolTipContentFunction = toolTipContentFunction;
        $rootScope.evolution = true;

        vm.infrastructure = [];
        parseService.getCSV("licitaciones.csv",
            ['Vivienda', 'Edificación', 'Obra civil'],
            ['#228C00', '#FF7F00', '#C92B26']).
            then(function (result) {
                vm.infrastructure = result;
            });


        function xAxisTickFormat() {
            return function (d) {
                return vm.infrastructure[0].text_x[d];
            }
        }

        function toolTipContentFunction() {
            return function (key, x, y, e, graph) {
                return '<p>' + y + ' (miles de euros) de ' + key + ' el ' + x + '</p>';
            }
        }

    }
})();

