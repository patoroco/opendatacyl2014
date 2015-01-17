(function () {
    'use strict';
    angular.module('inactives.controller', ['ui.router'])
        .controller('InactivesController', ['$scope', 'parseService', '$q','$rootScope', InactivesController]);

    function InactivesController($scope, parseService, $q, $rootScope) {
        var vm = this;
        vm.inactives = [];
        vm.xAxisTickFormat = xAxisTickFormat;
        vm.toolTipContentFunction = toolTipContentFunction;
        $rootScope.evolution = true;

        parseService.getCSV("inactivos.csv",
            ['Estudiantes', 'Labores de hogar', 'Incapacitados', 'Jubilados', 'Otros'],
            ['#C92B26', '#228C00', '#888888', '#FF7F00', 'yellow'])
            .then(function (result) {
                vm.inactives = result;
            });

        function xAxisTickFormat() {
            return function (d) {
                return vm.inactives[0].text_x[d];
            }
        }

        function toolTipContentFunction() {
            return function (key, x, y, e, graph) {
                return '<p>' + y + ' (miles) de ' + key + ' el ' + x + '</p>';
            }
        }

    }
})();

