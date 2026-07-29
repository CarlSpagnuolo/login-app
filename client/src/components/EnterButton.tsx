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
    relative
    inline-flex
    w-7
    h-7
    items-center
    justify-center
    group-hover:[&_.wing]:animate-none
  "
        >
          {/* Ala superiore */}
          <span
            className="
            wing wing-up
        absolute
        
      "
          >
            <span
              className="
          block
          w-3
          h-3
          border-r-2
          border-b-2
          border-fuchsia-400
          rotate-45
          -translate-y-2

          transition-all
          duration-850
          ease-out

          group-hover:translate-y-0
          group-hover:rotate-223
          group-hover:scale-110
          group-hover:border-white
          group-hover:drop-shadow-[0_0_15px_#22d3ee]
        "
            />
          </span>

          {/* Ala inferiore */}
          <span
            className="
            wing wing-down
        absolute
      
      "
          >
            <span
              className="
          block
          w-3
          h-3
          border-l-2
          border-t-2
          border-fuchsia-400
          rotate-45
          translate-y-2

          transition-all
          duration-850
          ease-out

          group-hover:translate-y-0
          group-hover:rotate-223
          group-hover:scale-110
          group-hover:border-white
          group-hover:drop-shadow-[0_0_15px_#d946ef]
          
        "
            />
          </span>
        </span>

        <span>Enter the experience</span>
      </span>
    </Link>
  );
}

export default EnterButton;
