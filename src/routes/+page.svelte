<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    // Create a writable store to hold the access token
    export const accessToken = writable("");

    let tokenValue;
    let userData = null;
    // Subscribe to the store and assign its value to the local variable
    accessToken.subscribe((value) => {
        tokenValue = value;
    });

    onMount(() => {
        let fragmentParams = new URLSearchParams(
            window.location.hash.substr(1),
        );
        let token = fragmentParams.get("access_token");

        // Set the value of the access token in the store
        accessToken.set(token);

        // Make an API call to the Spotify API
        async function callSpotifyAPI() {
            const response = await fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: "Bearer " + tokenValue,
                },
            });

            userData = await response.json();
        }

        callSpotifyAPI();
    });

    let fullUrl = $page.url;

    //Login Infos
    const CLIENT_ID = "b49b7b25a1fc4dc08600d5a92c91a88a";
    const REDIRECT_URI = "http://localhost:5173";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
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

        <p>Current URL: {fullUrl}</p>
        {#if userData}
            <h1>Welcome, {userData.display_name}!</h1>
            <p>Your Spotify ID is {userData.id}.</p>
        {:else}
            <p>Loading...</p>
        {/if}
    </body>
</html>
