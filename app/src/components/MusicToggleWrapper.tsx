'use client';

import { useState, useEffect } from 'react';
import { useMusic } from '../context/MusicContext';
import MusicToggle from './MusicToggle';

export default function MusicToggleWrapper() {
    const { isPlaying, isMuted, toggleMusic } = useMusic();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10" />; // Return a placeholder of similar size
    }

    return <MusicToggle isPlaying={isPlaying} isMuted={isMuted} onToggle={toggleMusic} />;
}
