
<script lang="ts" module>
  const loadStatesData = async () => {
    const response = await fetch("https://leafletjs.com/examples/choropleth/us-states.js")
    const jsText = await response.text()

    return new Function(`
      ${jsText};

      if (typeof statesData !== "undefined") {
        return statesData;
      }
      
    `)()
  }

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
</script>


<script lang="ts">
  import { onMount } from "svelte";

  onMount(async () => {
    let geojson;

    const map = L.map('map')
    const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    

    tileLayer.addTo(map);

    map.setView([39.75621, -104.99404], 5);

    const statesData = await loadStatesData();

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

    geojson = L.geoJson(statesData, {
      style: style,
      onEachFeature: function (feature, layer) {
        layer.on({
          mouseover: onMouseOver,
          mouseout: onMouseOut,
          click: onClick
        });
      }
    }).addTo(map);


  })
</script>

<div id="map" class="h-screen"></div>