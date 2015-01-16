var CYLJOB_URL = "http://localhost:8000";
var VIZ_URL = 'http://opendatacyl.cartodb.com/api/v2/viz/81b7caf8-9c49-11e4-8bfa-0e018d66dc29/viz.json';
var TILES_URL = 'https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png';

var ZOOM_TO_POINT = 7;

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

function init_map()
{
    cartodb.createVis('header_map', VIZ_URL, {zoom: ZOOM_TO_POINT, center: PROVINCE_COORD['Palencia'], minZoom : 5, maxZoom: 10})
    .done(function(vis, layers) {
        map = vis.getNativeMap();
        grouped_layer = layers[1].getSubLayer(1);
        points_layer = layers[1].getSubLayer(2);

        points_layer.set({ 'interactivity': ['titulo', 'localidad', 'identificador'] });

        points_layer.on('featureClick', function(e, pos, latlng, data) {
            var absolute_path = CYLJOB_URL + "/#/jobDetail/" + data.identificador;
            //TODO: poner path del scope
            // cargar detalle data.identificador
            var scope = angular.element($("#region")).scope();
            console.log(scope);
            alert(scope);
        });

        vis.addOverlay({
            type: 'tooltip',
            template: '<h3>{{titulo}}</h3><p>{{localidad}}</p>',
            width: 200,
            position: 'bottom|right',
            layer: points_layer,
            interactivity: 'cartodb_id, titulo',
        });

        map.on('zoomend', function () {
            if (map.getZoom() > ZOOM_TO_POINT) {
                show_points_layer();
            } else {
                show_grouped_layer();
            }
        });

        show_points_layer();
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