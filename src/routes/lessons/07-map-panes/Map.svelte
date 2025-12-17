<script lang="ts">
  import { loadStatesData } from "$lib/data/geojson";
  import { onMount } from "svelte";

  const getColor = (d: number) => {
    return d > 1000 ? '#800026' :
      d > 500  ? '#BD0026' :
      d > 200  ? '#E31A1C' :
      d > 100  ? '#FC4E2A' :
      d > 50   ? '#FD8D3C' :
      d > 20   ? '#FEB24C' :
      d > 10   ? '#FED976' :
                '#FFEDA0';
  }

  const style = (feature) => ({
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  })
  
  onMount(async () => {
    const statesData = await loadStatesData();

    const map = L.map('map');

    map.setView([39.75621, -104.99404], 5);
    
    const labelsPane = map.createPane('labels');
    labelsPane.style.zIndex = 650;
    labelsPane.style.pointerEvents = 'none';

    const positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
      attribution: '©OpenStreetMap, ©CartoDB'
    }).addTo(map);

    const positronLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
      attribution: '©OpenStreetMap, ©CartoDB',
      pane: 'labels'
    }).addTo(map);

    const onMouseOver = (e: L.LayerEvent) => {
      const layer = e.target;

      layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
      });

      layer.bringToFront();
    }

    const onMouseOut = (e: L.LayerEvent) => {
      geojson.resetStyle(e.target);
    }


    const onClick = (e: L.LayerEvent) => {
      map.fitBounds(e.target.getBounds());
    }

    const geojson = L.geoJson(statesData, {
      style: style,
      onEachFeature: function (feature, layer) {
        layer.on({
          mouseover: onMouseOver,
          mouseout: onMouseOut,
          click: onClick
        });
      }
    }).addTo(map);

    geojson.eachLayer(function (layer) {
      layer.bindPopup(layer.feature.properties.name);
    });

    map.fitBounds(geojson.getBounds());

  })
</script>

<div id="map" class="h-screen"></div>