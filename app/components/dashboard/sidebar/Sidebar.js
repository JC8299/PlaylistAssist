import Box from "@/components/Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { getAuthenticatedSession } from "@/utils/serverUtils"; 

export default async function Sidebar({ children }) {
    const session = await getAuthenticatedSession();

    if (!session) return null;

    return (
        <div className="flex h-full disableTextSelection">
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-full">
                <Box>
                    <div className="flex flex-col gap-y-4 px-6 py-4">
                        <SidebarItem path={'Home'} />
                        <SidebarItem path={'Search'} />
                    </div>
                </Box>
                <Box className="overflow-hidden h-full flex flex-col">
                    <Library />
                </Box>
            </div>
        </div>
    )
}