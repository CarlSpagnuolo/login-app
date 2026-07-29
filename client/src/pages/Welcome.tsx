import CyberBackground from "../components/CyberBackground";
import EnterButton from "../components/EnterButton";
import { useEffect } from "react";
import { useAudio } from "../context/AudioContext";

function Welcome() {
  const { stopAudio } = useAudio();
  useEffect(() => {
    stopAudio();
  }, [stopAudio]);
  return (
    <CyberBackground>
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
        "
      >
        <EnterButton />
      </div>
    </CyberBackground>
  );
}

export default Welcome;
