(function () {
    'use strict';
    angular.module('poblation.controller', ['ui.router'])
        .controller('PoblationController', ['$scope', 'parseService', '$q', '$rootScope', PoblationController]);

    function PoblationController($scope, parseService, $q, $rootScope) {
        var vm = this;
        vm.toolTipContentFunction = toolTipContentFunction;
        vm.xAxisPyramidTickFormat = xAxisPyramidTickFormat;
        vm.yAxisPyramidTickFormat = yAxisPyramidTickFormat;
        vm.toolTipContentFunctionPyramid = toolTipContentFunctionPyramid;
        $rootScope.evolution = true;

        parseService.getCSV("población - hombres.csv",
            ['1996', '1998', '2000', '2002', '2004', '2006', '2008', '2010', '2012', '2013']
        ).then(function (result) {
                vm.men = result;
            });

        parseService.getCSV("población - mujeres.csv",
            ['1996', '1998', '2000', '2002', '2004', '2006', '2008', '2010', '2012', '2013']
        ).then(function (result) {
                vm.women = result;
            });

        parseService.getCSV("piramide.csv",
            ['Hombres', "Mujeres"]
        ).then(function (result) {
                vm.all = result;
            });

        function toolTipContentFunction() {
            return function (key, x, y, e, graph) {
                return '<p>' + parseInt(y) + ' personas de ' + x + ' años</p>';
            }
        }

        function toolTipContentFunctionPyramid() {
            return function (key, x, y, e, graph) {
                return '<p>' + parseInt(y) + ' ' + key + ' de ' + x + ' años</p>';
            }
        }

        function xAxisPyramidTickFormat() {
            return function (d) {
                return vm.all[0].text_x[d];
            }
        }

        function yAxisPyramidTickFormat() {
            return function (d) {
                return d < 0 ? -d : d;
            }
        }
    }
})();

