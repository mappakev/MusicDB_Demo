import db from "$lib/db.js"
import { onMount } from 'svelte';


export async function load({ params }) {

    return {
        artist: db.getArtist(params.artist_id)
    };
}

