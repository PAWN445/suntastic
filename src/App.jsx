import { useState, useEffect, useRef } from "react";

const G = "#00C47A";

const NAV_LINKS = ["Projects", "Services", "About", "Testimonials", "Contact"];

const PROJECTS = [
  {
    image: "/projects/project1.jpg",
    title: "Reyes Family Residence",
    location: "Quezon City",
    size: "8kW",
    year: "2024",
    desc: "Full rooftop installation with net metering setup. Reduced monthly bill from ₱12,000 to under ₱800.",
  },
  {
    image: "/projects/project2.jpg",
    title: "TechBuild Warehouse",
    location: "Makati",
    size: "50kW",
    year: "2023",
    desc: "Large-scale commercial rooftop system across 3 warehouse buildings. ROI projected at under 4 years.",
  },
  {
    image: "/projects/project3.jpg",
    title: "Santos Household",
    location: "Laguna",
    size: "5kW",
    year: "2024",
    desc: "Hybrid solar + battery storage system. 24/7 power backup for the entire household.",
  },
  {
    image: "/projects/project4.jpg",
    title: "GreenMart Superstore",
    location: "Cebu City",
    size: "30kW",
    year: "2023",
    desc: "Commercial installation with real-time monitoring dashboard. 40% reduction in operating costs.",
  },
  {
    image: "/projects/project5.jpg",
    title: "Dela Cruz Residence",
    location: "Cavite",
    size: "6kW",
    year: "2022",
    desc: "Residential rooftop system with smart inverter. Fully offset electricity bill since installation.",
  },
];

const SERVICES = [
  { icon: "☀️", title: "Residential Solar", desc: "Custom rooftop solar solutions for your home. Slash your electricity bills and gain full energy independence.", tag: "Most Popular" },
  { icon: "🏭", title: "Commercial Solar", desc: "Large-scale installations for businesses, warehouses, and industrial facilities with fast ROI.", tag: "High ROI" },
  { icon: "🔋", title: "Battery Storage", desc: "Store surplus energy with cutting-edge battery systems. Power your home even after sundown.", tag: "24/7 Power" },
  { icon: "🔧", title: "Maintenance & Monitoring", desc: "Real-time remote monitoring and expert maintenance to keep your panels at peak performance.", tag: "Lifetime Care" },
];

const TEAM = [
  { name: "Marco Reyes", role: "CEO & Founder", emoji: "👨‍💼", bio: "20+ years in renewable energy. Passionate about a solar-powered Philippines." },
  { name: "Ana Santos", role: "Head of Engineering", emoji: "👩‍🔧", bio: "Licensed electrical engineer specializing in solar PV systems and grid integration." },
  { name: "Luis Garcia", role: "Sales Director", emoji: "👨‍💻", bio: "Helping hundreds of families and businesses make the switch to clean energy since 2015." },
  { name: "Claire Tan", role: "Project Manager", emoji: "👩‍💼", bio: "Ensures every installation is delivered on time, on budget, and beyond expectations." },
];

const TESTIMONIALS = [
  { name: "Rodrigo V.", location: "Quezon City", text: "Our electricity bill went from ₱12,000 to under ₱800 a month. Best investment we've ever made. The Suntastic team was professional from start to finish.", stars: 5, system: "8kW Residential" },
  { name: "Carla M.", location: "Laguna", text: "They handled everything — permits, installation, Meralco paperwork. We just sat back and watched the savings roll in. Highly recommend!", stars: 5, system: "5kW + Battery" },
  { name: "TechBuild Corp", location: "Makati", text: "Suntastic installed 120 panels across our warehouse rooftop. ROI is on track for under 4 years. Exceptional work and ongoing monitoring support.", stars: 5, system: "50kW Commercial" },
];

const STATS = [
  { value: "500+", label: "Installations" },
  { value: "₱2.3M", label: "Avg. Savings / Year" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "10yr", label: "Warranty" },
];

const WHY = [
  { icon: "✅", text: "DOE-Accredited Solar Contractor" },
  { icon: "🏆", text: "Award-winning installation team" },
  { icon: "📊", text: "Real-time monitoring dashboard" },
  { icon: "💰", text: "Flexible financing & 0% installment" },
  { icon: "🛡️", text: "10-year workmanship + 25-year panel warranty" },
  { icon: "⚡", text: "Average payback period of 4–6 years" },
];

export default function SuntasticSolar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState("next");
  const autoplayRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    autoplayRef.current = setInterval(() => goTo("next"), 5000);
    return () => clearInterval(autoplayRef.current);
  }, [currentSlide]);

  const goTo = (dir) => {
    if (isAnimating) return;
    clearInterval(autoplayRef.current);
    setIsAnimating(true);
    setSlideDir(dir);
    setTimeout(() => {
      setCurrentSlide((prev) =>
        dir === "next"
          ? (prev + 1) % PROJECTS.length
          : (prev - 1 + PROJECTS.length) % PROJECTS.length
      );
      setIsAnimating(false);
    }, 350);
  };

  const goToIndex = (i) => {
    if (i === currentSlide || isAnimating) return;
    clearInterval(autoplayRef.current);
    setSlideDir(i > currentSlide ? "next" : "prev");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(i);
      setIsAnimating(false);
    }, 350);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.name || !form.email || !form.phone) {
      setFormError("Punan ang lahat ng required fields.");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const proj = PROJECTS[currentSlide];

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F", color: "#fff", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.95); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes slideInNext {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInPrev {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutNext {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-40px); }
        }

        .shake { animation: shake 0.4s ease; }

        .slide-enter-next { animation: slideInNext 0.35s ease forwards; }
        .slide-enter-prev { animation: slideInPrev 0.35s ease forwards; }

        .nav-link-btn {
          background: none; border: none;
          color: rgba(255,255,255,0.45); font-size: 14px; font-weight: 600;
          cursor: pointer; padding: 8px 14px; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.2s, background 0.2s;
        }
        .nav-link-btn:hover { color: #fff; background: rgba(255,255,255,0.05); }

        .nav-cta-btn {
          background: ${G}; color: #fff; border: none;
          border-radius: 10px; padding: 9px 20px;
          font-weight: 800; font-size: 13px;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 6px 20px ${G}40;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          letter-spacing: 0.2px;
        }
        .nav-cta-btn:hover { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 10px 28px ${G}50; }

        /* Carousel */
        .carousel-btn {
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7); font-size: 18px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          font-family: 'DM Sans', sans-serif;
          flex-shrink: 0;
        }
        .carousel-btn:hover { background: ${G}20; border-color: ${G}60; color: ${G}; }

        .dot-btn {
          width: 8px; height: 8px; border-radius: 100px;
          border: none; cursor: pointer; padding: 0;
          transition: all 0.25s ease;
        }

        .service-card {
          background: #13131E; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 32px 28px;
          position: relative; cursor: pointer; overflow: hidden;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .service-card:hover { border-color: ${G}50; transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${G}12; }
        .service-card:hover .arrow-icon { transform: translateX(5px); }
        .arrow-icon { transition: transform 0.2s; color: ${G}; font-size: 18px; font-weight: 700; margin-top: 18px; display: block; }

        .team-card {
          background: #13131E; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 32px 24px; text-align: center;
          transition: border-color 0.25s, transform 0.25s;
        }
        .team-card:hover { border-color: ${G}40; transform: translateY(-4px); }

        .testimonial-card {
          background: #13131E; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 28px;
          transition: border-color 0.25s, transform 0.25s;
        }
        .testimonial-card:hover { border-color: ${G}40; transform: translateY(-3px); }

        .form-input {
          width: 100%; background: #0A0A0F;
          border: 1px solid rgba(255,255,255,0.07); border-radius: 14px;
          padding: 13px 16px; color: #fff; font-size: 14px;
          font-family: 'DM Sans', sans-serif; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus { border-color: ${G}; box-shadow: 0 0 0 3px ${G}18; }
        .form-input::placeholder { color: rgba(255,255,255,0.2); }

        .submit-btn {
          width: 100%; height: 52px; background: ${G};
          border: none; border-radius: 14px; color: #fff;
          font-size: 14px; font-weight: 800;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          letter-spacing: 0.3px; box-shadow: 0 8px 24px ${G}40;
          transition: opacity 0.2s, transform 0.15s;
        }
        .submit-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .submit-btn:disabled { background: ${G}50; box-shadow: none; cursor: not-allowed; }

        .why-item {
          display: flex; align-items: center; gap: 12px;
          background: #13131E; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 14px 18px; transition: border-color 0.2s;
        }
        .why-item:hover { border-color: ${G}35; }

        .stat-box {
          flex: 1 1 120px; padding: 22px 24px; text-align: center;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .stat-box:last-child { border-right: none; }

        .footer-link {
          font-size: 13px; color: rgba(255,255,255,0.3);
          margin-bottom: 10px; cursor: pointer; transition: color 0.15s;
        }
        .footer-link:hover { color: ${G}; }

        .social-chip {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.35); font-size: 11px; font-weight: 600;
          padding: 5px 12px; border-radius: 100px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: border-color 0.15s, color 0.15s;
        }
        .social-chip:hover { border-color: ${G}50; color: ${G}; }

        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .burger-btn { display: flex !important; }
          .hero-cols { grid-template-columns: 1fr !important; }
          .carousel-inner { flex-direction: column !important; }
          .banner-cols { grid-template-columns: 1fr !important; gap: 32px !important; }
          .why-cols { grid-template-columns: 1fr !important; }
          .contact-cols { grid-template-columns: 1fr !important; }
          .footer-cols { grid-template-columns: 1fr !important; gap: 40px !important; }
          .footer-link-cols { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      {/* ── BG ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <svg width="100%" height="100%" style={{ opacity: 0.035, position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={G} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div style={{ position: "absolute", top: "15%", right: "8%", width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle, ${G}0C 0%, transparent 70%)`, filter: "blur(50px)" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,140,255,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "10px 0" : "18px 0",
        background: scrolled ? "rgba(10,10,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
            <img src="/suntastic_logo_png.png" alt="Suntastic Solar Logo" style={{ width: 60, height: 60, objectFit: "contain", borderRadius: 12 }}/>
            <div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "#fff", letterSpacing: "-0.3px", lineHeight: 1.1 }}>Suntastic Solar</div>
              <div style={{ fontSize: 9, color: G, fontWeight: 700, letterSpacing: "1.8px" }}>CORP.</div>
            </div>
          </div>
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV_LINKS.map((l) => (
              <button key={l} className="nav-link-btn" onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
            ))}
            <button className="nav-cta-btn" style={{ marginLeft: 8 }} onClick={() => scrollTo("contact")}>Get Free Quote →</button>
          </div>
          <button className="burger-btn" style={{ display: "none", background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: 18, padding: "6px 12px", borderRadius: 9, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div style={{ background: "rgba(10,10,15,0.98)", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "12px 24px" }}>
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ display: "block", width: "100%", background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 15, padding: "13px 0", textAlign: "left", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{l}</button>
            ))}
            <button className="nav-cta-btn" style={{ width: "100%", marginTop: 14, height: 48, borderRadius: 12 }} onClick={() => scrollTo("contact")}>Get Free Quote →</button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 24px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div className="hero-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(-20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: `${G}10`, border: `1px solid ${G}25`, borderRadius: 20, padding: "5px 14px", marginBottom: 24 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: G, animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 10, color: G, fontWeight: 700, letterSpacing: "1px" }}>DOE-ACCREDITED SOLAR CONTRACTOR</span>
              </div>
              <h1 style={{ fontSize: "clamp(38px, 5vw, 60px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-1.5px", marginBottom: 20, color: "#fff" }}>
                Power Your World<br /><span style={{ color: G }}>With the Sun.</span>
              </h1>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: 36, maxWidth: 450 }}>
                Suntastic Solar Corp delivers world-class solar installations for homes and businesses across the Philippines. Cut costs. Go green. Live free.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="nav-cta-btn" style={{ padding: "14px 28px", fontSize: 15, borderRadius: 14 }} onClick={() => scrollTo("contact")}>Get Free Quote →</button>
                <button onClick={() => scrollTo("projects")} style={{ padding: "14px 28px", fontSize: 15, borderRadius: 14, fontWeight: 700, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                  View Projects
                </button>
              </div>
              <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: "☀️", label: "Residential & Commercial Solar Installations" },
                  { icon: "🔋", label: "Battery Storage Systems" },
                  { icon: "📊", label: "Real-time Performance Monitoring" },
                  { icon: "🛡️", label: "10-Year Workmanship Warranty" },
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(-10px)", transition: `opacity 0.5s ease ${0.15 + i * 0.08}s, transform 0.5s ease ${0.15 + i * 0.08}s` }}>
                    <div style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{f.icon}</div>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(20px)", transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}>
              <div style={{ background: "#13131E", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: "40px 36px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -50, right: -50, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${G}18 0%, transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <img src="/suntastic_logo_png.png" alt="Suntastic Solar Logo" style={{ width: 80, height: 80, objectFit: "contain", borderRadius: 12 }}/>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 4 }}>Suntastic Solar Corp</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Trusted by 500+ Filipino homes & businesses</div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}>
                  {STATS.map((s, i) => (
                    <div key={i} className="stat-box">
                      <div style={{ fontSize: 24, fontWeight: 900, color: G, letterSpacing: "-0.8px", lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", marginTop: 5, fontWeight: 700, letterSpacing: "0.5px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: `${G}12`, border: `1px solid ${G}30`, borderRadius: 16, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 2 }}>Free Site Assessment</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>No commitment required · 100% free</div>
                </div>
                <button className="nav-cta-btn" style={{ whiteSpace: "nowrap", fontSize: 12, padding: "9px 16px" }} onClick={() => scrollTo("contact")}>Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS CAROUSEL ── */}
      <section id="projects" style={{ padding: "100px 24px", background: "#0D0D16", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionLabel>Our Work</SectionLabel>
          <h2 style={sTitle}>Featured<br /><span style={{ color: G }}>Solar Projects</span></h2>
          <p style={sSub}>Bawat project ay patunay ng aming dedikasyon sa kalidad at sustainable energy solutions.</p>

          {/* Carousel container */}
          <div style={{ background: "#13131E", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, overflow: "hidden", position: "relative" }}>
            <div className="carousel-inner" style={{ display: "flex", minHeight: 420 }}>

              {/* Image side */}
              <div style={{ flex: "0 0 55%", position: "relative", overflow: "hidden", minHeight: 340 }}>
                {/* Placeholder shown when no image */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(135deg, #0f2018 0%, #0a1a10 50%, #0d2318 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ textAlign: "center", opacity: 0.25 }}>
                    <img src="/suntastic_logo_png.png" alt="Suntastic Solar Logo" style={{ width: 80, height: 80, objectFit: "contain", borderRadius: 12 }}/>
                    <div style={{ fontSize: 13, color: G, fontWeight: 700, letterSpacing: "2px" }}>PROJECT PHOTO</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>image here </div>
                    <div style={{ fontSize: 11, color: G, marginTop: 2, fontFamily: "monospace" }}>public/projects/project{currentSlide + 1}.jpg</div>
                  </div>
                </div>

                {/* Actual image — shows on top of placeholder when available */}
                <img
                  key={currentSlide}
                  src={proj.image}
                  alt={proj.title}
                  className={isAnimating ? "" : (slideDir === "next" ? "slide-enter-next" : "slide-enter-prev")}
                  onError={(e) => { e.target.style.display = "none"; }}
                  style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                  }}
                />

                {/* Dark overlay gradient */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, #13131E 100%)", pointerEvents: "none" }} />

                {/* Slide counter badge */}
                <div style={{
                  position: "absolute", top: 20, left: 20,
                  background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 100, padding: "5px 14px",
                  fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)",
                }}>
                  {currentSlide + 1} / {PROJECTS.length}
                </div>
              </div>

              {/* Info side */}
              <div style={{ flex: 1, padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div
                  key={`info-${currentSlide}`}
                  className={isAnimating ? "" : (slideDir === "next" ? "slide-enter-next" : "slide-enter-prev")}
                >
                  {/* Tags row */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                    <span style={{ background: `${G}15`, color: G, fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 100, letterSpacing: "0.8px" }}>{proj.size}</span>
                    <span style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)", fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 100, letterSpacing: "0.8px" }}>📍 {proj.location}</span>
                    <span style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)", fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 100, letterSpacing: "0.8px" }}>📅 {proj.year}</span>
                  </div>

                  <h3 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.8px", marginBottom: 14, lineHeight: 1.2 }}>
                    {proj.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: 32 }}>
                    {proj.desc}
                  </p>

                  {/* Controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button className="carousel-btn" onClick={() => goTo("prev")}>←</button>
                    <button className="carousel-btn" onClick={() => goTo("next")}>→</button>
                    <div style={{ display: "flex", gap: 6, marginLeft: 4 }}>
                      {PROJECTS.map((_, i) => (
                        <button
                          key={i}
                          className="dot-btn"
                          onClick={() => goToIndex(i)}
                          style={{
                            width: i === currentSlide ? 22 : 8,
                            height: 8,
                            background: i === currentSlide ? G : "rgba(255,255,255,0.15)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: 3, background: "rgba(255,255,255,0.04)" }}>
              <div style={{
                height: "100%", background: G,
                width: `${((currentSlide + 1) / PROJECTS.length) * 100}%`,
                transition: "width 0.4s ease",
              }} />
            </div>
          </div>

          {/* Thumbnail row */}
          <div style={{ display: "flex", gap: 12, marginTop: 16, overflowX: "auto", paddingBottom: 4 }}>
            {PROJECTS.map((p, i) => (
              <button key={i} onClick={() => goToIndex(i)} style={{
                flexShrink: 0, width: 80, height: 56, borderRadius: 10, overflow: "hidden",
                border: `2px solid ${i === currentSlide ? G : "rgba(255,255,255,0.08)"}`,
                cursor: "pointer", background: "#13131E", position: "relative",
                transition: "border-color 0.2s", padding: 0,
              }}>
                <img src="/suntastic_logo_png.png" alt="Suntastic Solar Logo" style={{ width: 50, height: 50, objectFit: "contain", borderRadius: 12 }}/>
                <img src={p.image} alt={p.title} onError={(e) => { e.target.style.display = "none"; }} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                {i === currentSlide && <div style={{ position: "absolute", inset: 0, background: `${G}20`, border: `2px solid ${G}`, borderRadius: 8 }} />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionLabel>What We Offer</SectionLabel>
          <h2 style={sTitle}>Solar Solutions<br /><span style={{ color: G }}>Built for You</span></h2>
          <p style={sSub}>From residential rooftops to industrial installations, we deliver end-to-end solar services with zero compromise on quality.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))", gap: 18 }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card">
                <div style={{ position: "absolute", top: 18, right: 18, background: `${G}15`, color: G, fontSize: 9, fontWeight: 700, letterSpacing: "1px", padding: "4px 10px", borderRadius: 100, textTransform: "uppercase" }}>{s.tag}</div>
                <div style={{ fontSize: 36, marginBottom: 18 }}>{s.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>{s.desc}</p>
                <span className="arrow-icon">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ padding: "80px 24px", background: "#0D0D16", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="banner-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 60, alignItems: "center" }}>
            <div>
              <SectionLabel>Our Edge</SectionLabel>
              <h2 style={{ ...sTitle, marginBottom: 14 }}>Why Choose<br /><span style={{ color: G }}>Suntastic?</span></h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>We're not just installers — we're your long-term clean energy partners.</p>
            </div>
            <div className="why-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {WHY.map((item, i) => (
                <div key={i} className="why-item">
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontWeight: 500, lineHeight: 1.4 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionLabel>Who We Are</SectionLabel>
          <h2 style={sTitle}>Meet the Team Behind<br /><span style={{ color: G }}>Suntastic Solar</span></h2>
          <p style={sSub}>
            Suntastic Solar Corp. was founded in March 2026 with a mission to make solar energy simple, affordable, and accessible to everyone. 
            Recognizing the growing demand for alternative energy solutions, the company is focused on helping Filipino 
            households and businesses transition to clean and cost-efficient solar power.As a forward-thinking startup, 
            Suntastic Solar Corp. aims to become a trusted partner in building a sustainable and energy-independent future.

          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 18 }}>
            {TEAM.map((m, i) => (
              <div key={i} className="team-card">
                <div style={{ fontSize: 48, marginBottom: 14 }}>{m.emoji}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: G, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>{m.role}</div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.65 }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" style={{ padding: "100px 24px", background: "#0D0D16", borderTop: "1px solid rgba(255,255,255,0.04)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionLabel>What Clients Say</SectionLabel>
          <h2 style={sTitle}>Real People.<br /><span style={{ color: G }}>Real Savings.</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div style={{ color: "#FBBF24", fontSize: 16, letterSpacing: 2, marginBottom: 14 }}>{"★".repeat(t.stars)}</div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 22, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 3 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>📍 {t.location}</div>
                  </div>
                  <div style={{ background: `${G}15`, color: G, fontSize: 10, fontWeight: 700, padding: "5px 12px", borderRadius: 100, letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{t.system}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionLabel>Get In Touch</SectionLabel>
          <h2 style={sTitle}>Start Your Solar<br /><span style={{ color: G }}>Journey Today</span></h2>
          <p style={sSub}>Fill out the form and our solar consultants will reach out within 24 hours with a FREE site assessment and custom quote.</p>
          <div className="contact-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 36, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "📞", label: "PHONE", val: "+63 917 123 4567" },
                { icon: "📧", label: "EMAIL", val: "hello@suntasticsolar.ph" },
                { icon: "📍", label: "ADDRESS", val: "Quezon City, Metro Manila" },
                { icon: "🕐", label: "OFFICE HOURS", val: "Mon–Sat, 8AM–6PM" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, background: "#13131E", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "15px 18px" }}>
                  <span style={{ fontSize: 22 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: G, letterSpacing: "1.5px", marginBottom: 3 }}>{c.label}</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "#13131E", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "36px" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 10 }}>Message Sent!</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>Salamat! Our team will reach out within 24 hours with your free solar assessment.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={lStyle}>FULL NAME *</label>
                      <input className="form-input" placeholder="Juan dela Cruz" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setFormError(""); }} />
                    </div>
                    <div>
                      <label style={lStyle}>PHONE NUMBER *</label>
                      <input className="form-input" placeholder="+63 9XX XXX XXXX" value={form.phone} onChange={(e) => { setForm({ ...form, phone: e.target.value }); setFormError(""); }} />
                    </div>
                  </div>
                  <div>
                    <label style={lStyle}>EMAIL ADDRESS *</label>
                    <input className="form-input" type="email" placeholder="juan@email.com" value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }); setFormError(""); }} />
                  </div>
                  <div>
                    <label style={lStyle}>TELL US ABOUT YOUR ENERGY NEEDS</label>
                    <textarea className="form-input" style={{ minHeight: 110, resize: "vertical" }} placeholder="e.g. Monthly bill is ₱8,000. I have a 3-bedroom house in QC..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  {formError && (
                    <div className="shake" style={{ background: "rgba(255,77,106,0.1)", border: "1px solid rgba(255,77,106,0.3)", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14 }}>⚠️</span>
                      <span style={{ fontSize: 12, color: "#FF4D6A", fontWeight: 600 }}>{formError}</span>
                    </div>
                  )}
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                        <div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                        <span>Nagpapadala...</span>
                      </div>
                    ) : "Request Free Quote ☀️"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#080810", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "60px 24px 28px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-cols" style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr", gap: 60, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <img src="/suntastic_logo_png.png" alt="Suntastic Solar Logo" style={{ width: 80, height: 80, objectFit: "contain", borderRadius: 12 }}/>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 900, color: "#fff", letterSpacing: "-0.3px" }}>Suntastic Solar Corp</div>
                  <div style={{ fontSize: 9, color: G, fontWeight: 700, letterSpacing: "1.8px" }}>SOLAR ENERGY SOLUTIONS</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", lineHeight: 1.8, marginBottom: 20 }}>Powering the Philippines,<br />one rooftop at a time.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Facebook", "Instagram", "LinkedIn", "YouTube"].map((s) => (
                  <span key={s} className="social-chip">{s}</span>
                ))}
              </div>
            </div>
            <div className="footer-link-cols" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
              {[
                { head: "Services", links: ["Residential Solar", "Commercial Solar", "Battery Storage", "Maintenance"] },
                { head: "Company", links: ["About Us", "Our Team", "Projects", "Careers"] },
                { head: "Support", links: ["FAQs", "Monitoring Portal", "Warranty Claims", "Contact Us"] },
              ].map((col, i) => (
                <div key={i}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.2)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 16 }}>{col.head}</div>
                  {col.links.map((l) => <div key={l} className="footer-link">{l}</div>)}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.04)", fontSize: 11, color: "rgba(255,255,255,0.15)", flexWrap: "wrap", gap: 8 }}>
            <span>© 2026 Suntastic Solar Corp. All rights reserved.</span>
            <span>DOE-Accredited Solar Contractor · Philippines</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({ children }) {
  return <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: G, marginBottom: 14 }}>{children}</div>;
}

const sTitle = { fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1.2px", color: "#fff", marginBottom: 18 };
const sSub = { fontSize: 15, color: "rgba(255,255,255,0.35)", lineHeight: 1.75, maxWidth: 540, marginBottom: 48 };
const lStyle = { display: "block", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "1.5px", marginBottom: 8 };