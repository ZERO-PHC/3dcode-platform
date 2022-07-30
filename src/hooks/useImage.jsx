import { useState, useEffect } from "react";

export const useImage = (src) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [hasStartedInitialFetch, setHasStartedInitialFetch] = useState(false);
    const [ImgDimensions, setImgDimensions] = useState({})
    const [AspectRatio, setAspectRatio] = useState(null);

    useEffect(() => {
        setHasStartedInitialFetch(true);
        setHasLoaded(false);
        setHasError(false);

        // Here's where the magic happens.
        const image = new Image();
        image.src = src;



        const handleError = () => {
            setHasError(true);
        };

        const handleLoad = () => {
            setHasLoaded(true);
            setHasError(false);
            // setImgDimensions({width: image.width, height: image.height})
            if (image.width > image.height) {
                setAspectRatio("landscape");
            } else if (image.width < image.height) {
                setAspectRatio("portrait");
            } else {
                setAspectRatio("square");
            }
        };

        image.onerror = handleError;
        image.onload = handleLoad;

        return () => {
            image.removeEventListener("error", handleError);
            image.removeEventListener("load", handleLoad);
        };
    }, [src]);

    return { hasLoaded, hasError, hasStartedInitialFetch, AspectRatio }
}