'use client'

import { useEffect, useRef, useState } from "react"
import useVideoController from "./useVideoController"
import clsx from "clsx";
import { getFontCls } from "@/app/fonts";
import ButtonComponent from "@/components/common/ButtonComponent";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ThreeDotSpinner from "@/components/loaders/ThreeDotSpinner";

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    // Importing state and functions from the custom hook `useVideoController`
    const {
        handleMiniVdClick, // Handles click on the mini video to transition
        nextVideoRef, // Ref to the "next video" element
        getVideoSrc, // Function to fetch the video source URL based on index
        currentIndex, // Current video index
        handleVideoLoad, // Callback triggered when the video is loaded
        upcomingVideoIndex, // The index of the upcoming video
        totalVideos, // Total number of videos
        hasClicked, // State to track if a video has been clicked
        isLoading,
        setHasClicked
    } = useVideoController();

    // useGSAP is used to create and manage animations with GSAP
    useGSAP(() => {
        if (hasClicked) {
            // Set initial styles for the next video (hidden but ready for animation)
            gsap.set('#next-video', { visibility: 'visible' });

            // Animate the next video
            gsap.to('#next-video', {
                transformOrigin: 'center center', // Animation scales around its center
                scale: 1, // Scale the video to its full size
                width: '100%', // Expand to fill the container width
                height: '100%', // Expand to fill the container height
                duration: 1, // Animation duration is 1 second
                ease: 'power1.inOut', // Easing function for smooth animation
                onStart: () => {
                    // Start playing the next video when animation begins
                    if (nextVideoRef.current) {
                        nextVideoRef.current.play();
                    }
                }
            });

            // Add another animation for the current mini video
            gsap.from('#current-video', {
                transformOrigin: 'center center', // Scale from its center
                scale: 0, // Start from 0 size
                duration: 1.5, // Animation duration is 1.5 seconds
                ease: 'power1.inOut', // Easing function for smooth animation
            });
        }

    }, { dependencies: [currentIndex], revertOnUpdate: true }); // Re-run this animation when `currentIndex` changes

    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%, 0% 100%)",
            borderRadius: '0 0 40% 10%'
        });

        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true
            }
        })
    })

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setShow(false);
            }, 1000)
        }
    }, [show])

    type Coordinates = {
        x: number,
        y: number
    }

    type Axis = {
        x: number,
        y: number,
        z: number
    }

    const [rotation, setRotation] = useState<Axis>({
        x: 0,
        y: 0,
        z: 0
    })

    const [translation, setTranslation] = useState<Axis>({
        x: 0,
        y: 0,
        z: 0
    })

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            {isLoading ? <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                <ThreeDotSpinner />
            </div> : <div className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75" id="video-frame" onMouseMove={(e) => {
                setShow(true);
                const centerOfScreen: Coordinates = {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                }
                const mousePosition: Coordinates = {
                    x: e.clientX,
                    y: e.clientY
                }
                // get angle of mouse from center of screen
                const angleOfMouseFromCenterInRadian = Math.atan2(mousePosition.y - centerOfScreen.y, mousePosition.x - centerOfScreen.x)
                // get height of mouse from center of screen
                const distanceOfMouseFromHorizontalAxis = mousePosition.y - centerOfScreen.y
                const distanceOfMouseFromVerticalAxis = mousePosition.x - centerOfScreen.x
                const rotationScale = 0.08;
                const translationScale = 0.1;
                setRotation({
                    x: distanceOfMouseFromHorizontalAxis * rotationScale,
                    y: distanceOfMouseFromVerticalAxis * rotationScale,
                    z: 0,
                })
                setTranslation({
                    x: (distanceOfMouseFromHorizontalAxis) * translationScale,
                    y: (distanceOfMouseFromVerticalAxis) * translationScale,
                    z: 0
                })
            }}>
                <div>
                    {/* Mini video (next video preview) */}
                    {/*  scale-50 opacity-0 hover:scale-100 hover:opacity-100 */}
                    <div style={{
                        transformStyle: 'preserve-3d',
                        transition: 'scale',
                        transform: `translateX(calc(-50% + ${translation.y}px)) translateY(calc(-50% + ${translation.x}px)) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg) scale(${show ? 1 : 0.1})`
                    }} className={`mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg    ease-in ${show ? "opacity-100" : "opacity-0"}`}>
                        <div onClick={handleMiniVdClick} className="origin-center">
                            {/* Mini video element */}
                            <video
                                ref={nextVideoRef}
                                src={getVideoSrc(upcomingVideoIndex)} // Upcoming video source
                                loop muted autoPlay
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoad}
                            />
                        </div>
                    </div>

                    {/* Next video element */}
                    <video
                        src={getVideoSrc(currentIndex)} // Source for the current video
                        ref={nextVideoRef}
                        autoPlay
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />

                    {/* Main background video */}
                    <video
                        id="main-video"
                        src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)} // Loop to the first video when at the last
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 size-full object-cover object-center"
                    />

                    {/* Heading in the video */}
                    <h1 className={clsx('hero-heading absolute bottom-5 right-5 z-40 text-blue-75', getFontCls('zentryRegular'))}>
                        G<strong>a</strong>ming
                    </h1>

                    {/* Overlay with promotional content */}
                    <div className="absolute left-0 top-0 z-40 size-full">
                        <div className="mt-24 px-5 sm:px-10">
                            <h1 className={clsx('hero-heading text-blue-100', getFontCls('zentryRegular'))}>
                                redi<strong>n</strong>e
                            </h1>
                            <p className={clsx(getFontCls('robertRegular'), 'mb-5 max-w-64 text-blue-100')}>
                                Enter the Metagame Layer<br /> Unleash the Play Economy
                            </p>
                            <ButtonComponent id="watch-trailer" leftIcon={<TiLocationArrow />} className="bg-yellow-300 flex-center gap-1">
                                Watch Trailer
                            </ButtonComponent>
                        </div>
                    </div>
                </div>
                {/* Duplicate heading (likely a stylistic choice) */}

            </div>}
            <h1 className={clsx('special-font hero-heading absolute bottom-5 right-5 text-black', getFontCls('zentryRegular'))}>
                G<strong>a</strong>ming
            </h1>
            {/* Main video container */}

        </div>
    )
}

export default Hero;