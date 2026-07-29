import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type AudioContextType = {
  enabled: boolean;
  startAudio: () => void;
  toggleAudio: () => void;
  stopAudio: () => void;
};

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [enabled, setEnabled] = useState(false);

  const startAudio = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.15;

    audio
      .play()
      .then(() => {
        setEnabled(true);
      })
      .catch(() => {
        console.log("Audio blocked");
      });
  }, []);

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setEnabled(true);
    } else {
      audio.pause();
      setEnabled(false);
    }
  }, []);

  const stopAudio = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setEnabled(false);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        enabled,
        startAudio,
        toggleAudio,
        stopAudio,
      }}
    >
      <audio ref={audioRef} src="/ambient.mp3" loop />

      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error("useAudio must be used inside AudioProvider");
  }

  return context;
}
