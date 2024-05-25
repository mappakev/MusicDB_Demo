<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    // Create a writable store to hold the access token
    export const accessToken = writable("");

    let tokenValue;
    let artistData = null; // This will hold the artist data
    let artistName = ""; // This will hold the value from the search field
    let userData = null;

    // Subscribe to the store and assign its value to the local variable
    accessToken.subscribe((value) => {
        tokenValue = value;
    });

    onMount(async () => {
        let fragmentParams = new URLSearchParams(
            window.location.hash.substr(1),
        );
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
    }
</script>

<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>My Spotify Profile</title>
        <script src="src/script.js" type="module"></script>
    </head>
    <body>
        <h1>Your personal music database</h1>
        <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            class="btn btn-primary">Log in with Spotify</a
        >

        {#if userData}
            <h1>Welcome, {userData.display_name}!</h1>
            <p>Your Spotify ID is {userData.id}.</p>
        {:else}
            <p>Loading...</p>
        {/if}
    </body>

    <h2>Search for a artist</h2>

    <input
        type="text"
        bind:value={artistName}
        placeholder="Enter artist name"
    />
    <button on:click={loadArtist}>Search Artist</button>

    {#if artistData}
        <h1>{artistData.artists.items[0].name}</h1>
        <p>Followers: {artistData.artists.items[0].followers.total}</p>
    {:else}
        <p>Loading...</p>
    {/if}
</html>
