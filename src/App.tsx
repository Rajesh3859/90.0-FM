import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Radio, ArrowUp, Heart, Headphones, ShieldAlert, Sparkles, Phone, Mail, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Home } from "@/pages/Home";
import { Podcasts } from "@/pages/Podcasts";
import { Schedule } from "@/pages/Schedule";
import { TrackInfo } from "@/components/LivePlayer";
import { stationInfo, Episode } from "@/data/podcasts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AppContent() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [audioError, setAudioError] = useState<string | null>(null);

  const initialLiveTrack: TrackInfo = {
    title: "College FM — Live Broadcast",
    subtitle: "Streaming live on 90.0 FM & Web • Student Radio Station",
    audioUrl: "/audio/campus-intro.mp3",
    isLive: true,
    hostName: "RJ Ananya",
    category: "LIVE ON AIR",
  };

  const [currentTrack, setCurrentTrack] = useState<TrackInfo>(initialLiveTrack);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Audio play/pause handler
  const handleTogglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        setAudioError(null);
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err: any) {
        console.warn("Audio playback notice:", err);
        if (currentTrack.audioUrl !== "/audio/campus-intro.mp3") {
          setCurrentTrack((prev) => ({
            ...prev,
            audioUrl: "/audio/campus-intro.mp3",
          }));
          setTimeout(() => {
            audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
          }, 100);
        } else {
          setAudioError("Tap to allow audio playback");
        }
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handlePlayEpisode = (episode: Episode) => {
    const isSameEpisode = currentTrack.audioUrl === episode.audioUrl;
    if (isSameEpisode && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    setCurrentTrack({
      title: episode.title,
      subtitle: `${episode.host} • ${episode.category} (${episode.duration})`,
      audioUrl: episode.audioUrl || "/audio/campus-intro.mp3",
      isLive: false,
      hostName: episode.host,
      category: episode.category,
    });

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = episode.audioUrl || "/audio/campus-intro.mp3";
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.warn("Playback error:", err));
      }
    }, 50);
  };

  const handleTuneInLive = () => {
    setCurrentTrack(initialLiveTrack);
    if (location.pathname !== "/") {
      navigate("/");
    }
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = initialLiveTrack.audioUrl;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.warn("Playback error:", err));
      }
      document.getElementById("live-player-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      {/* Hidden Native Audio Element with real time update events */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
        onLoadedMetadata={(e) => setDuration((e.target as HTMLAudioElement).duration || 0)}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setAudioError("Stream reconnecting or unavailable");
          setIsPlaying(false);
        }}
      />

      {/* Navigation Bar */}
      <Navbar onTuneIn={handleTuneInLive} isPlaying={isPlaying} />

      {/* Main Page Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onTogglePlay={handleTogglePlay}
                volume={volume}
                onVolumeChange={handleVolumeChange}
                onPlayEpisode={handlePlayEpisode}
                onTuneInLive={handleTuneInLive}
                currentTime={currentTime}
                duration={duration}
                onSeek={handleSeek}
              />
            }
          />
          <Route
            path="/podcasts"
            element={
              <Podcasts
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlayEpisode={handlePlayEpisode}
              />
            }
          />
          <Route
            path="/schedule"
            element={
              <Schedule onTuneInLive={handleTuneInLive} isPlaying={isPlaying} />
            }
          />
        </Routes>
      </main>

      {/* Sticky Bottom Floating Player (when navigating on other pages) */}
      {location.pathname !== "/" && (
        <aside className="sticky bottom-3 sm:bottom-4 z-40 mx-auto w-full max-w-5xl px-3 sm:px-4 animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between rounded-xl sm:rounded-2xl border border-border/80 bg-background/95 p-2.5 sm:p-3.5 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden pr-2">
              <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-primary text-primary-foreground shadow-xs">
                <Radio className={`h-4 w-4 sm:h-5 sm:w-5 ${isPlaying ? "animate-pulse" : ""}`} />
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="truncate text-xs sm:text-sm font-bold text-foreground">
                    {currentTrack.title}
                  </span>
                  {currentTrack.isLive && (
                    <Badge variant="destructive" className="h-3.5 sm:h-4 px-1 text-[8px] sm:text-[9px] uppercase font-bold shrink-0">
                      Live
                    </Badge>
                  )}
                </div>
                <p className="truncate text-[10px] sm:text-xs text-muted-foreground">
                  {currentTrack.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                onClick={handleTogglePlay}
                className="h-8 sm:h-9 rounded-full px-3 sm:px-4 gap-1 shadow-xs font-semibold text-xs"
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>
            </div>
          </div>
        </aside>
      )}

      {/* Campus Radio Footer */}
      <footer className="mt-auto border-t border-border/60 bg-card/60 backdrop-blur-xs">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand column */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
                  <Radio className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-sm sm:text-base font-bold tracking-tight text-foreground">
                    COLLEGE FM 90.0
                  </span>
                  <div className="text-[9px] uppercase font-semibold text-primary">
                    Student Community Radio
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The authentic voice of our campus community. Broadcasting independent
                student debates, faculty discoveries, indie beats, and hostel stories since 2018.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Explore the Station
              </h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-foreground transition-colors">
                    Live Broadcast Stream
                  </Link>
                </li>
                <li>
                  <Link to="/podcasts" className="hover:text-foreground transition-colors">
                    Podcast Archive (28 Episodes)
                  </Link>
                </li>
                <li>
                  <Link to="/schedule" className="hover:text-foreground transition-colors">
                    Weekly Broadcast Guide
                  </Link>
                </li>
              </ul>
            </div>

            {/* Frequencies & Studio */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Studio & Transmitters
              </h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Radio className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Frequency: 90.0 MHz Stereo</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="truncate">Studio B, Student Activity Centre</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Hotline: {stationInfo.whatsappHotline}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>{stationInfo.email}</span>
                </li>
              </ul>
            </div>

            {/* Student Production Desk */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Student Production Desk
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Got a band demo, club announcement, or want to audition as an RJ? Drop by
                Studio B any weekday 3:00 PM – 6:00 PM.
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                <Button variant="outline" size="sm" className="h-7 text-xs font-medium px-2.5">
                  Instagram
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs font-medium px-2.5">
                  YouTube
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/50 pt-5 sm:flex-row text-[11px] text-muted-foreground text-center sm:text-left">
            <p>© {new Date().getFullYear()} College FM 90.0. Powered by the Student Radio Guild.</p>
            <div className="flex items-center gap-1.5">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Transmitter status: Active (SAC 90.0 MHz)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
