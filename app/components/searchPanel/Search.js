'use client'

import { HiSearch } from "react-icons/hi"

export default function Search({ search, setSearch }) {
    return (
        <div className="max-w-[1150px] bg-[#1a1a1a] rounded-full overflow-hidden border-2 border-[#333333] p-1 px-5 flex items-center">
            <div className="h-6 w-6 flex-shrink-0 flex items-center justify-center">
                <HiSearch size={36} />
            </div>
            <input
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#1a1a1a] text-white border-none lg:w-full focus:ring-0 outline-none placeholder-[#fafafa] text-xs"
                placeholder="Search..."
            />
        </div>
    )
}