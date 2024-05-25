<script>
  import axios from 'axios';
  export let data;
  
  let album = data.album;

  function updateAlbum() {
    axios
      .put("/api/albums/" + album._id, album)
      .then((response) => {
        alert("Album updated");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
</script>

<h1>Artist (ID: {album._id})</h1>
<a href="/albums">Back</a>
<!-- <div class="mt-3">
  <p>Name: {artist.name}</p>
  <p>Origin: {artist.origin}</p>
</div>
 -->
<div class="mt-3 mb-3">
  <label class="form-label" for="name">Name</label>
  <input class="form-control" id="name" bind:value={album.name} />
</div>
<div class="mt-3 mb-3">
  <label class="form-label" for="origin">Origin</label>
  <input class="form-control" id="origin" bind:value={album.origin} />
</div>
<button class="btn btn-primary" on:click={updateAlbum}>Update</button>