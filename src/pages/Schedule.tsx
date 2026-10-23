import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  Radio,
  Mic,
  Calendar,
  Volume2,
  CheckCircle2,
  RadioTower,
  Info,
  Sparkles,
} from "lucide-react";
import { programs, Program } from "@/data/podcasts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ScheduleProps {
  onTuneInLive: () => void;
  isPlaying: boolean;
}

export const Schedule: React.FC<ScheduleProps> = ({ onTuneInLive, isPlaying }) => {
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const filterOptions = [
    { id: "ALL", label: "All Slots" },
    { id: "WEEKDAYS", label: "Weekdays (Mon - Fri)" },
    { id: "WEEKENDS", label: "Weekends (Sat - Sun)" },
    { id: "LIVE NOW", label: "On Air Now" },
  ];

  const filteredPrograms = programs.filter((prog) => {
    if (selectedFilter === "LIVE NOW") return prog.live;
    if (selectedFilter === "WEEKDAYS") return prog.dayCategory === "WEEKDAYS";
    if (selectedFilter === "WEEKENDS") return prog.dayCategory === "WEEKENDS";
    return true;
  });

  return (
    <div className="space-y-8 sm:space-y-12 pb-16 sm:pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-accent/30 px-3 py-1 text-[10px] sm:text-xs font-semibold text-primary">
            <CalendarDays className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            LIVE PROGRAMMING GRID
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Weekly Broadcast Lineup
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
            From the upbeat 7:30 AM morning chai rush to late-night ambient study beats,
            here is what's hitting the 90.0 MHz airwaves this week.
          </p>
        </div>

        <Button
          size="lg"
          onClick={onTuneInLive}
          className="gap-2 self-start sm:self-auto shadow-md font-semibold text-xs sm:text-sm h-10 sm:h-12 w-full sm:w-auto justify-center"
        >
          <RadioTower className="h-4 w-4" />
          {isPlaying ? "Transmitting Stream" : "Tune In to Live Show"}
        </Button>
      </div>

      {/* Filter Tabs (Horizontal scroll on mobile) */}
      <div className="flex items-center gap-2 border-b border-border/60 pb-3 overflow-x-auto no-scrollbar sm:flex-wrap">
        {filterOptions.map((filter) => {
          const isSelected = selectedFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setSelectedFilter(filter.id)}
              className={`rounded-full px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider transition-all shrink-0 ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Program Timeline Grid */}
      <div className="space-y-3 sm:space-y-4">
        {filteredPrograms.map((prog) => (
          <Card
            key={prog.id}
            className={`border-border/70 transition-all hover:border-primary/50 hover:shadow-md ${
              prog.live ? "bg-accent/15 border-primary/50 ring-2 ring-primary/20 shadow-xs" : "bg-card"
            }`}
          >
            <CardContent className="flex flex-col gap-3 sm:gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              {/* Time Column */}
              <div className="flex items-center gap-3 sm:gap-4 sm:w-60 sm:shrink-0">
                <div
                  className={`flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl ${
                    prog.live
                      ? "bg-red-500 text-white shadow-md animate-pulse"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-foreground">
                    {prog.time}
                  </div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground flex items-center gap-1 font-medium mt-0.5">
                    <Calendar className="h-3 w-3" /> {prog.day}
                  </div>
                </div>
              </div>

              {/* Show Details */}
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <h3 className="font-bold text-sm sm:text-base md:text-lg text-foreground tracking-tight">
                    {prog.name}
                  </h3>
                  {prog.live ? (
                    <Badge variant="default" className="text-[9px] sm:text-[10px] uppercase font-bold bg-red-600 hover:bg-red-600 px-1.5 py-0">
                      ON AIR NOW
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[9px] sm:text-[10px] font-semibold px-1.5 py-0">
                      {prog.genre}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {prog.description}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-foreground/90 pt-0.5">
                  <Mic className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary shrink-0" />
                  <span className="truncate">RJ: <strong className="text-primary">{prog.host}</strong> ({prog.hostRole})</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="sm:shrink-0 pt-1 sm:pt-0">
                <Button
                  variant={prog.live ? "default" : "outline"}
                  size="sm"
                  onClick={onTuneInLive}
                  className="w-full sm:w-auto gap-2 text-xs font-semibold h-8 sm:h-9"
                >
                  <Radio className="h-3.5 w-3.5" />
                  {prog.live ? "Listen Live" : "Tune Frequency"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Broadcasting Guidelines & Guest Request Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 pt-2">
        <Card className="border-border/70 bg-card p-4 sm:p-6 space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <h4 className="font-bold text-foreground text-sm sm:text-base">Campus Broadcast Standards</h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All shows on 90.0 FM follow student radio ethical standards. We strictly respect
            academic integrity, freedom of expression, original artist copyright licensing,
            and maintain an open platform welcoming all campus clubs and departments.
          </p>
        </Card>

        <Card className="border-border/70 bg-card p-4 sm:p-6 space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Radio className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <h4 className="font-bold text-foreground text-sm sm:text-base">Book a Fest or Club Appearance</h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Promoting a department symposium, hackathon, sports trial, or cultural fest?
            Request a 10-minute guest slot during the 4:30 PM Drive-Home broadcast by
            submitting your club details to the Studio B production desk.
          </p>
        </Card>
      </div>
    </div>
  );
};
