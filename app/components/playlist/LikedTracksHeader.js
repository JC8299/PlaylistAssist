import Image from "next/image";
import { RxDotFilled } from "react-icons/rx";

import styles from "@/styles/playlistHeader.module.css";
import { getAuthenticatedSession } from "@/utils/serverUtils";

export default async function LikedTracksHeader({
    playlist,
}) {
    const session = await getAuthenticatedSession();
    if (!session) redirect('/signin');

    return (
        <div className="flex flex-col pt-5">
            <div className={styles.headerContainer}>
                <div className={styles.headerImage  + " disableTextSelection"}>
                    <Image
                        src="/images/liked_cover.jpeg"
                        alt="Liked Songs"
                        fill={true}
                        className="object-cover rounded"
                    />
                </div>

                <div className="flex flex-col justify-end font-normal text-sm">
                    {/* playlist type */}
                    <p>
                        Playlist
                    </p>

                    {/* playlist name */}
                    {/* need to shrink from 6rem to 2rem when out of space */}
                    <h1 className="font-black text-8xl mt-[0.08em] mb-[0.12em] disableTextSelection">
                        Liked Songs
                    </h1>

                    {/* playlist description */}
                    {playlist.description && (
                        <p className="max-h-[74px]">
                            
                        </p>
                    )}

                    {/* playlist owner, playlist followers, tracks length */}
                    <div className="flex flex-row items-center mt-[8px] font-normal text-sm">
                        <span className="disableTextSelection">
                            {session?.user?.name}
                        </span>

                        {playlist.items.length > 0 && (
                            <span className="flex flex-row items-center">
                                <RxDotFilled />
                                {playlist.total.toLocaleString()} songs
                            </span>
                        )}
                    </div>
                    {/* ignore owner image and playlist total time because too much of a pain */}
                </div>
            </div>
        </div>
    )
}