'use server'

import { getSpotifyWebApi } from "./utils/serverUtils"; 

export const getUserPlaylists = async (session) => {
    const data = await getSpotifyWebApi(
        "https://api.spotify.com/v1/me/playlists",
        session,
    )

    return data.items;
}

export const getPlaylistById = async (session, playlistId) => {
    const data = await getSpotifyWebApi(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        session,
    )

    const playlist = data;

    let currentUrl = data.tracks.next;

    while (currentUrl !== null) {
        const nextData = await getSpotifyWebApi(currentUrl, session);
        playlist.tracks.items.push(...nextData.items);
        currentUrl = nextData.next;
    }

    return playlist;
}