import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "The Loop", href: "#the-loop" },
  { name: "Curator", href: "#curator" },
  { name: "Early Access", href: "#early-access" },
];

const words = ["make", "ship", "measure"];

// Color tokens
const colors = {
  background: "#F9F8F6",
  foreground: "#1A1A1A",
  muted: "#6B6B6B",
  border: "#E5E4E0",
  accent: "#F7FF9E",
  warmTint: "#F0EFE9",
};

// Font stacks
const fonts = {
  body: "'DM Sans', system-ui, sans-serif",
  display: "'PP Right Grotesk Mono', monospace",
};

// Mode data
const modes = [
  {
    label: "Make",
    tagline: "Start with a point of view. Leave with the work.",
    body: "The Curator helps you find the tension, build the brief, and land on a concept direction worth pursuing. Then you stay in the same space and start creating. By the time you're making, the strategy is already in the room. Every creative decision has context behind it.",
    media: "MAKE — Video",
  },
  {
    label: "Ship",
    tagline: "Review, approve, publish.",
    body: "The full feedback cycle in one place. Work moves through stages, the Curator checks it against the brief, and everyone knows what needs to happen next.",
    media: "SHIP — Video",
  },
  {
    label: "Measure",
    tagline: "Know what's working before your client asks.",
    body: "Live performance across every channel, coded to your actual goals. Not vanity metrics. Not someone else's benchmarks. When something underperforms, you don't just see it. You act on it. One click and you're in a new strategy session with that data already loaded. The learning becomes the next brief.",
    media: "MEASURE — Video",
  },
];

const integrationPlatforms = ["Meta Ads", "Google Ads", "Instagram", "TikTok"];

/* ─── Scroll Reveal Hook ─── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, revealed };
}

/* ─── Reveal style helper: 20px travel, 0.6s ease ─── */
function revealStyle(revealed: boolean, delay = 0): React.CSSProperties {
  return {
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(20px)",
  };
}

/* ─── Waitlist Form (local-only — Supabase wired later) ─── */
function WaitlistForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    // TODO: Wire to Supabase waitlist table (id, email, created_at)
    // For now, just capture the email locally and show success
    setTimeout(() => {
      console.log("[Waitlist] Email captured:", email.trim().toLowerCase());
      setStatus("success");
    }, 600);
  };

  if (status === "success") {
    return (
      <p
        style={{
          fontSize: "14px",
          fontFamily: fonts.display,
          color: variant === "dark" ? colors.accent : colors.foreground,
          letterSpacing: "0.05em",
        }}
      >
        You're on the list!
      </p>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "440px" }} className="waitlist-form">
      <div style={{ display: "flex", gap: "12px" }} className="waitlist-form-inner">
        <input
          type="email"
          required
          maxLength={255}
          placeholder="you@team.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: 1,
            height: "52px",
            padding: "0 20px",
            borderRadius: "9999px",
            border: `1px solid ${variant === "dark" ? "rgba(255,255,255,0.2)" : colors.border}`,
            backgroundColor: variant === "dark" ? "rgba(255,255,255,0.08)" : "transparent",
            color: variant === "dark" ? "#fff" : colors.foreground,
            fontSize: "14px",
            fontFamily: fonts.body,
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            height: "52px",
            padding: "0 28px",
            borderRadius: "9999px",
            border: "none",
            backgroundColor: variant === "dark" ? colors.accent : colors.foreground,
            color: colors.foreground,
            fontSize: "14px",
            fontFamily: fonts.display,
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
            opacity: status === "loading" ? 0.5 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          {status === "loading" ? "Submitting…" : "Get early access →"}
        </button>
      </div>
    </form>
  );
}

/* ─── Section Eyebrow ─── */
function SectionEyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "14px",
        fontFamily: fonts.display,
        color: light ? "rgba(255,255,255,0.5)" : colors.muted,
        marginBottom: "32px",
      }}
    >
      <span
        style={{
          width: "32px",
          height: "1px",
          backgroundColor: light ? "rgba(255,255,255,0.25)" : `${colors.foreground}4D`,
        }}
      />
      {children}
    </span>
  );
}

/* ─── Media Placeholder ─── */
function MediaPlaceholder({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: "16px",
        border: `1px solid ${light ? "rgba(255,255,255,0.12)" : colors.border}`,
        backgroundColor: light ? "rgba(255,255,255,0.04)" : `${colors.foreground}08`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: "12px",
          fontFamily: fonts.display,
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: light ? "rgba(255,255,255,0.25)" : `${colors.foreground}30`,
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Main Landing Page ─── */
export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [activeMode, setActiveMode] = useState(0);

  // Scroll reveal refs
  const problemReveal = useReveal();
  const modesReveal = useReveal();
  const loopReveal = useReveal();
  const curatorReveal = useReveal();
  const integrationsReveal = useReveal();
  const ctaReveal = useReveal();

  // Hero entrance — double RAF so browser paints hidden state first
  useEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
    return () => cancelAnimationFrame(raf1);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Word rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Three Modes auto-cycle (5.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMode((prev) => (prev + 1) % modes.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [activeMode]); // reset timer when user clicks

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  }, []);

  return (
    <>
      {/* Keyframes */}
      <style>
        {`
          @keyframes char-in {
            0% {
              opacity: 0;
              filter: blur(40px);
              transform: translateY(100%);
            }
            100% {
              opacity: 1;
              filter: blur(0px);
              transform: translateY(0);
            }
          }

          .animate-char-in {
            animation: char-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            opacity: 0;
            filter: blur(40px);
            transform: translateY(100%);
          }
        `}
      </style>

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: colors.background,
          color: colors.foreground,
          fontFamily: fonts.body,
          position: "relative",
        }}
      >
        {/* ── Gradient + Dot Grid (hero only) ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100vh",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 70% 20%, ${colors.accent}40 0%, transparent 50%)`,
            }}
          />
          <div style={{ position: "absolute", inset: 0, opacity: 0.4 }}>
            <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
              <defs>
                <pattern id="dotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1.5" fill={colors.foreground} opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotGrid)" />
            </svg>
          </div>
        </div>

        {/* ═══════════════════════ NAVIGATION ═══════════════════════ */}
        <header
          style={{
            position: "fixed",
            zIndex: 50,
            transition: "all 0.5s ease",
            top: isScrolled ? "16px" : "0",
            left: isScrolled ? "16px" : "0",
            right: isScrolled ? "16px" : "0",
          }}
        >
          <nav
            style={{
              margin: "0 auto",
              transition: "all 0.5s ease",
              backgroundColor: isScrolled || isMobileMenuOpen ? `${colors.background}CC` : "transparent",
              backdropFilter: isScrolled || isMobileMenuOpen ? "blur(20px)" : "none",
              WebkitBackdropFilter: isScrolled || isMobileMenuOpen ? "blur(20px)" : "none",
              border: isScrolled || isMobileMenuOpen ? `1px solid ${colors.border}` : "1px solid transparent",
              borderRadius: "9999px",
              boxShadow: isScrolled ? "0 4px 30px rgba(0,0,0,0.1)" : "none",
              maxWidth: isScrolled ? "1200px" : "1400px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "all 0.5s ease",
                padding: "0 24px",
                height: isScrolled ? "56px" : "80px",
              }}
            >
              {/* Logo */}
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                  color: colors.foreground,
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.display,
                    letterSpacing: "-0.02em",
                    transition: "all 0.5s ease",
                    fontSize: isScrolled ? "20px" : "24px",
                  }}
                >
                  Make Measure
                </span>
                <span
                  style={{
                    color: colors.muted,
                    fontFamily: fonts.display,
                    transition: "all 0.5s ease",
                    fontSize: isScrolled ? "10px" : "12px",
                    marginTop: isScrolled ? "2px" : "4px",
                  }}
                >
                  TM
                </span>
              </a>

              {/* Desktop Nav Links */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "48px" }}
                className="desktop-nav"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href.replace("#", ""));
                    }}
                    style={{
                      fontSize: "14px",
                      fontFamily: fonts.body,
                      color: `${colors.foreground}B3`,
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = colors.foreground)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = `${colors.foreground}B3`)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Desktop CTA */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
                className="desktop-cta"
              >
                {/* TODO: Update href to https://app.makemeasure.com when ready */}
                <a
                  href="#"
                  style={{
                    color: `${colors.foreground}B3`,
                    textDecoration: "none",
                    fontFamily: fonts.body,
                    transition: "all 0.5s ease",
                    fontSize: isScrolled ? "12px" : "14px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.foreground)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = `${colors.foreground}B3`)}
                >
                  Sign in
                </a>
                <button
                  onClick={() => scrollTo("early-access")}
                  style={{
                    backgroundColor: colors.foreground,
                    color: colors.background,
                    border: "none",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    transition: "all 0.5s ease",
                    padding: isScrolled ? "8px 16px" : "10px 24px",
                    fontSize: isScrolled ? "12px" : "14px",
                    fontFamily: fonts.display,
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Get early access
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  display: "none",
                  padding: "8px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: colors.foreground,
                }}
                className="mobile-menu-btn"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Overlay */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: colors.background,
              zIndex: 40,
              transition: "all 0.5s ease",
              opacity: isMobileMenuOpen ? 1 : 0,
              pointerEvents: isMobileMenuOpen ? "auto" : "none",
            }}
            className="mobile-menu"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                padding: "112px 32px 32px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "32px",
                }}
              >
                {navLinks.map((link, i) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href.replace("#", ""));
                    }}
                    style={{
                      fontSize: "48px",
                      fontFamily: fonts.display,
                      color: colors.foreground,
                      textDecoration: "none",
                      transition: "all 0.5s ease",
                      transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms",
                      opacity: isMobileMenuOpen ? 1 : 0,
                      transform: isMobileMenuOpen ? "translateY(0)" : "translateY(16px)",
                    }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  paddingTop: "32px",
                  borderTop: `1px solid ${colors.border}`,
                  transition: "all 0.5s ease",
                  transitionDelay: isMobileMenuOpen ? "300ms" : "0ms",
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? "translateY(0)" : "translateY(16px)",
                }}
              >
                {/* TODO: Update to https://app.makemeasure.com when ready */}
                <button
                  style={{
                    flex: 1,
                    padding: "16px",
                    fontSize: "16px",
                    borderRadius: "9999px",
                    border: `1px solid ${colors.border}`,
                    backgroundColor: "transparent",
                    color: colors.foreground,
                    cursor: "pointer",
                    fontFamily: fonts.body,
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: "16px",
                    fontSize: "16px",
                    borderRadius: "9999px",
                    border: "none",
                    backgroundColor: colors.foreground,
                    color: colors.background,
                    cursor: "pointer",
                    fontFamily: fonts.display,
                  }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollTo("early-access");
                  }}
                >
                  Get early access
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ═══════════════════════ HERO ═══════════════════════ */}
        <section
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "128px 24px",
              width: "100%",
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                marginBottom: "32px",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "14px",
                  fontFamily: fonts.display,
                  color: colors.muted,
                }}
              >
                <span
                  style={{
                    width: "32px",
                    height: "1px",
                    backgroundColor: `${colors.foreground}4D`,
                  }}
                />
                The creative studio for paid media teams
              </span>
            </div>

            {/* Main headline with char-by-char blur-in */}
            <div style={{ marginBottom: "48px" }}>
              <h1
                style={{
                  fontSize: "clamp(3rem, 12vw, 10rem)",
                  fontFamily: fonts.display,
                  lineHeight: 0.9,
                  letterSpacing: "-0.02em",
                  transition: "opacity 1s ease, transform 1s ease",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(32px)",
                  margin: 0,
                }}
              >
                <span style={{ display: "block" }}>The studio</span>
                <span style={{ display: "block" }}>
                  to{" "}
                  <span
                    style={{
                      position: "relative",
                      display: "inline-block",
                      overflow: "hidden",
                      verticalAlign: "bottom",
                      paddingBottom: "20px",
                      marginBottom: "-20px",
                    }}
                  >
                    <span key={wordIndex} style={{ display: "inline-flex" }}>
                      {words[wordIndex].split("").map((char, i) => (
                        <span
                          key={`${wordIndex}-${i}`}
                          className="animate-char-in"
                          style={{
                            display: "inline-block",
                            animationDelay: `${i * 50}ms`,
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        left: 0,
                        right: 0,
                        height: "12px",
                        backgroundColor: `${colors.foreground}1A`,
                      }}
                    />
                  </span>
                </span>
              </h1>
            </div>

            {/* Description and CTAs — 50/50 grid on desktop */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "48px",
                alignItems: "end",
              }}
              className="hero-content"
            >
              <p
                style={{
                  fontSize: "20px",
                  fontFamily: fonts.body,
                  color: colors.muted,
                  lineHeight: 1.6,
                  maxWidth: "560px",
                  margin: 0,
                  transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                }}
              >
                Strategy, creative, project management and performance in one workspace. Curator AI carries context across every stage.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                }}
                className="hero-ctas"
              >
                <button
                  onClick={() => scrollTo("early-access")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    backgroundColor: colors.foreground,
                    color: colors.background,
                    border: "none",
                    borderRadius: "9999px",
                    padding: "16px 32px",
                    fontSize: "16px",
                    fontFamily: fonts.display,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.9";
                    const arrow = e.currentTarget.querySelector("svg");
                    if (arrow) (arrow as HTMLElement).style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    const arrow = e.currentTarget.querySelector("svg");
                    if (arrow) (arrow as HTMLElement).style.transform = "translateX(0)";
                  }}
                >
                  Get early access →
                  <ArrowRight size={16} style={{ transition: "transform 0.3s ease" }} />
                </button>
                <button
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    color: colors.foreground,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "9999px",
                    padding: "16px 32px",
                    fontSize: "16px",
                    fontFamily: fonts.body,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.foreground}0D`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Watch the demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ PROBLEM ═══════════════════════ */}
        <section
          id="features"
          style={{
            position: "relative",
            padding: "160px 24px",
            backgroundColor: colors.background,
          }}
        >
          <div ref={problemReveal.ref} style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={revealStyle(problemReveal.revealed, 0)}>
              <SectionEyebrow>The problem</SectionEyebrow>
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontFamily: fonts.display,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: "0 0 32px 0",
                ...revealStyle(problemReveal.revealed, 0.1),
              }}
            >
              You already know what's broken.
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontFamily: fonts.body,
                color: colors.muted,
                lineHeight: 1.7,
                margin: 0,
                maxWidth: "640px",
                ...revealStyle(problemReveal.revealed, 0.25),
              }}
            >
              Your best strategic thinking disappears the moment a campaign goes live. Performance data never makes it back to the people making the work. So every brief starts cold, every creative round is a guess, and the team that should be getting sharper with every campaign is stuck starting over instead.
            </p>
          </div>
        </section>

        {/* ═══════════════════════ THREE MODES ═══════════════════════ */}
        <section
          style={{
            position: "relative",
            padding: "160px 24px",
            backgroundColor: colors.warmTint,
          }}
        >
          <div ref={modesReveal.ref} style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ maxWidth: "800px", marginBottom: "80px" }}>
              <div style={revealStyle(modesReveal.revealed, 0)}>
                <SectionEyebrow>How it works</SectionEyebrow>
              </div>
              <h2
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontFamily: fonts.display,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  ...revealStyle(modesReveal.revealed, 0.1),
                }}
              >
                Three modes. Nothing falls between them.
              </h2>
            </div>

            {/* 50/50: stacked text list on left, media on right */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "64px",
                alignItems: "start",
                ...revealStyle(modesReveal.revealed, 0.25),
              }}
              className="modes-split"
            >
              {/* Left: stacked text items — fixed height per item */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {modes.map((mode, i) => {
                  const isActive = activeMode === i;
                  return (
                    <div
                      key={mode.label}
                      onClick={() => setActiveMode(i)}
                      style={{
                        cursor: "pointer",
                        height: "180px",
                        padding: "24px 0",
                        borderBottom: `1px solid ${colors.border}`,
                        position: "relative",
                        transition: "opacity 0.4s ease",
                        opacity: isActive ? 1 : 0.35,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {/* Progress line */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-1px",
                          left: 0,
                          height: "2px",
                          backgroundColor: colors.foreground,
                          transition: isActive ? "width 5.5s linear" : "width 0.3s ease",
                          width: isActive ? "100%" : "0%",
                        }}
                      />

                      <span
                        style={{
                          display: "block",
                          fontSize: "12px",
                          fontFamily: fonts.display,
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: colors.muted,
                          marginBottom: "8px",
                          flexShrink: 0,
                        }}
                      >
                        {mode.label}
                      </span>
                      <h3
                        style={{
                          fontSize: "clamp(1.125rem, 1.8vw, 1.375rem)",
                          fontFamily: fonts.display,
                          lineHeight: 1.2,
                          letterSpacing: "-0.02em",
                          margin: 0,
                          color: colors.foreground,
                          flexShrink: 0,
                        }}
                      >
                        {mode.tagline}
                      </h3>

                      {/* Body — always in flow at fixed size, fades in/out */}
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: 1.55,
                          color: colors.muted,
                          margin: "10px 0 0 0",
                          fontFamily: fonts.body,
                          maxWidth: "400px",
                          opacity: isActive ? 1 : 0,
                          transition: "opacity 0.4s ease",
                          flexShrink: 0,
                        }}
                      >
                        {mode.body}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Right: square media placeholder — swaps based on active mode */}
              <div style={{ position: "sticky", top: "120px" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
                  {modes.map((mode, i) => (
                    <div
                      key={mode.label}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "16px",
                        border: `1px solid ${colors.border}`,
                        backgroundColor: `${colors.foreground}08`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: activeMode === i ? 1 : 0,
                        transition: "opacity 0.5s ease",
                        pointerEvents: activeMode === i ? "auto" : "none",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontFamily: fonts.display,
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: `${colors.foreground}30`,
                        }}
                      >
                        {mode.media}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ THE LOOP ═══════════════════════ */}
        <section
          id="the-loop"
          style={{
            position: "relative",
            padding: "160px 24px",
            backgroundColor: colors.foreground,
            color: colors.background,
          }}
        >
          <div ref={loopReveal.ref} style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "64px",
                alignItems: "center",
              }}
              className="split-grid"
            >
              {/* Text */}
              <div>
                <div style={revealStyle(loopReveal.revealed, 0)}>
                  <SectionEyebrow light>The Loop</SectionEyebrow>
                </div>
                <h2
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontFamily: fonts.display,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    margin: "0 0 32px 0",
                    color: colors.background,
                    ...revealStyle(loopReveal.revealed, 0.1),
                  }}
                >
                  Every campaign makes the next one better.
                </h2>
                <p
                  style={{
                    fontSize: "18px",
                    fontFamily: fonts.body,
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.7,
                    margin: 0,
                    maxWidth: "520px",
                    ...revealStyle(loopReveal.revealed, 0.25),
                  }}
                >
                  This is the part nobody else has built. When performance data flows back into your creative process automatically, something changes. You stop guessing. You stop starting from scratch. Your team develops a rhythm where every round of work is informed by what actually happened last time. The gap between what you know and what you make disappears. That's what Make Measure is for.
                </p>
              </div>

              {/* Media placeholder */}
              <div style={revealStyle(loopReveal.revealed, 0.35)}>
                <MediaPlaceholder label="LOOP — Animation" light />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ THE CURATOR ═══════════════════════ */}
        <section
          id="curator"
          style={{
            position: "relative",
            padding: "160px 24px",
            backgroundColor: colors.background,
          }}
        >
          <div ref={curatorReveal.ref} style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "64px",
                alignItems: "center",
              }}
              className="split-grid"
            >
              {/* Text */}
              <div>
                <div style={revealStyle(curatorReveal.revealed, 0)}>
                  <SectionEyebrow>Curator AI</SectionEyebrow>
                </div>
                <h2
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontFamily: fonts.display,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    margin: "0 0 32px 0",
                    ...revealStyle(curatorReveal.revealed, 0.1),
                  }}
                >
                  An AI that's been in every meeting you've had.
                </h2>
                <p
                  style={{
                    fontSize: "18px",
                    fontFamily: fonts.body,
                    color: colors.muted,
                    lineHeight: 1.7,
                    margin: 0,
                    maxWidth: "520px",
                    ...revealStyle(curatorReveal.revealed, 0.25),
                  }}
                >
                  The Curator has read the brief. It's seen the canvas. It knows what shipped, how it performed, and what the data says about what to try next. It shifts from strategist to creative director to analyst depending on where you are in the process. You never have to catch it up, re-explain the brief, or paste in last month's numbers. It already knows. So every conversation starts where the last one left off, and every decision has the full picture behind it.
                </p>
              </div>

              {/* Media placeholder */}
              <div style={revealStyle(curatorReveal.revealed, 0.35)}>
                <MediaPlaceholder label="CURATOR — Demo" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ INTEGRATIONS ═══════════════════════ */}
        <section
          style={{
            position: "relative",
            padding: "160px 24px",
            backgroundColor: colors.warmTint,
          }}
        >
          <div ref={integrationsReveal.ref} style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={revealStyle(integrationsReveal.revealed, 0)}>
              <SectionEyebrow>Integrations</SectionEyebrow>
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontFamily: fonts.display,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: "0 0 32px 0",
                ...revealStyle(integrationsReveal.revealed, 0.1),
              }}
            >
              Your real data. Already here.
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontFamily: fonts.body,
                color: colors.muted,
                lineHeight: 1.7,
                margin: "0 0 48px 0",
                maxWidth: "640px",
                ...revealStyle(integrationsReveal.revealed, 0.25),
              }}
            >
              Connect Meta, Google, Instagram, and TikTok. Campaigns, spend, creative thumbnails, all synced and waiting in the same workspace where you make the next call.
            </p>

            {/* Platform list — staggered reveal */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
              {integrationPlatforms.map((platform, i) => (
                <span
                  key={platform}
                  style={{
                    fontSize: "13px",
                    fontFamily: fonts.display,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    color: colors.muted,
                    padding: "10px 20px",
                    borderRadius: "9999px",
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.background,
                    ...revealStyle(integrationsReveal.revealed, 0.35 + i * 0.12),
                  }}
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ FINAL CTA ═══════════════════════ */}
        <section
          id="early-access"
          style={{
            position: "relative",
            padding: "160px 24px",
            backgroundColor: colors.foreground,
          }}
        >
          <div
            ref={ctaReveal.ref}
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "48px",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontFamily: fonts.display,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: 0,
                maxWidth: "700px",
                color: colors.background,
                ...revealStyle(ctaReveal.revealed, 0),
              }}
            >
              Work like everything's connected. Because now it is.
            </h2>
            <div style={revealStyle(ctaReveal.revealed, 0.15)}>
              <WaitlistForm variant="dark" />
            </div>
            <span
              style={{
                fontSize: "13px",
                fontFamily: fonts.display,
                fontWeight: 500,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.4)",
                ...revealStyle(ctaReveal.revealed, 0.3),
              }}
            >
              Free during early access.
            </span>
          </div>
        </section>

        {/* ═══════════════════════ FOOTER ═══════════════════════ */}
        <footer
          style={{
            position: "relative",
            padding: "48px 24px 64px",
            backgroundColor: colors.foreground,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: fonts.display,
                fontSize: "24px",
                letterSpacing: "-0.02em",
                color: colors.background,
              }}
            >
              Make Measure
            </span>
            <p
              style={{
                fontSize: "14px",
                fontFamily: fonts.body,
                color: "rgba(255,255,255,0.4)",
                margin: 0,
              }}
            >
              Make the work. Measure the impact.
            </p>

            {/* Footer links */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "32px",
                marginTop: "16px",
              }}
            >
              <a
                href="/privacy.html"
                style={{
                  fontSize: "13px",
                  fontFamily: fonts.body,
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                Privacy Policy
              </a>
              <a
                href="mailto:hello@makemeasure.com"
                style={{
                  fontSize: "13px",
                  fontFamily: fonts.body,
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                hello@makemeasure.com
              </a>
            </div>

            <p
              style={{
                fontSize: "12px",
                fontFamily: fonts.body,
                color: "rgba(255,255,255,0.25)",
                margin: "8px 0 0 0",
              }}
            >
              &copy; 2026 Make Measure
            </p>
          </div>
        </footer>
      </div>

      {/* Responsive Styles */}
      <style>
        {`
          @media (min-width: 768px) {
            .hero-content {
              grid-template-columns: 1fr 1fr !important;
              gap: 96px !important;
            }
            .hero-ctas {
              flex-direction: row !important;
            }
            .modes-split {
              grid-template-columns: 1fr 1fr !important;
            }
            .split-grid {
              grid-template-columns: 1fr 1fr !important;
            }
            .waitlist-form-inner {
              flex-direction: row !important;
            }
          }
          @media (max-width: 767px) {
            .desktop-nav, .desktop-cta {
              display: none !important;
            }
            .mobile-menu-btn {
              display: block !important;
            }
            .waitlist-form-inner {
              flex-direction: column !important;
            }
          }
          @media (min-width: 768px) {
            .mobile-menu-btn {
              display: none !important;
            }
            .mobile-menu {
              display: none !important;
            }
          }
        `}
      </style>
    </>
  );
}
