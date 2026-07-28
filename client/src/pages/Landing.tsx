import { useState } from "react";
import CyberBackground from "../components/CyberBackground";
import BootSequence from "../components/BootSequence";
import AudioToggle from "../components/AudioToggle";
import { Link, useLocation } from "react-router-dom";
import BootAudio from "../components/BootAudio";

function Landing() {
  const location = useLocation();

  const startBoot = location.state?.startBoot ?? true;

  const [bootCompleted, setBootCompleted] = useState(!startBoot);

  function handleBootComplete() {
    setBootCompleted(true);
  }

  return (
    <CyberBackground>
      <BootAudio start={startBoot && !bootCompleted} />

      {!bootCompleted ? (
        <div
          className="
            min-h-screen
            flex
            items-center
            justify-center
          "
        >
          <BootSequence onComplete={handleBootComplete} />
        </div>
      ) : (
        <div
          className="
            min-h-screen
            flex
            items-center
            justify-center
            px-6
            opacity-0
            animate-[fadeIn_1s_ease-out_forwards]
          "
        >
          <div
            className="
   relative
max-w-xl
text-center
bg-[#050816]/85
backdrop-blur-md
border
border-cyan-600/30
rounded-2xl
p-10
shadow-[0_0_70px_rgba(0,245,255,0.08),0_0_90px_rgba(236,72,153,0.08)]
animate-[slideUp_0.8s_ease-out_0.8s_forwards]
opacity-0
before:absolute
before:inset-0
before:rounded-2xl
before:bg-linear-to-r
before:from-cyan-400/5
before:via-transparent
before:to-fuchsia-500/5
before:pointer-events-none
  "
          >
            <AudioToggle />

            <p
              className="
                text-cyan-400
                text-sm
                mb-4
                tracking-[0.3em]
                uppercase
              "
            >
              Full Stack Journey
            </p>

            <h1
              className="
                text-5xl
                font-bold
                mb-6
                bg-linear-to-r
                from-cyan-400
                to-purple-500
                bg-clip-text
                text-transparent
              "
            >
              My first step into backend
            </h1>

            <p
              className="
                text-gray-300
                leading-relaxed
                mb-8
              "
            >
              A project born from curiosity, learning and experimentation.
              <br />
              Exploring the connection between interface, logic and data.
            </p>

            <div className="flex justify-center gap-4">
              <Link
                to="/login"
                className="
                  px-6
                  py-3
                  rounded-lg
                  bg-cyan-500/10
                  border
                  border-cyan-400/40
                  text-cyan-300
                  hover:bg-cyan-400/20
                  transition
                  duration-300
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  px-6
                  py-3
                  rounded-lg
                  bg-purple-500/10
                  border
                  border-purple-400/40
                  text-purple-300
                  hover:bg-purple-400/20
                  transition
                  duration-300
                "
              >
                Register
              </Link>
            </div>

            <div
              className="
                mt-10
                flex
                justify-center
                gap-6
                text-xs
                text-gray-400
              "
            >
              <span>React</span>
              <span>Node</span>
              <span>PostgreSQL</span>
              <span>JWT</span>
            </div>
          </div>
        </div>
      )}
    </CyberBackground>
  );
}

export default Landing;
