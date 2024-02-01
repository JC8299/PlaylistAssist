import { redirect } from "next/navigation";

import { getArtistAppearsOn, getArtistById } from "@/actions";
import { getAuthenticatedSession } from "@/utils/serverUtils";
import CenterPanelHeader from "@/components/CenterPanelHeader";
import CardGrid from "@/components/CardGrid";
import CustomScrollBar from "@/components/CustomScrollBar";

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
        title: `Playlist Assist - Releases ${artist.name} appears on`,
    };
}

export default async function AppearsOnPage({
    params,
}) {
    const session = await getAuthenticatedSession();
    if (!session) redirect('/signin');

    const artistId = params.artistId;

    const artistAppearsOn = await getArtistAppearsOn(session, artistId);

    return (
        <CustomScrollBar contentId={'center'}>
            <CenterPanelHeader hide={true}>
                <div />
            </CenterPanelHeader>

            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 pt-5">
                    Appears On
                </h2>

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
                />
            </div>
        </CustomScrollBar>
    );
}