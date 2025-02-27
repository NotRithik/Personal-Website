// src/components/CustomCursor.tsx
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react'; // Import useCallback
import CursorArrow from "@/assets/CursorArrow.svg";
import CursorCircle from "@/assets/CursorCircle.svg";

import gsap from 'gsap';
import throttle from 'lodash.throttle';

function CustomCursor() {
    const arrowsContainerRef = useRef<HTMLDivElement>(null); // Ref for the container to animate
    const maskCircleRef = useRef<SVGCircleElement>(null); // Ref for the circle INSIDE the mask
    const [isPlayingClickedAnimation, setIsPlayingClickedAnimation] = useState(false); // State to track click, renamed

    useEffect(() => {
        // Mouse move tracking (remains the same)
        const handleMouseMove = (e: MouseEvent) => {
            const rootElement = document.documentElement;
            rootElement.style.setProperty('--cursor-x', `${e.clientX}px`);
            rootElement.style.setProperty('--cursor-y', `${e.clientY}px`);

            if (maskCircleRef.current) {
                gsap.to(maskCircleRef.current, { // Animate the maskCircleRef.current element
                    duration: 0.05, // Transition duration (0.05s)
                    ease: 'easeOut', // Ease-out easing
                    attr: { // Animate SVG attributes
                        cx: e.clientX, // Animate 'cx' to mouse X
                        cy: e.clientY  // Animate 'cy' to mouse Y
                    }
                });
            }
        };
        const throttledMouseMove = throttle(handleMouseMove, 24);
        window.addEventListener('mousemove', throttledMouseMove);

        // Initial cursor position (remains the same)
        const rootElementOnMount = document.documentElement;
        rootElementOnMount.style.setProperty('--cursor-x', `0px`);
        rootElementOnMount.style.setProperty('--cursor-y', `0px`);

        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        // Because Safari is a piece of shit. Gotta handle transition durations differently
        // and disable certain animations / elements entirely because they're so choppy!

        if (isSafari) {
            const cursorElement = document.querySelector('.custom-cursor') as HTMLElement; // Select by class name
            if (cursorElement) { // Check if element is found
                cursorElement.style.setProperty('--transition-duration', `0.s`);
            }

            const revealLayerElements = document.querySelectorAll('.reveal-layer'); // Select all elements with class 'reveal-layer'

            if (revealLayerElements) { // Check if any elements are found
                revealLayerElements.forEach(element => { // Iterate over NodeList
                    const revealLayerElement = element as HTMLElement | null; // Type cast each element
                    if (revealLayerElement) { // Check if element is valid (not null after casting)
                        revealLayerElement.style.visibility = 'hidden';
                    }
                });
            }

        }



        return () => window.removeEventListener('mousemove', throttledMouseMove);
    }, []);

    useEffect(() => {
        // Cursor hiding (remains the same)
        document.body.style.cursor = 'none';
        return () => {
            document.body.style.cursor = 'default';
        };
    }, []);

    useEffect(() => {
        if (isPlayingClickedAnimation) {
            const arrowsContainer = arrowsContainerRef.current;

            const tl = gsap.timeline({
                onComplete: () => setIsPlayingClickedAnimation(false) // Reset click state after animation
            });

            tl.to(arrowsContainer, { // Back-up animation
                duration: 0.2,
                width: '128px',
                height: '128px',
                ease: 'power2.inOut',
            });
            tl.to(arrowsContainer, { // Run-up and disappear animation
                duration: 0.2,
                width: '8px',
                height: '8px',
                ease: 'power3.easeIn',
            }, ">"); // ">" aligns this tween to start at the end of the previous tween in the timeline
            tl.set(arrowsContainer, { // Make container super big instantly
                width: '100vw', // Example: Full viewport width
                height: '100vh', // Example: Full viewport height
                immediateRender: false // Ensure set happens at this point in timeline
            }, ">"); // ">" aligns this tween to start at the end of the previous tween in the timeline
            tl.to(arrowsContainer, { // Shrink back to original size
                duration: 0.25,
                width: '96px',
                height: '96px',
                ease: 'power2.easeOut', // Ease-out for shrinking back
            }, ">"); // ">" aligns this tween to start at the end of the previous tween in the timeline
        }
    }, [isPlayingClickedAnimation]); // Renamed state in dependency array

    const handleClickAnimation = useCallback(() => { // Renamed function, now useCallback
        setIsPlayingClickedAnimation(true); // Trigger click animation on click, renamed state
    }, [isPlayingClickedAnimation]);

    useEffect(() => {
        // Add click event listener to the document when component mounts
        document.addEventListener('click', handleClickAnimation);

        // Cleanup: Remove the event listener when component unmounts
        return () => {
            document.removeEventListener('click', handleClickAnimation);
        };
    }, [handleClickAnimation]); // Dependency on handleClickAnimation for useCallback


    return (<div className="custom-cursor select-none">
        <div className="relative w-24 h-24 overflow-visible" ref={arrowsContainerRef}>
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="min-w-14 min-h-14 h-14 w-14">
                    <CursorCircle className="w-full h-full" />
                </div>
            </div>

            <div className="absolute inset-0 flex justify-center items-center">
                <div className="min-w-14 min-h-14 h-14 w-14">
                    <svg style={{ width: "100%", height: "100%" }}>
                        <defs>
                            <mask id="cursorMask">
                                <circle cx="36" cy="36" r="24" fill="white" ref={maskCircleRef} />
                            </mask>
                        </defs>
                    </svg>
                </div>
            </div>

            <div className="absolute top-0 left-0 w-6">
                <CursorArrow className="w-full h-full transform rotate-[135deg]" />
            </div>

            <div className="absolute right-0 top-0 w-6">
                <CursorArrow className="w-full h-full transform rotate-[225deg]" />
            </div>

            <div className="absolute bottom-0 left-0 w-6">
                <CursorArrow className="w-full h-full transform rotate-[45deg]" />
            </div>

            <div className="absolute right-0 bottom-0 w-6">
                <CursorArrow className="w-full h-full transform rotate-[315deg]" />
            </div>
        </div>
    </div>)
}

export default CustomCursor;