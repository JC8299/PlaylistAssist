import SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Body from "./Body";
import Playlist from "./Playlist";
import Card from "./Card";
import Box from "./Box";
import Sidebar from "./Sidebar";
import Loader from "./Loader";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
});

function Dashboard() {
    const { data: session } = useSession();
    const { accessToken } = session;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);
        setLoaded(true);
    }, [accessToken]);

    if (!loaded) return (<Loader />);

    return (
        <main className="h-[100vh] w-[100vw]">
            <div className="flex flex-row w-full gap-[8px] h-full p-2 justify-stretch">
                <div className="grow-[.5]">
                    <Sidebar spotifyApi={spotifyApi}/>
                </div>
                <div className="grow">
                    <Body spotifyApi={spotifyApi} />
                </div>
                <div className="grow-[.5]">
                    {/* placeholder for songs to be added before hitting save */}
                    <Sidebar spotifyApi={spotifyApi}/>
                </div>
            </div>
        </main>
    )
}

export default Dashboard;