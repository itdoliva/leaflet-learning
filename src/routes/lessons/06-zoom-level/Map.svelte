<script lang="ts">
  import { onMount } from "svelte";

  onMount(async () => {
    const map = L.map('map')
    const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    

    tileLayer.addTo(map);

    map.setView([0, 0], 0);

    L.control.scale().addTo(map);

    // A note about scale
    // setInterval(() => {
    //   map.setView([0, 0]);
    //   setTimeout(() => {
    //     map.setView([60, 0]);
    //   }, 2000);
    // }, 4000);

    // Controlling the zoom
    setInterval(() => {
      map.setZoom(0);
      setTimeout(() => {
        map.setZoom(1);
      }, 2000);
    }, 4000);


  })
</script>

<div id="map" class="h-screen"></div>