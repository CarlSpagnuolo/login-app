import React from "react";

const particles = Array.from({ length: 18 }).map((_, index) => ({
  id: index,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: index * 0.7,
  size: Math.random() * 14 + 1,
}));

function CyberBackground({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#030712]
      "
    >
      {/* Glow cyan principale */}
      <div
        className="
          absolute
          -top-40
          -left-40
          w-500
          h-500
          rounded-full
         bg-cyan-400/8
          blur-[120px]
          animate-[float_12s_ease-in-out_infinite]
        "
      />

      {/* Glow viola */}
      <div
        className="
          absolute
          -bottom-40
          -right-40
          w-600
          h-600
          rounded-full
          bg-purple-500/10
          blur-[120px]
          animate-[floatReverse_15s_ease-in-out_infinite]
        "
      />

      {/* Glow centrale leggero */}
      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-400
          h-400
          rounded-full
          bg-cyan-200/5 
          blur-[50px]
          
        "
      />

      {/* Particelle */}
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="
      absolute
      z-0
      rounded-full
      bg-cyan-300/30
      animate-[particleMove_10s_linear_infinite]
    "
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            opacity: particle.size / 10,
          }}
        />
      ))}

      {/* Scanline monitor */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-[0.025]
          bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.3)_50%)]
          bg-size-[100%_4px]
        "
      />

      {/* Contenuto */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default CyberBackground;
