import React from "react";
import { Link } from "react-router-dom";
import {
  Play,
  ArrowRight,
  Radio,
  RadioTower,
  Headphones,
  CalendarDays,
  Sparkles,
  Users,
  Mic2,
  MessageCircle,
  Clock,
  Music2,
  Flame,
} from "lucide-react";
import { LivePlayer, TrackInfo } from "@/components/LivePlayer";
import { PodcastCard } from "@/components/PodcastCard";
import { episodes, programs, radioHosts, campusShoutouts, Episode } from "@/data/podcasts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface HomeProps {
  currentTrack: TrackInfo;
  isPlaying: boolean;
  onTogglePlay: () => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  onPlayEpisode: (episode: Episode) => void;
  onTuneInLive: () => void;
  currentTime?: number;
  duration?: number;
  onSeek?: (time: number) => void;
}

export const Home: React.FC<HomeProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  volume,
  onVolumeChange,
  onPlayEpisode,
  onTuneInLive,
  currentTime,
  duration,
  onSeek,
}) => {
  const featuredEpisodes = episodes.slice(0, 3);
  const todayPrograms = programs.slice(0, 4);

  return (
    <div className="space-y-10 sm:space-y-16 md:space-y-20 pb-12 sm:pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/70 bg-linear-to-b from-card via-card/90 to-background p-4 sm:p-8 md:p-12 lg:p-16 shadow-xl">
        {/* Subtle grid pattern background */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[18px_18px] sm:bg-size-[24px_24px]" />

        <div className="relative grid gap-8 sm:gap-12 lg:grid-cols-12 lg:items-center">
          {/* Copy */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold tracking-wider text-foreground backdrop-blur-md shadow-xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <span className="truncate">LIVE ON 90.0 FM STEREO</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              The voice of our quad, <br />
              <span className="bg-linear-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent">
                our community,
              </span>{" "}
              <br />
              and our college.
            </h1>

            <p className="max-w-xl text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
              From freshers' hostel debates and canteen recommendations to research
              breakthroughs and acoustic campus sessions — 90.0 FM is completely student-run,
              unfiltered, and always on.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              <Button
                size="lg"
                onClick={onTuneInLive}
                className="h-10 sm:h-12 gap-2 px-5 sm:px-6 text-xs sm:text-sm font-semibold shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                Tune In to Studio B
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-10 sm:h-12 gap-2 px-5 sm:px-6 text-xs sm:text-sm font-semibold"
              >
                <Link to="/podcasts">
                  Explore Podcasts <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </Button>
            </div>

            {/* Campus Impact Metrics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-4 sm:pt-6 border-t border-border/50 max-w-lg">
              <div>
                <div className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  90.0
                </div>
                <div className="text-[9px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-medium mt-0.5">
                  FM Stereo Dial
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  14k+
                </div>
                <div className="text-[9px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-medium mt-0.5">
                  Campus Listeners
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  100%
                </div>
                <div className="text-[9px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-medium mt-0.5">
                  Student Produced
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Radio Tower Visualizer */}
          <div className="relative flex items-center justify-center lg:col-span-5 pt-2 lg:pt-0">
            <div className="relative flex h-56 w-56 xs:h-64 xs:w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96 items-center justify-center rounded-3xl border border-border/80 bg-linear-to-tr from-accent/40 via-background to-primary/10 shadow-xl backdrop-blur-md">
              {/* Outer pulsing rings */}
              <div
                className={`absolute inset-2 sm:inset-3 rounded-full border border-primary/20 transition-transform duration-1000 ${
                  isPlaying ? "scale-105 animate-pulse" : "scale-100"
                }`}
              />
              <div
                className={`absolute inset-6 sm:inset-10 rounded-full border border-primary/15 transition-transform duration-700 ${
                  isPlaying ? "scale-95" : "scale-100"
                }`}
              />

              <div className="relative flex flex-col items-center justify-center text-center p-3 sm:p-6">
                <div className="flex h-18 w-18 sm:h-24 sm:w-24 lg:h-28 lg:w-28 items-center justify-center rounded-2xl sm:rounded-3xl bg-primary text-primary-foreground shadow-2xl">
                  <RadioTower className={`h-9 w-9 sm:h-12 sm:w-12 lg:h-14 lg:w-14 ${isPlaying ? "animate-bounce" : ""}`} />
                </div>
                <div className="mt-3 sm:mt-4 font-extrabold tracking-tight text-base sm:text-xl lg:text-2xl text-foreground">
                  COLLEGE FM
                </div>
                <span className="mt-0.5 sm:mt-1 font-mono text-[9px] sm:text-xs font-semibold text-muted-foreground">
                  SAC TOWER 90.0 MHz
                </span>
                <div className="mt-1 sm:mt-2 flex items-center gap-1 text-[10px] sm:text-xs text-primary font-semibold">
                  <Music2 className="h-3 w-3" />
                  <span className="truncate max-w-37.5 sm:max-w-none">Morning Chai & Indie</span>
                </div>
              </div>

              {/* Floating feature pills */}
              <div className="absolute top-3 left-2 sm:top-6 sm:left-4 flex items-center gap-1.5 rounded-full border border-border/80 bg-background/95 px-2.5 py-0.5 sm:px-3.5 sm:py-1 text-[10px] sm:text-xs font-semibold shadow-md backdrop-blur-md">
                <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 animate-ping" />
                ON AIR
              </div>
              <div className="absolute bottom-3 right-2 sm:bottom-6 sm:right-4 flex items-center gap-1.5 rounded-full border border-border/80 bg-background/95 px-2.5 py-0.5 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs font-semibold shadow-md backdrop-blur-md">
                <Headphones className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                320 kbps HD
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stream Section */}
      <section id="live-player-section" className="space-y-3 sm:space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary">
              Live Broadcast Feed
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              Direct from Studio B
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Listen live from your phone or laptop. Tap play to start streaming.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onTuneInLive}
            className="hidden sm:flex gap-1.5 text-xs font-semibold h-8"
          >
            <Radio className="h-3.5 w-3.5 text-primary" /> Tune Frequency
          </Button>
        </div>

        <LivePlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
          volume={volume}
          onVolumeChange={onVolumeChange}
          currentTime={currentTime}
          duration={duration}
          onSeek={onSeek}
        />
      </section>

      {/* Featured Podcasts */}
      <section className="space-y-4 sm:space-y-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-amber-500" /> Binge-Worthy Shows
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              Featured Podcasts
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Produced by fellow students. Real discussions you won't hear in class.
            </p>
          </div>
          <Button variant="ghost" asChild className="self-start sm:self-auto gap-1 text-xs font-semibold h-8 p-0 sm:px-3">
            <Link to="/podcasts">
              View all 28 episodes <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEpisodes.map((episode) => (
            <PodcastCard
              key={episode.id}
              episode={episode}
              isPlayingCurrent={isPlaying && currentTrack.audioUrl === episode.audioUrl}
              onPlayEpisode={onPlayEpisode}
            />
          ))}
        </div>
      </section>

      {/* Meet Your Campus RJs (Responsive 2 columns on mobile, 4 on desktop) */}
      <section className="space-y-4 sm:space-y-6">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary">
            The Humans Behind the Mic
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Meet Your Campus RJs
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Your fellow students who host live sessions, produce original mixes, and keep campus buzzing.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {radioHosts.map((host) => (
            <Card
              key={host.id}
              className="group overflow-hidden border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg flex flex-col justify-between"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <img
                  src={host.image}
                  alt={host.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 text-white">
                  <div className="font-bold text-xs sm:text-base leading-tight truncate">{host.name}</div>
                  <div className="text-[9px] sm:text-[11px] text-white/80 font-medium truncate">{host.yearAndMajor}</div>
                </div>
              </div>
              <CardContent className="p-2.5 sm:p-4 space-y-1.5 sm:space-y-2">
                <div className="text-[11px] sm:text-xs font-semibold text-primary truncate">{host.show}</div>
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {host.bio}
                </p>
                <div className="pt-1.5 border-t border-border/50 text-[10px] sm:text-[11px] text-muted-foreground truncate">
                  <span className="font-semibold text-foreground">Jam: </span>
                  {host.favoriteTrack}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Today's Schedule Overview */}
      <section className="space-y-4 sm:space-y-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary">
              On Air Today
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              Daily Broadcast Schedule
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Catch live shows, debates, and acoustic tracks across campus on 90.0 FM.
            </p>
          </div>
          <Button variant="ghost" asChild className="self-start sm:self-auto gap-1 text-xs font-semibold h-8 p-0 sm:px-3">
            <Link to="/schedule">
              Full weekly guide <CalendarDays className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {todayPrograms.map((program) => (
            <Card
              key={program.id}
              className={`border-border/70 transition-all hover:border-primary/50 hover:shadow-md ${
                program.live ? "bg-accent/15 border-primary/40 ring-1 ring-primary/20" : "bg-card"
              }`}
            >
              <CardContent className="p-3.5 sm:p-5 space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={program.live ? "default" : "outline"} className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0">
                    {program.live ? "ON AIR NOW" : program.genre.split("&")[0]}
                  </Badge>
                  <span className="text-[11px] sm:text-xs font-mono font-medium text-muted-foreground">
                    {program.time.split("-")[0]}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-xs sm:text-sm leading-snug">
                    {program.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {program.description}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-1.5 text-[11px] sm:text-xs text-muted-foreground border-t border-border/40">
                  <Mic2 className="h-3 w-3 text-primary shrink-0" />
                  <span className="font-medium text-foreground truncate">{program.host}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Campus Shoutouts & Dedications Ticker */}
      <section className="rounded-2xl sm:rounded-3xl border border-border/80 bg-linear-to-r from-card via-card to-accent/15 p-4 sm:p-8 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 lg:max-w-md">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary">
              <MessageCircle className="h-3.5 w-3.5" /> Dedication Desk
            </div>
            <h3 className="text-lg sm:text-2xl font-extrabold text-foreground tracking-tight">
              Campus Shoutouts on Air
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Messages and track requests sent in by students right now. Have something to say to your hostel wing?
            </p>
            <div className="pt-1">
              <Button size="sm" onClick={onTuneInLive} className="gap-2 text-xs font-semibold h-8 w-full sm:w-auto">
                Send Your Dedication
              </Button>
            </div>
          </div>

          <div className="grid gap-2.5 sm:gap-3 flex-1 lg:max-w-2xl">
            {campusShoutouts.map((shoutout) => (
              <div
                key={shoutout.id}
                className="rounded-xl sm:rounded-2xl border border-border/60 bg-background/80 p-3 sm:p-4 shadow-xs backdrop-blur-xs space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground text-[11px] sm:text-xs truncate max-w-50 sm:max-w-none">
                    {shoutout.sender} → <span className="text-primary">{shoutout.recipient}</span>
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground shrink-0">{shoutout.timeAgo}</span>
                </div>
                <p className="text-xs text-muted-foreground italic leading-relaxed">"{shoutout.message}"</p>
                {shoutout.songRequest && (
                  <div className="text-[10px] sm:text-[11px] font-medium text-primary flex items-center gap-1 pt-0.5">
                    <Music2 className="h-3 w-3 shrink-0" /> Req: {shoutout.songRequest}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community / Join the Station Banner */}
      <section className="rounded-2xl sm:rounded-3xl border border-border/80 bg-linear-to-br from-primary/10 via-card to-background p-5 sm:p-8 md:p-12 shadow-md">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-12 md:items-center">
          <div className="space-y-2 sm:space-y-3 md:col-span-8">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary">
              <Users className="h-3.5 w-3.5" /> Want to Host a Show or Pitch a Podcast?
            </div>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
              Grab a mic. Your campus is listening.
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
              No previous broadcasting experience needed! The 90.0 FM team provides full
              training on sound consoles, editing software, and interviewing techniques.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:col-span-4 md:justify-end">
            <Button size="lg" className="h-10 sm:h-12 font-semibold text-xs sm:text-sm shadow-md">
              Apply to RJ Team
            </Button>
            <Button variant="outline" size="lg" asChild className="h-10 sm:h-12 text-xs sm:text-sm font-semibold">
              <Link to="/schedule">View Open Slots</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
