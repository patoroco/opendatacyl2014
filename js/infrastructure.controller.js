(function () {
    'use strict';
    angular.module('infrastructure.controller', ['ui.router'])
        .controller('InfrastructureController', ['$scope', 'parseService', '$q', '$rootScope', InfrastructureController]);

    function InfrastructureController($scope, parseService, $q, $rootScope) {
        var vm = this;
        vm.xAxisTickFormat = xAxisTickFormat;
        vm.yAxisTickFormat = yAxisTickFormat;
        vm.toolTipContentFunction = toolTipContentFunction;
        $rootScope.evolution = true;

        parseService.getCSV("licitaciones.csv",
            ['Vivienda', 'Edificación', 'Obra civil']
        ).then(function (result) {
                vm.infrastructure = result;
            });

        function yAxisTickFormat() {
            return function (d) {
                return parseInt(d / 1000);
            }
        }

        function xAxisTickFormat() {
            return function (d) {
                return vm.infrastructure[0].text_x[d];
            }
        }

        function toolTipContentFunction() {
            return function (key, x, y, e, graph) {
                return '<p>' + parseInt(y) + ' millones de euros de ' + key + ' el ' + x + '</p>';
            }
        }

    }
})();

