var SQL_API_URL = 'https://jorge.cartodb.com/api/v2/sql';
var VIZ_URL = 'http://jorge.cartodb.com/api/v2/viz/7966eb1c-998e-11e4-b96f-0e4fddd5de28/viz.json';
var TILES_URL = 'https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png';

var PROVINCE_COORD = {
    'Ávila': [40.654347222222, -4.6962222222222],
    'Burgos': [42.35, -3.69],
    'León': [42.598888888889, -5.5669444444444],
    'Palencia': [42.016666666667, -4.5333333333333],
    'Salamanca': [40.965, -5.6638888888889],
    'Segovia': [41.166667, -4],
    'Soria': [41.666666666667, -2.6666666666667],
    'Valladolid': [41.583333, -4.666667],
    'Zamora': [41.75, -6]
};

var map;
var grouped_layer;
var points_layer;

function init_map() {
    map = new L.Map('header_map', {zoom: 7, center: PROVINCE_COORD['Palencia'], minZoom : 5, maxZoom: 10});
    L.tileLayer(TILES_URL).addTo(map);

    cartodb.createLayer(map, VIZ_URL)
        .addTo(map)
        .on('done', function (layer) {
            grouped_layer = layer.getSubLayer(1);
            points_layer = layer.getSubLayer(2);

            show_grouped_layer();
        });

    map.on('zoomend', function () {
        if (map.getZoom() > 7) {
            show_points_layer();
        } else {
            show_grouped_layer();
        }
    });
}

function show_grouped_layer() {
    grouped_layer.show();
    points_layer.hide();
}

function show_points_layer() {
    grouped_layer.hide();
    points_layer.show();
}

function current_position_updated(location) {
    var new_position = [location.coords.latitude, location.coords.longitude];
    map.setView(new_position, map.getZoom(), {pan: {animate: true, duration: 0.5, easeLinearity: 0.5}});
}

function center_in_province(province) {
    map.setView(PROVINCE_COORD[province], 9, {pan: {animate: true, duration: 0.5, easeLinearity: 0.5}});
}