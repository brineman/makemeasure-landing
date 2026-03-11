import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Developers", href: "#developers" },
  { name: "Pricing", href: "#pricing" },
];

const words = ["create", "build", "scale", "ship"];

// Color tokens
const colors = {
  background: "#F9F8F6",
  foreground: "#1A1A1A",
  muted: "#6B6B6B",
  border: "#E5E4E0",
  accent: "#F7FF9E",
};

export function MakeMeasureLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');
          
          @keyframes char-in {
            0% {
              opacity: 0;
              filter: blur(40px);
              transform: translateY(100%);
            }
            100% {
              opacity: 1;
              filter: blur(0);
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
          fontFamily: "'Instrument Sans', system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 70% 20%, ${colors.accent}40 0%, transparent 50%)`,
            pointerEvents: "none",
          }}
        />

        {/* Dot Grid Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
            opacity: 0.4,
          }}
        >
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <pattern id="dotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill={colors.foreground} opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotGrid)" />
          </svg>
        </div>

        {/* Navigation */}
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
                    fontFamily: "'Instrument Serif', Georgia, serif",
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
                    fontFamily: "'JetBrains Mono', monospace",
                    transition: "all 0.5s ease",
                    fontSize: isScrolled ? "10px" : "12px",
                    marginTop: isScrolled ? "2px" : "4px",
                  }}
                >
                  TM
                </span>
              </a>

              {/* Desktop Navigation */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "48px",
                }}
                className="desktop-nav"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    style={{
                      fontSize: "14px",
                      color: `${colors.foreground}B3`,
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      position: "relative",
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
                className="desktop-cta"
              >
                <a
                  href="#"
                  style={{
                    color: `${colors.foreground}B3`,
                    textDecoration: "none",
                    transition: "all 0.5s ease",
                    fontSize: isScrolled ? "12px" : "14px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.foreground)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = `${colors.foreground}B3`)}
                >
                  Sign in
                </a>
                <button
                  style={{
                    backgroundColor: colors.foreground,
                    color: colors.background,
                    border: "none",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    transition: "all 0.5s ease",
                    padding: isScrolled ? "8px 16px" : "10px 24px",
                    fontSize: isScrolled ? "12px" : "14px",
                    fontFamily: "'Instrument Sans', system-ui, sans-serif",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Start creating
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
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      fontSize: "48px",
                      fontFamily: "'Instrument Serif', Georgia, serif",
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
                    fontFamily: "'Instrument Sans', system-ui, sans-serif",
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
                    fontFamily: "'Instrument Sans', system-ui, sans-serif",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start creating
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
                transition: "all 0.7s ease",
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
                  fontFamily: "'JetBrains Mono', monospace",
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
                The platform for modern teams
              </span>
            </div>

            {/* Main headline */}
            <div style={{ marginBottom: "48px" }}>
              <h1
                style={{
                  fontSize: "clamp(3rem, 12vw, 10rem)",
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  lineHeight: 0.9,
                  letterSpacing: "-0.02em",
                  transition: "all 1s ease",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(32px)",
                  margin: 0,
                }}
              >
                <span style={{ display: "block" }}>The platform</span>
                <span style={{ display: "block" }}>
                  to{" "}
                  <span style={{ position: "relative", display: "inline-block" }}>
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
                        bottom: "-8px",
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

            {/* Description and CTAs */}
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
                  color: colors.muted,
                  lineHeight: 1.6,
                  maxWidth: "560px",
                  margin: 0,
                  transition: "all 0.7s ease 0.2s",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                }}
              >
                Your toolkit to stop configuring and start innovating. Securely build, deploy, and
                scale the best experiences.
              </p>

              {/* CTAs */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  transition: "all 0.7s ease 0.3s",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                }}
                className="hero-ctas"
              >
                <button
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
                    fontFamily: "'Instrument Sans', system-ui, sans-serif",
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
                  Start free trial
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
                    fontFamily: "'Instrument Sans', system-ui, sans-serif",
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
                  Watch demo
                </button>
              </div>
            </div>
          </div>
        </section>

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
      </div>
    </>
  );
}

export default MakeMeasureLanding;
