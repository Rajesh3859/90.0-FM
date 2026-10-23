import React, { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
  RadioTower,
  MessageSquare,
  Sparkles,
  Signal,
  Headphones,
  Send,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

export interface TrackInfo {
  title: string;
  subtitle: string;
  audioUrl: string;
  isLive?: boolean;
  hostName?: string;
  category?: string;
}

interface LivePlayerProps {
  currentTrack: TrackInfo;
  isPlaying: boolean;
  onTogglePlay: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  currentTime?: number;
  duration?: number;
  onSeek?: (time: number) => void;
  audioError?: string | null;
}

export const LivePlayer: React.FC<LivePlayerProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  volume,
  onVolumeChange,
  currentTime = 0,
  duration = 0,
  onSeek,
  audioError,
}) => {
  const [showDedicationModal, setShowDedicationModal] = useState(false);
  const [dedicationMsg, setDedicationMsg] = useState("");
  const [dedicationSent, setDedicationSent] = useState(false);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return "0:00";
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  const handleSendDedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dedicationMsg.trim()) return;
    setDedicationSent(true);
    setTimeout(() => {
      setDedicationSent(false);
      setDedicationMsg("");
      setShowDedicationModal(false);
    }, 2000);
  };

  return (
    <Card className="relative overflow-hidden border-border/70 bg-linear-to-br from-card via-card/95 to-primary/5 shadow-xl backdrop-blur-md">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-accent/20 blur-3xl" />

      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Top Status Bar: Station Details & Tech Specs */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3 text-[11px] sm:text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 ${
                    isPlaying ? "animate-ping" : ""
                  }`}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <span className="font-bold tracking-wider uppercase text-foreground text-[10px] sm:text-xs">
                {currentTrack.isLive ? "LIVE — STUDIO B" : "CAMPUS ARCHIVE"}
              </span>
              <span className="text-muted-foreground">•</span>
              <Badge variant="outline" className="px-1.5 py-0 font-mono text-[10px] font-semibold border-primary/30 text-primary">
                90.0 MHz
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground font-mono text-[10px] sm:text-[11px]">
              <span className="inline-flex items-center gap-1">
                <Signal className="h-3 w-3 text-emerald-500" /> 320k HD
              </span>
              <span className="hidden xs:inline">•</span>
              <span className="hidden xs:inline">Transmitter OK</span>
            </div>
          </div>

          {/* Main Track & Player Body */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Track Info */}
            <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="relative flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary text-primary-foreground shadow-md transition-transform">
                <Radio className={`h-6 w-6 sm:h-8 sm:w-8 ${isPlaying ? "animate-pulse" : ""}`} />
                {isPlaying && (
                  <div className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs">
                    <Sparkles className="h-2 w-2" />
                  </div>
                )}
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge
                    variant={currentTrack.isLive ? "default" : "secondary"}
                    className="text-[10px] sm:text-xs px-1.5 py-0 font-semibold uppercase tracking-wider"
                  >
                    {currentTrack.isLive ? "On Air" : currentTrack.category || "Podcast"}
                  </Badge>
                  {currentTrack.hostName && (
                    <span className="text-[11px] sm:text-xs font-medium text-muted-foreground flex items-center gap-1 truncate">
                      <Headphones className="h-3 w-3 text-primary shrink-0" />
                      RJ: <strong className="text-foreground truncate">{currentTrack.hostName}</strong>
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold tracking-tight text-foreground truncate">
                  {currentTrack.title}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {currentTrack.subtitle}
                </p>
              </div>
            </div>

            {/* Equalizer Visualizer (Responsive: adaptive bars) */}
            <div className="hidden xs:flex items-center justify-center gap-1 py-1 px-2.5 rounded-xl bg-muted/20 border border-border/30 h-12 sm:h-14 self-center lg:self-auto shrink-0" aria-hidden="true">
              {Array.from({ length: 14 }).map((_, i) => {
                const heights = [18, 38, 14, 46, 32, 50, 36, 22, 42, 28, 48, 18, 36, 24];
                const dynamicHeight = isPlaying ? heights[i % heights.length] : 6;
                return (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-linear-to-t from-primary/80 to-primary/40 transition-all duration-300"
                    style={{
                      height: `${dynamicHeight}px`,
                      opacity: isPlaying ? 0.4 + (i % 3) * 0.25 : 0.2,
                    }}
                  />
                );
              })}
            </div>

            {/* Controls & Volume */}
            <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3 shrink-0 pt-2 lg:pt-0 border-t border-border/30 lg:border-t-0">
              {/* Play / Pause Main CTA */}
              <div className="flex items-center gap-2.5">
                <Button
                  size="lg"
                  onClick={onTogglePlay}
                  className="h-11 w-11 sm:h-13 sm:w-13 rounded-full p-0 shadow-lg transition-all hover:scale-105 active:scale-95 bg-primary text-primary-foreground shrink-0"
                  aria-label={isPlaying ? "Pause broadcast" : "Play broadcast"}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 fill-current" />
                  ) : (
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  )}
                </Button>

                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-foreground">
                    {isPlaying ? "Transmitting" : "Ready"}
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">
                    {currentTrack.isLive ? "Live Stream" : `${formatTime(currentTime)} / ${formatTime(duration || 180)}`}
                  </span>
                </div>
              </div>

              {/* Volume Slider */}
              <div className="flex w-24 sm:w-32 items-center gap-1.5 sm:gap-2 rounded-xl border border-border/60 bg-muted/30 px-2 sm:px-2.5 py-1.5">
                <button
                  type="button"
                  onClick={() => onVolumeChange(volume === 0 ? 0.8 : 0)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={volume === 0 ? "Unmute" : "Mute"}
                >
                  {volume === 0 ? (
                    <VolumeX className="h-3.5 w-3.5" />
                  ) : (
                    <Volume2 className="h-3.5 w-3.5" />
                  )}
                </button>
                <Slider
                  defaultValue={[volume * 100]}
                  value={[volume * 100]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(val) => onVolumeChange(val[0] / 100)}
                  className="w-full cursor-pointer"
                  aria-label="Volume slider"
                />
              </div>

              {/* Dedication / Shoutout trigger */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDedicationModal(true)}
                className="flex items-center gap-1.5 text-xs font-semibold h-8 px-2.5 w-full sm:w-auto justify-center"
              >
                <MessageSquare className="h-3.5 w-3.5 text-primary" />
                <span>Shoutout to Studio</span>
              </Button>
            </div>
          </div>

          {/* Scrubber / Progress Bar for Recorded Podcasts */}
          {!currentTrack.isLive && duration > 0 && onSeek && (
            <div className="space-y-1 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <Slider
                defaultValue={[currentTime]}
                value={[currentTime]}
                min={0}
                max={duration || 100}
                step={1}
                onValueChange={(val) => onSeek(val[0])}
                className="w-full cursor-pointer"
              />
            </div>
          )}

          {audioError && (
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2 text-[11px] text-amber-600 dark:text-amber-400 text-center font-medium">
              {audioError} (Switched to campus audio backup)
            </div>
          )}
        </div>
      </CardContent>

      {/* Interactive Song Dedication & Shoutout Modal */}
      {showDedicationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xl">
            <h4 className="text-base sm:text-lg font-bold text-foreground">
              Send a Shoutout to Studio B
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Your dedication goes directly to the live on-air RJ screen in Studio B.
            </p>

            {dedicationSent ? (
              <div className="my-6 flex flex-col items-center justify-center gap-2 text-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 animate-bounce" />
                <span className="font-semibold text-xs sm:text-sm">
                  Shoutout sent to Studio B desk! Keep listening to hear it on air.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSendDedication} className="mt-4 space-y-3 sm:space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">
                    Your Message / Song Request
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={dedicationMsg}
                    onChange={(e) => setDedicationMsg(e.target.value)}
                    placeholder="e.g. Good luck to Mech batch for lab vivas! Please play 'Northern Sky'!"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background p-2.5 sm:p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => setShowDedicationModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="gap-1.5 text-xs font-semibold">
                    <Send className="h-3.5 w-3.5" /> Send to RJ Desk
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
