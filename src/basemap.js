import {Tile as TileLayer} from 'ol/layer';
import {XYZ as XYZSource} from 'ol/source';

var exports = module.exports = {};

var attributions = ['Datenquelle: <a href="https://www.basemap.at/">basemap.at</a>'];

exports.createBasemapGrau = function(visible) {
  var layer = new TileLayer({
    type: 'base',
    visible: visible,
    source: new XYZSource({
      url: 'https://maps{1-4}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png',
      crossOrigin: 'anonymous',
      maxZoom: 19,
      attributions: attributions
    })
  });
  layer.name = 'grau';
  return layer;
}

exports.createBasemapOrtho = function(visible) {
  var layer = new TileLayer({
    type: 'base',
    visible: visible,
    source: new XYZSource({
      url: 'https://maps{1-4}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg',
      crossOrigin: 'anonymous',
      maxZoom: 18,
      attributions: attributions
    })
  });
  layer.name = 'ortho';
  return layer;
}

exports.createBasemapOberflaeche = function(visible) {
  var layer = new TileLayer({
    type: 'base',
    visible: visible,
    source: new XYZSource({
      url: 'https://maps{1-4}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg',
      crossOrigin: 'anonymous',
      maxZoom: 17,
      attributions: attributions
    })
  });
  layer.name = 'oberflaeche';
  return layer;
}

exports.createBasemapGelaende = function(visible) {
  var layer = new TileLayer({
    type: 'base',
    visible: visible,
    source: new XYZSource({
      url: 'https://maps{1-4}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg',
      crossOrigin: 'anonymous',
      maxZoom: 17,
      attributions: attributions
    })
  });
  layer.name = 'gelaende';
  return layer;
}
