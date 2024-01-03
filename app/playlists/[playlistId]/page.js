import { getPlaylistById } from "@/app/actions";
import { getAuthenticatedSession } from "@/utils/serverUtils";
import { redirect } from "next/navigation";
import Image from "next/image";

import PlaylistHeader from "../../components/playlist/PlaylistHeader";
import TrackList from "../../components/TrackList";

export async function generateMetadata({ params }) {
    const session = await getAuthenticatedSession();
    if (!session) return {title: 'Error loading playlist data'};
    const playlistId = params.playlistId;
    
    const playlist = await getPlaylistById(session, playlistId);

    return {
        title: `Playlist Assist - ${playlist.name}`
    }
}

export default async function PlaylistPage({ params }) {
    const session = await getAuthenticatedSession();
    if (!session) redirect('/signin');

    const playlistId = params.playlistId;
    const playlist = await getPlaylistById(session, playlistId);

    return (
        <div>
            {playlist && (
                <PlaylistHeader playlist={playlist} />
            )}

            <TrackList 
                tracks={playlist?.tracks.items
                    .filter((item) => item.track !== null)
                    .map((item) => item.track)}
            />
        </div>
    )
}