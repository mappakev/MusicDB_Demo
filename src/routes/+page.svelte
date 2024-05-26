<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { setContext } from 'svelte';

  import { passToken } from './store.js';


  import ArtistCard from "$lib/components/ArtistCard.svelte";
  import axios from "axios";



  // Create a writable store to hold the access token
  export const accessToken = writable("");




  let tokenValue;
  export let artistData = null; // This will hold the artist data
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
      passToken.set(tokenValue);
    } else {
      console.log("Error:", response.status, response.statusText);
    }
  });


  console.log(passToken);
  
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


  let test = "fad"

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
        <h5 class="card-title">Hello {userData.display_name}</h5>
        <p class="card-text">Your Spotify ID is {userData.id}.</p>

        <a href={userData.external_urls.spotify}>Jump to Spotify</a>
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

<p id="tokenValue">Token = {tokenValue}</p>



<ArtistCard {artistData} {artist}/>


