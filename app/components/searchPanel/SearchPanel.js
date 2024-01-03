'use client'

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Search from "./Search";
import Box from "../Box";
import UserLibrary from "../UserLibrary";
import SearchPanelHeader from "./SearchPanelHeader";

export default function SearchPanel({
    children,
}) {
    const { data: session } = useSession();
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // This is done to search tracks from all tracks
    // Searching
    // useEffect(() => {
    //     if (!search) return setSearchResults([]);
    //     if (!accessToken) return;

    //     spotifyApi.searchTracks(search).then((res) => {
    //         setSearchResults(
    //             res.body.tracks.items.map((track) => {
    //                 return {
    //                     uid: track.id,
    //                     artist: track.artists[0].name,
    //                     title: track.name,
    //                     uri: track.uri,
    //                     albumUrl: track.album.images[0].url,
    //                     popularity: track.popularity,
    //                 };
    //             })
    //         );
    //     });
    // }, [search, accessToken]);

    return (
        <>
            <SearchPanelHeader search={search} setSearch={setSearch} />
            <UserLibrary />
        </>
    )
}