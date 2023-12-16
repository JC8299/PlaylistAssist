import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Card from "./Card";
import styles from "../styles/playlist.module.css";

function Playlist({ spotifyApi }) {
    const { data: session } = useSession();
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
        <div className={`
            ${styles.playlistContainer}`}>
            {playlists
                .map((playlist) => (
                    <Card
                        imageSrc={playlist.playlistUrl}
                        imageAlt='Playlist Image'
                        title={playlist.name}
                        description={`${playlist.owner ? playlist.owner : ''}`}
                        buttonText='Card Link'
                        link=''
                        key={playlist.id}
                    />
                ))
            }
        </div>
    )
}

export default Playlist;