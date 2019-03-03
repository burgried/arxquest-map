# opendig-map

OpenLayers map for the OpenDig project!

```bash
npm install
npm run build
```

Use `data-*` attributes to assign specific layers to the map.

```html
<div id="opendig-map" data-finds="https://example.com/finds.geojson"></div>
```

Use `input` elements to toggle individual layers.

```html
<input type="checkbox" id="opendig-map-finds-toggle" checked>
```
