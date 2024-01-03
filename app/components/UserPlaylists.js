'use server'

import { getUserPlaylists } from "@/app/actions";
import { getAuthenticatedSession } from "@/utils/serverUtils";

import Card from "./Card";

export default async function UserPlaylists({
    cardWidth,
}) {
    const session = await getAuthenticatedSession();
    if(!session) return null;
    const playlists = await getUserPlaylists(session);

    return (
        <>
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
        </>
    )
}