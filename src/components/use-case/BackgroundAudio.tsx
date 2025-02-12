"use client"; // Ensures the component runs only on the client side

import { useEffect, useRef } from "react";

const BackgroundMusic = () => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.1;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Automatic playback started!
                    // Show playing UI.
                })
                    .catch(error => {
                        // Auto-play was prevented
                        // Show paused UI.
                    });
            }
        }

        // Optional: Pause audio when the component unmounts
        return () => {
            if (audio) {
                audio.pause();
            }
        };
    }, []);

    return (
        <audio preload="none" ref={audioRef} loop>
            <source src="audio/bg-music.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    );
};

export default BackgroundMusic;