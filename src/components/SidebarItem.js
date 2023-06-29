function SidebarItem({ icon, label }) {
    return (
        <div
            className={`
                flex
                flex-row
                h-auto
                items-center
                w-full
                gap-x-4
                text-md
                font-medium
                transition
                py-1
                ${icon ? "text-white" : "hover:text-white text-neutral-400 cursor-pointer" }
            `}
        >
            {icon ? 
                <img
                    src={icon}
                    alt="image"
                    className="rounded-full w-[26px] h-[26px]"
                />
                :
                <div className="w-[26px]"></div>
            }
            <p className="truncate w-full">{label}</p>
        </div>
    )
}

export default SidebarItem;