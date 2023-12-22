import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import Card from "./Card";
import CustomScrollBar from "./CustomScrollBar";
import styles from "../styles/playlist.module.css";

function Playlist({ spotifyApi }) {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    const [playlists, setPlaylists] = useState([]);

    const containerRef = useRef(null);
    const [cardWidth, setCardWidth] = useState(200);
    const minCardWidth = 150;
    const maxCardWidth = 200;

    useEffect(() => {
        const container = containerRef.current;

        if (container) {
            const resizeObserver = new ResizeObserver(() => {
                const containerWidth = container.getBoundingClientRect().width;

                let minCardsPerRow = 3;
                if (containerWidth - 16 * 2 >= minCardWidth * 3) minCardsPerRow = 3;
                if (containerWidth - 16 * 3 >= minCardWidth * 4) minCardsPerRow = 4;
                if (containerWidth - 16 * 4 >= minCardWidth * 5) minCardsPerRow = 5;
                if (containerWidth - 16 * 5 >= minCardWidth * 6) minCardsPerRow = 6;
                console.log(minCardsPerRow);

                const newMaxCardWidth = Math.floor(containerWidth / minCardsPerRow);

                const finalMaxCardWidth = Math.min(Math.max(newMaxCardWidth, minCardWidth), maxCardWidth);

                setCardWidth(finalMaxCardWidth);
            });
            resizeObserver.observe(container);
        }

        return () => {
            if (container) {
                resizeObserver.unobserve(container);
            }
        }
    }, []);
    
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
        <CustomScrollBar>
            <div className={styles.playlistContainer} ref={containerRef}>
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
                            width={cardWidth}
                        />
                    ))
                }
            </div>
        </CustomScrollBar>
    )
}

export default Playlist;