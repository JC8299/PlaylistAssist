import SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { RiPlayListAddFill } from "react-icons/ri";
import { Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels"

import Body from "./Body";
import Playlist from "./Playlist";
import Card from "./Card";
import Box from "./Box";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import styles from "../styles/dashboard.module.css"

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
            <PanelGroup direction="horizontal">
                <Panel defaultSize={20}>
                    <Sidebar spotifyApi={spotifyApi}/>
                </Panel>

                <PanelResizeHandle className={styles.resizer}>
                    <div className={`${styles.resizerBar} ${styles.left}`} />
                </PanelResizeHandle>
                <div className="w-[3px]" />

                <Panel>
                    <Body spotifyApi={spotifyApi} />
                </Panel>

                <div className="w-[3px]" />
                <PanelResizeHandle className={styles.resizer}>
                    <div className={`${styles.resizerBar} ${styles.right}`} />
                </PanelResizeHandle>
                {/* TODO: need to add min and max size and collapse the left side */}
                <Panel defaultSize={20}>
                    {/* placeholder for songs to be added before hitting save */}
                    {/* move this stuff out later */}
                    {/* use LuMusic3 for similar looking music note */}

                    <Box className={'h-full flex flex-col disableTextSelection'}>
                        <div className="flex items-center justify-between px-5 pt-4">
                            <div className="inline-flex items-center gap-x-2">
                                <RiPlayListAddFill className="text-neutral-400" size={22} />
                                <p className="text-neutral-400 font-medium text-md">
                                    Add Songs to _____________
                                </p>
                            </div>
                        </div>
                        <button className="mt-auto m-4 rounded-full bg-[#1db954]">
                            Save
                        </button>
                    </Box>
                </Panel>
            </PanelGroup>
            </div>
        </main>
    )
}

export default Dashboard;