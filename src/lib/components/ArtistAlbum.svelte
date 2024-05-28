<script>
    export let artistAlbums;


    console.log(artistAlbums);
  </script>

  {#if artistAlbums}

  {#each artistAlbums.items as albums}
  <div class="card my-4">
    <div class="card-body">
      <h2 class="card-title">{albums.name}</h2>
      <p class="card-text">
        <a href={albums.external_urls.spotify}
          >Link to Album</a
        >
      </p>
      <p class="card-text">Release Date: {albums.release_date}
      </p>
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src={albums.images[1].url} alt="Album Image" />
    </div>
  </div>
  {/each}
  {:else}
    <p>No Albums loaded</p>
  {/if}
  