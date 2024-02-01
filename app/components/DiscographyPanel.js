'use client'

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { LuUser2 } from "react-icons/lu";

import styles from "@/styles/centerPanelHeader.module.css";
import { RiMusic2Line } from "react-icons/ri";
import Link from "next/link";
import TrackList from "./TrackList";

export default function DiscographyPanel({
    albums,
    artist,
}) {
    const {data: session} = useSession();
    const router = useRouter();
    const [scrollBackground, setScrollBackground] = useState(false);
    const [albumTitle, setAlbumTitle] = useState(0);
    const [showAlbumTitle, setShowAlbumTitle] = useState(false);

    useEffect(() => {
        const content = document.getElementById('center');
        const albums = document.getElementsByClassName('album');
        const albumHeaders = document.getElementsByClassName('albumHeader');

        let albumHeaderOffsetTop = [];
        let albumClientHeight = [];
        for (let i = 0; i < albumHeaders.length; i++) {
            albumHeaderOffsetTop.push(albumHeaders[i].offsetTop);
            albumClientHeight.push(albums[i].clientHeight);
        }

        const handleHeader = () => {
            if (content.scrollTop < 32) {
                setScrollBackground(false);
            } else {
                setScrollBackground(true);
            }

            if (content.scrollTop + 100 < 128 + 164) {
                setShowAlbumTitle(false);
            } else if (content.scrollTop + 100 > albumHeaderOffsetTop[albumTitle] + 164) {
                setShowAlbumTitle(true);
                if (content.scrollTop + 100 > albumHeaderOffsetTop[albumTitle] + albumClientHeight[albumTitle]) {
                    setShowAlbumTitle(false);
                    setAlbumTitle(albumTitle+1);
                }
            } else if (albumTitle !== 0) {
                if (content.scrollTop + 100 < albumHeaderOffsetTop[albumTitle-1] + albumClientHeight[albumTitle-1]) {
                    setAlbumTitle(albumTitle-1);
                    setShowAlbumTitle(true);
                }
            }
        };

        content.addEventListener('scroll', handleHeader);

        return () => {
            content.removeEventListener('scroll', handleHeader);
        }
    }, [scrollBackground, showAlbumTitle, albumTitle]);

    if (!albums || !artist) return;

    return (
        <div>
            <div className={(scrollBackground ? styles.headerBackground : styles.header) + " flex flex-row sticky top-0 z-10 box-border h-[64px]"}>
                <div className="relative flex flex-row gap-2 grow px-6 py-4 justify-between items-center">
                    <div className="flex flex-row gap-[8px]">
                        {/* buttons need to toggle opacity if you can click them */}
                        <button
                            className={styles.headerButtons}
                            onClick={() => router.back()}
                        >
                            <RxCaretLeft size={36} />
                        </button>
                        <button
                            className={styles.headerButtons}
                            onClick={() => router.forward()}
                        >
                            <RxCaretRight size={36} />
                        </button>
                    </div>

                    <div className={"flex flex-grow items-center text-2xl font-bold"}>
                        {artist?.name}
                    </div>

                    <Dropdown
                        placement="bottom-end"
                        triggerScaleOnOpen={false}
                        disableAnimation={true}
                        containerPadding={0}
                        shouldBlockScroll={false}
                        classNames={{
                            content: "bg-[#282828] rounded shadow-xl min-w-[160px] p-0"
                        }}
                    >
                        <DropdownTrigger>
                            <div className={styles.headerAccount + " flex rounded-full pl-1 pr-4 disableTextSelection cursor-pointer"}>
                                <div className={styles.headerAccountItems + " flex flex-row items-center gap-3"}>
                                    <div className="flex justify-center items-center h-8 w-8">
                                        {session?.user.image ? (
                                            <Image
                                                src={session?.user.image}
                                                className="object-cover rounded-full"
                                                alt={session?.user?.name}
                                                height={24}
                                                width={24}
                                            />
                                        ) : (
                                            <LuUser2 className="rounded-full h-6 w-6" />
                                        )}
                                    </div>

                                    <span>
                                        {session?.user.name}
                                    </span>
                                </div>
                            </div>
                        </DropdownTrigger>

                        <DropdownMenu
                            disableAnimation={true}
                            aria-label="Account Dropdown"
                            onAction={(key) => signOut()}
                        >
                            <DropdownItem
                                key="logout"
                                className="data-[hover=true]:bg-[#3e3e3e] rounded-sm text-[hsla(0,0,100%,.9)] text-sm font-normal text-left disableTextSelection"
                            >
                                Log out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                
                <div className={`flex flex-row items-center absolute top-[100%] bg-[#1a1a1a] h-[36px] w-full px-6 border-y border-[#252525] text-2xl font-bold ${showAlbumTitle ? "visible" : "invisible"}`}>
                    {albums[albumTitle].name}
                </div>
            </div>
            
            <div className="pt-8">
                {albums.map((album) => (
                    <div 
                        className="album flex flex-col pt-8"
                        key={album.id}
                    >
                        <div className="albumHeader flex items-end px-7 pb-8">
                            {album.images[0].url ? (
                                <div className="relative h-[132px] w-[132px] rounded mr-[clamp(16px,100%,24px)] z-0 aspect-square disableTextSelection">
                                    <Image
                                        src={album.images[0].url}
                                        alt={album.name}
                                        fill={true}
                                        className="object-cover rounded"
                                    />
                                </div>
                            ) : (
                                <div className="">
                                    <RiMusic2Line size={72} className="text-[#a7a7a7]" />
                                </div>
                            )}

                            <div className="flex flex-col justify-end w-full">
                                <Link
                                    href={`/albums/${album.id}`}
                                >
                                    <h1 className="text-4xl font-black leading-[normal] disableTextSelection">
                                        {album.name}
                                    </h1>
                                </Link>

                                <p className="text-sm font-normal mt-2">
                                    {`${album.album_type.charAt(0).toUpperCase()+album.album_type.slice(1)} • ${new Date(album.release_date).getFullYear()} • ${album.total_tracks.toLocaleString()} song${album.total_tracks.toLocaleString() > 1 ? 's' : ''}`}
                                </p>
                            </div>
                        </div>

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
                    </div>
                ))}
            </div>
        </div>
    );
}