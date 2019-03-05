import 'ol/ol.css';
import {Map, View} from 'ol';
import GroupLayer from 'ol/layer/Group';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Fill, Stroke, Style, Text, Circle} from 'ol/style';
import {defaults as defaultControls} from 'ol/control';
import {ZoomSlider, ScaleLine, MousePosition, Attribution} from 'ol/control';
import {fromLonLat} from 'ol/proj';
import {format as coordinateFormat} from 'ol/coordinate';

import {createBasemapGrau} from './basemap.js';
import {createBasemapOrtho} from './basemap.js';
import {createBasemapOberflaeche} from './basemap.js';
import {createBasemapGelaende} from './basemap.js';

import {pointStyle, polygonStyle, surveysStyle} from './style.js';

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
    this.control = document.getElementById('arxquest-map-toggle-' + name);
    this.style = style;
  }

  var inputs = [
    new LayerInput('surveys', surveysStyle),
    new LayerInput('trenches', polygonStyle),
    new LayerInput('sections', polygonStyle),
    new LayerInput('objects', polygonStyle),
    new LayerInput('contexts', polygonStyle),
    new LayerInput('finds', pointStyle),
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

  var radios = document.getElementsByName('basemap');
  radios.forEach(function(control) {
    control.addEventListener('change', function() {
      layers[0].getLayers().forEach(function(layer) {
        layer.setVisible(false);
        console.log(layer.name, control.value, control.checked);
        if (layer.name == control.value && control.checked) {
          layer.setVisible(true);
        }
      });
    });
  });

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

  // View
  var view = new View({
    center: fromLonLat([16.073, 48.24735]),
    zoom: 18
  });

  var attribution = new Attribution({
    collapsible: true
  });

  // Map
  var map = new Map({
    target: target,
    controls: defaultControls({attribution: false}).extend([
      attribution,
      new ZoomSlider(),
      new ScaleLine(),
      new MousePosition({
        projection: 'EPSG:4326',
        coordinateFormat: function(coordinate) {
          return coordinateFormat(coordinate, '<div>{x}, {y}</div>', 6);
        }
      })
    ]),
    layers: layers,
    view: view,
  });

})();
