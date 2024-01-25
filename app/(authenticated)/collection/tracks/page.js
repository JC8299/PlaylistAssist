import { redirect } from "next/navigation";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { LuClock3 } from "react-icons/lu";

import { getLikedTracks } from "@/actions";
import { getAuthenticatedSession } from "@/utils/serverUtils";
import TrackList from "@/components/TrackList";
import CustomScrollBar from "@/components/CustomScrollBar";
import CenterPanelHeader from "@/components/CenterPanelHeader";
import styles from "@/styles/trackList.module.css";
import SongsHeader from "@/components/SongsHeader";

export async function generateMetadata() {
    return {
        title: `Playlist Assist - Liked Songs`
    }
}

export default async function LikedTracksPage() {
    const session = await getAuthenticatedSession();
    if (!session) redirect('/signin');

    const likedTracks = await getLikedTracks(session);

    return (
        <CustomScrollBar contentId={'center'}>
            <CenterPanelHeader hide={true}>
                <div className="flex flex-row gap-2 text-2xl font-bold items-center">
                    {/* placeholder button */}
                    <div className="flex flex-row justify-center items-center h-[48px] w-[48px] bg-[#1db954] rounded-full">
                        <TbPlayerPlayFilled size={24} className="text-black" />
                    </div>
                    <span>
                        Liked Songs
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

            {/* {likedTracks && (
                <LikedTracksHeader playlist={likedTracks} />
            )} */}
            {likedTracks && (
                <SongsHeader
                    imageUrl="/images/liked_cover.jpeg"
                    imageAlt="Liked Songs"
                    type="Playlist"
                    name="Liked Songs"
                    ownerName={session?.user?.name}
                    trackAmount={likedTracks.items.length > 0 && (`${likedTracks.total.toLocaleString()} song${likedTracks.total > 1 && 's'}`)}
                />
            )}

            <TrackList
                tracks={likedTracks?.items
                    .filter((item) => item.track !== null)
                }
                playlist={true}
            />
        </CustomScrollBar>
    )
}