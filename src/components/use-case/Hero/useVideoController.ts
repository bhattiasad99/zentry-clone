import { useEffect, useRef, useState } from "react";

const useVideoController = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 3;

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const nextVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (loadedVideos === totalVideos) {
            setIsLoading(false);
        }
    }, [loadedVideos])

    const handleMiniVdClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    }

    const getVideoSrc = (index: number) => {
        return `videos/hero-${index}.mp4`;
    }

    const handleVideoLoad = () => {
        setLoadedVideos(prevState => prevState + 1);
    }

    return { handleMiniVdClick, nextVideoRef, getVideoSrc, currentIndex, handleVideoLoad, upcomingVideoIndex, totalVideos, hasClicked, isLoading, setHasClicked };
}

export default useVideoController