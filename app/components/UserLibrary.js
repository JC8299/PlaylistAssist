'use client'

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import Card from "./Card";
import CustomScrollBar from "./CustomScrollBar";
import styles from "@/styles/playlist.module.css";
import UserPlaylists from "./UserPlaylists";

export default function UserLibrary({
    playlists,
}) {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;

    const containerRef = useRef(null);
    const [cardWidth, setCardWidth] = useState(200);
    const minCardWidth = 150;
    const maxCardWidth = 250;

    function findMinCardsPerRow(containerWidth) {
        // padding is 24px each side
        // gap is 16px
        const gap = 16;
        // subtract padding
        const contentSpaceWidth = containerWidth-48;
        let cards = 2;

        while(contentSpaceWidth - gap*(cards-1) > minCardWidth * cards) {
            cards++;
        }

        return cards-1;
    }

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;
        const resizeObserver = new ResizeObserver(() => {
            const containerWidth = container.getBoundingClientRect().width;
            let minCardsPerRow = findMinCardsPerRow(containerWidth);

            const newMaxCardWidth = Math.floor(
                (containerWidth-48-(16*(minCardsPerRow-1))) / minCardsPerRow
            );
            const finalMaxCardWidth = Math.min(Math.max(newMaxCardWidth, minCardWidth), maxCardWidth);

            setCardWidth(finalMaxCardWidth);
        });
        resizeObserver.observe(container);

        return () => {
            if (container) {
                resizeObserver.unobserve(container);
            }
        }
    }, []);
    
    // useEffect(() => {
    //     if (!accessToken) return;
        
    //     spotifyApi.getUserPlaylists(
    //         spotifyApi.getMe()
    //             .then((data) => {
    //                 return data.body.display_name;
    //             }, function(error) {
    //                 console.log('Error in getting user', error)
    //             })
    //     ).then((data) => {
    //         setPlaylists(
    //             data.body.items.map((playlist) => {
    //                 return {
    //                     id: playlist.id,
    //                     name: playlist.name,
    //                     uri: playlist.uri,
    //                     playlistUrl: playlist.images[0].url,
    //                     owner: playlist.owner.display_name,
    //                 };
    //             })
    //         );
    //     }, function(error) {
    //         console.log('Error in getting playlists', error);
    //     });
    // }, [accessToken]);

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