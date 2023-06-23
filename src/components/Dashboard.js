import SpotifyWebApi from "spotify-web-api-node";

import Body from "./Body";
import Playlist from "./Playlist";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
});

function Dashboard() {
    return (
        <main>
            <Body spotifyApi={spotifyApi} />
            <Playlist spotifyApi={spotifyApi} />
        </main>
    )
}

export default Dashboard;