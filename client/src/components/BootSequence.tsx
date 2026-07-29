import { useEffect, useState } from "react";

type BootSequenceProps = {
  onComplete: () => void;
};

const messages = [
  "initializing environment...",
  "loading frontend modules...",
  "connecting database...",
  "checking authentication system...",
  "jwt security layer enabled...",
];

function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function runBoot() {
      for (const message of messages) {
        await new Promise((resolve) => setTimeout(resolve, 1100));

        if (cancelled) return;

        setLines((prev) => [...prev, message]);
      }

      await new Promise((resolve) => setTimeout(resolve, 1300));

      if (cancelled) return;

      setLines((prev) => [...prev, "system ready"]);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (cancelled) return;

      setClosing(true);

      setTimeout(() => {
        onComplete();
      }, 700);
    }

    runBoot();

    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  return (
    <div
      className={`
        font-mono
        text-xm
        text-cyan-300/70
       
        tracking-wider
        leading-relaxed
        transition-all
        duration-700
        ${closing ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100"}
      `}
    >
      {lines.map((line, index) => (
        <p
          key={index}
          className={
            line === "system ready"
              ? "text-center mt-4 text-cyan-300/80 text-transform: uppercase font-bold drop-shadow-[0_0_10px_rgba(10,211,238,0.10)]"
              : ""
          }
        >
          {line === "system ready" ? line : `> ${line}`}
        </p>
      ))}
    </div>
  );
}

export default BootSequence;
