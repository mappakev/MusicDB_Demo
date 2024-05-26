<script>
  import axios from "axios";
  import { invalidateAll } from "$app/navigation";
  export let data;
 

  function deleteArtist(id) {
    axios
      .delete("/api/artists/" + id)
      .then((response) => {
        alert("Artist deleted");
        console.log(response.data);
        invalidateAll(); // reload data
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
</script>
<!---
<h1>List of all Artists</h1>
<a href="/artists/create">+ Add Artist</a>
<table class="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Origin</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each data.artists as artist}
      <tr>
        <td>
          <a href={"/artists/" + artist._id}>
            {artist._id}
          </a>
        </td>
        <td>
          {artist.name}
        </td>
        <td>
          {artist.origin}
        </td>
        <td>
          <button
            class="btn btn-danger"
            on:click={() => {
              deleteArtist(artist._id);
            }}>X</button
          >
        </td>
      </tr>
    {/each}
  </tbody>
</table>
--->




<div class="container">
  <ul class="list-group">
    {#each data.artists as artist}
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <a href={"/artists/" + artist._id}>
        {artist.name}
      </a>
      <span class="badge bg-primary rounded-pill">{artist.origin}</span>
      <button type="button" class="btn btn-danger" on:click={() => {
        deleteArtist(artist._id);
      }}>
      Löschen
      </button>
    </li>
    <!-- Wiederholen Sie das obige <li> Element für jeden Künstler in Ihrer Liste -->
      {/each}
  </ul>
</div>
