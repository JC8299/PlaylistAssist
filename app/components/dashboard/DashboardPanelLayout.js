'use client'

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import styles from "@/styles/dashboardPanelLayout.module.css";
import Box from "../Box";

export default function DashboardPanelLayout({
    children,
}) {
    // WARNING: Panel defaultSize prop recommended to avoid layout shift after server rendering
    return (
        <div className="flex flex-row w-full gap-[8px] h-full p-2 justify-stretch">
            <PanelGroup direction="horizontal">
                <Panel defaultSize={20}>
                    {children[0]}
                </Panel>

                <PanelResizeHandle className={styles.resizer}>
                    <div className={`${styles.resizerBar} ${styles.left}`} />
                </PanelResizeHandle>
                <div className="w-[3px]" />

                <Panel>
                    <Box className={'h-full flex flex-col'}>
                        {children[1]}
                    </Box>
                </Panel>

                <div className="w-[3px]" />
                <PanelResizeHandle className={styles.resizer}>
                    <div className={`${styles.resizerBar} ${styles.right}`} />
                </PanelResizeHandle>

                {/* TODO: need to add min and max size and collapse the left side */}
                <Panel defaultSize={20}>
                    {children[2]}
                </Panel>
            </PanelGroup>
        </div>
    )
}