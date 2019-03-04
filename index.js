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
  const target = document.getElementById('arxquest-map');

  // Skip if map already exists.
  if (target.getAttribute("data-locked") == true) {
    return;
  }
  target.setAttribute("data-locked", true);

  console.log("Creating map...");

  // Source URLs
  const urls = {
    finds: target.dataset.finds,
    contexts: target.dataset.contexts,
    objects: target.dataset.objects,
    sections: target.dataset.sections,
    trenches: target.dataset.trenches,
    surveys: target.dataset.surveys,
  };

  // Page controls
  const dom = {
    toggle: {
      finds: document.getElementById('arxquest-map-toggle-finds'),
      contexts: document.getElementById('arxquest-map-toggle-contexts'),
      objects: document.getElementById('arxquest-map-toggle-objects'),
      sections: document.getElementById('arxquest-map-toggle-sections'),
      trenches: document.getElementById('arxquest-map-toggle-trenches'),
      trenches: document.getElementById('arxquest-map-toggle-surveys')
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
    console.log(urls.finds);
    var layer = new VectorLayer({
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
    if (dom.toggle.finds) {
      dom.toggle.finds.addEventListener('click', function() {
        layer.setVisible(!layer.getVisible());
      });
    }
    layers.push(layer);
  }

  // Contexts
  if (urls.contexts) {
    var layer = new VectorLayer({
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
    if (dom.toggle.contexts) {
      dom.toggle.contexts.addEventListener('click', function() {
        layer.setVisible(!layer.getVisible());
      });
    }
    layers.push(layer);
  }

  // Objects
  if (urls.objects) {
    var layer = new VectorLayer({
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
    if (dom.toggle.objects) {
      dom.toggle.objects.addEventListener('click', function() {
        layer.setVisible(!layer.getVisible());
      });
    }
    layers.push(layer);
  }

  // Sections
  if (urls.sections) {
    var layer = new VectorLayer({
      source: new VectorSource({
        url: urls.sections,
        format: new GeoJSON()
      }),
      style: function(feature) {
        labelStyle.getText().setText(feature.get('name'));
        return style;
      },
      declutter: true
    });
    if (dom.toggle.sections) {
      dom.toggle.sections.addEventListener('click', function() {
        layer.setVisible(!layer.getVisible());
      });
    }
    layers.push(layer);
  }

  // Trenches
  if (urls.trenches) {
    var layer = new VectorLayer({
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
    if (dom.toggle.trenches) {
      dom.toggle.trenches.addEventListener('click', function() {
        layer.setVisible(!layer.getVisible());
      });
    }
    layers.push(layer);
  }

  // Surveys
  if (urls.surveys) {
    console.log(urls.surveys);
    var layer = new VectorLayer({
      source: new VectorSource({
        url: urls.surveys,
        format: new GeoJSON()
      }),
      style: new Style({
        stroke: new Stroke({
          color: "blue",
          width: 2
        })
      }),
      declutter: false
    });
    if (dom.toggle.surveys) {
      dom.toggle.surveys.addEventListener('click', function() {
        layer.setVisible(!layer.getVisible());
      });
    }
    layers.push(layer);
  }

  // View
  var view = new View({
    center: [0, 0],
    zoom: 3
  });

  // Map
  var map = new Map({
    target: target,
    layers: layers,
    view: view
  });

  // Add zoom slider control
  var zoomslider = new ZoomSlider();
  map.addControl(zoomslider);
})();
