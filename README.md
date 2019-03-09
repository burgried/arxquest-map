# ArxQuest Map

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
* `data-objects`
* `data-sections`
* `data-trenches`
* `data-surveys`

## Controls

### Toggle layers

Use `input` checkbox elements to toggle individual layers.

```html
<input type="checkbox" id="arxquest-toggle-finds" checked>
```

Following layer control IDs are supported.

* `arxquest-toggle-finds`
* `arxquest-toggle-contexts`
* `arxquest-toggle-objects`
* `arxquest-toggle-sections`
* `arxquest-toggle-trenches`
* `arxquest-toggle-surveys`

### Switch basemap

Use `input` radio elements to switch basemap layer.

```html
<input type="radio" value="grau" name="arxquest-basemap" checked>
```

Following basemap values are supported.

* `grau`
* `ortho`
* `oberflaeche`
* `gelaende`
