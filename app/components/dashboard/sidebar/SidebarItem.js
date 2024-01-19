'use client'

import Link from "next/link";
import { GrHomeRounded } from "react-icons/gr";
import { LuSearch } from "react-icons/lu";

export default function SidebarItem({
    path,
}) {
    return (
        <Link href={`${path === 'Home' ? '/' : '/search'}`}>
            <div
                className="flex flex-row h-auto items-center w-full gap-x-5 text-md font-medium transition py-1 cursor-pointer text-[#a7a7a7] hover:text-[white]"
            >
                {path === 'Home' ?
                    <GrHomeRounded size={24} />
                    :
                    <LuSearch size={24} />
                }
                <p className="w-full h-[22px] font-bold">{path}</p>
            </div>
        </Link>
    )
}