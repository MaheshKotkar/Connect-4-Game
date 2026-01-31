'use client';

import { useEffect, useRef, useState } from 'react';

export const useBackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/sounds/laugh.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const startAudio = async () => {
      if (!audioRef.current) return;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsMuted(false);
        // Remove the click listener once audio starts
        window.removeEventListener('click', startAudio);
      } catch (error) {
        console.log('Autoplay prevented, waiting for user interaction');
      }
    };

    // Try to autoplay immediately
    startAudio();

    // Fallback: Start on first user interaction if autoplay failed
    window.addEventListener('click', startAudio);

    return () => {
      window.removeEventListener('click', startAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsMuted(true);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      setIsMuted(false);
    }
  };

  return { isPlaying, isMuted, toggleMusic };
};