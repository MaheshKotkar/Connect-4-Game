'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface MusicContextType {
    isPlaying: boolean;
    isMuted: boolean;
    toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        // Only initialize once
        if (!audioRef.current) {
            audioRef.current = new Audio('/sounds/laugh.mp3');
            audioRef.current.loop = true;
            audioRef.current.volume = 0.3;
        }

        const startAudio = async () => {
            if (!audioRef.current) return;
            try {
                await audioRef.current.play();
                setIsPlaying(true);
                setIsMuted(false);
                // Remove global click if audio started
                window.removeEventListener('click', startAudio);
                window.removeEventListener('scroll', startAudio);
            } catch (error) {
                console.log('Autoplay blocked. Waiting for interaction.');
            }
        };

        // Try immediately
        startAudio();

        // Aggressive fallback: start on any common interaction
        window.addEventListener('click', startAudio);
        window.addEventListener('scroll', startAudio);
        window.addEventListener('keydown', startAudio);

        return () => {
            window.removeEventListener('click', startAudio);
            window.removeEventListener('scroll', startAudio);
            window.removeEventListener('keydown', startAudio);
        };
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            setIsMuted(true);
        } else {
            audioRef.current.play().catch(console.error);
            setIsPlaying(true);
            setIsMuted(false);
        }
    };

    return (
        <MusicContext.Provider value={{ isPlaying, isMuted, toggleMusic }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
};
