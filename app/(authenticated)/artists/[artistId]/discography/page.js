import { redirect } from "next/navigation";

import { getArtistById, getArtistDiscography, getSeveralAlbumsById } from "@/actions";
import { getAuthenticatedSession } from "@/utils/serverUtils";
import CustomScrollBar from "@/components/CustomScrollBar";
import DiscographyPanel from "@/components/DiscographyPanel";

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
        title: `Playlist Assist - Discography`,
    };
}

export default async function DiscographyPage({
    params,
}) {
    const session = await getAuthenticatedSession();
    if (!session) redirect('/signin');

    const artistId = params.artistId;

    const [
        artist,
        artistAlbums,
        artistSingles,
        artistCompilation,
    ] = await getArtistDiscography(session, artistId);

    // sorting albums (return values are opposite to reverse sort)
    let orderedAlbums = [
        ...artistAlbums.items,
        ...artistSingles.items,
        ...artistCompilation.items].sort((a, b) => {
            if (a.release_date < b.release_date) {
                return 1;
            } else if (a.release_date > b.release_date) {
                return -1;
            } else {
                return 0;
            }
        });

    const albumList = await getSeveralAlbumsById(
        session,
        orderedAlbums.map((album) => album.id)
    );

    return (
        <CustomScrollBar contentId={'center'}>
            <DiscographyPanel
                albums={albumList.albums}
                artist={artist}
            />
        </CustomScrollBar>
    );
}