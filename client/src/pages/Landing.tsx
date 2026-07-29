import { useState } from "react";
import CyberBackground from "../components/CyberBackground";
import BootSequence from "../components/BootSequence";
import AudioToggle from "../components/AudioToggle";
import { Link, useLocation } from "react-router-dom";
import BootAudio from "../components/BootAudio";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

function Landing() {
  const location = useLocation();

  const { t } = useTranslation();

  const hasBooted = sessionStorage.getItem("bootCompleted") === "true";

  const startBoot = location.state?.startBoot ?? !hasBooted;

  const [bootCompleted, setBootCompleted] = useState(!startBoot);

  function handleBootComplete() {
    sessionStorage.setItem("bootCompleted", "true");
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
            relative
            overflow-hidden
            min-h-screen
            flex
            items-center
            justify-center
            px-6
            opacity-0
            animate-[fadeIn_1s_ease-out_forwards]
          "
        >
          {/* VIDEO BACKGROUND */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="
             absolute
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-1/2
    w-[70%]
    h-[70%]
    object-cover
     shadow-[0_0_0.5px_#d946ef,0_0_5px_#d946ef,0_0_25px_#22d3ee,0_0_85px_#22d3ee]
    animate-[fadeIn_2s_ease-out_forwards]
            "
          >
            <source src="/video/videobg.mp4" type="video/mp4" />
          </video>

          {/* Overlay scuro per leggibilità */}
          <div
            className="
              absolute
              inset-0
              bg-[#050816]/70
            "
          />

          <div
            className="
   relative
max-w-xl
text-center
bg-[#050816]/25
backdrop-blur-md
border
border-cyan-600/20
rounded-2xl
p-10
shadow-[0_0_70px_rgba(0,245,255,0.08),0_0_90px_rgba(236,72,153,0.08)]
animate-[slideUp_3s_ease-out_0.8s_forwards]
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
            <div className="absolute top-4 left-4">
              <LanguageSwitcher />
            </div>
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
              {t("landing.subtitle")}
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
              {t("landing.title")}
            </h1>

            <p
              className="
                text-gray-300
                leading-relaxed
                mb-8
                whitespace-pre-line
              "
            >
              {t("landing.description")}
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
                {t("landing.login")}
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
                {t("landing.register")}
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
