'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { LuUser2 } from "react-icons/lu";

import styles from "@/styles/songsHeader.module.css";

export default function ArtistHeader({
    imageUrl = '',
    imageAlt = '',
    name,
    details = '',
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
                            className="object-cover rounded-full"
                        />
                    </div>
                ) : (
                    <div className={styles.headerImage + " w-full flex justify-center items-center bg-[#282828] rounded shadow-2xl shadow-black"}>
                        <LuUser2 size={72} className="text-[#a7a7a7]" />
                    </div>
                )}

                <div className="flex flex-col justify-end font-normal text-sm w-full">
                    {/* artist name */}
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

                    {/* followers */}
                    <div className="flex flex-row items-center mt-[8px] font-normal text-sm flex-wrap">
                        {details && (
                            <span className="flex flex-row items-center">
                                {details}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}