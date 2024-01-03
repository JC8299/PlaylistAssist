'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function TrackList({
    tracks,
}) {
    return (
        <div>
            {/* Header */}
            <div>
                <div>#</div>

                <div>Title</div>

                <div>Album</div>

                {/* need a thing for existing in other playlist */}
                {/* would be one for already in and one for already added but not saved */}
                <div></div>

                {/* need a clock icon */}
                <div></div>
            </div>

            {/* divider */}
            <div></div>

            {/* table */}
            <div>
                {tracks?.map((track, index) => (
                    <div>
                        {/* check if i want the player in, need to replace this if do */}
                        <p>{index + 1}</p>

                        {/* track image */}
                        <div>
                            {track.album.images && track.album.images.length > 0 ? (
                                <div>
                                    <Image
                                        src={track.album.images?.[0].url}
                                        alt={track.name}
                                        height={40}
                                        width={40}
                                    />
                                </div>
                            ) : (
                                <div>placeholder images here</div>
                            )}
                        </div>

                        {/* track name + track description */}
                        {/* need to figure out what to do when track is clicked */}
                        <div>
                            <Link
                                href={`/tracks/${track.id}`}>
                                <p>{track.name}</p>
                            </Link>
                            
                            <div>
                                <p>
                                    {track.artists.map((artist, index) => (
                                        <Link
                                            key={artist.id + track.id}
                                            href={`/artists/${artist.id}`}
                                        >
                                            {index !== 0 ? `, ${artist.name}` : artist.name}
                                        </Link>
                                    ))}
                                </p>
                            </div>
                        </div>

                        {/* track album name */}
                        <div>
                            <Link
                                href={`/albums/${track.album.id}`}
                            >
                                {track.album.name}
                            </Link>
                        </div>
                        
                        {/* track duration */}
                        <p>{track.duration_ms}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}