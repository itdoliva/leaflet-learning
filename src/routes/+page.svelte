<script lang="ts">
  let { data } = $props();
</script>

<section class="p-8">
  <div class="flex flex-col gap-4">
    <h1>Lessons</h1>
    <ul class="mx-auto">
      {#each data.routes as route (route.href)}
        <li>
          <a href={route.href}>{route.name}</a>
        </li>
      {/each}
    </ul>
  </div>
</section>