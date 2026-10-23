
import { useState } from "react";
import {
  Radio,
  Headphones,
  Home,
  Podcast,
  CalendarDays,
  Info,
  Search,
  Play,
  Pause,
  Volume2,
  RadioTower,
  Clock3,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import "./index.css";

const episodes = [
  {
    id: 1,
    title: "Campus Conversations",
    category: "STUDENT LIFE",
    duration: "24 min",
    host: "Campus Radio Team",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    title: "Beyond the Classroom",
    category: "EDUCATION",
    duration: "32 min",
    host: "Knowledge Hub",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    title: "The Music Room",
    category: "MUSIC",
    duration: "18 min",
    host: "College FM",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=85",
  },
];

const programs = [
  { time: "09:00 AM", name: "Morning Vibes", type: "Music & greetings" },
  { time: "11:00 AM", name: "Campus Conversations", type: "Student talk show" },
  { time: "02:00 PM", name: "Beyond the Classroom", type: "Learning & careers" },
];

function App() {
  const [playing, setPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredEpisodes = episodes.filter((episode) =>
    `${episode.title} ${episode.category} ${episode.host}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app-shell">
      <header className="navbar">
        <a className="brand" href="#home" aria-label="College FM home">
          <span className="brand-icon">
            <Radio size={25} />
          </span>
          <span>
            <strong>COLLEGE FM</strong>
            <small>YOUR CAMPUS. YOUR VOICE.</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            <Home size={16} /> Home
          </a>
          <a href="#episodes" onClick={() => setMenuOpen(false)}>
            <Podcast size={16} /> Podcasts
          </a>
          <a href="#schedule" onClick={() => setMenuOpen(false)}>
            <CalendarDays size={16} /> Schedule
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            <Info size={16} /> About
          </a>
        </nav>

        <a className="listen-nav" href="#live">
          <span className="live-dot" /> Listen Live
        </a>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot" />
              YOUR CAMPUS RADIO STATION
            </div>

            <h1>
              Your campus.
              <br />
              Your <span>voice.</span>
              <br />
              Your FM.
            </h1>

            <p>
              Tune into the stories, music, ideas and voices that bring our
              college community together.
            </p>

            <div className="hero-actions">
              <a className="button-primary" href="#live">
                <Play size={18} fill="currentColor" /> Tune In Now
              </a>
              <a className="button-secondary" href="#episodes">
                Explore Podcasts <ArrowRight size={17} />
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>01</strong>
                <span>FM CHANNEL</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>ONLINE ACCESS</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>CAMPUS VOICES</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="radio-art">
              <RadioTower size={104} strokeWidth={1.1} />
              <div className="sound-bars" aria-hidden="true">
                {Array.from({ length: 21 }, (_, i) => (
                  <span
                    key={i}
                    style={{ "--bar-height": `${18 + ((i * 17) % 63)}px` }}
                  />
                ))}
              </div>
            </div>
            <div className="floating-label label-top">
              <span className="live-dot" /> CAMPUS ON AIR
            </div>
            <div className="floating-label label-bottom">
              <Headphones size={18} />
              Made for students
            </div>
          </div>
        </section>

        <section className="live-section section-wrap" id="live">
          <div className="live-heading">
            <div>
              <div className="section-kicker">THE CAMPUS FREQUENCY</div>
              <h2>Listen <span>live.</span></h2>
            </div>
            <span className="status-pill">
              <span className="live-dot" /> RADIO PLAYER DEMO
            </span>
          </div>

          <div className="player-card">
            <div className="player-cover">
              <Radio size={44} />
              <span>COLLEGE FM</span>
            </div>

            <div className="player-info">
              <span className="track-label">
                <span className="live-dot" /> ONLINE RADIO
              </span>
              <h3>College FM — Live Radio</h3>
              <p>Your college, your community, your sound.</p>

              <div className="player-progress">
                <span className={playing ? "progress-fill active" : "progress-fill"} />
              </div>
              <div className="progress-labels">
                <span>{playing ? "Demo playing" : "Ready to listen"}</span>
                <span>LIVE STREAM</span>
              </div>
            </div>

            <div className="player-controls">
              <button
                className="play-button"
                onClick={() => setPlaying(!playing)}
                aria-label={playing ? "Pause demo" : "Play demo"}
                title="Toggle demo player state"
              >
                {playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
              </button>
              <Volume2 size={21} />
            </div>
          </div>
          <p className="demo-note">
            This is a UI demo. Actual audio will play after we connect a live
            stream or podcast audio source.
          </p>
        </section>

        <section className="episodes-section section-wrap" id="episodes">
          <div className="section-heading">
            <div>
              <div className="section-kicker">TUNE INTO SOMETHING GOOD</div>
              <h2>Discover our <span>podcasts.</span></h2>
              <p>Conversations, creativity and campus life — all in one place.</p>
            </div>
            <label className="search-box">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search episodes..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search podcast episodes"
              />
            </label>
          </div>

          <div className="episode-grid">
            {filteredEpisodes.map((episode) => (
              <article className="episode-card" key={episode.id}>
                <div className="episode-image">
                  <img src={episode.image} alt="" loading="lazy" />
                  <span className="episode-category">{episode.category}</span>
                  <button
                    className="episode-play"
                    onClick={() => {
                      setPlaying(true);
                      document.getElementById("live")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    aria-label={`Select ${episode.title}`}
                    title="Open the radio player demo"
                  >
                    <Play size={19} fill="currentColor" />
                  </button>
                </div>
                <div className="episode-content">
                  <div className="episode-meta">
                    <span><Headphones size={14} /> {episode.host}</span>
                    <span><Clock3 size={14} /> {episode.duration}</span>
                  </div>
                  <h3>{episode.title}</h3>
                  <a
                    className="episode-link"
                    href="#live"
                    onClick={() => setPlaying(true)}
                  >
                    Explore episode <ArrowRight size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {filteredEpisodes.length === 0 && (
            <p className="empty-state">
              No episodes found. Try another title or category.
            </p>
          )}
        </section>

        <section className="schedule-section section-wrap" id="schedule">
          <div className="section-heading">
            <div>
              <div className="section-kicker">PLAN YOUR LISTENING</div>
              <h2>On the <span>air.</span></h2>
              <p>A sample schedule for your college radio station.</p>
            </div>
            <CalendarDays className="schedule-icon" size={38} />
          </div>

          <div className="schedule-list">
            {programs.map((program, index) => (
              <div className="schedule-row" key={program.name}>
                <div className="schedule-time">{program.time}</div>
                <div className="schedule-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="schedule-details">
                  <h3>{program.name}</h3>
                  <p>{program.type}</p>
                </div>
                <Radio size={20} className="schedule-radio" />
              </div>
            ))}
          </div>
          <p className="demo-note">
            These are example programs and timings. We'll make the schedule
            editable from the admin dashboard later.
          </p>
        </section>

        <section className="about-section section-wrap" id="about">
          <div className="about-icon"><Headphones size={34} /></div>
          <div>
            <div className="section-kicker">MORE THAN JUST A RADIO</div>
            <h2>Made on campus. <span>Made for everyone.</span></h2>
            <p>
              A space for student voices, faculty insights, music, campus
              updates and the stories that make college memorable.
            </p>
          </div>
          <a href="#home" className="button-secondary">
            Back to top <ArrowRight size={17} />
          </a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon"><Radio size={22} /></span>
          <span>
            <strong>COLLEGE FM</strong>
            <small>YOUR CAMPUS. YOUR VOICE.</small>
          </span>
        </a>
        <p>Built for campus. Powered by community.</p>
        <span>© {new Date().getFullYear()} College FM</span>
      </footer>
    </div>
  );
}

export default App;
