'use client'

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import styles from "@/styles/dashboardPanelLayout.module.css";
import Box from "../Box";

export default function DashboardPanelLayout({
    defaultLayout = [15,55,30],
    children,
}) {
    const onLayout = (sizes) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
    };
    
    return (
        <div className="flex flex-row w-full gap-[8px] h-full p-2 justify-stretch">
            <PanelGroup direction="horizontal" onLayout={onLayout}>
                <Panel defaultSize={defaultLayout[0]}>
                    {children[0]}
                </Panel>

                <PanelResizeHandle className={styles.resizer}>
                    <div className={`${styles.resizerBar} ${styles.left}`} />
                </PanelResizeHandle>
                <div className="w-[3px]" />

                <Panel defaultSize={defaultLayout[1]}>
                    <Box className={'h-full flex flex-col'}>
                        {children[1]}
                    </Box>
                </Panel>

                <div className="w-[3px]" />
                <PanelResizeHandle className={styles.resizer}>
                    <div className={`${styles.resizerBar} ${styles.right}`} />
                </PanelResizeHandle>

                {/* TODO: need to add min and max size and collapse the left side */}
                <Panel defaultSize={defaultLayout[2]}>
                    {children[2]}
                </Panel>
            </PanelGroup>
        </div>
    )
}