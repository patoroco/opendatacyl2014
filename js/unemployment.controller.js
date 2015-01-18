(function () {
    'use strict';
    angular.module('unemployment.controller', ['ui.router'])
        .controller('UnemploymentController', ['$scope', 'parseService', '$q', '$rootScope', UnemploymentController]);

    function UnemploymentController($scope, parseService, $q, $rootScope) {
        var vm = this;
        vm.xAxisTickFormat = xAxisTickFormat;
        vm.yAxisTickFormat = yAxisTickFormat;
        vm.xAxisTickFormatUnemployed = xAxisTickFormatUnemployed;
        vm.toolTipContentFunction = toolTipContentFunction;
        $rootScope.evolution = true;

        parseService.getCSV("activos.csv",
            ['Activos - Hombres', 'Activos - Mujeres', 'Inactivos - Hombres', 'Inactivos - Mujeres'], [false, false, true, true]
        ).then(function (result) {
                vm.actives = result;
            });

        parseService.getCSV("parados.csv",
            ['Activos (V)', 'Activos (M)', 'Ocupados (V)', 'Ocupados (M)', 'Parados (V)', 'Parados (M)', 'Parados primer empleo (V)', 'Parados primer empleo (M)',]
        ).then(function (result) {
                vm.unemployed = result;
            });


        function yAxisTickFormat() {
            return function (d) {
                return parseInt(d / 1000);
            }
        }

        function xAxisTickFormat() {
            return function (d) {
                return d % 2 == 0 ? vm.actives[0].text_x[d] : '';
            }
        }

        function xAxisTickFormatUnemployed() {
            return function (d) {
                return vm.unemployed[0].text_x[d];
            }
        }

        function toolTipContentFunction() {
            return function (key, x, y, e, graph) {
                return '<p>' + parseInt(y) + ' miles de personas en ' + key + ' el ' + x + '</p>';
            }
        }
    }
})();

