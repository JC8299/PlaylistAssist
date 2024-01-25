import { redirect } from "next/navigation";

import { getAuthenticatedSession } from "@/utils/serverUtils";
import CustomScrollBar from "@/components/CustomScrollBar";
import { getArtistPage } from "@/actions";
import CenterPanelHeader from "@/components/CenterPanelHeader";

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
            </CenterPanelHeader>
            {/* artist header */}
            {/* images are circles */}
            {/* sometimes no circle but image is background */}

            {/* popular songs */}
            {/* artistTopTracks */}

            {/* discography */}
            {/* popular releases/singles and eps */}
            {/* artistAlbums */}
            {/* artistSingles */}
            {/* artistCompilation */}

            {/* featuring artist */}
            {/* not possible */}

            {/* similar artists */}
            {/* artistRelatedArtists */}

            {/* appears on */}
            {/* artistAppearsOn */}

            {/* discovered on */}
            {/* not possible */}

            {/* about */}
            {/* not possible */}
        </CustomScrollBar>
    );
}