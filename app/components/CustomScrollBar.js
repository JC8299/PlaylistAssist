'use client'

import { useState, useEffect, useRef, useCallback } from 'react';

import styles from "@/styles/customScrollBar.module.css";

function CustomScrollBar({
    contentId,
    children,
}) {
    const contentRef = useRef(null);
    const scrollTrackRef = useRef(null);
    const scrollThumbRef = useRef(null);

    const [thumbHeight, setThumbHeight] = useState(20);
    const [scrollStartPosition, setScrollStartPosition] = useState(null);
    const [initialScrollTop, setInitialScrollTop] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const scrollIntervalRef = useRef(null);
    const [trackClicked, setTrackClicked] = useState(false);
    
    function handleResize(ref, trackSize) {
        const {clientHeight, scrollHeight} = ref;
        setThumbHeight(Math.max((clientHeight/scrollHeight) * trackSize, 20));
    }

    useEffect(() => {
        if (contentRef != null && scrollTrackRef != null) {
            const ref = contentRef.current;
            const {clientHeight: trackSize} = scrollTrackRef.current;
            const resizeObserver = new ResizeObserver(() => {
                handleResize(ref, trackSize);
            })

            resizeObserver.observe(ref);
            ref.addEventListener('scroll', handleThumbPosition);
            
            return () => {
                resizeObserver.unobserve(ref);
                ref.removeEventListener('scroll', handleThumbPosition);
                handleTrackMouseUp;
            };
        }
    }, [])

    const handleThumbPosition = useCallback(() => {
        if (
            !contentRef.current ||
            !scrollTrackRef.current ||
            !scrollThumbRef.current
        ) {
            return;
        }
        
        const {scrollTop: contentTop, scrollHeight: contentHeight} = contentRef.current;
        const {clientHeight: trackHeight} = scrollTrackRef.current;

        // TODO: occasionally getting a bug when the content jumps and shrinks, the resize observer
        // does not get called and thumbHeight isn't correct
        // this doesn't fix it all the time and it doesn't always happen
        // LOVE IT WHEN I CAN'T REPRODUCE A BUG CONSISTENTLY
        const {clientHeight, scrollHeight} = contentRef.current;
        if(Math.max((clientHeight/scrollHeight) * trackHeight, 20) < thumbHeight) {
            setThumbHeight(Math.max((clientHeight/scrollHeight) * trackHeight, 20));
        }

        // unary + is to convert variable to a number if not already
        let newTop = (+contentTop/ +contentHeight) * trackHeight;
        newTop = Math.min(newTop, trackHeight - thumbHeight);

        const thumb = scrollThumbRef.current;
        thumb.style.top = `${newTop}px`
    })

    const scrollToPosition = (targetLocation) => {
        const top = contentRef.current.scrollTop;
        const difference = targetLocation - top;
        const perTick = difference > 0 ? 80 : -80;

        scrollIntervalRef.current = setInterval(() => {
            contentRef.current.scrollTop += perTick;

            if ((top < targetLocation && contentRef.current.scrollTop >= targetLocation) ||
                (top > targetLocation && contentRef.current.scrollTop <= targetLocation)) {
                    clearInterval(scrollIntervalRef.current);
                    scrollIntervalRef.current = null;
                }
        }, 4);
    }

    const handleTrackMouseDown = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            const {current: trackCurrent} = scrollTrackRef;
            const {current: contentCurrent} = contentRef;
            if (scrollIntervalRef.current) return;
            if (trackCurrent && contentCurrent) {
                setTrackClicked(true);
                // click location
                const {clientY} = e;
                // top of track + top of viewport
                const target = e.target;
                const rect = target.getBoundingClientRect();
                const trackTop = rect.top;
                // getting middle of thumb
                const thumbOffset = thumbHeight/2;
                // ratio of new location
                const clickRatio = Math.max((clientY - trackTop) - thumbOffset, 0) / trackCurrent.clientHeight;
                // amount to scroll
                const scrollAmount = Math.floor(Math.min(clickRatio * contentCurrent.scrollHeight, contentCurrent.scrollTopMax));
                scrollToPosition(scrollAmount);
            }
        }, []);

    const handleTrackMouseUp = useCallback(() => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            setTrackClicked(false);
            scrollIntervalRef.current = null;
        }
    }, [scrollIntervalRef.current]);

    const handleThumbMouseDown = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            setScrollStartPosition(e.clientY);
            if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
            scrollThumbRef.current.classList.add(`${styles.grabbed}`);
            setIsDragging(true);
        }, []);

    const handleThumbMouseUp = useCallback(() => {
        if (isDragging) {
            scrollThumbRef.current.classList.remove(`${styles.grabbed}`);
            setIsDragging(false);
        }
    }, [isDragging]);

    const handleThumbMouseMove = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isDragging) {
                const {
                    scrollHeight: contentScrollHeight,
                    offsetHeight: contentOffsetHeight,
                } = contentRef.current;

                // get delta of mouse movement to multiply with the ratio of content for scrolling
                const deltaY = (e.clientY - scrollStartPosition) * (contentOffsetHeight / thumbHeight);
                const newScrollTop = Math.min(
                    initialScrollTop + deltaY,
                    contentScrollHeight - contentOffsetHeight
                );

                contentRef.current.scrollTop = newScrollTop;
            }
        },[isDragging, scrollStartPosition, thumbHeight]);

    useEffect(() => {
        if (trackClicked) {
            document.addEventListener('mouseup', handleTrackMouseUp);
            document.addEventListener('mouseleave', handleTrackMouseUp);
        }
        if (isDragging) {
            document.addEventListener('mousemove', handleThumbMouseMove);
            document.addEventListener('mouseup', handleThumbMouseUp);
            document.addEventListener('mouseleave', handleThumbMouseUp);
        }
        return () => {
            if (trackClicked) {
                document.removeEventListener('mouseup', handleTrackMouseUp);
                document.removeEventListener('mouseleave', handleTrackMouseUp);
            }
            if (isDragging) {
                document.removeEventListener('mousemove', handleThumbMouseMove);
                document.removeEventListener('mouseup', handleThumbMouseUp);
                document.removeEventListener('mouseleave', handleThumbMouseUp);
            }
        }
    }, [handleTrackMouseUp, handleThumbMouseMove, handleThumbMouseUp]);

    const handleMouseEnter = () => {
        if (contentRef.current.clientHeight != contentRef.current.scrollHeight) {
            scrollThumbRef.current.classList.add(`${styles.animate}`);
            scrollThumbRef.current.classList.add(`${styles.mouseOver}`);
        }
    }

    const handleTransitionEnd = () => {
        scrollThumbRef.current.classList.remove(`${styles.animate}`);
    }

    const handleMouseLeave = () => {
        scrollThumbRef.current.classList.remove(`${styles.mouseOver}`);
    }

    return(
        <div
            className={styles.customScrollbarContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTransitionEnd={handleTransitionEnd}
        >
            <div id={contentId} className={styles.customScrollbarContent} ref={contentRef}>
                {children}
            </div>
            <div className={styles.customScrollbar}>
                <div className={styles.customScrollbarTrackAndThumb}>
                    <div
                        className={styles.customScrollbarTrack}
                        ref={scrollTrackRef}
                        onMouseDown={handleTrackMouseDown}
                    />
                    <div
                        className={styles.customScrollbarThumb}
                        ref={scrollThumbRef}
                        onMouseDown={handleThumbMouseDown}
                        style={{
                            height: `${thumbHeight}px`,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default CustomScrollBar;