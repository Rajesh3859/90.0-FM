import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Radio, Home, Podcast, CalendarDays, Menu, X, RadioTower } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  onTuneIn?: () => void;
  isPlaying?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onTuneIn, isPlaying }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/podcasts", label: "Podcasts", icon: Podcast },
    { to: "/schedule", label: "Schedule", icon: CalendarDays },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-90 shrink-0"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
            <Radio className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold tracking-tight text-foreground text-sm sm:text-base lg:text-lg">
                COLLEGE FM
              </span>
              <Badge variant="outline" className="px-1.5 py-0 text-[10px] font-bold border-primary/40 text-primary">
                90.0
              </Badge>
            </div>
            <span className="hidden xs:block text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
              Your Campus. Your Voice.
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Live Action & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            size="sm"
            onClick={onTuneIn}
            className="flex h-8 sm:h-9 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 text-xs font-semibold shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 ${
                  isPlaying ? "animate-ping" : ""
                }`}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <RadioTower className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>
              {isPlaying ? (
                <span>On Air</span>
              ) : (
                <>
                  <span className="sm:hidden">Live</span>
                  <span className="hidden sm:inline">Listen Live</span>
                </>
              )}
            </span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="border-b border-border/80 bg-background/95 px-4 pt-2 pb-4 shadow-xl backdrop-blur-lg md:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
