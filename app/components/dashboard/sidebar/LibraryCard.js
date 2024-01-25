import Image from "next/image";
import Link from "next/link";
import { RiMusic2Line } from "react-icons/ri";

export default function LibraryCard({
    imageSrc, 
    imageAlt, 
    title, 
    description, 
    link }) {
    return (
        <li>
            <Link href={link}>
                <div className="grid p-[8px] grid-cols-[auto_1fr] auto-rows-[auto_1fr_auto] cursor-pointer hover:bg-[#1a1a1a] rounded-[4px] gap-x-[8px] gap-y-[12px]">
                    <div className="w-[48px] h-[48px] flex shrink-0 shadow-[0_4px_60px_rgba(0,0,0,.5)]">
                        {imageSrc != null ?
                            <Image
                                className="rounded-[4px] object-cover"
                                src={imageSrc}
                                alt={imageAlt}
                                width={48}
                                height={48}
                            />
                            :
                            <div className="flex justify-center items-center w-full h-full bg-[#282828] rounded-[4px]">
                                <RiMusic2Line size={24} className="text-[#a7a7a7]"/>
                            </div>
                        }
                    </div>

                    <div className="flex flex-col gap-[2px] overflow-hidden">
                        <p className="font-[400] text-[1rem] text-white overflow-hidden text-ellipsis">
                            {title}
                        </p>

                        <p className="text-[0.875rem] font-[400] text-[#a7a7a7]overflow-hidden text-ellipsis">
                            {description}
                        </p>
                    </div>
                </div>
            </Link>
        </li>
    )
}