<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import axios from "axios";

  // Create a writable store to hold the access token
  export const accessToken = writable("");

  let tokenValue;
  let artistData = null; // This will hold the artist data
  let artistName = ""; // This will hold the value from the search field
  let userData = null;

  let artist = {
    name: "",
    origin: "",
  };

  // Subscribe to the store and assign its value to the local variable
  accessToken.subscribe((value) => {
    tokenValue = value;
  });

  onMount(async () => {
    let fragmentParams = new URLSearchParams(window.location.hash.substr(1));
    let token = fragmentParams.get("access_token");

    // Set the value of the access token in the store
    accessToken.set(token);

    // Make an API call to the Spotify API

    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + tokenValue,
      },
    });

    if (response.ok) {
      userData = await response.json();
    } else {
      console.log("Error:", response.status, response.statusText);
    }
  });

  let fullUrl = $page.url;

  //Login Infos
  const CLIENT_ID = "b49b7b25a1fc4dc08600d5a92c91a88a";
  const REDIRECT_URI = "http://localhost:5173";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  console.log(tokenValue);

  async function loadArtist() {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${artistName}&type=artist`,
      {
        headers: {
          Authorization: "Bearer " + tokenValue,
        },
      },
    );

    if (response.ok) {
      artistData = await response.json();
    } else {
      console.log("Error:", response.status, response.statusText);
    }


    artist.name = artistData.artists.items[0].name;

  }


 

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

<head>
  <meta charset="utf-8" />
  <title>My Spotify Profile</title>
  <script src="src/script.js" type="module"></script>
</head>

<div class="container">
  <h1 class="my-4 text-center">Your personal music database</h1>

  <div class="card my-4">
    <div class="card-body">
      {#if userData}
        <h5 class="card-title">Welcome, kevmappa!</h5>
        <p class="card-text">Your Spotify ID is theb022.</p>
      {:else}
        <p>Loading...</p>
      {/if}
    </div>
  </div>

  <a
    href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
    class="btn btn-primary">Log in with Spotify</a
  >
</div>

<div class="container">
  <h1 class="my-4 text-center">Search for a artist</h1>

  <form class="my-4">
    <div class="input-group">
      <input
        bind:value={artistName}
        type="text"
        class="form-control"
        placeholder="Enter artist name"
      />
      <button on:click={loadArtist} class="btn btn-primary"
        >Search Artist</button
      >
    </div>
  </form>
</div>

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
