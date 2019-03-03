import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Fill, Stroke, Style, Text} from 'ol/style.js';
import {ZoomSlider} from 'ol/control.js';
import OSM from 'ol/source/OSM';

(function() {
  const target = document.getElementById('opendig-map');

  // Source URLs
  const urls = {
    finds: target.dataset.finds,
    contexts: target.dataset.contexts,
    trenches: target.dataset.trenches
  };

  // Page controls
  const dom = {
    checkboxes: {
      finds: document.getElementById('opendig-map-toggle-finds'),
      contexts: document.getElementById('opendig-map-toggle-contexts'),
      trenches: document.getElementById('opendig-map-toggle-trenches')
    }
  };

  // Styles
  var labelStyle = new Style({
    text: new Text({
      font: '12px Calibri,sans-serif',
      overflow: true,
      fill: new Fill({
        color: '#000'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 3
      })
    })
  });
  var polygonStyle = new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.6)'
    }),
    stroke: new Stroke({
      color: '#319FD3',
      width: 1
    })
  });
  var style = [polygonStyle, labelStyle];

  // Create Layers
  var layers = [
    new TileLayer({
      source: new OSM()
    })
  ];

  // Finds
  if (urls.finds) {
    const layer = new VectorLayer({
      // Old instantiation moved to countriesSource
      source: new VectorSource({
        url: urls.finds,
        format: new GeoJSON()
      }),
      style: function(feature) {
        labelStyle.getText().setText(feature.get('name'));
        return style;
      },
      declutter: true
    });
    dom.checkboxes.finds.addEventListener('click', function() {
      layer.setVisible(!layer.getVisible());
    });
    layers.push(layer);
  }

  // Contexts
  if (urls.contexts) {
    const layer = new VectorLayer({
      // Old instantiation moved to countriesSource
      source: new VectorSource({
        url: urls.contexts,
        format: new GeoJSON()
      }),
      style: function(feature) {
        labelStyle.getText().setText(feature.get('name'));
        return style;
      },
      declutter: true
    });
    dom.checkboxes.contexts.addEventListener('click', function() {
      layer.setVisible(!layer.getVisible());
    });
    layers.push(layer);
  }

  // Trenches
  if (urls.trenches) {
    const layer = new VectorLayer({
      // Old instantiation moved to countriesSource
      source: new VectorSource({
        url: urls.trenches,
        format: new GeoJSON()
      }),
      style: new Style({
        stroke: new Stroke({
          color: "blue",
          width: 2
        })
      }),
      declutter: true
    });
    dom.checkboxes.trenches.addEventListener('click', function() {
      layer.setVisible(!layer.getVisible());
    });
    layers.push(layer);
  }

  // Map
  var map = new Map({
    target: target,
    layers: layers,
    view: new View({
      center: [0, 0],
      zoom: 3
    })
  });

  // Add zoom slider control
  var zoomslider = new ZoomSlider();
  map.addControl(zoomslider);
})();
