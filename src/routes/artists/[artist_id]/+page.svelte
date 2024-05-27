<script>
  import axios from "axios";
  import { getContext } from 'svelte';
  import { passToken } from '../../store.js';
  import { writable } from "svelte/store";
  import ArtistAlbum from "$lib/components/ArtistAlbum.svelte";
  import ArtistCard from "$lib/components/ArtistCard.svelte";

  console.log(passToken);

  


  export let artistData = null;
  export let data;
  let artist = data.artist;
  let artistID;

  export let artistAlbums;


  let apiToken;


  passToken.subscribe((value) => {
    apiToken = value;
  });

  console.log(artist.name);
  console.log(apiToken);

  async function loadArtistInfos() {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${artist.name}&type=artist`,
      {
        headers: {
          Authorization: "Bearer " + apiToken,
        },
      },
    );

    if (response.ok) {
      artistData = await response.json();
      artistID = artistData.artists.items[0].id

      console.log(artistID)
      loadAlbums();
    
    } else {
      console.log("Error:", response.status, response.statusText);
     
    }

  }



  async function loadAlbums() {
            const response = await fetch(
            `https://api.spotify.com/v1/artists/${artistID}/albums`,
            {
              headers: {
                Authorization: "Bearer " + apiToken,
              },
            },
          );


          if (response.ok) {
            artistAlbums = await response.json();
          }else{
            console.log("Error:", response.status, response.statusText);
          }
        }

  // Update Artist
  function updateArtist() {
    axios
      .put("/api/artists/" + artist._id, artist)
      .then((response) => {
        alert("Artist updated");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
</script>

<h1>Artist (ID: {artist.name})</h1>
<a href="/artists">Back</a>
<!-- <div class="mt-3">
  <p>Name: {artist.name}</p>
  <p>Origin: {artist.origin}</p>
</div>
 -->
<div class="mt-3 mb-3">
  <label class="form-label" for="name">Name</label>
  <input class="form-control" id="name" bind:value={artist.name} />
</div>
<div class="mt-3 mb-3">
  <label class="form-label" for="origin">Origin</label>
  <input class="form-control" id="origin" bind:value={artist.origin} />
</div>
<button class="btn btn-primary" on:click={updateArtist}>Update</button>

<button on:click={loadArtistInfos} class="btn btn-primary"
        >Load Albums</button>
      <p>{apiToken}</p>


<ArtistAlbum {artistAlbums}/>

