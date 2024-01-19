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
    if (!session || !playlistId) return;
    try {
        const data = await getSpotifyWebApi(
            `https://api.spotify.com/v1/playlists/${playlistId}`,
            session
        );

        if (!data) return;

        const playlist = data;

        let currentUrl = data.tracks?.next;

        while (currentUrl !== null) {
            const nextData = await getSpotifyWebApi(currentUrl, session);
            playlist.tracks.items.push(...nextData.items);
            currentUrl = nextData.next;
        }

        return playlist;
    } catch (e) {
        console.log(`Error: ${e}`);
        return;
    }
}

export const getLikedTracks = async (session) => {
    if (!session) return;
    try {
        const data = await getSpotifyWebApi(
            `https://api.spotify.com/v1/me/tracks?limit=50`,
            session
        );

        if (!data) return;

        const tracks = data;

        let currentUrl = data.next;

        while (currentUrl !== null) {
            const nextData = await getSpotifyWebApi(currentUrl, session);
            tracks.items.push(...nextData.items);
            currentUrl = nextData.next;
        }

        return tracks;
    } catch (e) {
        console.log(`Error: ${e}`);
        return;
    }
}