<script>
    export let artistAlbums;


    console.log(artistAlbums);
  </script>

  {#if artistAlbums}

  {#each artistAlbums.items as albums}
  <div class="card my-4">
    <div class="card-body">
      <h2 class="card-title">{albums.name}</h2>
      
    </div>
  </div>
  {/each}
  {:else}
    <p>No Albums loaded</p>
  {/if}
  