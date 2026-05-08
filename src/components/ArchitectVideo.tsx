"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

export function ArchitectVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.pause();
    else v.play();
    setPlaying(!playing);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-[#171410] shadow-[0_24px_80px_-24px_rgba(23,20,16,0.45)] ring-1 ring-black/10">
      <video
        ref={videoRef}
        src="/videos/architect.mov"
        autoPlay
        muted
        loop
        playsInline
        className="block aspect-video w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#171410]/50 to-transparent" />

      <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
          className="pointer-events-auto grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md ring-1 ring-white/20 transition hover:bg-white/25"
        >
          {playing ? (
            <Pause aria-hidden="true" className="size-3.5" />
          ) : (
            <Play aria-hidden="true" className="size-3.5" />
          )}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="pointer-events-auto grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md ring-1 ring-white/20 transition hover:bg-white/25"
        >
          {muted ? (
            <VolumeX aria-hidden="true" className="size-3.5" />
          ) : (
            <Volume2 aria-hidden="true" className="size-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
