<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    const map = L.map('map')
    const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    
    map.setView([-21.757, -41.323], 16);

    tileLayer.addTo(map);

    // Objects
    const marker = L.marker([-21.757, -41.323])
      .addTo(map);

    const circle = L.circle([-21.752, -41.320], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 100
    }).addTo(map);

    const polygon = L.polygon([
      [-21.757487, -41.330781],
      [-21.753, -41.323],
      [-21.765, -41.324]
    ]).addTo(map);

    // Popups
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");

    // Events
    const popup = L.popup();

    function onMapClick(e: L.LeafletMouseEvent) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    }

    map.on('click', onMapClick);
  })
</script>

<div id="map" class="h-screen"></div>