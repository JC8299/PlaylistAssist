'use client'

import Image from "next/image";
import Link from "next/link";
import { RxDotFilled } from "react-icons/rx";
import { RiMusic2Line } from "react-icons/ri";
import { useEffect, useState } from "react";

import styles from "@/styles/songsHeader.module.css";

export default function SongsHeader({
    imageUrl = '',
    imageAlt = '',
    type,
    name,
    description = '',
    ownerName,
    ownerId = '',
    details = '',
    trackAmount,
}) {
    const [mediumTitleWidth, setMediumTitleWidth] = useState(0);
    const [largeTitleWidth, setLargeTitleWidth] = useState(0);
    const [currentSize, setCurrentSize] = useState('large');

    function handleResize(textContainerElement) {
        const titleElement = document.getElementById('headerTitle');
        const textContainerWidth = textContainerElement.clientWidth;

        if (titleElement === null) return;

        if (currentSize === 'large' && titleElement.style.fontSize !== '6rem') {
            titleElement.style.fontSize = '6rem';
        }

        if (titleElement.scrollWidth >= textContainerWidth) {
            switch (currentSize) {
                case 'large':
                    if (largeTitleWidth === 0) {
                        setLargeTitleWidth(titleElement.scrollWidth);
                        titleElement.style.fontSize = '4rem';

                        if (titleElement.scrollWidth >= textContainerWidth) {
                            if (mediumTitleWidth === 0) {
                                setMediumTitleWidth(titleElement.scrollWidth);
                            }
                            titleElement.style.fontSize = '2rem';
                            titleElement.style.overflowWrap = 'break-word';
                            titleElement.style.wordBreak = 'break-word';
                            setCurrentSize('small');
                        }
                    } else {
                        titleElement.style.fontSize = '4rem';
                        setCurrentSize('medium');
                    }
                    break;
                case 'medium':
                    if (mediumTitleWidth === 0) {
                        setMediumTitleWidth(titleElement.scrollWidth);
                    }
                    titleElement.style.fontSize = '2rem';
                    titleElement.style.overflowWrap = 'break-word';
                    titleElement.style.wordBreak = 'break-word';
                    setCurrentSize('small');
                    break;
                default:
                    break;
            }
        } else if (currentSize !== 'large') {
            if (
                (currentSize === 'medium' && titleElement.scrollWidth > largeTitleWidth) ||
                (currentSize === 'small' && titleElement.scrollWidth > mediumTitleWidth)
            ) {
                switch (currentSize) {
                    case 'medium':
                        titleElement.style.fontSize = '6rem';
                        setCurrentSize('large');
                        break;
                    case 'small':
                        titleElement.style.fontSize = '4rem';
                        titleElement.style.overflowWrap = 'normal';
                        titleElement.style.wordBreak = 'normal';
                        setCurrentSize('medium');
                        break;
                    default:
                        break;
                }
            }
        }
    }

    useEffect(() => {
        const textContainerElement = document.getElementById('headerTextContainer');

        const resizeObserver = new ResizeObserver(() => {
            handleResize(textContainerElement);
        });

        resizeObserver.observe(textContainerElement);
        handleResize(textContainerElement);

        return () => {
            resizeObserver.unobserve(textContainerElement);
        }
    }, []);

    return (
        <div className="flex flex-col pt-5">
            <div className={styles.headerContainer}>
                {imageUrl ? (
                    <div className={styles.headerImage + " disableTextSelection"}>
                        <Image
                            src={imageUrl}
                            alt={imageAlt}
                            fill={true}
                            className="object-cover rounded"
                        />
                    </div>
                ) : (
                    <div className={styles.headerImage + " w-full flex justify-center items-center bg-[#282828] rounded shadow-2xl shadow-black"}>
                        <RiMusic2Line size={72} className="text-[#a7a7a7]" />
                    </div>
                )}

                <div className="flex flex-col justify-end font-normal text-sm w-full">
                    {/* playlist/album type */}
                    <p>
                        {type}
                    </p>

                    {/* playlist/album name */}
                    <div
                        id="headerTextContainer"
                        className="flex flex-row mt-[0.08em] mb-[0.12em] w-full overflow-hidden"
                    >
                        <h1
                            id="headerTitle"
                            className="font-black leading-[normal] disableTextSelection"
                        >
                            {name}
                        </h1>
                    </div>

                    {/* playlist/album description */}
                    {description && (
                        <p className="max=h-[74px]">
                            {description}
                        </p>
                    )}

                    {/* playlist owner, followers, amount of tracks */}
                    {/* album artist, release year, amount of tracks */}
                    <div className="flex flex-row items-center mt-[8px] font-normal text-sm flex-wrap">
                        <span className="disableTextSelection">
                            {/* No link for 'Various Artists' */}
                            {ownerId && ownerId !== '0LyfQWJT6nXafLPZqxe9Of' ? (
                                <Link
                                    href={`/artists/${ownerId}`}
                                    className="hover:underline"
                                >
                                    {ownerName}
                                </Link>
                            ) : (
                                <>
                                    {ownerName}
                                </>
                            )}
                        </span>

                        {details && (
                            <span className="flex flex-row items-center">
                                <RxDotFilled />
                                {details}
                            </span>
                        )}

                        {trackAmount && (
                            <span className="flex flex-row items-center">
                                <RxDotFilled />
                                {trackAmount}
                            </span>
                        )}
                    </div>
                    {/* ignoring owner image and total time because too much work */}
                </div>
            </div>
        </div>
    );
}