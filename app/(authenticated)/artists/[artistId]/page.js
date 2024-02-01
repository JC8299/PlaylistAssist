import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LuMusic3 } from "react-icons/lu";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { FaRegCircle, FaRegArrowAltCircleRight, FaRegCheckCircle } from "react-icons/fa";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";

import { getAuthenticatedSession } from "@/utils/serverUtils";
import CustomScrollBar from "@/components/CustomScrollBar";
import { getArtistById, getArtistPage } from "@/actions";
import CenterPanelHeader from "@/components/CenterPanelHeader";
import ArtistHeader from "@/components/ArtistHeader";
import CardGrid from "@/components/CardGrid";
import styles from "@/styles/trackList.module.css";

export async function generateMetadata({ params }) {
    const session = getAuthenticatedSession();
    if (!session) {
        return {
            title: 'Error in loading artist data',
        };
    }

    const artistId = params.artistId;
    const artist = await getArtistById(session, artistId);
    
    return {
        title: `Playlist Assist - ${artist.name}`,
    };
}

export default async function ArtistPage({
    params,
}) {
    const session = await getAuthenticatedSession();
    if (!session) redirect('/signin');

    const artistId = params.artistId;

    // get all artist data from api
    const [
        artist,
        artistTopTracks,
        artistAlbums,
        artistSingles,
        artistCompilation,
        relatedArtists,
        artistAppearsOn,
    ] = await getArtistPage(session, artistId);

    function msToMinAndSecs(ms) {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        return (
            seconds === 60 ?
            (minutes+1) + ':00' :
            minutes + ':' + (seconds < 10 ? '0' : '') + seconds
        );
    }

    return (
        <CustomScrollBar contentId={'center'}>
            <CenterPanelHeader hide={true}>
                <div className="flex flex-row gap-2 text-2xl font-bold items-center">
                    {/* placeholder button */}
                    <div className="flex flex-row justify-center items-center h-[48px] w-[48px] bg-[#1db954] rounded-full">
                        <TbPlayerPlayFilled size={24} className="text-black" />
                    </div>
                    <span>
                        {artist?.name}
                    </span>
                </div>
                <></>
            </CenterPanelHeader>

            <ArtistHeader
                imageUrl={artist?.images?.length > 0 && artist?.images[0].url}
                imageAlt={artist?.name}
                name={artist?.name}
                details={`${artist?.followers.total.toLocaleString()} followers`}
            />

            {/* popular songs */}
            {/* artistTopTracks */}
            <div className="px-6">
                <h2 className="text-2xl font-bold mb-4">
                    Popular
                </h2>

                <div>
                    {artistTopTracks.tracks.map((track, index) => (
                        <div
                            className={`${styles.trackColumns} ${styles.trackRow} h-[54px]`}
                            key={track.id + index + 1}
                        >
                            <div className={styles.trackRowText + " flex items-center justify-self-center"}>
                                {index + 1}
                            </div>

                            <div className="flex flex-row gap-3 items-center">
                                {/* image */}
                                <div className="h-[40px] w-[40px] flex-shrink-0">
                                    {track.album.images && track.album.images.length > 0 ? (
                                        <Image
                                            src={track.album.images[0].url}
                                            alt={track.name}
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
                                </div>

                                {/* track name */}
                                <div className="truncate">
                                    <Link
                                        href={`/tracks/${track.id}`}
                                        className="hover:underline truncate text-white"
                                    >
                                        {track.name}
                                    </Link>
                                </div>
                            </div>

                            {/* track added, track duration, options */}
                            <div className="flex flex-row items-center justify-end gap-3">
                                <button className="mr-4">
                                    <FaRegCircle className="text-[#a7a7a7] hover:text-white" />
                                    {/* <FaRegArrowAltCircleRight className="text-[#1db954]" /> */}
                                    {/* <FaRegCheckCircle className="text-[#1db954]" /> */}
                                </button>

                                <p>
                                    {msToMinAndSecs(track.duration_ms)}
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

            {/* discography */}
            {/* popular releases/singles and eps */}
            {/* artistAlbums */}
            {/* artistSingles */}
            {/* artistCompilation */}
            <div className="p-6">
                <div className="flex flex-row grow justify-between">
                    <h2 className="text-2xl font-bold mb-4">
                        Discography
                    </h2>

                    <Link
                        href={`/artists/${artistId}/discography`}
                        className="hover:underline text-[#a7a7a7] text-sm font-bold"
                    >
                        Show all
                    </Link>
                </div>

                <div>
                    <CardGrid
                        cardContent={[
                            ...artistAlbums.items,
                            ...artistSingles.items,
                            ...artistCompilation.items].map((album) => (
                                {
                                    image: album.images[0].url,
                                    name: album.name,
                                    description: `${(new Date(album.release_date).getFullYear())} • ${album.album_type.charAt(0).toUpperCase()+album.album_type.slice(1)}`,
                                    link: `/albums/${album.id}`,
                                    id: album.id,
                                }
                            ))
                        }
                        shrink={true}
                    />
                </div>
            </div>
            
            {/* similar artists */}
            {/* artistRelatedArtists */}
            <div className="p-6">
                <div className="flex flex-row grow justify-between">
                    <h2 className="text-2xl font-bold mb-4">
                        Fans also like
                    </h2>

                    <Link
                        href={`/artists/${artistId}/related`}
                        className="hover:underline text-[#a7a7a7] text-sm font-bold"
                    >
                        Show all
                    </Link>
                </div>

                <CardGrid
                    cardContent={relatedArtists.artists.map((artist) => {
                        return {
                            image: artist.images[0].url,
                            name: artist.name,
                            description: 'Artist',
                            link: `/artist/${artist.id}`,
                            id: artist.id,
                        };
                    })}
                    shrink={true}
                />
            </div>

            {/* appears on */}
            {/* artistAppearsOn */}
            <div className="p-6">
                <div className="flex flex-row grow justify-between">
                    <h2 className="text-2xl font-bold mb-4">
                        Appears On
                    </h2>

                    <Link
                        href={`/artists/${artistId}/appears-on`}
                        className="hover:underline text-[#a7a7a7] text-sm font-bold"
                    >
                        Show all
                    </Link>
                </div>

                <div>
                    <CardGrid
                        cardContent={artistAppearsOn.items.map((album) => {
                            return {
                                image: album.images[0].url,
                                name: album.name,
                                description: `${(new Date(album.release_date).getFullYear())} • ${album.album_type.charAt(0).toUpperCase()+album.album_type.slice(1)}`,
                                link: `/albums/${album.id}`,
                                id: album.id,
                            };
                        })}
                        shrink={true}
                    />
                </div>
            </div>
        </CustomScrollBar>
    );
}