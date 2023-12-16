import { RiPlayListFill } from "react-icons/ri"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import LibraryCard from "./LibraryCard";

function Library({ spotifyApi }) {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    // maybe move this out to a parent to reuse
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        if (!accessToken) return;

        spotifyApi.getUserPlaylists(
            spotifyApi.getMe()
                .then((data) => {
                    // console.log('Authenticated User:', data.body.display_name);
                    return data.body.display_name;
                }, function(error) {
                    console.log('Error in getting user', error)
                })
        ).then((data) => {
            setPlaylists(
                data.body.items.map((playlist) => {
                    return {
                        id: playlist.id,
                        name: playlist.name,
                        uri: playlist.uri,
                        playlistUrl: playlist.images[0].url,
                        owner: playlist.owner.display_name,
                    };
                })
            );
        }, function(error) {
            console.log('Error in getting playlists', error);
        });
    }, [accessToken]);

    return (
        <div className="flex flex-col">
            <div
                className="
                    flex
                    items-center
                    justify-between
                    px-5
                    pt-4
                "
            >
                <div
                    className="
                        inline-flex
                        items-center
                        gap-x-2
                    "
                >
                    <RiPlayListFill className="text-neutral-400" size={22} />
                    <p className="text-neutral-400 font-medium text-md">Your Library</p>
                </div>
            </div>
            <div
                className="
                    flex
                    flex-col
                    gap-y-2
                    mt-4
                    px-3
                "
            >
                <ul>
                    {playlists
                        .map((playlist) => (
                            <LibraryCard
                                imageSrc={playlist.playlistUrl}
                                imageAlt={'Playlist Image'}
                                title={playlist.name}
                                description={`${playlist.owner ? playlist.owner : ''}`}
                                link=''
                                key={playlist.id}
                            />
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Library;