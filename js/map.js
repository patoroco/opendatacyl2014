var map;

var SQL_API_URL = 'https://jorge.cartodb.com/api/v2/sql';
var VIZ_URL = 'http://jorge.cartodb.com/api/v2/viz/7966eb1c-998e-11e4-b96f-0e4fddd5de28/viz.json';

var PROVINCE_COORD = {
	'Ávila': [40.654347222222, -4.6962222222222],
	'Burgos': [42.35,-3.69],
	'León': [42.598888888889,-5.5669444444444],
	'Palencia': [42.016666666667,-4.5333333333333],
	'Salamanca': [40.965,-5.6638888888889],
	'Segovia': [41.166667, -4],
	'Soria': [41.666666666667, -2.6666666666667],
	'Valladolid': [41.583333, -4.666667],
	'Zamora': [41.75, -6]
};

function init_map() {
    cartodb.createVis('header_map', VIZ_URL)
        .done(function (vis, layers) {
            map = vis.getNativeMap();
            map.setView(PROVINCE_COORD['Palencia'], 7, {pan: {animate: true, duration: 0.5, easeLinearity: 0.5}});
            navigator.geolocation.getCurrentPosition(current_position_updated);

			layers[1].setInteraction(true);
			layers[1].setInteractivity(['nom_prov']);
			layers[1].on('featureClick', function(e, latlng, pos, data, subLayerIndex) {
				var selected_province = $("#region option").filter(function() {
					return $(this).text().toLowerCase() == data.nom_prov.toLowerCase();
				}).text();

				var model = angular.element($('#region')).scope();
				model.mainController.regionToSearch = selected_province;
				model.$apply();
		});
	});
}

function current_position_updated(location) {
	var new_position = [location.coords.latitude, location.coords.longitude];
	// map.setView(new_position, map.getZoom(), {pan: {animate: true, duration: 0.5, easeLinearity: 0.5}});
}

function center_in_province(province) {
	map.setView(PROVINCE_COORD[province], 9, {pan: {animate: true, duration: 0.5, easeLinearity: 0.5}});
}