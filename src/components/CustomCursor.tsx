// src/components/CustomCursor.tsx
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import CursorArrow from "@/assets/CursorArrow.svg";
import CursorCircle from "@/assets/CursorCircle.svg";

import gsap from 'gsap';
import throttle from 'lodash.throttle';

interface CustomCursor {
    doesPageScroll: boolean
}

const CustomCursor: React.FC<CustomCursor> = ({ doesPageScroll }) => {
    const arrowsContainerRef = useRef<HTMLDivElement>(null);
    const maskCircleRef = useRef<SVGCircleElement>(null);
    const [isPlayingClickedAnimation, setIsPlayingClickedAnimation] = useState(false);

    const updateMaskPosition = useCallback((clientX: number, clientY: number) => {
        if (maskCircleRef.current) {
            gsap.to(maskCircleRef.current, {
                duration: 0.05,
                ease: 'easeOut',
                attr: {
                    cx: clientX,
                    cy: clientY + (doesPageScroll ? window.scrollY : 0)
                }
            });
        }
    }, [doesPageScroll]);

    useEffect(() => {
        // Mouse move tracking
        const handleMouseMove = (e: MouseEvent) => {
            const rootElement = document.documentElement;
            rootElement.style.setProperty('--cursor-x', `${e.clientX}px`);
            rootElement.style.setProperty('--cursor-y', `${e.clientY}px`);

            updateMaskPosition(e.clientX, e.clientY);
        };
        const throttledMouseMove = throttle(handleMouseMove, 24);
        window.addEventListener('mousemove', throttledMouseMove);

        // Scroll tracking - NEW
        const handleScroll = () => {
            const rootElement = document.documentElement;
            const cursorX = parseInt(rootElement.style.getPropertyValue('--cursor-x') || '0', 10);
            const cursorY = parseInt(rootElement.style.getPropertyValue('--cursor-y') || '0', 10);

            updateMaskPosition(cursorX, cursorY);
        };
        window.addEventListener('scroll', handleScroll);


        // Initial cursor position - set to center of screen
        const rootElementOnMount = document.documentElement;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        rootElementOnMount.style.setProperty('--cursor-x', `${centerX}px`);
        rootElementOnMount.style.setProperty('--cursor-y', `${centerY}px`);

        updateMaskPosition(centerX, centerY); // Initialize mask position at center


        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        if (isSafari) {
            const cursorElement = document.querySelector('.custom-cursor') as HTMLElement;
            if (cursorElement) {
                cursorElement.style.setProperty('--transition-duration', `0.s`);
            }

            const revealLayerElements = document.querySelectorAll('.custom-cursor-reveal-layer');

            if (revealLayerElements) {
                revealLayerElements.forEach(element => {
                    const revealLayerElement = element as HTMLElement | null;
                    if (revealLayerElement) {
                        revealLayerElement.style.visibility = 'hidden';
                    }
                });
            }
        }

        return () => {
            window.removeEventListener('mousemove', throttledMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [updateMaskPosition]);


    useEffect(() => {
        document.body.style.cursor = 'none';
        return () => {
            document.body.style.cursor = 'default';
        };
    }, []);

    useEffect(() => {
        if (isPlayingClickedAnimation) {
            const arrowsContainer = arrowsContainerRef.current;

            const tl = gsap.timeline({
                onComplete: () => setIsPlayingClickedAnimation(false)
            });

            tl.to(arrowsContainer, {
                duration: 0.2,
                width: '128px',
                height: '128px',
                ease: 'power2.inOut',
            });
            tl.to(arrowsContainer, {
                duration: 0.2,
                width: '8px',
                height: '8px',
                ease: 'power3.easeIn',
            }, ">");
            tl.set(arrowsContainer, {
                width: '100vw',
                height: '100vh',
                immediateRender: false
            }, ">");
            tl.to(arrowsContainer, {
                duration: 0.25,
                width: '96px',
                height: '96px',
                ease: 'power2.easeOut',
            }, ">");
        }
    }, [isPlayingClickedAnimation]);

    const handleClickAnimation = useCallback(() => {
        setIsPlayingClickedAnimation(true);
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickAnimation);

        return () => {
            document.removeEventListener('click', handleClickAnimation);
        };
    }, [handleClickAnimation]);


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