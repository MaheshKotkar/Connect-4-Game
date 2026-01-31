'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[60] p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl text-white transform transition-all duration-300 hover:scale-110 hover:bg-white/20 active:scale-95 group animate-fade-in"
            aria-label="Scroll to top"
        >
            <svg
                className="w-8 h-8 group-hover:-translate-y-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7 7 7M5 19l7-7 7 7" />
            </svg>
            {/* Pulsing effect */}
            <div className="absolute inset-0 rounded-2xl bg-white/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </button>
    );
}
