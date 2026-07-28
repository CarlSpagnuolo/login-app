import { Link } from "react-router-dom";
import { playSound } from "../utils/sound";

function EnterButton() {
  return (
    <Link
      onClick={() => playSound("/sounds/click.mp3", 0.5)}
      to="/landing"
      state={{
        startBoot: true,
      }}
      className="
        group
        relative
        px-12
        py-5
        border
        border-cyan-300
        rounded-lg
        bg-black/40
        text-cyan-300
        uppercase
        tracking-[0.3em]
        font-mono
        overflow-hidden

        hover:text-white
        hover:shadow-[0_0_20px_rgba(168,85,247,0.35),0_0_40px_rgba(34,211,238,0.15)]

        transition-all
        duration-300
      "
    >
      <span
        className="
          absolute
          inset-0
          bg-cyan-400/10
          translate-y-full
          group-hover:translate-y-0
          transition
          pointer-events-none
          duration-600
        "
      />

      <span className="relative z-10 flex items-center gap-3">
        <span
          className="
      inline-block
      transition-transform
      duration-600
      group-hover:-rotate-90
    "
        >
          &gt;
        </span>
        <span>Enter the experience</span>
      </span>
    </Link>
  );
}

export default EnterButton;
