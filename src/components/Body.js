import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Search from "./Search";
import Box from "./Box";
import Playlist from "./Playlist";
import BodyHeader from "./BodyHeader";

function Body({ spotifyApi }) {
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
        <Box className={"h-full flex flex-col"}>
            <BodyHeader search={search} setSearch={setSearch} />
            <Playlist spotifyApi={spotifyApi} />
            {/* <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4"></div> */}
        </Box>
    )
}

export default Body;