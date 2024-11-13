'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type AudioContextType = {
  activeAudio: HTMLAudioElement | null;
  setActiveAudio: (audio: HTMLAudioElement | null) => void;
  stopAllAudio: () => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);

  const stopAllAudio = () => {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    }
  };

  return (
    <AudioContext.Provider value={{ activeAudio, setActiveAudio, stopAllAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
};
