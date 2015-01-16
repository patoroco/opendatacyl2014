(function () {
    'use strict';
    angular.module('employment.controller', ['ui.router', 'ui.bootstrap'])
        .controller('EmploymentController', ['$scope', EmploymentController]);

    function EmploymentController($scope) {
        var viz = 'http://opendatacyl.cartodb.com/api/v2/viz/81dddef4-9d17-11e4-864d-0e853d047bba/viz.json';
        var TILES_URL = 'https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png';
        var layer;
        var vm = this;
        vm.search = "'02-2001', '12-2007'";
        vm.searching = vm.hideWorkers ? 'establecimientos' : 'trabajadores';

        var employment_map = new L.Map('employment_map', {
            zoom: 8,
            center: PROVINCE_COORD['Valladolid'],
            minZoom: 7,
            maxZoom: 9
        });

        $scope.$watch('$viewContentLoaded', function () {
            L.tileLayer(TILES_URL).addTo(employment_map);
            cartodb.createLayer(employment_map, viz).addTo(employment_map).done(function (layerLoaded) {
                layer = layerLoaded;
                layer.getSubLayer(2).hide();
            })
        });

        $scope.$watch('employment.search', function (value, oldValue) {
            if (value != null && value != oldValue) {
                var query = "SELECT * FROM establecimientos_cotizaciones where sum IN (" + value + ")";
                layer.getSubLayer(vm.hideWorkers ? 2 : 0).setSQL(query);
            }
        });

        $scope.$watch('employment.hideWorkers', function (value, oldValue) {
            if (value != null && value != oldValue) {
                layer.getSubLayer(vm.hideWorkers ? 0 : 2).hide();
                layer.getSubLayer(vm.hideWorkers ? 2 : 0).show();
                vm.searching = vm.hideWorkers ? 'establecimientos' : 'trabajadores';
            }
        });



    }

})();

