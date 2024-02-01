import { redirect } from "next/navigation";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { LuClock3 } from "react-icons/lu";

import { getAlbumById } from "@/actions";
import CustomScrollBar from "@/components/CustomScrollBar";
import SongsHeader from "@/components/SongsHeader";
import { getAuthenticatedSession } from "@/utils/serverUtils";
import CenterPanelHeader from "@/components/CenterPanelHeader";
import TrackList from "@/components/TrackList";

export async function generateMetadata({ params }) {
    const session = await getAuthenticatedSession();
    if (!session) return {title: 'Error loading album data'};

    const albumId = params.albumId;
    const album = await getAlbumById(session, albumId);

    return {
        title: `Playlist Assist - ${album.name}`
    };
}

export default async function AlbumPage({
    params
}) {
    const session = await getAuthenticatedSession();
    if (!session) redirect('/signin');

    const albumId = params.albumId;
    const album = await getAlbumById(session, albumId);

    return (
        <CustomScrollBar contentId={'center'}>
            <CenterPanelHeader hide={true}>
                <div className="flex flex-row gap-2 text-2xl font-bold items-center">
                    {/* placeholder button */}
                    <div className="flex flex-row justify-center items-center h-[48px] w-[48px] bg-[#1db954] rounded-full">
                        <TbPlayerPlayFilled size={24} className="text-black" />
                    </div>
                    <span>
                        {album.name}
                    </span>
                </div>

                {/*
                    Spotify does this by changing the parent, but I'd have to change
                    a lot of how I made my page work, so I'll just hard code a new
                    bar under the header.
                */}
                <div className={"p-4 text-[#a7a7a7] text-sm font-normal grid grid-cols-[16px_minmax(120px,13fr)_minmax(120px,1fr)] gap-4"}>
                    <div className="justify-self-center">
                        #
                    </div>

                    <div>
                        Title
                    </div>

                    <div className="flex items-center justify-end mr-8">
                        <LuClock3 />
                    </div>
                </div>
            </CenterPanelHeader>
            
            {album && (
                <SongsHeader
                    imageUrl={album.images?.length > 0 && album.images[0].url}
                    imageAlt={album.name}
                    type={album.album_type?.charAt(0).toUpperCase() + album.album_type.slice(1)}
                    name={album.name}
                    ownerName={album.artists[0].name}
                    ownerId={album.artists[0].id}
                    details={(new Date(album.release_date).getFullYear()).toLocaleString()}
                    trackAmount={album.tracks.total > 0 && (`${album.tracks.total.toLocaleString()} song${album.tracks.total > 1 ? 's' : ''}`)}
                />
            )}
            
            {/* need to change album.tracks.items into tracks.items.track */}
            <TrackList
                tracks={album.tracks?.items
                    .filter((item) => item !== null)
                    .map(
                        (item) => (
                            {track: {
                                id: item.id,
                                name: item.name,
                                artists: item.artists,
                                duration_ms: item.duration_ms,
                            }}
                        )
                    )
                }
            />
        </CustomScrollBar>
    );
}