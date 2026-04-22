import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import ShaderBackground from "../components/ShaderBackground";

/* ─── Design System ─── */
const FONT_DISPLAY = "'PP Right Grotesk Mono', 'Instrument Serif', Georgia, serif";
const FONT_MONO = "'PP Right Grotesk Mono', 'JetBrains Mono', monospace";
const FONT_BODY = "'PP Radio Grotesk', 'DM Sans', system-ui, sans-serif";

const navLinks = [
  { name: "The Loop", href: "#the-loop" },
  { name: "Curator", href: "#curator" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
];

const words = ["Make", "Ship", "Measure"];

const colors = {
  background: "#F9F8F6",
  foreground: "#1A1A1A",
  muted: "#6B6B6B",
  border: "#E5E4E0",
  accent: "#F7FF9E",
  warmTint: "#F0EFE9",
};

const fonts = {
  body: "'PP Radio Grotesk', 'DM Sans', system-ui, sans-serif",
  display: "'PP Right Grotesk Mono', 'Instrument Serif', Georgia, serif",
};

const platformLogos = ["Meta", "Google", "IG", "YT", "TT", "Pin"];

/* ─── FadeIn Scroll Animation ─── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
      }}
    >
      {children}
    </div>
  );
}

/* ─── ShaderSection Wrapper (GPU management) ─── */
function ShaderSection({
  id,
  children,
  colorBack,
  shaderColors,
}: {
  id?: string;
  children: React.ReactNode;
  colorBack: string;
  shaderColors: [string, string, string];
}) {
  const ref = useRef<HTMLElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      style={{ position: "relative", overflow: "hidden", isolation: "isolate" }}
    >
      {nearViewport && <ShaderBackground colorBack={colorBack} colors={shaderColors} />}
      {children}
    </section>
  );
}

/* ─── Dot Grid Background ─── */
function DotGrid({ id }: { id: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.4 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="#1A1A1A" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      </div>
    </div>
  );
}

/* ─── Stepped Lines Animation (Section 2) ─── */
const steppedLineTexts = [
  "The brief lives in a doc nobody reopened.",
  "The creative is made somewhere else entirely.",
  "The project is managed in another tool.",
  "The feedback happens in a thread nobody can find.",
  "The performance lives in yet another dashboard.",
  "And the connection between them lives in someone's head.",
];

function SteppedLines() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveIndex(0);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeIndex < 0 || activeIndex > steppedLineTexts.length) return;
    const timer = setTimeout(() => setActiveIndex((i) => i + 1), 600);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <div ref={ref} style={{ marginTop: 48, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100%" }}>
      <div style={{ position: "relative" }}>
        {/* Traveling yellow dot */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: activeIndex >= 0 ? activeIndex * 81 + 52 : 52,
            width: 10,
            height: 10,
            borderRadius: 9999,
            background: "#F7FF9E",
            boxShadow: "0 0 12px rgba(247,255,158,0.6), 0 0 24px rgba(247,255,158,0.3)",
            transition: "top 0.5s ease-in-out, opacity 0.5s ease",
            opacity: activeIndex >= 0 && activeIndex < steppedLineTexts.length ? 1 : 0,
            zIndex: 0,
          }}
        />
        {steppedLineTexts.map((text, i) => (
          <div key={i} style={{ position: "relative", zIndex: 1 }}>
            {/* Down arrow between lines */}
            {i > 0 && (
              <svg
                width="24"
                height="32"
                viewBox="0 0 24 32"
                style={{
                  display: "block",
                  margin: "12px auto",
                  transition: "opacity 0.6s ease",
                  opacity: activeIndex >= i ? 1 : 0,
                }}
              >
                <circle cx="12" cy="4" r="2" fill="rgba(28,26,31,0.1)" />
                <line x1="12" y1="8" x2="12" y2="24" stroke="rgba(28,26,31,0.1)" strokeWidth="1" />
                <path d="M 8 20 L 12 26 L 16 20" stroke="rgba(28,26,31,0.12)" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <div
              style={{
                fontFamily: FONT_BODY,
                fontSize: 16,
                color: "#1C1A1F",
                transition: "opacity 0.6s ease",
                opacity: activeIndex >= i ? 1 : 0.3,
                lineHeight: 1.6,
              }}
            >
              {text}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll-enticing arrow */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          transition: "opacity 0.6s ease",
          opacity: activeIndex >= steppedLineTexts.length ? 1 : 0,
          animation: activeIndex >= steppedLineTexts.length ? "gentleBob 2.5s ease-in-out infinite" : "none",
        }}
      >
        <svg width="24" height="48" viewBox="0 0 24 48">
          <line x1="12" y1="6" x2="12" y2="38" stroke="rgba(28,26,31,0.2)" strokeWidth="1" />
          <path d="M 7 33 L 12 40 L 17 33" stroke="rgba(28,26,31,0.25)" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/* ═══════════════════════ MAIN LANDING PAGE ═══════════════════════ */
export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLElement>(null);
  const section4Ref = useRef<HTMLElement>(null);
  const section8Ref = useRef<HTMLElement>(null);
  const section9Ref = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [videoScale, setVideoScale] = useState(0);
  const [section3Near, setSection3Near] = useState(false);
  const [section4Near, setSection4Near] = useState(false);
  const [section8Near, setSection8Near] = useState(false);
  const [section9Near, setSection9Near] = useState(false);
  const shaderVisible = section3Near || section4Near || section8Near || section9Near;

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
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleScroll = () => setIsScrolled(container.scrollTop > 20);
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const hero = heroRef.current;
    if (!container || !hero) return;

    const handleVideoScale = () => {
      const scrollTop = container.scrollTop;
      const heroTop = hero.offsetTop;
      const heroHeight = hero.offsetHeight;
      const viewportHeight = container.clientHeight;

      // How far through the hero we've scrolled (0 to 1)
      const progress = Math.max(0, Math.min(1,
        (scrollTop - heroTop) / (heroHeight - viewportHeight)
      ));

      // Ease-out curve for smooth feel
      const eased = 1 - Math.pow(1 - progress, 2);
      setVideoScale(eased);
    };

    container.addEventListener("scroll", handleVideoScale);
    return () => container.removeEventListener("scroll", handleVideoScale);
  }, []);

  // Shader visibility (GPU management — mount when Section 3, 4, 8, or 9 is near viewport)
  useEffect(() => {
    const s3 = section3Ref.current;
    const s4 = section4Ref.current;
    const s8 = section8Ref.current;
    const s9 = section9Ref.current;
    if (!s3 || !s4 || !s8 || !s9) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === s3) setSection3Near(entry.isIntersecting);
          if (entry.target === s4) setSection4Near(entry.isIntersecting);
          if (entry.target === s8) setSection8Near(entry.isIntersecting);
          if (entry.target === s9) setSection9Near(entry.isIntersecting);
        });
      },
      { rootMargin: "200px" },
    );
    observer.observe(s3);
    observer.observe(s4);
    observer.observe(s8);
    observer.observe(s9);
    return () => observer.disconnect();
  }, []);

  // Word rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Close demo modal on Escape key
  useEffect(() => {
    if (!showDemoModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowDemoModal(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showDemoModal]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  }, []);

  return (
    <>
      {/* Keyframes + Global Styles */}
      <style>
        {`
          html { scroll-behavior: smooth; }

          @font-face {
            font-family: 'PP Right Grotesk Mono';
            src: url('/fonts/PPRightGroteskMono-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'PP Right Grotesk Mono';
            src: url('/fonts/PPRightGroteskMono-Medium.woff2') format('woff2');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'PP Right Grotesk Mono';
            src: url('/fonts/PPRightGroteskMono-Bold.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'PP Right Grotesk Mono';
            src: url('/fonts/PPRightGroteskMono-Light.woff2') format('woff2');
            font-weight: 300;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'PP Radio Grotesk';
            src: url('/fonts/PPRadioGrotesk-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'PP Radio Grotesk';
            src: url('/fonts/PPRadioGrotesk-RegularItalic.woff2') format('woff2');
            font-weight: 400;
            font-style: italic;
            font-display: swap;
          }
          @font-face {
            font-family: 'PP Radio Grotesk';
            src: url('/fonts/PPRadioGrotesk-Light.woff2') format('woff2');
            font-weight: 300;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'PP Radio Grotesk';
            src: url('/fonts/PPRadioGrotesk-Bold.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'PP Radio Grotesk';
            src: url('/fonts/PPRadioGrotesk-Black.woff2') format('woff2');
            font-weight: 900;
            font-style: normal;
            font-display: swap;
          }

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
            animation: char-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            opacity: 0;
            filter: blur(40px);
            transform: translateY(100%);
          }

          @keyframes subtleFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }

          @keyframes gentleBob {
            0%, 100% { transform: translateY(0); opacity: 0.25; }
            50% { transform: translateY(6px); opacity: 0.4; }
          }
        `}
      </style>

      <div
        ref={scrollContainerRef}
        style={{
          height: "100vh",
          overflowY: "auto",
          scrollSnapType: "y proximity",
          scrollBehavior: "smooth",
          backgroundColor: "#F8F8F6",
          color: colors.foreground,
          fontFamily: fonts.body,
          position: "relative",
        }}
      >
        {/* Fixed shader layer for Sections 3+4 */}
        {shaderVisible && (
          <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
            <ShaderBackground colorBack="#1C1A1F" colors={["#F7FF9E", "#F7FF9E", "#F7FF9E"]} />
          </div>
        )}

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
                onClick={(e) => {
                  e.preventDefault();
                  scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                  color: colors.foreground,
                  cursor: "pointer",
                }}
              >
                <img src="/MakeMeasureLogotype.png" alt="Make Measure" style={{ height: 18 }} />
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
                <a
                  href="https://app.makemeasure.com/auth"
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
                <a
                  href="https://app.makemeasure.com/auth"
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
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Get Started
                </a>
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
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                zIndex: 10,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "none",
                border: `1px solid ${colors.border}`,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.foreground,
                fontSize: 20,
              }}
              aria-label="Close menu"
            >
              ×
            </button>
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
                <a
                  href="https://app.makemeasure.com/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    flex: 1,
                    padding: "16px",
                    fontSize: "16px",
                    borderRadius: "9999px",
                    border: `1px solid ${colors.border}`,
                    backgroundColor: "transparent",
                    color: colors.foreground,
                    fontFamily: fonts.body,
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  Sign in
                </a>
                <a
                  href="https://app.makemeasure.com/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    flex: 1,
                    padding: "16px",
                    fontSize: "16px",
                    borderRadius: "9999px",
                    border: "none",
                    backgroundColor: colors.foreground,
                    color: colors.background,
                    fontFamily: fonts.display,
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* ═══════════════════════ SECTION 1: HERO ═══════════════════════ */}
        <section
          ref={heroRef}
          className="hero-section"
          style={{
            position: "relative",
            height: "160vh",
            backgroundColor: "#F8F8F6",
            zIndex: 1,
            paddingTop: 80,
          }}
        >
          {/* Gradient + Dot Grid */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "100%",
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                // background: `radial-gradient(ellipse at 70% 20%, ${colors.accent}40 0%, transparent 50%)`,
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

          {/* Text block — static at top */}
          <div
            className="hero-text-block"
            style={{
              position: "relative",
              zIndex: 10,
              textAlign: "center",
              padding: "100px 24px 48px",
              maxWidth: 1000,
              margin: "0 auto",
              transition: "opacity .5s ease, transform .5s ease",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(4rem, 10vw, 10rem)",
                fontFamily: fonts.display,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                margin: "0 0 24px",
                color: colors.foreground,
              }}
            >
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "bottom",
                  paddingBottom: "8px",
                  marginBottom: "-8px",
                  minWidth: "4.5em",
                  textAlign: "center",
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
              </span>
            </h1>

            <p
              style={{
                fontFamily: fonts.body,
                fontSize: "clamp(1rem, 2vw, 1.1rem)",
                color: colors.muted,
                maxWidth: 560,
                lineHeight: 1.3,
                margin: "0 auto 40px",
              }}
            >
             One creative workspace where building strategy, managing projects, posting content, and measuring performance work together.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
              className="hero-ctas"
            >
              <a
                href="https://app.makemeasure.com/auth"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  backgroundColor: colors.foreground,
                  color: colors.background,
                  border: "none",
                  borderRadius: "9999px",
                  padding: "14px 28px",
                  fontSize: "14px",
                  fontFamily: fonts.display,
                  fontWeight: 300,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                  width: 200,
                  textAlign: "center",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                Try Make Measure →
              </a>
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  color: colors.foreground,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "9999px",
                  padding: "14px 28px",
                  fontSize: "14px",
                  fontFamily: fonts.display,
                  fontWeight: 300,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  width: 200,
                  textAlign: "center",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${colors.foreground}0D`; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                onClick={() => setShowDemoModal(true)}
              >
                Watch the demo
              </button>
            </div>
          </div>

          {/* Video — sticky, scales with scroll */}
          <div
            className="hero-video-wrapper"
            style={{
              position: "sticky",
              top: "15%",
              zIndex: 5,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "0 24px",
              marginTop: 20,
            }}
          >
            <div
              className="hero-video-frame"
              style={{
                width: `${40 + videoScale * 55}%`,
                maxWidth: 1100,
                aspectRatio: "16 / 9",
                borderRadius: `${15 - videoScale * 4}px`,
                overflow: "hidden",
                boxShadow: `0 ${8 + videoScale * 12}px ${40 + videoScale * 30}px rgba(0,0,0,${0.08 + videoScale * 0.1})`,
                backgroundColor: "#1C1A1F",
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              >
                <source src="https://k1tncygcdn6g5xor.public.blob.vercel-storage.com/makemeasuredemo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 2: THE REALITY ═══════════════════════ */}
        <section style={{ position: "relative", backgroundColor: "#F8F8F6", zIndex: 1, scrollSnapAlign: "start", scrollSnapStop: "always" }}>
          <DotGrid id="dotGrid2" />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 1200, margin: "0 auto", padding: "150px 24px 60px", width: "100%" }}>
              <FadeIn>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 9999,
                  backgroundColor: "#F7FF9E",
                  marginBottom: 30,
                  marginTop: 20,
                }}>
                  <img src="/MMIconLoopBlack.gif" alt="" style={{ width: 18, height: 12 }} />
                  <span style={{
                    fontFamily: FONT_MONO,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#1C1A1F",
                    fontWeight: 500,
                  }}>WE ALL FEEL THIS</span>
                </div>
              </FadeIn>

              <FadeIn delay={100}>
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
                    color: "#1C1A1F",
                    lineHeight: 1.0,
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  Making things has gotten easier.<br />
                  Making the right things is just as hard.
                </div>
              </FadeIn>

              <SteppedLines />
            </div>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 3: THE POSSIBILITY ═══════════════════════ */}
        <section
          ref={section3Ref}
          id="the-loop"
          style={{
            position: "relative",
            zIndex: 1,
            backgroundColor: "transparent",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
        >
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 1100, margin: "0 auto", padding: "150px 24px 0", width: "100%" }}>
              <FadeIn>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 9999,
                  backgroundColor: "rgba(247,255,158,0.15)",
                  marginBottom: 16,
                }}>
                  <img src="/MMIconLoopBlack.gif" alt="" style={{ width: 18, height: 12, filter: "invert(1)" }} />
                  <span style={{
                    fontFamily: FONT_MONO,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#FFFEFB",
                    fontWeight: 500,
                  }}>THE LOOP</span>
                </div>
              </FadeIn>

              <FadeIn delay={150}>
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                    color: "#FFFEFB",
                    lineHeight: 1,
                    maxWidth: 1100,
                    marginTop: 12,
                  }}
                >
                  Creative work is never finished. Turn every campaign into the brief for the next one.
                </div>
              </FadeIn>

              <FadeIn delay={300}>
                  <svg
                    className="loop-graphic"
                    width="600"
                    height="600"
                    viewBox="-50 -30 460 440"
                    style={{ marginTop: 8, display: "block", maxWidth: "100%", height: "auto" }}
                  >
                    <defs>
                      <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <path id="loopPath" d="M 180 50 A 130 130 0 1 1 179.99 50" fill="none" stroke="none" />
                    </defs>

                    {/* Orbital circle */}
                    <circle cx="180" cy="180" r="130" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />

                    {/* Center label */}
                    <text x="180" y="183" fontFamily={FONT_MONO} fontSize="12" letterSpacing="0.2em" textAnchor="middle" fill="rgba(255,255,255,0.15)">MAKE MEASURE</text>

                    {/* In-between small dots on circle */}
                    <circle cx="264" cy="80" r="2" fill="rgba(255,255,255,0.15)" />
                    <circle cx="308" cy="157" r="2" fill="rgba(255,255,255,0.15)" />
                    <circle cx="224" cy="302" r="2" fill="rgba(255,255,255,0.15)" />
                    <circle cx="136" cy="302" r="2" fill="rgba(255,255,255,0.15)" />
                    <circle cx="52" cy="157" r="2" fill="rgba(255,255,255,0.15)" />
                    <circle cx="96" cy="80" r="2" fill="rgba(255,255,255,0.15)" />

                    {/* In-between phase labels */}
                    <text x="275" y="70" fontFamily={FONT_MONO} fontSize="8" letterSpacing="0.15em" textAnchor="start" fill="rgba(255,255,255,0.25)">STRATEGY</text>
                    <text x="326" y="158" fontFamily={FONT_MONO} fontSize="8" letterSpacing="0.15em" textAnchor="start" fill="rgba(255,255,255,0.25)">CREATE</text>
                    <text x="235" y="319" fontFamily={FONT_MONO} fontSize="8" letterSpacing="0.15em" textAnchor="start" fill="rgba(255,255,255,0.25)">MANAGE</text>
                    <text x="125" y="319" fontFamily={FONT_MONO} fontSize="8" letterSpacing="0.15em" textAnchor="end" fill="rgba(255,255,255,0.25)">PUBLISH</text>
                    <text x="41" y="158" fontFamily={FONT_MONO} fontSize="8" letterSpacing="0.15em" textAnchor="end" fill="rgba(255,255,255,0.25)">ANALYZE</text>
                    <text x="85" y="70" fontFamily={FONT_MONO} fontSize="8" letterSpacing="0.15em" textAnchor="end" fill="rgba(255,255,255,0.25)">ITERATE</text>

                    {/* Main labels (offset from dots) */}
                    <text x="180" y="26" fontFamily={FONT_MONO} fontSize="16" fontWeight="500" letterSpacing="0.15em" textAnchor="middle" fill="rgba(255,255,255,0.7)">MAKE</text>
                    <text x="317" y="249" fontFamily={FONT_MONO} fontSize="16" fontWeight="500" letterSpacing="0.15em" textAnchor="start" fill="rgba(255,255,255,0.7)">SHIP</text>
                    <text x="43" y="249" fontFamily={FONT_MONO} fontSize="16" fontWeight="500" letterSpacing="0.15em" textAnchor="end" fill="rgba(255,255,255,0.7)">MEASURE</text>

                    {/* Static dots at main label positions */}
                    <circle cx="180" cy="50" r="4" fill="#F7FF9E" />
                    <circle cx="292.6" cy="245" r="4" fill="#F7FF9E" />
                    <circle cx="67.4" cy="245" r="4" fill="#F7FF9E" />

                    {/* Arrow chevrons between dots */}
                    <g transform="translate(292.6, 115) rotate(60)">
                      <polyline points="-3,-3 3,0 -3,3" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
                    </g>
                    <g transform="translate(180, 310) rotate(180)">
                      <polyline points="-3,-3 3,0 -3,3" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
                    </g>
                    <g transform="translate(67.4, 115) rotate(300)">
                      <polyline points="-3,-3 3,0 -3,3" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
                    </g>

                    {/* Animated trailing glow */}
                    <circle r="10" fill="#F7FF9E" opacity="0.15">
                      <animateMotion dur="8s" repeatCount="indefinite" rotate="auto" begin="0.3s">
                        <mpath href="#loopPath" />
                      </animateMotion>
                    </circle>

                    {/* Animated glow dot */}
                    <circle r="6" fill="#F7FF9E" filter="url(#glow)">
                      <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#loopPath" />
                      </animateMotion>
                    </circle>
                  </svg>
              </FadeIn>

            </div>
        </section>

        {/* ═══════════════════════ SECTION 4: THE PHILOSOPHY ═══════════════════════ */}
        <section
          ref={section4Ref}
          id="taste"
          style={{
            position: "relative",
            zIndex: 1,
            backgroundColor: "transparent",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
        >
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 1100, margin: "0 auto", padding: "100px 24px 60px", width: "100%" }}>
              <FadeIn>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 9999,
                  backgroundColor: "rgba(247,255,158,0.15)",
                  marginBottom: 30,
                }}>
                  <img src="/MMIconLoopBlack.gif" alt="" style={{ width: 18, height: 12, filter: "invert(1)" }} />
                  <span style={{
                    fontFamily: FONT_MONO,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#FFFEFB",
                    fontWeight: 500,
                  }}>ON TASTE</span>
                </div>
              </FadeIn>

              <FadeIn delay={150}>
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "clamp(1.5rem, 4.5vw, 3rem)",
                    color: "#FFFEFB",
                    lineHeight: 1.0,
                    maxWidth: 1000,
                  }}
                >
                  Most AI does the work for you.
                </div>
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "clamp(1.5rem, 4.5vw, 3rem)",
                    color: "#FFFEFB",
                    lineHeight: 1.0,
                    maxWidth: 1000,
                    marginTop: 16,
                  }}
                >
                  This AI does the work <span style={{ textDecoration: "underline", textDecorationThickness: "3px", textUnderlineOffset: "6px", textDecorationColor: "rgba(255,255,255,0.3)" }}>with you.</span>
                </div>
              </FadeIn>

              <FadeIn delay={300}>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 16,
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.6,
                    maxWidth: 640,
                    marginTop: 48,
                  }}
                >
                  Creative work runs on taste, judgment, cultural intuition. On making someone feel something. As AI content floods every feed, work that feels truly creative becomes the rarest thing. 
                  </p>
                  <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 16,
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.6,
                    maxWidth: 640,
                    marginTop: 24,
                  }}
                >
                  The market is rewarding taste now more than ever. <br/>Make Measure is built to sharpen teams who have it.
                </p>
              </FadeIn>
            </div>
        </section>

        {/* ═══════════════════════ SECTION 5: THE PARTNER  ═══════════════════════ */}
        <section id="curator" style={{ position: "relative", backgroundColor: "#F8F8F6", zIndex: 1, minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", scrollSnapAlign: "start", scrollSnapStop: "always" }}>
          <DotGrid id="dotGrid5" />

          {/* Floating placeholder images — disabled
          <div className="floating-images" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
            {[
              { top: "2%", left: "5%", w: 83, h: 83, dur: 9, delay: -5, src: "/HeroImages/Image15.png" },
              { top: "6%", left: "35%", w: 105, h: 75, dur: 7, delay: -8, src: "/HeroImages/Image16.png" },
              { top: "3%", left: "60%", w: 83, h: 83, dur: 11, delay: -3, src: "/HeroImages/Image17.png" },
              { top: "8%", left: "82%", w: 98, h: 71, dur: 8, delay: -9, src: "/HeroImages/Image18.png" },
              { top: "14%", left: "18%", w: 113, h: 68, dur: 10, delay: -6, src: "/HeroImages/Image19.png" },
              { top: "72%", left: "8%", w: 98, h: 68, dur: 6, delay: -4, src: "/HeroImages/Image3.png" },
              { top: "78%", left: "40%", w: 71, h: 98, dur: 12, delay: -10, src: "/HeroImages/Image5.png" },
              { top: "75%", left: "68%", w: 98, h: 60, dur: 7, delay: -5, src: "/HeroImages/Image9.png" },
              { top: "82%", left: "90%", w: 83, h: 83, dur: 10, delay: -8, src: "/HeroImages/Image1.png" },
              { top: "88%", left: "25%", w: 79, h: 79, dur: 9, delay: -7, src: "/HeroImages/Image11.png" },
              { top: "40%", left: "3%", w: 64, h: 113, dur: 9, delay: -4, src: "/HeroImages/Image14.png" },
              { top: "45%", left: "88%", w: 98, h: 75, dur: 11, delay: -6, src: "/HeroImages/Image10.png" },
            ].map((p, i) => (
              <div key={i} style={{ position: "absolute", top: p.top, left: p.left }}>
                <FadeIn delay={i * 120 + 200}>
                  <div
                    style={{
                      width: p.w,
                      height: p.h,
                      borderRadius: 6,
                      overflow: "hidden",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                      animation: `subtleFloat ${p.dur}s ease-in-out infinite`,
                      animationDelay: `${p.delay}s`,
                    }}
                  >
                    <img src={p.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6, display: "block" }} />
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
          */}

          {/* Centered content */}
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 900, padding: "0 24px" }}>
            <FadeIn>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 9999,
                backgroundColor: "#F7FF9E",
                marginBottom: 30,
              }}>
                <img src="/MMIconLoopBlack.gif" alt="" style={{ width: 18, height: 12 }} />
                <span style={{
                  fontFamily: FONT_MONO,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#1C1A1F",
                  fontWeight: 500,
                }}>THE CURATOR</span>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  color: "#1C1A1F",
                  lineHeight: 1.0,
                  maxWidth: 900,
                  margin: "0 auto",
                }}
              >
                A strategic partner for the whole team. It knows the brief. It knows the work. It knows the performance.
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 18,
                  color: "rgba(28,26,31,0.6)",
                  marginTop: 64,
                  lineHeight: 2.2,
                }}
              >
                What's the campaign strategy? Just ask.<br />
                What should the visual language be? Just ask.<br />
                What was the thumb stop on our last Reel? Just ask.
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 6: FEATURES ═══════════════════════ */}

        {/* ═══════════════════════ SECTION 6a: MAKE ═══════════════════════ */}
        <section
          id="features"
          style={{
            position: "relative",
            backgroundColor: "#F8F8F6",
            zIndex: 1,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
        >
          <DotGrid id="dotGrid7a" />
          <div
            className="mode-section"
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 1100,
              margin: "0 auto",
              padding: "0 24px",
              width: "100%",
            }}
          >
            {/* INTRO TEXT - removing for now... 
            <FadeIn>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "clamp(1.5rem, 4vw, 1.5rem)",
                  color: "#1C1A1F",
                  lineHeight: 1.0,
                  textAlign: "left",
                  marginBottom: 50,
                }}
              >
                Three modes. Each one feeds the next.
              </div>
            </FadeIn>
            */}
            <FadeIn>
              <div
                style={{
                  width: "90%",
                  margin: "0 auto",
                }}
              >
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 9999,
                  backgroundColor: "#F7FF9E",
                  marginTop: 80,
                  marginBottom: 10,
                }}>
                  <img src="/MMIconLoopBlack.gif" alt="" style={{ width: 18, height: 12 }} />
                  <span style={{
                    fontFamily: FONT_MONO,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#1C1A1F",
                    fontWeight: 500,
                  }}>MAKE MODE</span>
                </div>
                <h3
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 24,
                    color: "#1C1A1F",
                    margin: "12px 0 0 0",
                    lineHeight: 1.2,
                  }}
                >
                  Strategy and creative direction
                </h3>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 14,
                    color: "#6B6B6B",
                    marginTop: 10,
                    maxWidth: 680,
                    lineHeight: 1.4,
                  }}
                >
                  Build the brief, creative tests, and mood boards. Pull inspiration from Pinterest, research ad libraries, save content from social channels, or generate visuals. The canvas is where the project starts, and where the team stays aligned.
                </p>
                <div
                  className="mode-video"
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    borderRadius: 20,
                    overflow: "hidden",
                    marginTop: 24,
                    backgroundColor: "#1C1A1F",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  >
                    <source src="https://k1tncygcdn6g5xor.public.blob.vercel-storage.com/MakeMode.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 6b: SHIP ═══════════════════════ */}
        <section
          style={{
            position: "relative",
            backgroundColor: "#F8F8F6",
            zIndex: 1,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
        >
          <DotGrid id="dotGrid7b" />
          <div
            className="mode-section"
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 1100,
              margin: "0 auto",
              padding: "0 24px",
              width: "100%",
            }}
          >
            <FadeIn>
              <div
                style={{
                  width: "90%",
                  margin: "0 auto",
                }}
              >
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 9999,
                  backgroundColor: "#F7FF9E",
                  marginTop: 80,
                  marginBottom: 10,
                }}>
                  <img src="/MMIconLoopBlack.gif" alt="" style={{ width: 18, height: 12 }} />
                  <span style={{
                    fontFamily: FONT_MONO,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#1C1A1F",
                    fontWeight: 500,
                  }}>SHIP MODE</span>
                </div>
                <h3
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 24,
                    color: "#1C1A1F",
                    margin: "12px 0 0 0",
                    lineHeight: 1.2,
                  }}
                >
                  Manage, review, publish
                </h3>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 14,
                    color: "#6B6B6B",
                    marginTop: 10,
                    maxWidth: 680,
                    lineHeight: 1.4,
                  }}
                >
                  Keep track of every project, every asset, every decision. Share with the team or clients for feedback, revision requests, and approvals. Publish and schedule directly to Instagram, YouTube, TikTok, Google, and Meta.
                </p>
                <div
                  className="mode-video"
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    borderRadius: 20,
                    overflow: "hidden",
                    marginTop: 24,
                    backgroundColor: "#1C1A1F",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  >
                    <source src="https://k1tncygcdn6g5xor.public.blob.vercel-storage.com/ShipMode.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 6c: MEASURE ═══════════════════════ */}
        <section
          style={{
            position: "relative",
            backgroundColor: "#F8F8F6",
            zIndex: 1,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
        >
          <DotGrid id="dotGrid7c" />
          <div
            className="mode-section"
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 1100,
              margin: "0 auto",
              padding: "0 24px",
              width: "100%",
            }}
          >
            <FadeIn>
              <div
                style={{
                  width: "90%",
                  margin: "0 auto",
                }}
              >
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 9999,
                  backgroundColor: "#F7FF9E",
                  marginTop: 80,
                  marginBottom: 10,
                }}>
                  <img src="/MMIconLoopBlack.gif" alt="" style={{ width: 18, height: 12 }} />
                  <span style={{
                    fontFamily: FONT_MONO,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#1C1A1F",
                    fontWeight: 500,
                  }}>MEASURE MODE</span>
                </div>
                <h3
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 24,
                    color: "#1C1A1F",
                    margin: "12px 0 0 0",
                    lineHeight: 1.2,
                  }}
                >
                  Each learning becomes the next brief
                </h3>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 14,
                    color: "#6B6B6B",
                    marginTop: 10,
                    maxWidth: 680,
                    lineHeight: 1.4,
                  }}
                >
                  Paid and organic performance together. Meta Ads, Google Ads, Pinterest Ads, Instagram, YouTube, TikTok. When something underperforms, one click starts the next strategy session with the data already loaded.
                </p>
                <div
                  className="mode-video"
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    borderRadius: 20,
                    overflow: "hidden",
                    marginTop: 24,
                    backgroundColor: "#1C1A1F",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  >
                    <source src="https://k1tncygcdn6g5xor.public.blob.vercel-storage.com/MeasureMode.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 7: THE PROOF + CTA ═══════════════════════ */}
        <section
          ref={section8Ref}
          id="pricing"
          style={{
            position: "relative",
            backgroundColor: "transparent",
            zIndex: 1,
            padding: "160px 24px",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
        >
          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <FadeIn>
              <div style={{
                fontFamily: FONT_MONO,
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 20,
              }}>
                Official API integrations with
              </div>
            </FadeIn>

            {/* Platform logos */}
            <FadeIn>
              <div
                className="platform-logos"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 40,
                  marginBottom: 60,
                  flexWrap: "wrap",
                }}
              >
                {[
                  { name: "Meta", url: "https://cdn.simpleicons.org/meta/white" },
                  { name: "Google Ads", url: "https://cdn.simpleicons.org/googleads/white" },
                  { name: "Instagram", url: "https://cdn.simpleicons.org/instagram/white" },
                  { name: "YouTube", url: "https://cdn.simpleicons.org/youtube/white" },
                  { name: "TikTok", url: "https://cdn.simpleicons.org/tiktok/white" },
                  { name: "Pinterest", url: "https://cdn.simpleicons.org/pinterest/white" },
                ].map((icon) => (
                  <img
                    key={icon.name}
                    src={icon.url}
                    alt={icon.name}
                    style={{ height: 24, opacity: 0.4, transition: "opacity 0.3s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
                  />
                ))}
              </div>
            </FadeIn>

            {/* Closing line 
            <FadeIn delay={150}>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  color: "#FFFEFB",
                  lineHeight: 1.0,
                }}
              >
                Make the work. Measure the impact.
              </div>
            </FadeIn>*/}

            {/* ═══════════════════════ Pricing ═══════════════════════ */}
            <FadeIn delay={300}>
              <div className="pricing-columns" style={{ display: "flex", justifyContent: "center", gap: 80, marginTop: 100, maxWidth: 900, width: "100%", alignItems: "flex-start" }}>
                {/* ═══════════════════════ Left: Price ═══════════════════════ */}
                
               

                <div style={{ textAlign: "left", flex: "0 0 auto" }}>

                <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 12 }}>
                   FOUNDER SERIES PRICING
                  </div> 
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: "#FFFEFB", lineHeight: 1.0, marginTop: 12 }}>
                    $29/seat/month
                  </div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 12 }}>
                  $49/month after year one
                  </div>
                 
                  <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 12 }}>
                    7-day free trial, with all features. <br/> Cancel anytime.
                  </div>
                </div>

                {/* Right: Feature list */}
                <div className="pricing-features" style={{ textAlign: "left" }}>
                  {[
                    "Strategy brief builder with AI-generated artifacts",
                    "Infinite creative canvas with AI image generation",
                    "AI Curator across every mode",
                    "Pinterest drag-and-drop for visual inspiration",
                    "Competitor ad research across Meta, TikTok, and Google",
                    "Project management with kanban and calendar views",
                    "Internal and external review and approvals",
                    "Publishing to Instagram, YouTube, TikTok, Google, and Meta",
                    "Performance dashboard for paid and organic",
                    "Workspace collaboration for your whole team",
                    "100 AI generation credits per month",
                  ].map((feature, i) => (
                    <div key={i} style={{
                      fontFamily: FONT_MONO,
                      fontSize: 12,
                      color: "rgba(255,255,255,0.9)",
                      lineHeight: 2.2,
                      letterSpacing: "0.02em",
                    }}>
                      · {feature}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* ═══════════════════════ CTA ═══════════════════════ */}
            <FadeIn delay={450}>
              <a
                className="cta-big"
                href="https://app.makemeasure.com/auth"
                style={{
                  background: "#F7FF9E",
                  color: "#1C1A1F",
                  borderRadius: 9999,
                  padding: "28px 80px",
                  fontSize: 28,
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-block",
                  fontFamily: FONT_DISPLAY,
                  marginTop: 64,
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(247,255,158,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Start your free trial →
              </a>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 8: ABOUT ═══════════════════════ */}
        <section
          ref={section9Ref}
          id="about"
          style={{
            position: "relative",
            backgroundColor: "transparent",
            zIndex: 1,
            color: "#FFFEFB",
            minHeight: "100vh",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "160px 24px 120px",
            }}
          >
            {/* ═══════════════════════ Divider ═══════════════════════ 
            <div
              style={{
                width: 40,
                height: 1,
                background: "rgba(255,255,255,0.1)",
                margin: "0 auto",
                marginBottom: 60,
              }}
            />*/}

            {/* ═══════════════════════ Two-column layout ═══════════════════════ */}
            <div
              style={{
                display: "flex",
                gap: 60,
                alignItems: "flex-start",
              }}
              className="about-columns"
            >
              {/* ═══════════════════════ Left column ═══════════════════════ */}
              <div style={{ width: 320, flexShrink: 0 }} className="about-left">
                <img
                  src="/BrentEthanFreedmanHeadshot4.png"
                  alt="Brent Ethan Freedman"
                  style={{
                    width: 280,
                    height: 340,
                    objectFit: "cover",
                    borderRadius: 16,
                    marginBottom: 28,
                  }}
                  className="about-photo"
                />
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: "#FFFEFB" }}>
                  Brent Ethan Freedman
                </div>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: 6,
                  }}
                >
                  Founder | Creative Director
                </div>

                {/* Contact links */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
                  <a
                    href="https://linkedin.com/in/brentethanfreedman"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                      textDecoration: "underline",
                    }}
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://substack.com/@brinestudios"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                      textDecoration: "underline",
                    }}
                  >
                    Substack
                  </a>
                  <a
                    href="https://brinestudios.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                      textDecoration: "underline",
                    }}
                  >
                    Studio
                  </a>
                </div>
              </div>

              {/* ═══════════════════════ Right column ═══════════════════════ */}
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 16,
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  After a decade leading brand and creative teams, I kept running into the same problem. Teams don't lack strategy, creativity, or ambition. The tools we use to manage our work aren't built for the way creative teams actually think.
                </p>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 16,
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.8,
                    marginTop: 24,
                  }}
                >
Make Measure is the tool I always wanted. I built it after years of seeing strategy docs ignored, performance separated from creative, and everything in between happening on a call or in someone's head. I wanted this work to live together in one space, so the work and the thinking stay connected.                </p>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 16,
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.8,
                    marginTop: 24,
                  }}
                >
                  I'm based in Vancouver, where I run <a href="https://brinestudios.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "underline" }}>Brine Studios</a> and write about creative work on <a href="https://substack.com/@brinestudios" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "underline" }}>Substack</a>. If you have any questions, have thoughts on the product, or want to try it, I'd love to hear from you.

                </p>
              </div>
            </div>

            {/* ═══════════════════════ Footer ═══════════════════════ */}
            <div className="footer-row" style={{ marginTop: 80, display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <div>
                <img src="/MakeMeasureLogotypeWhite.png" alt="Make Measure" style={{ height: 18, opacity: 1 }} />
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                    marginTop: 4,
                  }}
                >
                  © 2026 Make Measure | Brine Studios Inc.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#FFFEFB", cursor: "default" }}>hello@makemeasure.com</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>|</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#FFFEFB", cursor: "default" }}>support@makemeasure.com</span>
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                <a
                  href="/privacy.html"
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                  }}
                >
                  Privacy
                </a>
                <a
                  href="/terms.html"
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                  }}
                >
                  Terms
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ DEMO VIDEO MODAL ═══════════════════════ */}
        {showDemoModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              backgroundColor: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => setShowDemoModal(false)}
          >
            <div
              style={{
                position: "relative",
                width: "90vw",
                maxWidth: 960,
                aspectRatio: "16 / 9",
                borderRadius: 16,
                overflow: "hidden",
                cursor: "default",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDemoModal(false)}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  zIndex: 10,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.5)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
              <video
                autoPlay
                loop
                controls
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  backgroundColor: "#1C1A1F",
                  borderRadius: 16,
                }}
              >
                <source src="https://k1tncygcdn6g5xor.public.blob.vercel-storage.com/MakeMeasureDemoFull.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        )}
      </div>

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .hero-section {
              height: auto !important;
              min-height: 100vh !important;
            }
            .hero-text-block {
              padding: 60px 20px 32px !important;
            }
            .hero-text-block h1 {
              font-size: clamp(3.5rem, 14vw, 5rem) !important;
            }
            .hero-video-wrapper {
              position: relative !important;
              top: auto !important;
              transform: none !important;
              padding: 0 20px !important;
            }
            .hero-video-frame {
              width: 100% !important;
              max-width: 100% !important;
            }
            .hero-ctas {
              flex-direction: column !important;
              align-items: stretch !important;
              width: 100% !important;
            }
            .hero-ctas button,
            .hero-ctas a {
              width: 100% !important;
              text-align: center !important;
              justify-content: center !important;
            }
            .mode-section {
              padding: 0 16px !important;
            }
            .mode-section h3 {
              font-size: 28px !important;
            }
            .mode-section p {
              font-size: 16px !important;
              line-height: 1.6 !important;
            }
            .mode-video {
              width: 100% !important;
            }
            .mode-section > div > div {
              width: 100% !important;
            }
            .loop-graphic {
              width: 90vw !important;
              height: 90vw !important;
              max-width: 500px !important;
              max-height: 500px !important;
            }
            .about-columns p {
              text-align: left !important;
            }
            .pricing-features,
            .pricing-features > div {
              text-align: left !important;
            }
            .footer-row {
              justify-content: center !important;
            }
            .footer-row img {
              margin: 0 auto !important;
              display: block !important;
            }
          }
          @media (max-width: 768px) {
            .manifesto-section {
              padding-left: 24px !important;
              padding-right: 24px !important;
            }
            .about-columns {
              flex-direction: column !important;
              gap: 40px !important;
              align-items: center !important;
              text-align: center !important;
            }
            .about-columns > div {
              width: 100% !important;
              flex-shrink: 1 !important;
              text-align: center !important;
              align-items: center !important;
            }
            .about-columns img {
              width: 200px !important;
              height: 250px !important;
              margin: 0 auto 24px !important;
            }
            .about-columns a {
              text-align: center !important;
            }
            .about-left {
              width: 100% !important;
            }
            .about-photo {
              width: 200px !important;
              height: 250px !important;
              margin: 0 auto 28px !important;
              display: block !important;
            }
            .pricing-columns {
              flex-direction: column !important;
              gap: 30px !important;
              align-items: center !important;
              text-align: center !important;
            }
            .pricing-columns > div {
              text-align: center !important;
            }
            .platform-logos {
              gap: 20px !important;
              flex-wrap: wrap !important;
              justify-content: center !important;
              margin-bottom: 0px !important;
            }
            #pricing {
              padding: 120px 0px !important;
            }
            .cta-big {
              padding: 20px 40px !important;
              font-size: 16px !important;
              width: 100% !important;
              max-width: 400px !important;
              text-align: center !important;
            }
            .footer-row {
              flex-direction: column !important;
              align-items: center !important;
              gap: 20px !important;
              text-align: center !important;
            }
            .footer-row > div {
              text-align: center !important;
            }
            .floating-images {
              display: none !important;
            }
          }
          @media (max-width: 767px) {
            .desktop-nav, .desktop-cta {
              display: none !important;
            }
            .mobile-menu-btn {
              display: block !important;
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
