import React, { useState, useEffect } from 'react';

import { useRive } from '@rive-app/react-canvas';


export default function AnimatedEmoticon() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [animationText, setAnimationText] = useState('');

    // use the useRive hook to loop the animation


    const {
        rive,
        RiveComponent: RiveComponentPlayback
    } = useRive({
        src: '/assets/emojis.riv',
        artboard: 'Onfire',
        animations: ['idle'],
        autoplay: false,

        onPause: () => {
            setAnimationText('Animation paused!');
            // play the animation again
            // playback the animation
        },
        onPlay: () => {
            setAnimationText('Animation is playing..');
        },

    });





    function onMouseEnter() {
        // rive will return as null until the file as fully loaded, so we include this
        // guard to prevent any unwanted errors.
        if (rive) {
            rive.play();
        }
    }

    function onMouseLeave() {
        if (rive) {
            rive.pause();
        }
    }

    return (
        <div style={{   }}>
            <RiveComponentPlayback style={{}} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
        </div>
    )
}
