// osmLeaf.js NACIS Workshop OSM Example

(function($){

	var osmtiles = L.tileLayer( // open street map tiles via MapQuest Open
		'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg',
		{ subdomains: '1234',
			attribution: 'Data, imagery and map information provided by <a href="http://open.mapquest.co.uk" target="_blank">MapQuest</a> and © <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>'
	});
	var sattiles = L.tileLayer( // NASA satellite tiles via MapQuest Open
		'http://oatile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg',
		{ subdomains: '1234',
			attribution: 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
	});
	var weather = L.tileLayer.wms( // Composite Weather Radar via Iowa State (WMS)
		"http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi",
		{ layers: 'nexrad-n0r-900913',
	    format: 'image/png',
	    transparent: true,
	    opacity: 0.4,
	    attribution: "Weather data © 2012 IEM Nexrad"
	});

	function onEachFeature(feature, layer) {
    // grabs the property "name" and uses it for the popup
    if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name);
    }}

	var cafemarkers = {
	    radius: 6,
	    fillColor: "#ff7800",
	    color: "#000",
	    weight: 1,
	    opacity: 1,
	    fillOpacity: 0.8
	};
	var cafelayer = L.geoJson(cafes, {
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, cafemarkers);
		},
		onEachFeature: onEachFeature
	}); 

	var barmarkers = {
	    radius: 6,
	    fillColor: "#ff33ff",
	    color: "#000",
	    weight: 1,
	    opacity: 1,
	    fillOpacity: 0.8
	};
	var barlayer = L.geoJson(bars, {
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, barmarkers);
		},
		onEachFeature: onEachFeature
	});

	var defaultlayers = [osmtiles, weather];

	var layercontrol = L.control.layers(
		{ street: osmtiles, satelite: sattiles },
		{ radar: weather, cafes: cafelayer, bars: barlayer}
	);

	var scalecontrol = L.control.scale();

	var attributioncontrol = L.control.attribution({ prefix: false });
	$.each(defaultlayers, function(i, v) {
		attributioncontrol.addAttribution(v.getAttribution()); // not documented
	});
	
	$(document).ready(function() {

		var map = L.map('map_div', {
			center: [45.521115,-122.673383],
			zoom: 14,
			zoomAnimation: false, // jump to new zoom
			attributionControl: false,
			layers: defaultlayers
		});
		map.addControl(layercontrol).addControl(attributioncontrol).addControl(scalecontrol);

	});

}(jQuery));