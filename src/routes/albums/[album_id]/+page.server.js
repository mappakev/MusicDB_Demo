import db from "$lib/db.js"
import { onMount } from 'svelte';

export async function load({ params }) {

    return {
        artist: db.getAlbum(params.album_id)
    };
}
