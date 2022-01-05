import 'ol/ol.css';
import {Map, View} from 'ol';
import GroupLayer from 'ol/layer/Group';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Overlay from 'ol/Overlay';
import {defaults as defaultControls} from 'ol/control';
import {ZoomSlider, ScaleLine, MousePosition, Attribution} from 'ol/control';
import {defaults as defaultInteractions} from 'ol/interaction';
import {fromLonLat, toLonLat} from 'ol/proj';
import {toStringHDMS} from 'ol/coordinate';
import {format as coordinateFormat} from 'ol/coordinate';

// Basemap layer functions
import {createBasemapGrau} from './basemap.js';
import {createBasemapOrtho} from './basemap.js';
import {createBasemapOberflaeche} from './basemap.js';
import {createBasemapGelaende} from './basemap.js';

// Layer styles
import {findStyle, polygonStyle, contextStyle, trenchStyle, surveyStyle} from './style.js';

(function() {
  const target = document.getElementById('arxquest-map');

  // Skip if map already exists.
  if (target.getElementsByClassName('ol-viewport').length) {
    return;
  }

  console.log("Creating map...");
  const lang = target.getAttribute('lang');
  console.log("Map language: " + lang);

  function LayerInput(name, style) {
    this.url = target.getAttribute('data-' + name);
    this.control = document.getElementById('arxquest-toggle-' + name);
    this.style = style;
  }

  var inputs = [
    new LayerInput('surveys', surveyStyle),
    new LayerInput('trenches', polygonStyle),
    new LayerInput('sections', polygonStyle),
    new LayerInput('objects', polygonStyle),
    new LayerInput('contexts', contextStyle),
    new LayerInput('finds', findStyle),
  ];

  var layers = [
    new GroupLayer({
      title: 'Basemaps',
      layers: [
        createBasemapGrau(false),
        createBasemapOrtho(false),
        createBasemapOberflaeche(false),
        createBasemapGelaende(true),
      ]
    })
  ];

  // Create basemap layer switcher
  var radios = document.getElementsByName('arxquest-basemap');
  radios.forEach(function(control) {
    control.addEventListener('change', function() {
      layers[0].getLayers().forEach(function(layer) {
        layer.setVisible(false);
        if (layer.name == control.value && control.checked) {
          layer.setVisible(true);
        }
      });
    });
  });

  /**
   * Elements that make up the popup.
   */
  var container = document.getElementById('arxquest-popup');
  var popupLink = document.getElementById('ol-popup-link');
  var popupImg = document.getElementById('ol-popup-img');
  var popupTag = document.getElementById('ol-popup-tag');

  /**
   * Create an overlay to anchor the popup to the map.
   */
  var overlay = new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  });

  // Create layers
  inputs.forEach(function(input) {
    if (input.url) {
      console.log('adding layer ' + input.url);
      var layer = new VectorLayer({
        source: new VectorSource({
          url: input.url,
          format: new GeoJSON(),
          attributions: ['OpenData: <a href="http://burgried.at/">burgried.at</a>']
        }),
        style: input.style,
        declutter: false
      });
      if (input.control) {
        input.control.addEventListener('click', function() {
          layer.setVisible(!layer.getVisible());
        });
      }
      layers.push(layer);
    }
  });

  // Create view
  var view = new View({
    center: fromLonLat([16.073, 48.24735]),
    zoom: 18,
    minZoom: 12,
    maxZoom: 25
  });

  // Create map
  var map = new Map({
    target: target,
    controls: defaultControls({attribution: false}),
    interactions: defaultInteractions({mouseWheelZoom: false}),
    layers: layers,
    view: view,
    overlays: [overlay],
  });

  // Add additional controls
  map.addControl(new ZoomSlider());
  map.addControl(new ScaleLine());

  // Add mouse position indicator
  map.addControl(new MousePosition({
    projection: 'EPSG:4326',
    coordinateFormat: function(coordinate) {
      return coordinateFormat(coordinate, '<div>{x}, {y}</div>', 6);
    }
  }));

  // Add collapsible attributions
  map.addControl(new Attribution({
    collapsible: true
  }));

  // Add popup overlay handler
  map.on('singleclick', function(evt) {
    overlay.setPosition();
    container.setAttribute('style', 'display:none');
    var features = map.getFeaturesAtPixel(evt.pixel);
    if (features) {
      var feature = features[0];
      var coordinate = evt.coordinate;
      container.setAttribute('style', 'display:inherit');
      popupLink.setAttribute('href', feature.get('url'));
      popupLink.setAttribute('title', feature.get('title'));
      if (feature.get('thumbnail')) {
        popupImg.setAttribute('src', feature.get('thumbnail'));
      } else {
        popupImg.setAttribute('src', popupImg.getAttribute('data-fallback'));
      }
      popupTag.innerHTML = feature.get('title');
      overlay.setPosition(coordinate);
    }
  });

})();
