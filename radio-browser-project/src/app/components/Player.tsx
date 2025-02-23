'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface PlayerProps {
  url: string;
  imageUrl: string;
}

const Player: React.FC<PlayerProps> = ({ url, imageUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      audioRef.current.muted = false; 
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.error("Erro ao reproduzir:", err));
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  return (
    <div className="relative w-24 h-24 cursor-pointer" onClick={togglePlay}>
      <img
        src={imageUrl || '/placeholder.png'}
        alt="Rádio"
        className="w-full h-full rounded-full object-cover"
      />
      <button
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full"
      >
        {isPlaying ? (
          <Pause className="w-10 h-10 text-black" />
        ) : (
          <Play className="w-10 h-10 text-black" />
        )}
      </button>
      <audio ref={audioRef} src={url} />
    </div>
  );
};

export default Player;
