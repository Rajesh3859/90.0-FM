import React from "react";
import { Play, Pause, Headphones, Clock3, Calendar } from "lucide-react";
import { Episode } from "@/data/podcasts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PodcastCardProps {
  episode: Episode;
  isPlayingCurrent?: boolean;
  onPlayEpisode: (episode: Episode) => void;
}

export const PodcastCard: React.FC<PodcastCardProps> = ({
  episode,
  isPlayingCurrent = false,
  onPlayEpisode,
}) => {
  return (
    <Card className={`group flex flex-col overflow-hidden border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
      isPlayingCurrent ? "border-primary/60 ring-2 ring-primary/20 shadow-md" : "hover:border-primary/40"
    }`}>
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={episode.image}
          alt={episode.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

        {/* Category & Plays Badge */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1.5">
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground text-[10px] sm:text-[11px] px-2 py-0.5 font-bold tracking-wider backdrop-blur-md shadow-xs"
          >
            {episode.category}
          </Badge>
          {episode.listenerCount && (
            <span className="hidden xs:inline-flex rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-mono text-white/90 backdrop-blur-xs">
              {episode.listenerCount}
            </span>
          )}
        </div>

        {/* Play/Pause Button Overlay */}
        <Button
          size="icon"
          onClick={() => onPlayEpisode(episode)}
          className={`absolute right-2.5 bottom-2.5 sm:right-3.5 sm:bottom-3.5 h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-2xl transition-transform group-hover:scale-110 ${
            isPlayingCurrent
              ? "bg-primary text-primary-foreground animate-pulse"
              : "bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground backdrop-blur-md"
          }`}
          aria-label={isPlayingCurrent ? `Pause ${episode.title}` : `Play ${episode.title}`}
        >
          {isPlayingCurrent ? (
            <Pause className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
          ) : (
            <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-current ml-0.5" />
          )}
        </Button>
      </div>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col justify-between p-3.5 sm:p-5 space-y-3">
        <div className="space-y-2 sm:space-y-2.5">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-muted-foreground">
            <span className="flex items-center gap-1 font-medium text-foreground truncate max-w-32.5 sm:max-w-none">
              <Headphones className="h-3 w-3 text-primary shrink-0" />
              <span className="truncate">{episode.host}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock3 className="h-3 w-3 shrink-0" />
              {episode.duration}
            </span>
            <span className="hidden xs:inline">•</span>
            <span className="hidden xs:flex items-center gap-1">
              <Calendar className="h-3 w-3 shrink-0" />
              {episode.date}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-bold text-sm sm:text-base md:text-lg leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
            {episode.title}
          </h4>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {episode.description}
          </p>

          {/* Topic Pills */}
          {episode.topics && episode.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-0.5">
              {episode.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="rounded-md bg-muted/70 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium text-muted-foreground"
                >
                  #{topic}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer Action */}
        <div className="pt-2.5 border-t border-border/50 flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-semibold">
            {isPlayingCurrent ? (
              <span className="text-primary flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                Listening
              </span>
            ) : (
              <span className="text-muted-foreground truncate max-w-30 sm:max-w-none">
                {episode.hostRole}
              </span>
            )}
          </span>
          <Button
            variant={isPlayingCurrent ? "default" : "ghost"}
            size="sm"
            onClick={() => onPlayEpisode(episode)}
            className="text-[11px] sm:text-xs font-semibold h-7 sm:h-8 px-2 sm:px-3"
          >
            {isPlayingCurrent ? "Pause" : "Play →"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
