import db from "$lib/db.js"

export async function load({ params }) {

    return {
        artist: db.getAlbum(params.album_id)
    };
}
