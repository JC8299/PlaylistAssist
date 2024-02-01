import { RiPlayListFill } from "react-icons/ri"

import LibraryCard from "./LibraryCard";
import { getAuthenticatedSession } from "@/utils/serverUtils"; 
import { getLikedTracks, getUserPlaylists } from "@/actions";
import CustomScrollBar from "@/components/CustomScrollBar";

export default async function Library() {
    const session = await getAuthenticatedSession();
    if (!session) return null;

    const playlists = await getUserPlaylists(session);
    const likedTracks = await getLikedTracks(session);

    return (
        <div className="flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <RiPlayListFill className="text-neutral-400" size={22} />
                    <p className="text-neutral-400 font-bold text-md">
                        Your Library
                    </p>
                </div>
            </div>
            
            <CustomScrollBar contentId={'sidebar'}>
                <div className="flex flex-col gap-y-2 mt-4 px-3">
                    <ul>
                        <LibraryCard
                            imageSrc={'/images/liked_cover.jpeg'}
                            imageAlt={'Liked Songs Image'}
                            title={'Liked Songs'}
                            description={`${likedTracks?.total.toLocaleString()} songs`}
                            link={'/collection/tracks'}
                            key={'LikedSongs'}
                        />
                        {playlists
                            .map((playlist) => (
                                <LibraryCard
                                    imageSrc={playlist.images[0]?.url}
                                    imageAlt={'Playlist Image'}
                                    title={playlist.name}
                                    description={`${playlist.owner.display_name ? playlist.owner.display_name : ''}`}
                                    link={`/playlist/${playlist.id}`}
                                    key={playlist.id}
                                />
                            ))
                        }
                    </ul>
                </div>
            </CustomScrollBar>
        </div>
    )
}