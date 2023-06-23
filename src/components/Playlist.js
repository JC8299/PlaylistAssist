import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Playlist({ spotifyApi }) {
    const {data: session } = useSession();
    const accessToken = session?.accessToken;
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
            console.log('Playlists:', data.body);
            setPlaylists(
                data.body.items.map((playlist) => {
                    return {
                        uid: playlist.id,
                        name: playlist.name,
                        uri: playlist.uri,
                        playlistUrl: playlist.images[0].url,
                    };
                })
            );
        }, function(error) {
            console.log('Error in getting playlists', error);
        });
    }, [accessToken]);

    return (
        <div>
            <ul>
                {playlists
                    .map((playlist) => (
                        <li>
                            <img
                                src={playlist.playlistUrl}
                                alt=""
                            />
                            <div>{playlist.name}</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Playlist;