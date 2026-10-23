import React, { useState, useMemo } from "react";
import { Search, Podcast as PodcastIcon, Filter, Sparkles, Mic, ArrowUpDown } from "lucide-react";
import { PodcastCard } from "@/components/PodcastCard";
import { episodes, Episode } from "@/data/podcasts";
import { TrackInfo } from "@/components/LivePlayer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PodcastsProps {
  currentTrack: TrackInfo;
  isPlaying: boolean;
  onPlayEpisode: (episode: Episode) => void;
}

export const Podcasts: React.FC<PodcastsProps> = ({
  currentTrack,
  isPlaying,
  onPlayEpisode,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState<"newest" | "duration">("newest");

  const categories = useMemo(() => {
    const cats = ["ALL", ...Array.from(new Set(episodes.map((e) => e.category)))];
    return cats;
  }, []);

  const filteredEpisodes = useMemo(() => {
    let result = episodes.filter((episode) => {
      const matchesSearch =
        `${episode.title} ${episode.description} ${episode.host} ${episode.category} ${episode.topics.join(" ")}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" || episode.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "duration") {
      result.sort((a, b) => b.durationSeconds - a.durationSeconds);
    } else {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="space-y-8 sm:space-y-12 pb-16 sm:pb-20">
      {/* Header */}
      <div className="space-y-3 sm:space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-accent/30 px-3 py-1 text-[10px] sm:text-xs font-semibold text-primary">
          <PodcastIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          CAMPUS ON-DEMAND AUDIO ARCHIVE
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
          No corporate scripts. <br />
          <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Just real college voices.
          </span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
          Catch up on student life debates, faculty research deep dives, late-night acoustic sets,
          and behind-the-scenes stories recorded right here on campus.
        </p>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="flex flex-col gap-3.5 sm:gap-5 rounded-2xl border border-border/70 bg-card p-3.5 sm:p-5 shadow-xs">
        {/* Search Bar & Sort */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search by title, host, topic ('exams', 'lo-fi')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border/80 bg-background py-2 pl-9 pr-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 justify-between sm:justify-start">
            <span className="text-[11px] sm:text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpDown className="h-3 w-3" /> Sort:
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant={sortBy === "newest" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("newest")}
                className="text-[11px] sm:text-xs font-medium h-7 sm:h-8 px-2.5 sm:px-3"
              >
                Latest
              </Button>
              <Button
                variant={sortBy === "duration" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("duration")}
                className="text-[11px] sm:text-xs font-medium h-7 sm:h-8 px-2.5 sm:px-3"
              >
                Longest
              </Button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Horizontal scroll on mobile) */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-border/40 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap">
          <span className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-1 shrink-0">
            <Filter className="h-3 w-3" /> Genre:
          </span>
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs font-semibold transition-all shrink-0 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-[11px] sm:text-xs text-muted-foreground">
        <span>
          Showing <strong className="text-foreground">{filteredEpisodes.length}</strong> of{" "}
          {episodes.length} episodes
        </span>
        {(searchQuery || selectedCategory !== "ALL") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
            }}
            className="h-auto p-0 text-xs text-primary hover:underline font-semibold"
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Podcast Grid */}
      {filteredEpisodes.length > 0 ? (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEpisodes.map((episode) => (
            <PodcastCard
              key={episode.id}
              episode={episode}
              isPlayingCurrent={isPlaying && currentTrack.audioUrl === episode.audioUrl}
              onPlayEpisode={onPlayEpisode}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl border border-dashed border-border py-12 sm:py-16 text-center px-4">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <PodcastIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <h3 className="mt-3 sm:mt-4 font-bold text-base sm:text-lg text-foreground">
            No episodes matched your search
          </h3>
          <p className="mt-1 max-w-sm text-xs text-muted-foreground leading-relaxed">
            We couldn't find any recordings matching "{searchQuery}". Try searching for
            keywords like "hostel", "midterms", "music", or "startups".
          </p>
          <Button
            variant="outline"
            className="mt-3 sm:mt-4 text-xs font-semibold h-8"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* Student Podcast Pitch Banner */}
      <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-accent/20 p-5 sm:p-8 md:p-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 max-w-xl">
            <h4 className="font-bold text-base sm:text-lg text-foreground flex items-center gap-1.5">
              <Mic className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" /> Have a podcast idea?
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We provide free studio time, mixing assistance, and distribution across Spotify
              and the 90.0 FM website for student creators.
            </p>
          </div>
          <Button className="shrink-0 font-semibold text-xs h-9 sm:h-10 shadow-xs w-full sm:w-auto">
            Pitch Your Pilot
          </Button>
        </div>
      </div>
    </div>
  );
};
