var map;

var SQL_API_URL = 'https://jorge.cartodb.com/api/v2/sql';
var VIZ_URL = 'http://jorge.cartodb.com/api/v2/viz/7966eb1c-998e-11e4-b96f-0e4fddd5de28/viz.json';

function init_map() {
    cartodb.createVis('header_map', VIZ_URL)
    .done(function(vis, layers) {
        map = vis.getNativeMap();
    });
}

function change_center(lat_center, lon_center) {
    map.panTo({lat: lat_center, lng: lon_center});
}