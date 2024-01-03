import Image from "next/image";

export default function LibraryCard({
    imageSrc, 
    imageAlt, 
    title, 
    description, 
    link }) {
    return (
        <li>
            <div
                    className="
                        grid
                        p-[8px]
                        grid-cols-[auto_1fr]
                        auto-rows-[auto_1fr_auto]
                        cursor-pointer
                        hover:bg-[#1a1a1a]
                        rounded-[4px]
                        gap-x-[8px]
                        gap-y-[12px]
                    "
                >
                    <div
                        className="
                            w-[48px]
                            h-[48px]
                            flex
                            shrink-0
                            shadow-[0_4px_60px_rgba(0,0,0,.5)]
                        "
                    >
                        <Image
                            className='rounded-[4px object-cover'
                            src={imageSrc}
                            alt={imageAlt}
                            fill={true}
                        />
                        {/* <img
                            className="rounded-[4px] object-cover"
                            src={imageSrc}
                            alt={imageAlt}
                        /> */}
                    </div>
                    <div
                        className="
                            flex
                            gap-[12px]
                            items-center
                            justify-between
                        "
                    >
                        <div
                            className="
                                flex
                                flex-col
                                gap-[2px]
                            "
                        >
                            <p
                                className="
                                    font-[400]
                                    text-[1rem]
                                    text-white
                                "
                            >
                                {title}
                            </p>
                            <p
                                className="
                                    text-[0.875rem]
                                    font-[400]
                                    text-[#a7a7a7]
                                "
                            >
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
        </li>
    )
}