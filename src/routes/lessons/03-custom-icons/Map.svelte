<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    const map = L.map('map')
    const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    

    tileLayer.addTo(map);

    map.setView([-21.757, -41.323], 16);

    // Geolocation
    const greenIco = L.icon({
      iconUrl: '/assets/leaf-green.png',
      shadowUrl: '/assets/leaf-shadow.png',

      iconSize:     [38, 95], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    L.marker([ -21.757, -41.323 ], { icon: greenIco }).addTo(map);

    const LeafIcon = L.Icon.extend({
      options: {
        shadowUrl: '/assets/leaf-shadow.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
      }
    });

    const greenIcon = new LeafIcon({iconUrl: '/assets/leaf-green.png'});
    const redIcon = new LeafIcon({iconUrl: '/assets/leaf-red.png'});
    const orangeIcon = new LeafIcon({iconUrl: '/assets/leaf-orange.png'});

    L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map).bindPopup("I am a green leaf.");
    L.marker([51.495, -0.083], {icon: redIcon}).addTo(map).bindPopup("I am a red leaf.");
    L.marker([51.49, -0.1], {icon: orangeIcon}).addTo(map).bindPopup("I am an orange leaf.");
  })
</script>

<div id="map" class="h-screen"></div>