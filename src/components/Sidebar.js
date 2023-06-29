import { useSession } from "next-auth/react";
import { useEffect } from "react";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Playlist from "./Playlist";
import Library from "./Library";
import Logout from "./Logout";

function Sidebar({ children, spotifyApi }) {
    const {data: session } = useSession();
    const accessToken = session?.accessToken;

    useEffect(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    return (
        <div className="flex h-full">
            <div
                className="
                    hidden
                    md:flex
                    flex-col
                    gap-y-2
                    bg-black
                    h-full
                    w-full
                "
            >
                <Box>
                    <div
                        className="
                            flex
                            flex-col
                            gap-y-4
                            px-5
                            py-4
                        "
                    >
                        <SidebarItem
                            icon={session.user.image}
                            label={session.user.name} 
                        />
                        <SidebarItem
                            // Maybe make dropdown from user instead
                            label={session.user.email}
                        />
                        <Logout />
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    <Library spotifyApi={spotifyApi} />
                </Box>
            </div>
        </div>
    )
}

export default Sidebar;