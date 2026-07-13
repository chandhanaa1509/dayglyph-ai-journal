import type { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
}

function Background({ children }: BackgroundProps) {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-br
        from-[var(--background)]
        via-[var(--background-secondary)]
        to-[var(--primary-light)]
      "
    >
      {/* Decorative Blobs */}

      <div className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl" />

      <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="absolute bottom-0 left-20 h-72 w-72 rounded-full bg-yellow-200/30 blur-3xl" />

      <div className="absolute bottom-10 right-16 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />

      {/* Decorative Emojis */}

      <div className="absolute left-8 top-10 text-4xl opacity-20">
        🌸
      </div>

      <div className="absolute right-20 top-24 text-3xl opacity-20">
        ☁️
      </div>

      <div className="absolute bottom-24 left-12 text-3xl opacity-20">
        🌿
      </div>

      <div className="absolute bottom-12 right-12 text-4xl opacity-20">
        ✨
      </div>

      <div className="relative z-10">{children}</div>
    </main>
  );
}

export default Background;