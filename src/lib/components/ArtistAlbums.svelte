<script>
  export let artistAlbums;
</script>
<p>error</p>

{#if artistAlbums}

<p>error</p>
<div class="card my-4">
  <div class="card-body">
    <h2 class="card-title">{artistAlbums.items[0].name}</h2>
  </div>
</div>
{:else}
  <p>error</p>
{/if}
