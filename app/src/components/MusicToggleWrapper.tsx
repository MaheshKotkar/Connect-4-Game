'use client';

import { useMusic } from '../context/MusicContext';
import MusicToggle from './MusicToggle';

export default function MusicToggleWrapper() {
    const { isPlaying, isMuted, toggleMusic } = useMusic();
    return <MusicToggle isPlaying={isPlaying} isMuted={isMuted} onToggle={toggleMusic} />;
}
