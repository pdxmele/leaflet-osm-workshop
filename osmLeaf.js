// osmLeaf.js Code to start from for OSM section - GIS in Action Workshop

(function($){

  var osmtiles = L.tileLayer( // open street map tiles via MapQuest Open
    'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg',
    { subdomains: '1234',
      attribution: '<a href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA 2.0</a> <a href="http://open.mapquest.com" target="_blank">MapQuest</a>, &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
  });
  var sattiles = L.tileLayer( // NASA satellite tiles via MapQuest Open
    'http://oatile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg',
    { subdomains: '1234',
      attribution: '<a href="http://onearth.jpl.nasa.gov" target="_blank">NASA/JPL-Caltech</a> and <a href="http://www.fsa.usda.gov/FSA/apfoapp?area=home&subject=prog&topic=nai" target="_blank">U.S. Depart. of Agriculture, Farm Service Agency</a>'
  });
  var weather = L.tileLayer.wms( // Composite Weather Radar via Iowa State (WMS)
    "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi",
    { layers: 'nexrad-n0r-900913',
      format: 'image/png',
      transparent: true,
      opacity: 0.4,
      attribution: "Weather data &copy; 2012 IEM Nexrad"
  });
  var streetoverlay = L.tileLayer(
    'http://otile{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png',
    { subdomains: '1234',
      attribution: '<a href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA 2.0</a> <a href="http://open.mapquest.com" target="_blank">MapQuest</a>, &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
  });

  var defaultlayers = [osmtiles];

  var layercontrol = L.control.layers(
    { street: osmtiles, satelite: sattiles },
    { radar: weather, streets: streetoverlay }
  );

  var scalecontrol = L.control.scale();

  var attributioncontrol = L.control.attribution({ prefix: false });
  $.each(defaultlayers, function(i, v) {
    attributioncontrol.addAttribution(v.getAttribution()); // not documented
  });
  
  $(document).ready(function() {

    var map = L.map('map_div', {
      center: [45.5891, -122.594],
      zoom: 7,
      attributionControl: false,
      layers: defaultlayers
    });
    map.addControl(layercontrol).addControl(attributioncontrol).addControl(scalecontrol);

  });

}(jQuery));