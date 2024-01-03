import { RiPlayListFill } from "react-icons/ri"

import LibraryCard from "./LibraryCard";
import { getAuthenticatedSession } from "@/utils/serverUtils"; 
import { getUserPlaylists } from "@/actions";

export default async function Library() {
    const session = await getAuthenticatedSession();
    if (!session) return null;

    const playlists = await getUserPlaylists(session);

    return (
        <div className="flex flex-col">
            <div
                className="
                    flex
                    items-center
                    justify-between
                    px-5
                    pt-4
                "
            >
                <div
                    className="
                        inline-flex
                        items-center
                        gap-x-2
                    "
                >
                    <RiPlayListFill className="text-neutral-400" size={22} />
                    <p className="text-neutral-400 font-medium text-md">Your Library</p>
                </div>
            </div>
            <div
                className="
                    flex
                    flex-col
                    gap-y-2
                    mt-4
                    px-3
                "
            >
                <ul>
                    {playlists
                        .map((playlist) => (
                            <LibraryCard
                                imageSrc={playlist.images[0].url}
                                imageAlt={'Playlist Image'}
                                title={playlist.name}
                                description={`${playlist.owner.display_name ? playlist.owner.display_name : ''}`}
                                link=''
                                key={playlist.id}
                            />
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}