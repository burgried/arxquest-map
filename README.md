# ArxQest Map

OpenLayers map for the ArxQuest project!

```bash
npm install
npm run build
```

## Layers

Use `data-*` attributes to assign specific layers to the map.

```html
<div id="arxquest-map" data-finds="https://example.com/finds.geojson"></div>
```

Following layer attributes are supported.

* `data-finds`
* `data-contexts`
* `data-trenches`
* `data-surveys`

## Controls

Use `input` checkbox elements to toggle individual layers.

```html
<input type="checkbox" id="arxquest-map-toggle-finds" checked>
```

Following layer control IDs are supported.

* `arxquest-map-toggle-finds`
* `arxquest-map-toggle-contexts`
* `arxquest-map-toggle-trenches`
* `arxquest-map-toggle-surveys`
