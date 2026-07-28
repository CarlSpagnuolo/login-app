import { useAudio } from "../context/AudioContext";

function AudioToggle() {
  const { enabled, toggleAudio } = useAudio();

  return (
    <div className="absolute top-4 right-4">
      <button
        type="button"
        onClick={toggleAudio}
        className={`
          flex
          items-center
          justify-center
          w-8
          h-8
          rounded-full
          border
          backdrop-blur-md
          transition
          duration-300
          text-sm
          cursor cursor-pointer

          ${!enabled ? "animate-pulse" : ""}

          ${
            enabled
              ? "border-cyan-400/70 bg-cyan-400/10 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
              : "border-white/20 bg-white/5 text-gray-500 hover:text-cyan-300"
          }
        `}
      >
        🎧
      </button>
    </div>
  );
}

export default AudioToggle;
