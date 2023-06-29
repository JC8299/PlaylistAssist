import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

import Search from "./Search";

function BodyHeader({ search, setSearch }) {
    return (
        <div
            className="
                p-[16px_24px]
                pb-0
            "
        >
            <div
                className="
                    w-full
                    mb-2
                    flex
                    items-center
                    justify-between
                "
            >
                <div
                    className="
                        hidden
                        md:flex
                        gap-x-2
                        items-center
                        self-start
                    "
                >
                    <button
                        className="
                            rounded-full
                            bg-black
                            flex
                            items-center
                            justify-center
                            hover:opacity-75
                            transition
                        "
                        onClick={() => {console.log('left')}}
                    >
                        <RxCaretLeft className="text-white" size={35} />
                    </button>
                    <button
                        className="
                            rounded-full
                            bg-black
                            flex
                            items-center
                            justify-center
                            hover:opacity-75
                            transition
                        "
                        onClick={() => {console.log('left')}}
                    >
                        <RxCaretRight className="text-white" size={35} />
                    </button>
                </div>

                <div
                    className="
                        flex
                        flex-row-reverse
                        grow
                        justify-start
                        items-center
                        gap-x-4
                    "
                >
                    <div className="flex flex-col grow-[.5] gap-2">
                        <Search search={search} setSearch={setSearch} />
                        <div className="flex flex-row gap-4 self-end">
                            <div className="bg-[#232323] rounded-full p-2 w-24 h-8 flex justify-center items-center">Playlists</div>
                            <div className="bg-[#232323] rounded-full p-2 w-24 h-8 flex justify-center items-center">Songs</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BodyHeader;