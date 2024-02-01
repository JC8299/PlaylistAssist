'use client'

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { LuUser2 } from "react-icons/lu";

import styles from "@/styles/centerPanelHeader.module.css";

export default function CenterPanelHeader({
    children,
    hide = false,
}) {
    const { data: session } = useSession();
    const router = useRouter();
    const [scrollBackground, setScrollBackground] = useState(false);
    const [scrollHeaderBar, setScrollHeaderBar] = useState(false);

    useEffect(() => {
        const content = document.getElementById('center');

        const handleHeader = () => {
            if (content.scrollTop < 258) {
                setScrollBackground(false);
                setScrollHeaderBar(false);
            } else {
                setScrollBackground(true);
                if (content.scrollTop > 286) {
                    setScrollHeaderBar(true);
                }
            }
        };

        content.addEventListener('scroll', handleHeader);

        return () => {
            content.removeEventListener('scroll', handleHeader);
        };
    }, [scrollBackground, scrollHeaderBar]);

    return (
        <div className={(scrollBackground ? styles.headerBackground : styles.header) + " flex flex-row sticky top-0 z-10 box-border h-[64px]"}>
            <div className="relative flex flex-row gap-2 grow px-6 py-4 justify-between items-center">
                <div className="flex flex-row gap-[8px]">
                    {/* buttons need to toggle opacity if you can click them */}
                    <button
                        className={styles.headerButtons}
                        onClick={() => router.back()}
                    >
                        <RxCaretLeft size={36} />
                    </button>
                    <button
                        className={styles.headerButtons}
                        onClick={() => router.forward()}
                    >
                        <RxCaretRight size={36} />
                    </button>
                    {/* maybe have children in here to put search next to buttons */}
                </div>

                <div className={styles.headerCenter + ` flex flex-grow items-center ${hide ? (scrollBackground ? "visible opacity-100" : "invisible opacity-0") : "visible"}`}>
                    {children[0]}
                </div>

                <Dropdown
                    placement="bottom-end"
                    triggerScaleOnOpen={false}
                    disableAnimation={true}
                    containerPadding={0}
                    shouldBlockScroll={false}
                    classNames={{
                        content: "bg-[#282828] rounded shadow-xl min-w-[160px] p-0"
                    }}
                >
                    <DropdownTrigger>
                        <div className={styles.headerAccount + " flex rounded-full pl-1 pr-4 disableTextSelection cursor-pointer"}>
                            <div className={styles.headerAccountItems + " flex flex-row items-center gap-3"}>
                                <div className="flex justify-center items-center h-8 w-8">
                                    {session?.user.image ? (
                                        <Image
                                            src={session?.user.image}
                                            className="object-cover rounded-full"
                                            alt={session?.user?.name}
                                            height={24}
                                            width={24}
                                        />
                                    ) : (
                                        <LuUser2 className="rounded-full h-6 w-6" />
                                    )}
                                </div>

                                <span>
                                    {session?.user.name}
                                </span>
                            </div>
                        </div>
                    </DropdownTrigger>

                    <DropdownMenu
                        disableAnimation={true}
                        aria-label="Account Dropdown"
                        onAction={(key) => signOut()}
                    >
                        <DropdownItem
                            key="logout"
                            className="data-[hover=true]:bg-[#3e3e3e] rounded-sm text-[hsla(0,0,100%,.9)] text-sm font-normal text-left disableTextSelection"
                        >
                            Log out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            {children[1] ? (
                <div className={styles.headerBar + ` flex flex-row items-center absolute top-[100%] bg-[#1a1a1a] h-[36px] w-full px-6 border-y border-[#252525] ${scrollHeaderBar ? "visible opacity-100" : "invisible opacity-0"}`}>
                    {children[1]}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}