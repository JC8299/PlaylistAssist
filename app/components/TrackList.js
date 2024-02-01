'use client'

import Image from "next/image";
import Link from "next/link";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import { LuClock3 } from "react-icons/lu";
import { FaRegArrowAltCircleRight, FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { LuMusic3 } from "react-icons/lu";

import styles from "@/styles/trackList.module.css";

export default function TrackList({
    tracks,
    playlist = false,
}) {
    function msToMinAndSecs(ms) {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        return (
            seconds === 60 ?
            (minutes+1) + ':00' :
            minutes + ':' + (seconds < 10 ? '0' : '') + seconds
        );
    }

    function getDateAdded(dateAdded) {
        const added = new Date(dateAdded);
        const diff = Math.round((Date.now() - added)/(1000*60*60*24));

        if (diff < 28) {
            if (diff < 7) {
                return `${diff} days ago`;
            }
            return `${Math.floor(diff/7)} weeks ago`;
        }

        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ]

        return `${months[added.getMonth()]} ${added.getDate()}, ${added.getFullYear()}`;
    }

    return (
        <div className="px-6">
            {/* Header */}
            <div className={`${playlist ? styles.trackColumnsPlaylist : styles.trackColumns} ${styles.trackRowHeader}`}>
                <div className="justify-self-center">
                    #
                </div>

                <div>
                    Title
                </div>

                {playlist && (
                    <>
                        <div>
                            Album
                        </div>

                        <div>
                            Date Added
                        </div>
                    </>
                )}

                <div className="flex items-center justify-end mr-8">
                    <LuClock3 />
                </div>
            </div>
            {/* divider */}
            <div className={`${styles.trackFullRow} border-t border-[#252525] pb-[15px]`} />

            {/* table */}
            <div className={styles.trackFullRow + "mt-2 disableTextSelection"}>
                {tracks?.map((item, index) => (
                    <div 
                        className={`${playlist ? styles.trackColumnsPlaylist : styles.trackColumns} ${styles.trackRow}`}
                        key={item.track.id + index + 1}
                    >
                        {/* check if i want the player in, need to replace this if do */}
                        <div className={styles.trackRowText + " flex items-center justify-self-center"}>
                            {index + 1}
                        </div>

                        <div className="flex flex-row gap-3 items-center">
                            {/* track image */}
                            {playlist && 
                            (<div className="h-[40px] w-[40px] flex-shrink-0">
                                {item.track.album.images && item.track.album.images.length > 0 ? (
                                    <Image
                                        src={item.track.album.images[0].url}
                                        alt={item.track.name}
                                        height={40}
                                        width={40}
                                        className="rounded"
                                    />
                                ) : (
                                    <div className="flex justify-center items-center bg-[#282828] rounded h-[40px] w-[40px]">
                                        <LuMusic3
                                            size={16}
                                            className="text-[#a7a7a7]"
                                        />
                                    </div>
                                )}
                            </div>)}

                            {/* track name + track description */}
                            {/* need to figure out what to do when track is clicked */}
                            <div className="truncate">
                                <Link
                                    href={`/tracks/${item.track.id}`}
                                    className="hover:underline truncate text-white"
                                >
                                    {item.track.name}
                                </Link>
                                
                                <div 
                                    className={styles.trackRowText + " flex flex-row truncate"}
                                >
                                    <span className="truncate">
                                        {item.track.artists.map((artist, index) => [
                                            index > 0 && ', ',
                                        
                                            <Link
                                                key={artist.id + item.track.id}
                                                href={`/artists/${artist.id}`}
                                                className="hover:underline"
                                            >
                                                {artist.name}
                                            </Link>
                                        ])}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {playlist && (
                            <>
                                {/* track album name */}
                                <div className={styles.trackRowText + " flex items-center truncate"}>
                                    <Link
                                        href={`/albums/${item.track.album.id}`}
                                        className="hover:underline truncate"
                                    >
                                        {item.track.album.name}
                                    </Link>
                                </div>

                                {/* track date added */}
                                <div className="flex flex-row items">
                                    {item.added_at && (
                                        getDateAdded(item.added_at)
                                    )}
                                </div>
                            </>
                        )}


                        {/* track added to target playlist */}
                        {/* combining these two together */}
                        {/* track duration */}
                        <div className="flex flex-row items-center justify-end gap-3">
                            <button className="mr-4">
                                {index === 0 ? 
                                <FaRegCircle className="text-[#a7a7a7] hover:text-white"/>
                                :
                                // <FaRegArrowAltCircleRight className="text-[#1db954]"/>
                                <FaRegCheckCircle className="text-[#1db954]" />
                                }
                            </button>

                            <p>
                                {msToMinAndSecs(item.track.duration_ms)}
                            </p>

                            <Dropdown
                                placement="bottom-end"
                                disableAnimation={true}
                            >
                                <DropdownTrigger
                                    className={styles.trackRowOptions}
                                >
                                    <div className="hover:text-white cursor-pointer">
                                        <IoEllipsisHorizontal />
                                    </div>
                                </DropdownTrigger>

                                <DropdownMenu
                                    disableAnimation={true}
                                    aria-label="Track options"
                                >
                                    <DropdownSection>
                                        <DropdownItem>option 1</DropdownItem>
                                        <DropdownItem>option 2</DropdownItem>
                                        <DropdownItem>option 3</DropdownItem>
                                    </DropdownSection>
                                    <DropdownSection>
                                        <DropdownItem>option 4</DropdownItem>
                                        <DropdownItem>option 5</DropdownItem>
                                        <DropdownItem>option 6</DropdownItem>
                                    </DropdownSection>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}