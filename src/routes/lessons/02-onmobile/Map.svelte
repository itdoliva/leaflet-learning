<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    const map = L.map('map')
    const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    

    tileLayer.addTo(map);

    // Geolocation
    map.locate({ setView: true, maxZoom: 16 });

    function onLocationFound(e: L.LocationEvent) {
      const radius = e.accuracy;

      L.marker(e.latlng)
        .addTo(map)
        .bindPopup("You are within " + radius + " meters from this point")
        .openPopup();

      L.circle(e.latlng, { radius })
        .addTo(map);

      map.setView(e.latlng, 16);
    }

    function onLocationError(e: L.ErrorEvent) {
      alert(e.message);
    }

    map.on('locationerror', onLocationError);
    map.on('locationfound', onLocationFound);
  })
</script>

<div id="map" class="h-screen"></div>