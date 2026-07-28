import { useEffect } from "react";
import { useAudio } from "../context/AudioContext";

function BootAudio({ start }: { start: boolean }) {
  const { startAudio } = useAudio();

  useEffect(() => {
    if (start) {
      startAudio();
    }
  }, [start]);

  return null;
}

export default BootAudio;
