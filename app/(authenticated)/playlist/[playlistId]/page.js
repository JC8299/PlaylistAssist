import { redirect } from "next/navigation";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { LuClock3 } from "react-icons/lu";

import { getPlaylistById } from "@/actions";
import { getAuthenticatedSession } from "@/utils/serverUtils";
import SongsHeader from "@/components/SongsHeader";
import TrackList from "@/components/TrackList";
import CustomScrollBar from "@/components/CustomScrollBar";
import CenterPanelHeader from "@/components/CenterPanelHeader";
import styles from "@/styles/trackList.module.css";

export async function generateMetadata({ params }) {
    const session = await getAuthenticatedSession();
    if (!session) return {title: 'Error loading playlist data'};
    const playlistId = params.playlistId;
    
    const playlist = await getPlaylistById(session, playlistId);

    return {
        title: `Playlist Assist - ${playlist?.name}`
    }
}

export default async function PlaylistPage({ params }) {
    const session = await getAuthenticatedSession();
    if (!session) redirect('/signin');

    const playlistId = params.playlistId;
    const playlist = await getPlaylistById(session, playlistId);

    return (
        <CustomScrollBar contentId={'center'}>
            <CenterPanelHeader hide={true}>
                <div className="flex flex-row gap-2 text-2xl font-bold items-center">
                    {/* placeholder button */}
                    <div className="flex flex-row justify-center items-center h-[48px] w-[48px] bg-[#1db954] rounded-full">
                        <TbPlayerPlayFilled size={24} className="text-black" />
                    </div>
                    <span>
                        {playlist?.name}
                    </span>
                </div>

                {/*
                    Spotify does this by changing the parent, but I'd have to change
                    a lot of how I made my page work, so I'll just hard code a new
                    bar under the header.
                */}
                <div className={styles.trackColumnsPlaylist + " p-4 text-[#a7a7a7] text-sm font-normal"}>
                    <div className="justify-self-center">
                        #
                    </div>

                    <div>
                        Title
                    </div>

                    <div>
                        Album
                    </div>

                    <div>
                        Date Added
                    </div>

                    <div className="flex items-center justify-end mr-8">
                        <LuClock3 />
                    </div>
                </div>
            </CenterPanelHeader>

            {playlist && (
                <SongsHeader
                    imageUrl={playlist.images?.length > 0 && playlist.images[0].url}
                    imageAlt={playlist.name}
                    type={(playlist.public ? 'Public ' : '') + playlist.type.charAt(0).toUpperCase() + playlist.type.slice(1)}
                    name={playlist.name}
                    description={playlist.description}
                    ownerName={playlist.owner?.display_name}
                    details={playlist.followers.total > 0 && (playlist.followers.total.toLocaleString() + (playlist.followers.total > 1 ? ' likes' : ' like'))}
                    trackAmount={playlist.tracks.total > 0 && (`${playlist.tracks.total.toLocaleString()} song${playlist.tracks.total > 1 ? 's': ''}`)}
                />
            )}

            <TrackList 
                tracks={playlist?.tracks.items
                    .filter((item) => item.track !== null)
                }
                playlist={true}
            />
        </CustomScrollBar>
    )
}