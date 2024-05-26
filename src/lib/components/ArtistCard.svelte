<script>
    export let artistData;
    export let artist;
    import axios from "axios";

    function addArtist() {
    axios
      .post("/api/artists", artist)
      .then((response) => {
        alert("Artist added");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }



</script>
{#if artistData}
  <div class="card my-4">
    <div class="card-body">
      <h2 class="card-title">{artistData.artists.items[0].name}</h2>
      <p class="card-text">
        Followers: {artistData.artists.items[0].followers.total}
      </p>

      <p class="card-text">Genres:</p>
      <ul>
        {#each artistData.artists.items[0].genres as genre}
          <li>{genre}</li>
        {/each}
      </ul>
      <p class="card-text">
        <a href={artistData.artists.items[0].external_urls.spotify}
          >Link to Artist Page</a
        >
      </p>
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src={artistData.artists.items[0].images[1].url} alt="Artist Image" />
    </div>
  </div>

  <button on:click={addArtist} type="button" class="btn btn-primary">
    Add Artist
  </button>
{:else}
  <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
{/if}
