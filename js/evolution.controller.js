(function () {
    'use strict';
    angular.module('evolution.controller', ['ui.router', 'ui.bootstrap'])
        .controller('EvolutionController', ['$scope', '$rootScope', '$interval', EvolutionController]);

    function EvolutionController($scope, $rootScope, $interval) {
        var viz = 'http://opendatacyl.cartodb.com/api/v2/viz/ebbaa494-9c16-11e4-80c2-0e0c41326911/viz.json';
        var TILES_URL = 'https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png';
        var layer;
        var vm = this;
        vm.enableAnimation = enableAnimation;
        vm.disableAnimation = disableAnimation;
        vm.dates = ['09/01/14', '06/01/14', '03/01/14', '12/01/13', '09/01/13', '06/01/13', '03/01/13', '12/01/13', '09/01/13', '06/01/13', '03/01/13', '12/01/11', '09/01/11', '06/01/11', '03/01/11', '12/01/10', '09/01/10', '06/01/10', '03/01/10', '12/01/09', '09/01/09', '06/01/09', '03/01/09', '12/01/08', '09/01/08', '06/01/08', '03/01/08', '12/01/07', '09/01/07', '06/01/07', '03/01/07', '12/01/06', '09/01/06', '06/01/06', '03/01/06', '12/01/05', '09/01/05', '06/01/05', '03/01/05', '12/01/04', '09/01/04', '06/01/04', '03/01/04', '12/01/03', '09/01/03', '06/01/03', '03/01/03', '12/01/02', '09/01/02', '06/01/02', '03/01/02'].reverse();
        vm.value = vm.dates.length - 1;
        vm.date = vm.dates[vm.value];

        $rootScope.evolution = true;

        var unemployment_map = new L.Map('unemployment_map', {
            zoom: 7,
            center: PROVINCE_COORD['Palencia'],
            minZoom: 6,
            maxZoom: 8
        });

        //FIXME refactor this plz, podría hacer un timeout con el load, pero datos o mapa?

        $scope.$watch('$viewContentLoaded', function () {
            L.tileLayer(TILES_URL).addTo(unemployment_map);
            cartodb.createLayer(unemployment_map, viz).addTo(unemployment_map)
                .done(function (layerLoaded) {
                    layer = layerLoaded;
                    executeSQL(vm.value);
                });
        });

        $scope.$watch('evolution.value', function (value, oldValue) {
            if (value != null && value != oldValue) {
                executeSQL(value);
                var query = "SELECT * FROM empleo WHERE fecha = '" + vm.date + "' order by provincia ASC"
                layer.getSubLayer(0).setSQL(query);
            }
        });

        function executeSQL(value) {
            vm.date = vm.dates[value >= vm.dates.length ? 0 : value];
            var sql = new cartodb.SQL({user: 'opendatacyl'});
            var query = "SELECT * FROM empleo WHERE fecha = '" + vm.date + "' order by provincia ASC"
            sql.execute(query)
                .done(function (data) {
                    vm.unemployments = data;
                    $scope.$digest();
                })
                .error(function (errors) {
                    console.log("errors:" + errors);
                });
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

