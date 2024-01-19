import { RiPlayListAddFill } from "react-icons/ri";
import { cookies } from "next/headers";

import Box from "../Box";
import Sidebar from "./sidebar/Sidebar";
import DashboardPanelLayout from "./DashboardPanelLayout";

export default function Dashboard({
    children,
}) {
    const layout = cookies().get('react-resizable-panels:layout');

    let defaultLayout;
    if (layout) {
        defaultLayout = JSON.parse(layout.value);
    }

    return (
        <main className="h-[100vh] w-[100vw]">
            <DashboardPanelLayout defaultLayout={defaultLayout}>
                <Sidebar />

                <Box className={'h-full flex flex-col'}>
                    {children}
                </Box>

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
            </DashboardPanelLayout>
        </main>
    )
}