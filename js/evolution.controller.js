(function () {
    'use strict';
    angular.module('evolution.controller', ['ui.router', 'ui.bootstrap'])
        .controller('EvolutionController', ['$scope', '$rootScope', '$interval', EvolutionController]);

    function EvolutionController($scope, $rootScope, $interval) {
        var viz = 'http://opendatacyl.cartodb.com/api/v2/viz/ebbaa494-9c16-11e4-80c2-0e0c41326911/viz.json';
        var TILES_URL = 'https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png';
        var layer;

        //FIXME refactor this plz, podría hacer un timeout con el load, pero datos o mapa?

        var vm = this;
        vm.enableAnimation = enableAnimation;
        vm.disableAnimation = disableAnimation;
        vm.dates = [
            '01/09/2014', '01/06/2014', '01/03/2014', '01/12/2013', '01/09/2013', '01/06/2013', '01/03/2013', '01/12/2012',
            '01/09/2012', '01/06/2012', '01/03/2012', '01/12/2011', '01/09/2011', '01/06/2011', '01/03/2011', '01/12/2010',
            '01/09/2010', '01/06/2010', '01/03/2010', '01/12/2009', '01/09/2009', '01/06/2009', '01/03/2009', '01/12/2008',
            '01/09/2008', '01/06/2008', '01/03/2008', '01/12/2007', '01/09/2007', '01/06/2007', '01/03/2007', '01/12/2006',
            '01/09/2006', '01/06/2006', '01/03/2006', '01/12/2005', '01/09/2005', '01/06/2005', '01/03/2005', '01/12/2004',
            '01/09/2004', '01/06/2004', '01/03/2004', '01/12/2003', '01/09/2003', '01/06/2003', '01/03/2003', '01/12/2002',
            '01/09/2002', '01/06/2002', '01/03/2002'].reverse();
        vm.value = vm.dates.length - 1;
        vm.date = vm.dates[vm.value];

        $rootScope.evolution = true;

        var unemployment_map = new L.Map('unemployment_map', {
            zoom: 7,
            center: PROVINCE_COORD['Palencia'],
            minZoom: 6,
            maxZoom: 8
        });


        $scope.$watch('$viewContentLoaded', function () {
            L.tileLayer(TILES_URL).addTo(unemployment_map);
            cartodb.createLayer(unemployment_map, viz).addTo(unemployment_map)
                .done(function (layerLoaded) {
                    layer = layerLoaded;
                    executeSQL(createQuery());
                });
        });

        $scope.$watch('evolution.value', function (value, oldValue) {
            if (value != null && value != oldValue) {
                var query = createQuery();
                executeSQL(query);
                layer.getSubLayer(0).setSQL(query);
            }
        });

        function executeSQL(query) {
            var sql = new cartodb.SQL({user: 'opendatacyl'});
            sql.execute(query)
                .done(function (data) {
                    vm.unemployments = data;
                    $scope.$digest();
                })
                .error(function (errors) {
                    console.log("errors:" + errors);
                });
        }

        function createQuery() {
            vm.date = vm.dates[vm.value >= vm.dates.length ? 0 : vm.value];
            return "SELECT * FROM empleo WHERE fecha_truncada = '" + vm.date + "' order by provincia ASC";
        }

        function enableAnimation() {
            vm.interval = $interval(function () {
                vm.value = vm.value >= vm.dates.length ? 0 : (vm.value + 1);
            }, 1000);
        }

        function disableAnimation() {
            $interval.cancel(vm.interval);
        }
    }

})();

