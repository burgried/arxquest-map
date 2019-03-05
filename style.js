import {Style} from 'ol/style';
import {Fill, Stroke, Text, Circle} from 'ol/style';

var exports = module.exports = {};

// Text labels
exports.textStyle = function(feature) {
  return new Text({
    text: feature.get('title'),
    font: '12px sans-serif',
    overflow: false,
    fill: new Fill({
      color: '#000'
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 3
    }),
    offsetY: -12
  });
}

// Points
exports.pointStyle = function(feature) {
  return new Style({
    image: new Circle({
      radius: 6,
      fill: new Fill({
        color: 'rgba(255, 0, 0, 1.0)'
      }),
      stroke: new Stroke({
        color: 'black',
        width: 1
      })
    }),
    text: exports.textStyle(feature)
  });
}

// Polygons
exports.polygonStyle = function(feature) {
  return new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.6)'
    }),
    stroke: new Stroke({
      color: '#319FD3',
      width: 1
    }),
    text: exports.textStyle(feature)
  });
}

// Polygons
exports.surveysStyle = function(feature) {
  return new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.6)'
    }),
    stroke: new Stroke({
      color: 'orange',
      width: 1
    }),
    text: exports.textStyle(feature)
  });
}
