(function () {
    'use strict';
    angular.module('evolution.controller', ['ui.router', 'ui.bootstrap'])
        .controller('EvolutionController', ['$scope', '$stateParams', EvolutionController]);

    function EvolutionController($scope, $stateParams) {
        var vm = this;


        $scope.$watch('$viewContentLoaded', function () {
            var map = new L.Map('unemployment_map', {
                zoom: 7,
                center: PROVINCE_COORD['Palencia'],
                minZoom: 5,
                maxZoom: 10
            });

            cartodb.createLayer(map, {
                user_name: 'opendatacyl',
                type: 'cartodb',
                sublayers: [{
                    sql: "SELECT * FROM empleo WHERE fecha = '09/01/14'",
                    cartocss: cartocss
                }]
            }).addTo(map)
                .done(function (layer) {
                    $scope.$watch('evolution.value', function (value, oldValue) {
                        if (value && value != oldValue) {
                            vm.date = vm.dates[value >= vm.dates.length ? 0 : value];
                            layer.getSubLayer(0).setSQL("SELECT * FROM empleo WHERE fecha = '" + vm.date + "'");
                        }
                    });

                });

        });

        vm.dates = ['09/01/14', '06/01/14', '03/01/14', '12/01/13', '09/01/13', '06/01/13', '03/01/13', '12/01/13', '09/01/13', '06/01/13', '03/01/13', '12/01/11', '09/01/11', '06/01/11', '03/01/11', '12/01/10', '09/01/10', '06/01/10', '03/01/10', '12/01/09', '09/01/09', '06/01/09', '03/01/09', '12/01/08', '09/01/08', '06/01/08', '03/01/08', '12/01/07', '09/01/07', '06/01/07', '03/01/07', '12/01/06', '09/01/06', '06/01/06', '03/01/06', '12/01/05', '09/01/05', '06/01/05', '03/01/05', '12/01/04', '09/01/04', '06/01/04', '03/01/04', '12/01/03', '09/01/03', '06/01/03', '03/01/03', '12/01/02', '09/01/02', '06/01/02', '03/01/02'];
    }


    var cartocss = '#empleo{ polygon-fill: #FFFFB2; polygon-opacity: 0.8; line-color: #FFF; line-width: 1; line-opacity: 1; } #empleo [ paro <= 26.7605633802817] { polygon-fill: #B10026; } #empleo [ paro <= 23.5609103078983] { polygon-fill: #E31A1C; } #empleo [ paro <= 22.4755700325733] { polygon-fill: #FC4E2A; } #empleo [ paro <= 21.5789473684211] { polygon-fill: #FD8D3C; } #empleo [ paro <= 18.0868609125893] { polygon-fill: #FEB24C; } #empleo [ paro <= 16.9300225733634] { polygon-fill: #FED976; } #empleo [ paro <= 15.8478605388273] { polygon-fill: #FFFFB2; }';




})();

