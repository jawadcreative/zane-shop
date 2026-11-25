"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => setIsLoaded(true);

    if (document.readyState === "complete") {
      handleLoad();
      return;
    }

    window.addEventListener("load", handleLoad, { once: true });

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={isLoaded}
      className={`fixed inset-0 z-100 flex items-center justify-center bg-background transition-opacity duration-300 ${
        isLoaded ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          aria-hidden="true"
          className="h-10 w-10 animate-spin rounded-full border-4 border-foreground/20 border-t-foreground"
        />
        <p className="text-sm font-medium tracking-wide text-foreground/70">
          Loading...
        </p>
      </div>
    </div>
  );
}
