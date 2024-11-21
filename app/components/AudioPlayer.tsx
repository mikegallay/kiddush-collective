'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useAudioContext } from '@/context/AudioContext';
// import { FiPlay, FiPause, FiRotateCcw } from 'react-icons/fi';
// import { FaPause, FaPlay, FaArrowRotateLeft, FaVolumeOff, FaVolumeHigh } from 'react-icons/fa6';
import { PauseIcon, PlayIcon, ReloadIcon, SpeakerOffIcon, SpeakerLoudIcon } from "@radix-ui/react-icons"


type AudioPlayerProps = {
  src: string;
  mode?: 'full' | 'micro';
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, mode = 'full' }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { activeAudio, setActiveAudio, stopAllAudio } = useAudioContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Set duration once audio metadata is loaded
  useEffect(() => {
    
    const audioElement = audioRef.current;
    if (audioElement) {
        audioElement.load();
      audioElement.onloadedmetadata = () => {
        
        setDuration(audioElement.duration);
      };
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
    }
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  // Reset play state if another audio starts
  useEffect(() => {
    if (activeAudio !== audioRef.current) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [activeAudio]);

  // Play/pause control
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      if (activeAudio !== audioRef.current) stopAllAudio();
      audioRef.current?.play();
      setActiveAudio(audioRef.current);
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolume = () => {
    audioRef.current!.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Update the playback time and duration
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };

  // Replay function to skip back a few seconds
  const handleReplay = () => {
    if (audioRef.current) {
      if (activeAudio !== audioRef.current) stopAllAudio();
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
      audioRef.current?.play();
      setIsPlaying(true);
      setActiveAudio(audioRef.current);
    }
  };

  // Circular progress calculation
  const progress = (currentTime / duration) * 100;

  return (
    <div className={`audio-player flex flex-row gap-3 lg:gap-2 justify-center ${mode === 'micro' ? 'micro-player' : 'p-2 lg:p-1 lg:pr-2 bg-slate-100 border-slate-400 border-2 rounded-full shadow-md'}`}>
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />

      {/* Circular Play Button with Progress */}
      <div className="play-button-container relative w-8 h-8" onClick={handlePlayPause}>
      <svg className="w-full h-full absolute" viewBox="0 0 36 36">
          <path
            className="fill-transparent stroke-slate-400 stroke-2 [stroke-linecap:round]"
            strokeDasharray="100 100"
            d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
          />
        </svg>
        <svg className="progress-ring w-full h-full absolute top-0 left-0" viewBox="0 0 36 36">
          <path
            className="progress-ring__circle fill-none stroke-amber-600 stroke-2 [stroke-linecap:round]"
            strokeDasharray={`${progress} 100`}
            d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
          />
        </svg>
        <button className="play-button absolute top-1/2 left-1/2 [transform:translate(-50%,-50%)]">
          {isPlaying ? <PauseIcon/> : <PlayIcon/>}
        </button>
      </div>

      {/* Display elapsed and total time in full mode */}
      {mode === 'full' && (
        <div className="audio-info flex flex-row gap-2 items-center">
          
          <div className="time-display">
            <span className="text-amber-600">{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span> / {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
          </div>
          <button className="replay-button" onClick={handleReplay}>
            <ReloadIcon />
          </button>
          <button className="muted-button" onClick={handleVolume}>
            {isMuted ? <SpeakerOffIcon/> : <SpeakerLoudIcon/>}
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
