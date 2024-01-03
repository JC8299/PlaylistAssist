import Box from "../../Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import Logout from "../../Logout";
import { getAuthenticatedSession } from "@/utils/serverUtils";

export default async function Sidebar({ children }) {
    const session = await getAuthenticatedSession();

    return (
        <div className="flex h-full disableTextSelection">
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
                    <Library />
                </Box>
            </div>
        </div>
    )
}