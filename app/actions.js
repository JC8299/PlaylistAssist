'use server'

import { getSpotifyWebApi } from "./utils/serverUtils"; 

export const getUserPlaylists = async (session) => {
    if (!session) return;
    try {
        const data = await getSpotifyWebApi(
            "https://api.spotify.com/v1/me/playlists",
            session,
        )

        return data.items;
    } catch (e) {
        console.log(e);
        return;
    }
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

export const getAlbumById = async (session, albumId) => {
    if (!session) return;
    try {
        return await getSpotifyWebApi(
            `https://api.spotify.com/v1/albums/${albumId}`,
            session
        )
    } catch (e) {
        console.log(`Error: ${e}`);
        return;
    }
}

export const getSeveralAlbumsById = async (session, severalAlbumIds) => {
    if (!session) return;
    try {
        if (severalAlbumIds.length > 20) {
            let promises = [];

            for (let i = 0; i < severalAlbumIds.length; i += 20) {
                if (i + 20 > severalAlbumIds.length) {
                    promises.push(getSpotifyWebApi(
                        `https://api.spotify.com/v1/albums?ids=${severalAlbumIds.slice(index, severalAlbumIds.length).join()}`,
                        session
                    ));
                } else {
                    promises.push(getSpotifyWebApi(
                        `https://api.spotify.com/v1/albums?ids=${severalAlbumIds.slice(index, index+20).join()}`,
                        session
                    ));
                }
            }
            
            return Promise.all(promises);
        } else {
            return await getSpotifyWebApi(
                `https://api.spotify.com/v1/albums?ids=${severalAlbumIds.join()}`,
                session
            );
        }
    } catch (e) {
        console.log(`Error: ${e}`);
        return;
    }
}

export const getArtistById = async (session, artistId) => {
    if (!session) return;
    try {
        return await getSpotifyWebApi(
            `https://api.spotify.com/v1/artists/${artistId}`,
            session
        );
    } catch (e) {
        console.log(`Error: ${e}`);
        return;
    }
}

export const getArtistPage = async (session, artistId) => {
    if (!session) return;
    try {
        const baseUrl = `https://api.spotify.com/v1/artists/${artistId}`;
        
        const urls = [
            '',
            '/top-tracks?market=from_token',
            '/albums?include_groups=album',
            '/albums?include_groups=single',
            '/albums?include_groups=compilation',
            '/related-artists',
            '/albums?include_groups=appears_on',
        ]

        const promises = urls.map((url) => getSpotifyWebApi(`${baseUrl}${url}`, session));
        
        return Promise.all(promises);
    } catch (e) {
        console.log(`Error: ${e}`);
        return;
    }
}

export const getRelatedArtists = async (session, artistId) => {
    if (!session) return;
    try {
        return await getSpotifyWebApi(
            `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
            session
        );
    } catch (e) {
        console.log(`Error: ${e}`);
        return;
    }
}

export const getArtistAppearsOn = async (session, artistId) => {
    if (!session) return;
    try {
        return await getSpotifyWebApi(
            `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=appears_on`,
            session
        );
    } catch (e) {
        console.log(`Error: ${e}`);
        return;
    }
}

export const getArtistDiscography = async (session, artistId) => {
    if (!session) return;
    try {
        const baseUrl = `https://api.spotify.com/v1/artists/${artistId}`;
        
        const urls = [
            '',
            '/albums?include_groups=album',
            '/albums?include_groups=single',
            '/albums?include_groups=compilation',
        ]

        const promises = urls.map((url) => getSpotifyWebApi(`${baseUrl}${url}`, session));
        
        return Promise.all(promises);
    } catch (e) {
        console.log(`Error: ${e}`);
        return;
    }
}