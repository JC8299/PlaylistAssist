import Image from "next/image";
import { RxDotFilled } from "react-icons/rx";
import { RiMusic2Line } from "react-icons/ri";

import styles from "@/styles/playlistHeader.module.css";

export default function PlaylistHeader({
    playlist,
}) {
    return (
        <div className="flex flex-col pt-5">
            <div className={styles.headerContainer}>
                {playlist.images?.length > 0 ? (
                    <div className={styles.headerImage  + " disableTextSelection"}>
                        <Image
                            src={playlist.images[0].url}
                            alt={playlist.name}
                            fill={true}
                            className="object-cover rounded"
                        />
                    </div>
                ) : (
                    <div className={styles.headerImage + " w-full flex justify-center items-center bg-[#282828] rounded shadow-2xl shadow-black"}>
                        <RiMusic2Line size={72} className="text-[#a7a7a7]"/>
                    </div>
                )}

                <div className="flex flex-col justify-end font-normal text-sm">
                    {/* playlist type */}
                    <p>
                        {playlist.public ? 'Public ' : ''}{playlist.type.charAt(0).toUpperCase()+playlist.type.slice(1)}
                    </p>

                    {/* playlist name */}
                    {/* need to shrink from 6rem to 2rem when out of space */}
                    <h1 className="font-black text-8xl mt-[0.08em] mb-[0.12em] disableTextSelection">
                        {playlist.name}
                    </h1>

                    {/* playlist description */}
                    {playlist.description && (
                        <p className="max-h-[74px]">
                            {playlist.description}
                        </p>
                    )}

                    {/* playlist owner, playlist followers, tracks length */}
                    <div className="flex flex-row items-center mt-[8px] font-normal text-sm">
                        <span className="disableTextSelection">
                            {playlist.owner?.display_name}
                        </span>
                        {/* name and followers need to stack on top of tracks when out of space */}
                        {playlist.followers.total > 0 && (
                            <span className="flex flex-row items-center">
                                <RxDotFilled />
                                {playlist.followers.total.toLocaleString()}
                                {playlist.followers.total > 1 ? ' likes' : ' like'}
                            </span>
                        )}

                        {playlist.tracks.items.length > 0 && (
                            <span className="flex flex-row items-center">
                                <RxDotFilled />
                                {playlist.tracks.total.toLocaleString()} songs
                            </span>
                        )}
                    </div>
                    {/* ignore owner image and playlist total time because too much of a pain */}
                </div>
            </div>
        </div>
    )
}