import { redirect } from "next/navigation";

import { getArtistById, getRelatedArtists } from "@/actions";
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
        title: `Playlist Assist - Artists Fans of ${artist.name} also like`,
    };
}

export default async function RelatedArtistsPage({
    params,
}) {
    const session = await getAuthenticatedSession();
    if (!session) redirect('/signin');

    const artistId = params.artistId;

    const relatedArtists = await getRelatedArtists(session, artistId);

    return (
        <CustomScrollBar contentId={'center'}>
            <CenterPanelHeader hide={true}>
                <div />
            </CenterPanelHeader>

            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 pt-5">
                    Fans also like
                </h2>

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
                />
            </div>
        </CustomScrollBar>
    );
}