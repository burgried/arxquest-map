import {Style} from 'ol/style';
import {Fill, Stroke, Text, RegularShape} from 'ol/style';

var exports = module.exports = {};

// Text labels
exports.textStyle = function(feature, offset=0) {
  return new Text({
    text: feature.get('title'),
    font: '12px "Open Sans", sans-serif',
    overflow: false,
    fill: new Fill({
      color: '#000'
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 3
    }),
    offsetY: offset
  });
}

// Finds
exports.findStyle = function(feature) {
  return new Style({
    image: new RegularShape({
      fill: new Fill({
        color: 'rgb(255, 0, 255)'
      }),
      stroke: new Stroke({
        color: 'black',
        width: 1
      }),
      points: 3,
      radius: 6,
      angle: Math.PI / 3,
    }),
    text: exports.textStyle(feature, -12)
  });
}

// Polygons
exports.polygonStyle = function(feature) {
  return new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new Stroke({
      color: 'rgb(0, 0, 0)',
      width: 1
    }),
    text: exports.textStyle(feature)
  });
}

// Contexts
exports.contextStyle = function(feature) {
  return new Style({
    fill: new Fill({
      color: 'rgba(255, 0, 255, 0.2)'
    }),
    stroke: new Stroke({
      color: 'rgb(255, 0, 255)',
      width: 1
    }),
    text: exports.textStyle(feature)
  });
}

// Surveys
exports.surveyStyle = function(feature) {
  return new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new Stroke({
      color: 'rgb(0, 0, 0)',
      width: 1
    }),
    text: exports.textStyle(feature)
  });
}
