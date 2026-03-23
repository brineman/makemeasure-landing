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

const words = ["make", "ship", "measure"];

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
  "The brief still lives in a doc nobody reopened.",
  "The creative is built in 3 other tools.",
  "The project is managed in another.",
  "The feedback happens in a thread nobody can find.",
  "The performance lives in yet another dashboard.",
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
            top: activeIndex >= 0 ? activeIndex * 85 + 52 : 52,
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
                fontSize: 18,
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
    }, 2500);
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
            animation: char-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
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
          scrollSnapType: "y mandatory",
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                  color: colors.foreground,
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
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            backgroundColor: "#F8F8F6",
            zIndex: 1,
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            paddingTop: 80,
          }}
        >
          {/* Gradient + Dot Grid (hero only) */}
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

          {/* HERO COLLAGE — commented out, uncomment to restore */}
          {/*
          <div className="floating-images" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
            {[
              { top: "4%", left: "-3%", w: 75, h: 105, dur: 10, delay: -4, src: "/HeroImages/Image4.png" },
              { top: "12%", left: "17%", w: 98, h: 60, dur: 12, delay: -7, src: "/HeroImages/Image9.png" },
              { top: "38%", left: "-2%", w: 83, h: 83, dur: 9, delay: -3, src: "/HeroImages/Image1.png" },
              { top: "50%", left: "13%", w: 68, h: 98, dur: 11, delay: -9, src: "/HeroImages/Image6.png" },
              { top: "68%", left: "3%", w: 98, h: 64, dur: 8, delay: -5, src: "/HeroImages/Image12.png" },
              { top: "86%", left: "28%", w: 71, h: 98, dur: 13, delay: -8, src: "/HeroImages/Image13.png" },
              { top: "92%", left: "6%", w: 105, h: 71, dur: 10, delay: -6, src: "/HeroImages/Image3.png" },
              { top: "2%", left: "68%", w: 75, h: 105, dur: 11, delay: -5, src: "/HeroImages/Image5.png" },
              { top: "12%", left: "87%", w: 75, h: 75, dur: 9, delay: -8, src: "/HeroImages/Image11.png" },
              { top: "32%", left: "94%", w: 105, h: 83, dur: 14, delay: -3, src: "/HeroImages/Image10.png" },
              { top: "36%", left: "82%", w: 68, h: 90, dur: 10, delay: -7, src: "/HeroImages/Image7.png" },
              { top: "60%", left: "78%", w: 98, h: 68, dur: 12, delay: -9, src: "/HeroImages/Image2.png" },
              { top: "78%", left: "88%", w: 75, h: 98, dur: 8, delay: -4, src: "/HeroImages/Image8.png" },
              { top: "92%", left: "70%", w: 64, h: 113, dur: 11, delay: -6, src: "/HeroImages/Image14.png" },
            ].map((img, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: img.top,
                  left: img.left,
                  width: img.w,
                  height: img.h,
                  borderRadius: 6,
                  overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  animation: `subtleFloat ${img.dur}s ease-in-out infinite`,
                  animationDelay: `${img.delay}s`,
                  opacity: 0,
                  transition: `opacity 1.5s ease ${i * 200}ms`,
                  ...(isVisible ? { opacity: 1 } : {}),
                }}
              >
                <img src={img.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6, display: "block" }} />
              </div>
            ))}
          </div>
          */}

          {/* TOP ZONE — Headline */}
          <div
            className="hero-top-zone"
            style={{
              position: "relative",
              zIndex: 10,
              textAlign: "center",
              padding: "16px 24px 0",
              transition: "opacity 1s ease, transform 1s ease",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                fontFamily: fonts.display,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              The space to{" "}
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "bottom",
                  paddingBottom: "8px",
                  marginBottom: "-8px",
                  minWidth: "4.5em",
                  textAlign: "left",
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
          </div>

          {/* MIDDLE ZONE — Video */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 48px",
            }}
            className="hero-video-zone"
          >
            <div
              style={{
                width: "100%",
                maxWidth: 1000,
                maxHeight: "calc(100vh - 320px)",
                aspectRatio: "16 / 9",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
                backgroundColor: "#1C1A1F",
                margin: "0 auto",
                position: "relative",
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              >
                <source src="/demo.mp4" type="video/mp4" />
              </video>
              {/* Placeholder shown until video loads */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 12,
                    color: "rgba(255,255,255,0.2)",
                  }}
                >
                  Product demo
                </span>
              </div>
            </div>
          </div>

          {/* BOTTOM ZONE — Subhead + CTAs */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              padding: "16px 0 48px",
              maxWidth: 1000,
              width: "100%",
              margin: "0 auto",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
            }}
            className="hero-bottom"
          >
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 16,
                color: colors.muted,
                maxWidth: 420,
                lineHeight: 1.5,
                textAlign: "left",
                margin: 0,
              }}
            >
              Where creatives form strategy, manage projects, publish work, and measure what's actually working.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 16,
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
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontFamily: fonts.display,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                  width: 200,
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
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
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontFamily: fonts.body,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  width: 200,
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.foreground}0D`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                onClick={() => setShowDemoModal(true)}
              >
                Watch the demo
              </button>
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
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 1200, margin: "0 auto", padding: "100px 24px 60px", width: "100%" }}>
              <FadeIn>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "rgba(28,26,31,0.35)",
                    marginBottom: 16,
                  }}
                >
                  WE ALL FEEL THIS
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
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 1100, margin: "0 auto", padding: "100px 24px 0", width: "100%" }}>
              <FadeIn>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  THE LOOP
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
                  What if strategy, creative direction, project management, performance analytics and collaboration happened in one space?
                </div>
              </FadeIn>

              <FadeIn delay={300}>
                  <svg
                    width="420"
                    height="420"
                    viewBox="-50 -30 460 440"
                    style={{ marginTop: 16, display: "block" }}
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
                    <text x="180" y="183" fontFamily={FONT_MONO} fontSize="9" letterSpacing="0.2em" textAnchor="middle" fill="rgba(255,255,255,0.15)">THE LOOP</text>

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
                    <text x="235" y="319" fontFamily={FONT_MONO} fontSize="8" letterSpacing="0.15em" textAnchor="start" fill="rgba(255,255,255,0.25)">DISTRIBUTE</text>
                    <text x="125" y="319" fontFamily={FONT_MONO} fontSize="8" letterSpacing="0.15em" textAnchor="end" fill="rgba(255,255,255,0.25)">PUBLISH</text>
                    <text x="41" y="158" fontFamily={FONT_MONO} fontSize="8" letterSpacing="0.15em" textAnchor="end" fill="rgba(255,255,255,0.25)">ANALYZE</text>
                    <text x="85" y="70" fontFamily={FONT_MONO} fontSize="8" letterSpacing="0.15em" textAnchor="end" fill="rgba(255,255,255,0.25)">ITERATE</text>

                    {/* Main labels (offset from dots) */}
                    <text x="180" y="26" fontFamily={FONT_MONO} fontSize="13" fontWeight="500" letterSpacing="0.15em" textAnchor="middle" fill="rgba(255,255,255,0.7)">MAKE</text>
                    <text x="317" y="249" fontFamily={FONT_MONO} fontSize="13" fontWeight="500" letterSpacing="0.15em" textAnchor="start" fill="rgba(255,255,255,0.7)">SHIP</text>
                    <text x="43" y="249" fontFamily={FONT_MONO} fontSize="13" fontWeight="500" letterSpacing="0.15em" textAnchor="end" fill="rgba(255,255,255,0.7)">MEASURE</text>

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

              <FadeIn delay={450}>
                <div
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 16,
                    color: "rgba(255,255,255,0.5)",
                    marginTop: 0,
                    maxWidth: 600,
                    textAlign: "center",
                  }}
                >
                  In one click, performance data shapes the next idea. Data already loaded. Curator already thinking.
                </div>
              </FadeIn>
            </div>
        </section>

        {/* ═══════════════════════ SECTION 4: THE PARTNER ═══════════════════════ */}
        <section
          ref={section4Ref}
          id="curator"
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
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: 16,
                  }}
                >
                  THE CURATOR
                </div>
              </FadeIn>

              <FadeIn delay={150}>
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                    color: "#FFFEFB",
                    lineHeight: 1.0,
                    maxWidth: 900,
                  }}
                >
                  A strategic partner helping the entire team set creative direction, know the brief, and the performance.
                </div>
              </FadeIn>

              <FadeIn delay={300}>
                <div
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 18,
                    color: "rgba(255,255,255,0.6)",
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

        {/* ═══════════════════════ SECTION 5: THE PHILOSOPHY ═══════════════════════ */}
        <section style={{ position: "relative", backgroundColor: "#F8F8F6", zIndex: 1, minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", scrollSnapAlign: "start", scrollSnapStop: "always" }}>
          <DotGrid id="dotGrid5" />

          {/* Floating placeholder images */}
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

          {/* Centered content */}
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 900, padding: "0 24px" }}>
            <FadeIn>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "clamp(1.5rem, 4.5vw, 3rem)",
                  color: "#1C1A1F",
                  lineHeight: 1.0,
                  maxWidth: 1000,
                  margin: "0 auto",
                }}
              >
                Most AI tools are designed to do the work for you.
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "clamp(1.5rem, 4.5vw, 3rem)",
                  color: "#1C1A1F",
                  lineHeight: 1.0,
                  maxWidth: 1000,
                  margin: "16px auto 0",
                }}
              >
                Make Measure is designed to do the work <span style={{ textDecoration: "underline", textDecorationThickness: "3px", textUnderlineOffset: "6px", textDecorationColor: "rgba(28,26,31,0.3)" }}>with you.</span>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 16,
                  color: "#6B6B6B",
                  lineHeight: 1.8,
                  maxWidth: 640,
                  margin: "48px auto 0",
                }}
              >
                Creative work runs on taste, judgment, cultural intuition. On making someone feel something. As AI content floods every feed, work that feels truly creative becomes the rarest thing. The market is about to reward taste more than it ever has. Make Measure is built for the teams who have it.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 7a: MAKE ═══════════════════════ */}
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
              <div>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "rgba(28,26,31,0.4)",
                  }}
                >
                  MAKE MODE
                </div>
                <h3
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 28,
                    color: "#1C1A1F",
                    margin: "12px 0 0 0",
                    lineHeight: 1.2,
                  }}
                >
                  Strategy, creative direction, and concept generation.
                </h3>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 16,
                    color: "#6B6B6B",
                    marginTop: 12,
                    maxWidth: 680,
                    lineHeight: 1.6,
                  }}
                >
                  Build the brief. Explore concepts. Generate visuals. Build moodboards, add inspiration from ad libraries or your Pinterest. Everything in one multiplayer canvas.
                </p>
                <div
                  style={{
                    width: "100%",
                    height: 400,
                    background: "#F1F0EC",
                    borderRadius: 16,
                    marginTop: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 11,
                      color: "rgba(28,26,31,0.2)",
                    }}
                  >
                    [Make mode]
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 7b: SHIP ═══════════════════════ */}
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
              <div>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "rgba(28,26,31,0.4)",
                  }}
                >
                  SHIP MODE
                </div>
                <h3
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 28,
                    color: "#1C1A1F",
                    margin: "12px 0 0 0",
                    lineHeight: 1.2,
                  }}
                >
                  Review, approve, publish.
                </h3>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 16,
                    color: "#6B6B6B",
                    marginTop: 12,
                    maxWidth: 680,
                    lineHeight: 1.6,
                  }}
                >
                  Projects move from the canvas into project management. Review assets, and when approved, publish directly to Instagram, YouTube, TikTok, and Meta.
                </p>
                <div
                  style={{
                    width: "100%",
                    height: 400,
                    background: "#F1F0EC",
                    borderRadius: 16,
                    marginTop: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 11,
                      color: "rgba(28,26,31,0.2)",
                    }}
                  >
                    [Ship mode]
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 7c: MEASURE ═══════════════════════ */}
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
              <div>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "rgba(28,26,31,0.4)",
                  }}
                >
                  MEASURE MODE
                </div>
                <h3
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 28,
                    color: "#1C1A1F",
                    margin: "12px 0 0 0",
                    lineHeight: 1.2,
                  }}
                >
                  Paid + organic performance.
                </h3>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 16,
                    color: "#6B6B6B",
                    marginTop: 12,
                    maxWidth: 680,
                    lineHeight: 1.6,
                  }}
                >
                  Meta Ads, Google Ads, Instagram, YouTube, TikTok. Set your goals. When something needs to change, start a strategy session for the next iteration in one click.
                </p>
                <div
                  style={{
                    width: "100%",
                    height: 400,
                    background: "#F1F0EC",
                    borderRadius: 16,
                    marginTop: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 11,
                      color: "rgba(28,26,31,0.2)",
                    }}
                  >
                    [Measure mode]
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 8: THE PROOF + CTA ═══════════════════════ */}
        <section
          ref={section8Ref}
          id="pricing"
          style={{
            position: "relative",
            backgroundColor: "transparent",
            zIndex: 1,
            padding: "120px 24px",
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
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
                  />
                ))}
              </div>
            </FadeIn>

            {/* Closing line */}
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
            </FadeIn>

            {/* Pricing */}
            <FadeIn delay={300}>
              <div className="pricing-columns" style={{ display: "flex", justifyContent: "center", gap: 80, marginTop: 64, maxWidth: 900, width: "100%", alignItems: "flex-start" }}>
                {/* Left: Price */}
                <div style={{ textAlign: "left", flex: "0 0 auto" }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, color: "#FFFEFB", lineHeight: 1.0 }}>
                    $29/seat/month.
                  </div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 16, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>
                    7-day free trial.
                  </div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
                    With all features.
                  </div>
                </div>

                {/* Right: Feature list */}
                <div style={{ textAlign: "left" }}>
                  {[
                    "Strategy brief builder with AI-generated artifacts",
                    "Infinite creative canvas",
                    "AI Curator across all modes",
                    "Creative Pipeline (AI image generation)",
                    "Kanban project management",
                    "Publishing to all major social platforms",
                    "Performance dashboard (paid + organic)",
                    "Multi-platform campaign sync",
                    "Workspace collaboration",
                    "100 AI generation credits/month",
                  ].map((feature, i) => (
                    <div key={i} style={{
                      fontFamily: FONT_MONO,
                      fontSize: 12,
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 2.2,
                      letterSpacing: "0.02em",
                    }}>
                      · {feature}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* CTA */}
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

        {/* ═══════════════════════ SECTION 9: ABOUT ═══════════════════════ */}
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
            {/* Divider */}
            <div
              style={{
                width: 40,
                height: 1,
                background: "rgba(255,255,255,0.1)",
                margin: "0 auto",
                marginBottom: 60,
              }}
            />

            {/* Two-column layout */}
            <div
              style={{
                display: "flex",
                gap: 60,
                alignItems: "flex-start",
              }}
              className="about-columns"
            >
              {/* Left column */}
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

              {/* Right column */}
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 16,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  After spending over a decade leading brand and creative teams, I kept running into the same problem. Teams don't lack the strategy, collaboration, or creativity to operate more efficiently. The tools we use to manage our projects simply aren't designed for it.
                </p>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 16,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.8,
                    marginTop: 24,
                  }}
                >
                  Make Measure is the creative strategy and operations tool I always wanted. I built it because I've seen firsthand what's possible when teams are more aligned, more strategic and more embedded in performance. They work faster, more inspired and they get better results.
                </p>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 16,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.8,
                    marginTop: 24,
                  }}
                >
                  I'm based in Vancouver, Canada, and write about creative work on <a href="https://substack.com/@brinestudios" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "underline" }}>Substack</a>. Please reach out if you want to learn more about Make Measure, have feature ideas, or looking to collaborate. I'd love to connect.
                </p>
              </div>
            </div>

            {/* Footer */}
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
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#1C1A1F",
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 12,
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  Demo video coming soon
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .hero-top-zone {
              padding: 48px 24px 0 !important;
            }
            .hero-video-zone {
              padding: 12px 24px !important;
            }
            .hero-bottom {
              padding: 12px 24px 24px !important;
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 16px !important;
            }
            .hero-bottom button,
            .hero-bottom a {
              width: 100% !important;
              text-align: center !important;
              justify-content: center !important;
            }
            .hero-ctas {
              flex-direction: column !important;
              align-items: stretch !important;
              width: 100% !important;
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
              gap: 40px !important;
              align-items: center !important;
              text-align: center !important;
            }
            .pricing-columns > div {
              text-align: center !important;
            }
            .platform-logos {
              gap: 24px !important;
              flex-wrap: wrap !important;
              justify-content: center !important;
            }
            .cta-big {
              padding: 20px 40px !important;
              font-size: 20px !important;
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
