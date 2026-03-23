import { useState, useEffect, useRef } from "react";

const G = "#00C47A";
const G_DARK = "#009E62";
const G_LIGHT = "#E6FBF3";

const NAV_LINKS = ["Services", "Projects", "Pricing", "About", "Testimonials"];

const PROJECTS = [
  { image: "/projects/project1.jpg", title: "Reyes Family Residence", location: "Quezon City", size: "8kW", year: "2024", desc: "Full rooftop installation with net metering setup. Reduced monthly bill from ₱12,000 to under ₱800." },
  { image: "/projects/project2.jpg", title: "TechBuild Warehouse", location: "Makati", size: "50kW", year: "2023", desc: "Large-scale commercial rooftop system across 3 warehouse buildings. ROI projected at under 4 years." },
  { image: "/projects/project3.jpg", title: "Santos Household", location: "Laguna", size: "5kW", year: "2024", desc: "Hybrid solar + battery storage system. 24/7 power backup for the entire household." },
  { image: "/projects/project4.jpg", title: "GreenMart Superstore", location: "Cebu City", size: "30kW", year: "2023", desc: "Commercial installation with real-time monitoring dashboard. 40% reduction in operating costs." },
  { image: "/projects/project5.jpg", title: "Dela Cruz Residence", location: "Cavite", size: "6kW", year: "2022", desc: "Residential rooftop system with smart inverter. Fully offset electricity bill since installation." },
];

const SERVICES = [
  { icon: "☀️", title: "Residential Solar", desc: "Custom rooftop solar solutions for your home. Slash your electricity bills and gain full energy independence.", tag: "Most Popular" },
  { icon: "🏭", title: "Commercial Solar", desc: "Large-scale installations for businesses, warehouses, and industrial facilities with fast ROI.", tag: "High ROI" },
  { icon: "🔋", title: "Battery Storage", desc: "Store surplus energy with cutting-edge battery systems. Power your home even after sundown.", tag: "24/7 Power" },
  { icon: "🔧", title: "Maintenance & Monitoring", desc: "Real-time remote monitoring and expert maintenance to keep your panels at peak performance.", tag: "Lifetime Care" },
];

const PRICING = [
  {
    name: "Starter",
    tagline: "Perfect for small homes",
    price: "289,000",
    system: "3kW System",
    panels: "6–8 Panels",
    badge: null,
    color: "rgba(255,255,255,0.04)",
    borderColor: "rgba(255,255,255,0.08)",
    features: [
      "3kW solar panel system",
      "Tier-1 monocrystalline panels",
      "String inverter included",
      "Meralco net metering setup",
      "1-year monitoring subscription",
      "10-yr workmanship warranty",
      "25-yr panel warranty",
    ],
    savings: "₱3,500–₱5,000/mo",
    payback: "5–7 years",
  },
  {
    name: "Home Solar",
    tagline: "Best for medium homes",
    price: "379,000",
    system: "6kW System",
    panels: "12–14 Panels",
    badge: "Most Popular",
    color: `${G}0D`,
    borderColor: `${G}50`,
    features: [
      "6kW solar panel system",
      "Tier-1 monocrystalline panels",
      "Hybrid inverter included",
      "Meralco net metering setup",
      "3-year monitoring subscription",
      "Battery-ready configuration",
      "10-yr workmanship warranty",
      "25-yr panel warranty",
    ],
    savings: "₱8,000–₱9,000/mo",
    payback: "4–6 years",
  },
  {
    name: "Power Home",
    tagline: "For large homes & estates",
    price: "579,000",
    system: "10kW System",
    panels: "20–24 Panels",
    badge: null,
    color: "rgba(255,255,255,0.04)",
    borderColor: "rgba(255,255,255,0.08)",
    features: [
      "10kW solar panel system",
      "Premium Tier-1 panels",
      "Premium hybrid inverter",
      "Meralco net metering setup",
      "Lifetime monitoring included",
      "Battery storage included",
      "Priority service support",
      "10-yr workmanship warranty",
      "25-yr panel warranty",
    ],
    savings: "₱11,000–₱16,000/mo",
    payback: "4–5 years",
  },
];

const TEAM = [
  { name: "Marco Reyes", role: "CEO & Founder", emoji: "👨‍💼", bio: "20+ years in renewable energy. Passionate about a solar-powered Philippines." },
  { name: "Ana Santos", role: "Head of Engineering", emoji: "👩‍🔧", bio: "Licensed electrical engineer specializing in solar PV systems and grid integration." },
  { name: "Luis Garcia", role: "Sales Director", emoji: "👨‍💻", bio: "Helping hundreds of families and businesses make the switch to clean energy since 2015." },
  { name: "Claire Tan", role: "Project Manager", emoji: "👩‍💼", bio: "Ensures every installation is delivered on time, on budget, and beyond expectations." },
];

const TESTIMONIALS = [
  { name: "Rodrigo V.", location: "Quezon City", text: "Our electricity bill went from ₱12,000 to under ₱800 a month. Best investment we've ever made. The Suntastic team was professional from start to finish.", stars: 5, system: "8kW Residential", initials: "RV" },
  { name: "Carla M.", location: "Laguna", text: "They handled everything — permits, installation, Meralco paperwork. We just sat back and watched the savings roll in. Highly recommend!", stars: 5, system: "5kW + Battery", initials: "CM" },
  { name: "TechBuild Corp", location: "Makati", text: "Suntastic installed 120 panels across our warehouse rooftop. ROI is on track for under 4 years. Exceptional work and ongoing monitoring support.", stars: 5, system: "50kW Commercial", initials: "TB" },
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

const PROCESS = [
  { step: "01", title: "Free Site Assessment", desc: "Our engineers visit your property and evaluate roof condition, shade analysis, and energy consumption." },
  { step: "02", title: "Custom Proposal", desc: "We design a solar system tailored to your energy needs and send a detailed quote within 24 hours." },
  { step: "03", title: "Installation Day", desc: "Our certified team installs your panels cleanly and efficiently — typically completed in 1–2 days." },
  { step: "04", title: "Start Saving", desc: "Your system goes live, net metering is activated, and you start watching your electricity bill drop." },
];

export default function SuntasticSolar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState("next");
  const autoplayRef = useRef(null);

  // Quote form
  const [quoteStep, setQuoteStep] = useState(1);
  const [quoteForm, setQuoteForm] = useState({
    type: "",
    bill: "",
    name: "",
    phone: "",
    email: "",
    city: "",
    message: "",
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteError, setQuoteError] = useState("");

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    autoplayRef.current = setInterval(() => goTo("next"), 5500);
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
    setTimeout(() => { setCurrentSlide(i); setIsAnimating(false); }, 350);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleQuoteNext = () => {
    setQuoteError("");
    if (quoteStep === 1 && !quoteForm.type) { setQuoteError("Pumili ng uri ng property."); return; }
    if (quoteStep === 1 && !quoteForm.bill) { setQuoteError("Piliin ang iyong buwanang bayad sa kuryente."); return; }
    if (quoteStep === 2 && (!quoteForm.name || !quoteForm.phone || !quoteForm.email)) { setQuoteError("Punan ang lahat ng required fields."); return; }
    setQuoteStep((s) => s + 1);
  };

  const handleQuoteSubmit = async () => {
    setQuoteError("");
    setQuoteSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setQuoteSubmitting(false);
    setQuoteSubmitted(true);
  };

  const proj = PROJECTS[currentSlide];

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F", color: "#fff", fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(.95)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideInNext { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInPrev { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

        .slide-enter-next { animation: slideInNext .35s ease forwards; }
        .slide-enter-prev { animation: slideInPrev .35s ease forwards; }

        .nav-btn {
          background:none; border:none; color:rgba(255,255,255,.5); font-size:13px; font-weight:600;
          cursor:pointer; padding:8px 14px; border-radius:8px; font-family:inherit;
          transition:color .2s, background .2s; letter-spacing:.1px;
        }
        .nav-btn:hover { color:#fff; background:rgba(255,255,255,.05); }

        .cta-btn {
          background:${G}; color:#fff; border:none; border-radius:10px;
          font-weight:700; font-size:13px; cursor:pointer; font-family:inherit;
          transition:opacity .2s, transform .15s, box-shadow .2s;
          letter-spacing:.2px;
        }
        .cta-btn:hover { opacity:.9; transform:translateY(-1px); }

        .cta-btn-outline {
          background:transparent; color:rgba(255,255,255,.7); border:1px solid rgba(255,255,255,.15);
          border-radius:10px; font-weight:600; font-size:14px; cursor:pointer; font-family:inherit;
          transition:all .2s;
        }
        .cta-btn-outline:hover { border-color:rgba(255,255,255,.3); color:#fff; background:rgba(255,255,255,.04); }

        .service-card {
          background:#111118; border:1px solid rgba(255,255,255,.07); border-radius:18px; padding:28px;
          position:relative; overflow:hidden; transition:border-color .25s, transform .25s, box-shadow .25s;
        }
        .service-card:hover { border-color:${G}45; transform:translateY(-4px); box-shadow:0 20px 60px rgba(0,0,0,.4); }

        .pricing-card {
          border-radius:20px; padding:32px 28px; position:relative; overflow:hidden;
          transition:transform .25s, box-shadow .25s;
        }
        .pricing-card:hover { transform:translateY(-4px); box-shadow:0 24px 64px rgba(0,0,0,.4); }

        .process-card {
          background:#111118; border:1px solid rgba(255,255,255,.06); border-radius:16px; padding:28px 24px;
          transition:border-color .2s;
        }
        .process-card:hover { border-color:${G}40; }

        .team-card {
          background:#111118; border:1px solid rgba(255,255,255,.07); border-radius:18px;
          padding:28px 22px; text-align:center; transition:border-color .25s, transform .25s;
        }
        .team-card:hover { border-color:${G}35; transform:translateY(-3px); }

        .testimonial-card {
          background:#111118; border:1px solid rgba(255,255,255,.07); border-radius:18px;
          padding:28px; transition:border-color .25s, transform .25s;
        }
        .testimonial-card:hover { border-color:${G}35; transform:translateY(-2px); }

        .carousel-btn {
          width:42px; height:42px; border-radius:50%; background:rgba(255,255,255,.05);
          border:1px solid rgba(255,255,255,.1); color:rgba(255,255,255,.65); font-size:16px;
          cursor:pointer; display:flex; align-items:center; justify-content:center;
          transition:all .2s; font-family:inherit; flex-shrink:0;
        }
        .carousel-btn:hover { background:${G}20; border-color:${G}55; color:${G}; }

        .form-input {
          width:100%; background:#0A0A0F; border:1px solid rgba(255,255,255,.1);
          border-radius:12px; padding:13px 16px; color:#fff; font-size:14px;
          font-family:inherit; outline:none; transition:border-color .2s, box-shadow .2s;
        }
        .form-input:focus { border-color:${G}; box-shadow:0 0 0 3px ${G}15; }
        .form-input::placeholder { color:rgba(255,255,255,.2); }

        .type-btn {
          flex:1; padding:14px 12px; background:#0A0A0F; border:1px solid rgba(255,255,255,.1);
          border-radius:12px; color:rgba(255,255,255,.45); font-family:inherit; font-size:14px;
          font-weight:600; cursor:pointer; transition:all .2s; text-align:center;
        }
        .type-btn:hover { border-color:${G}50; color:rgba(255,255,255,.8); }
        .type-btn.active { border-color:${G}; background:${G}15; color:#fff; }

        .bill-btn {
          padding:11px 14px; background:#0A0A0F; border:1px solid rgba(255,255,255,.1);
          border-radius:10px; color:rgba(255,255,255,.45); font-family:inherit; font-size:13px;
          font-weight:600; cursor:pointer; transition:all .2s; white-space:nowrap;
        }
        .bill-btn:hover { border-color:${G}45; color:rgba(255,255,255,.75); }
        .bill-btn.active { border-color:${G}; background:${G}15; color:#fff; }

        .submit-btn {
          width:100%; height:52px; background:${G}; border:none; border-radius:13px;
          color:#fff; font-size:14px; font-weight:700; font-family:inherit; cursor:pointer;
          transition:opacity .2s, transform .15s; letter-spacing:.2px;
        }
        .submit-btn:hover:not(:disabled) { opacity:.9; transform:translateY(-1px); }
        .submit-btn:disabled { background:${G}55; cursor:not-allowed; }

        .why-item {
          display:flex; align-items:center; gap:12px; background:#111118;
          border:1px solid rgba(255,255,255,.06); border-radius:12px;
          padding:14px 16px; transition:border-color .2s;
        }
        .why-item:hover { border-color:${G}35; }

        .footer-link {
          font-size:13px; color:rgba(255,255,255,.28); margin-bottom:10px;
          cursor:pointer; transition:color .15s; display:block;
        }
        .footer-link:hover { color:${G}; }

        .social-chip {
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07);
          color:rgba(255,255,255,.3); font-size:11px; font-weight:600; padding:5px 13px;
          border-radius:100px; cursor:pointer; font-family:inherit; transition:all .15s;
        }
        .social-chip:hover { border-color:${G}45; color:${G}; }

        .dot-btn {
          border-radius:100px; border:none; cursor:pointer; padding:0; transition:all .25s ease;
        }

        .contact-info-card {
          display:flex; align-items:center; gap:14px; background:#111118;
          border:1px solid rgba(255,255,255,.07); border-radius:14px; padding:16px 18px;
          transition:border-color .2s;
        }
        .contact-info-card:hover { border-color:${G}30; }

        .section-divider {
          height:1px; background:linear-gradient(to right, transparent, rgba(255,255,255,.06), transparent);
        }

        @media (max-width:900px) {
          .desktop-nav { display:none !important; }
          .burger { display:flex !important; }
          .hero-grid { grid-template-columns:1fr !important; }
          .services-grid { grid-template-columns:1fr 1fr !important; }
          .carousel-inner { flex-direction:column !important; }
          .process-grid { grid-template-columns:1fr 1fr !important; }
          .pricing-grid { grid-template-columns:1fr !important; max-width:400px !important; }
          .why-grid { grid-template-columns:1fr !important; }
          .contact-grid { grid-template-columns:1fr !important; }
          .footer-top { grid-template-columns:1fr !important; gap:40px !important; }
          .footer-links-grid { grid-template-columns:repeat(2,1fr) !important; }
        }
        @media (max-width:600px) {
          .services-grid { grid-template-columns:1fr !important; }
          .process-grid { grid-template-columns:1fr !important; }
          .stats-row { flex-wrap:wrap !important; }
          .stat-box { border-right:none !important; border-bottom:1px solid rgba(255,255,255,.05) !important; flex-basis:50% !important; }
          .stat-box:nth-child(odd) { border-right:1px solid rgba(255,255,255,.05) !important; }
        }
      `}</style>

      {/* ── BACKGROUND ── */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
        <svg width="100%" height="100%" style={{ opacity:.028, position:"absolute", inset:0 }}>
          <defs>
            <pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke={G} strokeWidth="0.6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)"/>
        </svg>
        <div style={{ position:"absolute", top:"10%", right:"5%", width:500, height:500, borderRadius:"50%", background:`radial-gradient(circle, ${G}09 0%, transparent 70%)`, filter:"blur(60px)" }}/>
        <div style={{ position:"absolute", bottom:"20%", left:"-5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(100,120,255,0.05) 0%, transparent 70%)", filter:"blur(50px)" }}/>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        padding: scrolled ? "10px 0" : "16px 0",
        background: scrolled ? "rgba(10,10,15,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,.05)" : "none",
        transition:"all .3s ease",
      }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={() => scrollTo("hero")}>
            <img src="/suntastic_logo_png.png" alt="Suntastic" style={{ width:48, height:48, objectFit:"contain", borderRadius:10 }}/>
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:"#fff", letterSpacing:"-.2px", lineHeight:1.1 }}>Suntastic Solar</div>
              <div style={{ fontSize:8, color:G, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase" }}>Corp.</div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display:"flex", alignItems:"center", gap:2 }}>
            {NAV_LINKS.map(l => (
              <button key={l} className="nav-btn" onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
            ))}
            <div style={{ width:1, height:20, background:"rgba(255,255,255,.08)", margin:"0 10px" }}/>
            <button className="cta-btn" style={{ padding:"9px 20px", fontSize:13 }} onClick={() => scrollTo("quote")}>
              Get Free Quote →
            </button>
          </div>

          {/* Mobile burger */}
          <button className="burger" style={{ display:"none", background:"none", border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.6)", fontSize:16, padding:"6px 12px", borderRadius:8, cursor:"pointer", fontFamily:"inherit", alignItems:"center", justifyContent:"center" }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div style={{ background:"rgba(10,10,15,.98)", borderTop:"1px solid rgba(255,255,255,.05)", padding:"16px 24px 20px" }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ display:"block", width:"100%", background:"none", border:"none", color:"rgba(255,255,255,.5)", fontSize:15, padding:"13px 0", textAlign:"left", cursor:"pointer", fontFamily:"inherit", borderBottom:"1px solid rgba(255,255,255,.04)" }}>{l}</button>
            ))}
            <button className="cta-btn" style={{ width:"100%", marginTop:16, height:48, borderRadius:12, fontSize:14 }} onClick={() => scrollTo("quote")}>Get Free Quote →</button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"120px 24px 80px", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", width:"100%" }}>
          <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1.05fr 1fr", gap:64, alignItems:"center" }}>

            {/* Left */}
            <div style={{ opacity:mounted?1:0, transform:mounted?"translateX(0)":"translateX(-20px)", transition:"opacity .7s, transform .7s" }}>
              {/* Badge */}
              <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:`${G}0F`, border:`1px solid ${G}28`, borderRadius:100, padding:"5px 14px 5px 10px", marginBottom:28 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:G, animation:"pulse 2s infinite" }}/>
                <span style={{ fontSize:10, color:G, fontWeight:700, letterSpacing:"1.2px" }}>DOE-ACCREDITED SOLAR CONTRACTOR</span>
              </div>

              <h1 style={{ fontSize:"clamp(36px, 5vw, 62px)", fontWeight:900, lineHeight:1.06, letterSpacing:"-1.8px", marginBottom:22, color:"#fff" }}>
                Power Your World<br />
                <span style={{ color:G }}>With the Sun.</span>
              </h1>
              <p style={{ fontSize:16, color:"rgba(255,255,255,.4)", lineHeight:1.8, marginBottom:36, maxWidth:480 }}>
                Suntastic Solar Corp delivers world-class solar installations for homes and businesses across the Philippines. Cut costs. Go green. Live free.
              </p>

              <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:44 }}>
                <button className="cta-btn" style={{ padding:"14px 28px", fontSize:15 }} onClick={() => scrollTo("quote")}>Get Free Quote →</button>
                <button className="cta-btn-outline" style={{ padding:"14px 24px" }} onClick={() => scrollTo("projects")}>View Projects</button>
              </div>

              {/* Feature list */}
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  { icon:"☀️", label:"Residential & Commercial Solar Installations" },
                  { icon:"🔋", label:"Battery Storage Systems for 24/7 Power" },
                  { icon:"📊", label:"Real-time Remote Performance Monitoring" },
                  { icon:"🛡️", label:"10-Year Workmanship + 25-Year Panel Warranty" },
                ].map((f, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10, opacity:mounted?1:0, transform:mounted?"translateX(0)":"translateX(-10px)", transition:`opacity .5s ease ${.2+i*.08}s, transform .5s ease ${.2+i*.08}s` }}>
                    <div style={{ width:32, height:32, borderRadius:9, background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{f.icon}</div>
                    <span style={{ fontSize:13, color:"rgba(255,255,255,.38)", fontWeight:500 }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – stats card */}
            <div style={{ opacity:mounted?1:0, transform:mounted?"translateX(0)":"translateX(20px)", transition:"opacity .7s .1s, transform .7s .1s" }}>
              <div style={{ background:"#111118", border:"1px solid rgba(255,255,255,.08)", borderRadius:22, padding:"36px 32px", marginBottom:14, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:`radial-gradient(circle, ${G}15 0%, transparent 70%)`, pointerEvents:"none" }}/>

                <div style={{ textAlign:"center", marginBottom:28 }}>
                  <img src="/suntastic_logo_png.png" alt="Suntastic" style={{ width:72, height:72, objectFit:"contain", borderRadius:12, marginBottom:12 }}/>
                  <div style={{ fontSize:17, fontWeight:800, color:"#fff", marginBottom:4, letterSpacing:"-.3px" }}>Suntastic Solar Corp</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,.25)" }}>Trusted by 500+ Filipino homes & businesses</div>
                </div>

                {/* Stats */}
                <div className="stats-row" style={{ display:"flex", background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.06)", borderRadius:14, overflow:"hidden" }}>
                  {STATS.map((s, i) => (
                    <div key={i} className="stat-box" style={{ flex:1, padding:"18px 16px", textAlign:"center", borderRight:"1px solid rgba(255,255,255,.05)" }}>
                      <div style={{ fontSize:22, fontWeight:900, color:G, letterSpacing:"-.6px", lineHeight:1 }}>{s.value}</div>
                      <div style={{ fontSize:9, color:"rgba(255,255,255,.25)", marginTop:5, fontWeight:700, letterSpacing:".5px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Trust badges */}
                <div style={{ display:"flex", gap:8, marginTop:18, flexWrap:"wrap" }}>
                  {["DOE Accredited", "10-yr Warranty", "0% Installment"].map(b => (
                    <div key={b} style={{ display:"inline-flex", alignItems:"center", gap:5, background:`${G}0D`, border:`1px solid ${G}22`, borderRadius:8, padding:"6px 12px" }}>
                      <div style={{ width:5, height:5, borderRadius:"50%", background:G }}/>
                      <span style={{ fontSize:10, color:"rgba(255,255,255,.55)", fontWeight:700 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick CTA */}
              <div style={{ background:`${G}10`, border:`1px solid ${G}30`, borderRadius:14, padding:"16px 18px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:2 }}>Free Site Assessment</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,.3)" }}>No commitment required · 100% free</div>
                </div>
                <button className="cta-btn" style={{ padding:"9px 16px", fontSize:12, whiteSpace:"nowrap", flexShrink:0 }} onClick={() => scrollTo("quote")}>Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding:"96px 24px", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionLabel>What We Offer</SectionLabel>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:20, marginBottom:44 }}>
            <h2 style={sTitle}>Solar Solutions<br /><span style={{ color:G }}>Built for You</span></h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,.35)", lineHeight:1.7, maxWidth:420 }}>
              From residential rooftops to industrial installations, we deliver end-to-end solar services with zero compromise on quality.
            </p>
          </div>
          <div className="services-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:16 }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card">
                <div style={{ position:"absolute", top:16, right:16, background:`${G}15`, color:G, fontSize:9, fontWeight:700, letterSpacing:".8px", padding:"4px 10px", borderRadius:100, textTransform:"uppercase" }}>{s.tag}</div>
                <div style={{ width:48, height:48, borderRadius:13, background:`${G}12`, border:`1px solid ${G}25`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:20 }}>{s.icon}</div>
                <h3 style={{ fontSize:16, fontWeight:800, color:"#fff", marginBottom:10, letterSpacing:"-.2px" }}>{s.title}</h3>
                <p style={{ fontSize:13, color:"rgba(255,255,255,.35)", lineHeight:1.75, marginBottom:16 }}>{s.desc}</p>
                <span style={{ fontSize:13, color:G, fontWeight:700 }}>Learn more →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding:"96px 24px", background:"#0D0D16", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionLabel>Our Process</SectionLabel>
          <h2 style={{ ...sTitle, marginBottom:48 }}>From Quote to<br /><span style={{ color:G }}>Clean Energy</span></h2>
          <div className="process-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:16, position:"relative" }}>
            {/* Connector line */}
            <div style={{ position:"absolute", top:32, left:"10%", right:"10%", height:1, background:`linear-gradient(to right, transparent, ${G}30, transparent)`, pointerEvents:"none" }}/>
            {PROCESS.map((p, i) => (
              <div key={i} className="process-card">
                <div style={{ width:40, height:40, borderRadius:12, background:`${G}15`, border:`1px solid ${G}30`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
                  <span style={{ fontSize:12, fontWeight:800, color:G, letterSpacing:".5px" }}>{p.step}</span>
                </div>
                <h3 style={{ fontSize:15, fontWeight:800, color:"#fff", marginBottom:10, letterSpacing:"-.2px" }}>{p.title}</h3>
                <p style={{ fontSize:13, color:"rgba(255,255,255,.35)", lineHeight:1.75 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ── PROJECTS CAROUSEL ── */}
      <section id="projects" style={{ padding:"96px 24px", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionLabel>Our Work</SectionLabel>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:20, marginBottom:36 }}>
            <h2 style={sTitle}>Featured<br /><span style={{ color:G }}>Solar Projects</span></h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,.35)", lineHeight:1.7, maxWidth:420 }}>
              Bawat project ay patunay ng aming dedikasyon sa kalidad at sustainable energy solutions.
            </p>
          </div>

          <div style={{ background:"#111118", border:"1px solid rgba(255,255,255,.07)", borderRadius:22, overflow:"hidden" }}>
            <div className="carousel-inner" style={{ display:"flex", minHeight:400 }}>
              {/* Image */}
              <div style={{ flex:"0 0 52%", position:"relative", overflow:"hidden", minHeight:340 }}>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, #0f2018 0%, #0a1710 100%)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ textAlign:"center", opacity:.2 }}>
                    <img src="/suntastic_logo_png.png" alt="Suntastic" style={{ width:70, height:70, objectFit:"contain" }}/>
                    <div style={{ fontSize:11, color:G, fontWeight:700, letterSpacing:"2px", marginTop:8 }}>PROJECT PHOTO</div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,.4)", fontFamily:"monospace", marginTop:4 }}>public/projects/project{currentSlide+1}.jpg</div>
                  </div>
                </div>
                <img key={currentSlide} src={proj.image} alt={proj.title} className={isAnimating?"":slideDir==="next"?"slide-enter-next":"slide-enter-prev"} onError={(e) => { e.target.style.display="none"; }} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}/>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, transparent 55%, #111118 100%)", pointerEvents:"none" }}/>
                <div style={{ position:"absolute", top:18, left:18, background:"rgba(0,0,0,.55)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,.1)", borderRadius:100, padding:"4px 12px", fontSize:10, fontWeight:700, color:"rgba(255,255,255,.6)" }}>
                  {currentSlide+1} / {PROJECTS.length}
                </div>
              </div>

              {/* Info */}
              <div style={{ flex:1, padding:"40px 36px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
                <div key={`info-${currentSlide}`} className={isAnimating?"":slideDir==="next"?"slide-enter-next":"slide-enter-prev"}>
                  <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:18 }}>
                    <Chip color={G}>{proj.size}</Chip>
                    <Chip>📍 {proj.location}</Chip>
                    <Chip>📅 {proj.year}</Chip>
                  </div>
                  <h3 style={{ fontSize:"clamp(18px,2.5vw,26px)", fontWeight:900, color:"#fff", letterSpacing:"-.6px", marginBottom:12, lineHeight:1.2 }}>{proj.title}</h3>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,.38)", lineHeight:1.8, marginBottom:28 }}>{proj.desc}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <button className="carousel-btn" onClick={() => goTo("prev")}>←</button>
                    <button className="carousel-btn" onClick={() => goTo("next")}>→</button>
                    <div style={{ display:"flex", gap:5, marginLeft:6 }}>
                      {PROJECTS.map((_,i) => (
                        <button key={i} className="dot-btn" onClick={() => goToIndex(i)} style={{ width:i===currentSlide?20:7, height:7, background:i===currentSlide?G:"rgba(255,255,255,.15)" }}/>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height:2, background:"rgba(255,255,255,.03)" }}>
              <div style={{ height:"100%", background:G, width:`${((currentSlide+1)/PROJECTS.length)*100}%`, transition:"width .4s ease" }}/>
            </div>
          </div>

          {/* Thumbnails */}
          <div style={{ display:"flex", gap:10, marginTop:14, overflowX:"auto", paddingBottom:4 }}>
            {PROJECTS.map((p,i) => (
              <button key={i} onClick={() => goToIndex(i)} style={{ flexShrink:0, width:76, height:54, borderRadius:10, overflow:"hidden", border:`2px solid ${i===currentSlide?G:"rgba(255,255,255,.07)"}`, cursor:"pointer", background:"#111118", position:"relative", padding:0, transition:"border-color .2s" }}>
                <img src="/suntastic_logo_png.png" alt="thumb" style={{ width:40, height:40, objectFit:"contain", position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}/>
                <img src={p.image} alt={p.title} onError={(e) => { e.target.style.display="none"; }} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}/>
                {i===currentSlide && <div style={{ position:"absolute", inset:0, background:`${G}25` }}/>}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding:"96px 24px", background:"#0D0D16", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionLabel>Transparent Pricing</SectionLabel>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <h2 style={{ ...sTitle, textAlign:"center" }}>Solar Packages for<br /><span style={{ color:G }}>Every Home</span></h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,.35)", lineHeight:1.75, maxWidth:520, margin:"0 auto" }}>
              All packages include free site assessment, professional installation, permits, and net metering setup. No hidden fees.
            </p>
          </div>

          <div className="pricing-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16, margin:"0 auto" }}>
            {PRICING.map((plan, i) => (
              <div key={i} className="pricing-card" style={{ background:plan.color, border:`1px solid ${plan.borderColor}`, position:"relative" }}>
                {plan.badge && (
                  <div style={{ position:"absolute", top:-1, left:"50%", transform:"translateX(-50%)", background:G, color:"#fff", fontSize:10, fontWeight:800, padding:"5px 16px", borderRadius:"0 0 10px 10px", letterSpacing:".8px", whiteSpace:"nowrap" }}>
                    {plan.badge.toUpperCase()}
                  </div>
                )}
                <div style={{ paddingTop: plan.badge ? 20 : 0 }}>
                  <div style={{ marginBottom:6, fontSize:11, color:G, fontWeight:700, letterSpacing:"1px" }}>{plan.system} · {plan.panels}</div>
                  <h3 style={{ fontSize:22, fontWeight:900, color:"#fff", letterSpacing:"-.4px", marginBottom:4 }}>{plan.name}</h3>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,.35)", marginBottom:22 }}>{plan.tagline}</p>

                  <div style={{ marginBottom:24 }}>
                    <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:6 }}>
                      <span style={{ fontSize:11, color:"rgba(255,255,255,.4)", fontWeight:600 }}>Starting at</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"baseline", gap:3 }}>
                      <span style={{ fontSize:13, color:G, fontWeight:700, lineHeight:1 }}>₱</span>
                      <span style={{ fontSize:36, fontWeight:900, color:"#fff", letterSpacing:"-1.5px", lineHeight:1 }}>{plan.price}</span>
                    </div>
                  </div>

                  {/* Savings & payback */}
                  <div style={{ display:"flex", gap:8, marginBottom:24 }}>
                    <div style={{ flex:1, background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.07)", borderRadius:10, padding:"10px 12px" }}>
                      <div style={{ fontSize:9, color:"rgba(255,255,255,.3)", fontWeight:700, letterSpacing:".8px", marginBottom:3 }}>MONTHLY SAVINGS</div>
                      <div style={{ fontSize:13, fontWeight:800, color:G }}>{plan.savings}</div>
                    </div>
                    <div style={{ flex:1, background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.07)", borderRadius:10, padding:"10px 12px" }}>
                      <div style={{ fontSize:9, color:"rgba(255,255,255,.3)", fontWeight:700, letterSpacing:".8px", marginBottom:3 }}>PAYBACK PERIOD</div>
                      <div style={{ fontSize:13, fontWeight:800, color:"rgba(255,255,255,.65)" }}>{plan.payback}</div>
                    </div>
                  </div>

                  <div style={{ height:1, background:"rgba(255,255,255,.06)", marginBottom:22 }}/>

                  {/* Features */}
                  <ul style={{ listStyle:"none", padding:0, margin:"0 0 28px", display:"flex", flexDirection:"column", gap:9 }}>
                    {plan.features.map((f,fi) => (
                      <li key={fi} style={{ display:"flex", alignItems:"flex-start", gap:9, fontSize:13, color:"rgba(255,255,255,.5)", lineHeight:1.5 }}>
                        <span style={{ color:G, fontSize:12, flexShrink:0, marginTop:1 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button className="cta-btn" style={{ width:"100%", padding:"13px", fontSize:14, borderRadius:12, background:plan.badge?G:"transparent", border:plan.badge?`none`:`1px solid ${G}45`, color:plan.badge?"#fff":G }} onClick={() => scrollTo("quote")}>
                    {plan.badge ? "Get This Package →" : "Get a Quote →"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Commercial CTA */}
          <div style={{ marginTop:20, background:"#111118", border:"1px solid rgba(255,255,255,.07)", borderRadius:18, padding:"24px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:"#fff", marginBottom:4 }}>Need a Commercial Solution? 🏭</div>
              <p style={{ fontSize:13, color:"rgba(255,255,255,.35)", lineHeight:1.6 }}>We design custom systems for warehouses, offices, and industrial facilities. Talk to our commercial solar team for a tailored proposal.</p>
            </div>
            <button className="cta-btn-outline" style={{ padding:"12px 24px", whiteSpace:"nowrap", flexShrink:0 }} onClick={() => scrollTo("quote")}>Request Commercial Quote →</button>
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ── WHY US ── */}
      <section style={{ padding:"96px 24px", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:64, alignItems:"center" }} className="why-outer">
            <div>
              <SectionLabel>Our Edge</SectionLabel>
              <h2 style={{ ...sTitle, marginBottom:16 }}>Why Choose<br /><span style={{ color:G }}>Suntastic?</span></h2>
              <p style={{ fontSize:15, color:"rgba(255,255,255,.35)", lineHeight:1.75, marginBottom:28 }}>We're not just installers — we're your long-term clean energy partners dedicated to maximizing your ROI.</p>
              <button className="cta-btn" style={{ padding:"12px 22px", fontSize:14 }} onClick={() => scrollTo("quote")}>Get Free Assessment</button>
            </div>
            <div className="why-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {WHY.map((item, i) => (
                <div key={i} className="why-item">
                  <span style={{ fontSize:18, flexShrink:0 }}>{item.icon}</span>
                  <span style={{ fontSize:13, color:"rgba(255,255,255,.42)", fontWeight:500, lineHeight:1.45 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding:"96px 24px", background:"#0D0D16", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionLabel>Who We Are</SectionLabel>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"start", marginBottom:60 }}>
            <div>
              <h2 style={sTitle}>The Team Behind<br /><span style={{ color:G }}>Suntastic Solar</span></h2>
            </div>
            <div>
              <p style={{ fontSize:15, color:"rgba(255,255,255,.38)", lineHeight:1.85 }}>
                Suntastic Solar Corp. was founded in March 2026 with a mission to make solar energy simple, affordable, and accessible to everyone. Recognizing the growing demand for alternative energy solutions, the company is focused on helping Filipino households and businesses transition to clean and cost-efficient solar power. As a forward-thinking company, Suntastic Solar Corp. aims to become a trusted partner in building a sustainable and energy-independent future.
              </p>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(230px, 1fr))", gap:16 }}>
            {TEAM.map((m, i) => (
              <div key={i} className="team-card">
                <div style={{ width:56, height:56, borderRadius:16, background:`${G}15`, border:`1px solid ${G}28`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, margin:"0 auto 16px" }}>{m.emoji}</div>
                <div style={{ fontSize:16, fontWeight:800, color:"#fff", marginBottom:4, letterSpacing:"-.2px" }}>{m.name}</div>
                <div style={{ fontSize:9, fontWeight:700, color:G, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:12 }}>{m.role}</div>
                <p style={{ fontSize:13, color:"rgba(255,255,255,.33)", lineHeight:1.7 }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" style={{ padding:"96px 24px", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionLabel>What Clients Say</SectionLabel>
          <h2 style={{ ...sTitle, marginBottom:48 }}>Real People.<br /><span style={{ color:G }}>Real Savings.</span></h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:16 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                {/* Stars */}
                <div style={{ color:"#FBBF24", fontSize:14, letterSpacing:3, marginBottom:16 }}>{"★".repeat(t.stars)}</div>
                {/* Quote */}
                <p style={{ fontSize:14, color:"rgba(255,255,255,.45)", lineHeight:1.8, marginBottom:24, fontStyle:"italic" }}>"{t.text}"</p>
                <div style={{ height:1, background:"rgba(255,255,255,.05)", marginBottom:18 }}/>
                {/* Author */}
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:`${G}20`, border:`1px solid ${G}35`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:G, flexShrink:0 }}>{t.initials}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:800, color:"#fff", marginBottom:2 }}>{t.name}</div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,.25)" }}>📍 {t.location}</div>
                  </div>
                  <div style={{ background:`${G}12`, color:G, fontSize:10, fontWeight:700, padding:"5px 11px", borderRadius:8, letterSpacing:".4px", whiteSpace:"nowrap" }}>{t.system}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ── FREE QUOTE (DEDICATED SECTION) ── */}
      <section id="quote" style={{ padding:"96px 24px", background:"#0D0D16", position:"relative", zIndex:1, overflow:"hidden" }}>
        {/* BG accent */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, borderRadius:"50%", background:`radial-gradient(circle, ${G}06 0%, transparent 70%)`, pointerEvents:"none" }}/>

        <div style={{ maxWidth:900, margin:"0 auto", position:"relative" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <SectionLabel style={{ textAlign:"center", display:"block" }}>Free Quote</SectionLabel>
            <h2 style={{ ...sTitle, textAlign:"center", marginBottom:12 }}>Get Your Free<br /><span style={{ color:G }}>Solar Assessment</span></h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,.35)", lineHeight:1.75 }}>
              Answer a few quick questions and our solar consultants will reach out within 24 hours with a custom proposal — no commitment required.
            </p>
          </div>

          <div style={{ background:"#111118", border:`1px solid rgba(255,255,255,.08)`, borderRadius:22, overflow:"hidden" }}>
            {/* Step indicators */}
            {!quoteSubmitted && (
              <div style={{ padding:"20px 32px", borderBottom:"1px solid rgba(255,255,255,.05)", display:"flex", alignItems:"center", gap:0 }}>
                {[1,2,3].map((s, i) => (
                  <div key={s} style={{ display:"flex", alignItems:"center", flex:s<3?1:undefined }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:28, height:28, borderRadius:8, background:quoteStep>=s?G:"rgba(255,255,255,.07)", border:`1px solid ${quoteStep>=s?G:"rgba(255,255,255,.1)"}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .3s" }}>
                        {quoteStep>s ? <span style={{ color:"#fff", fontSize:12, fontWeight:700 }}>✓</span> : <span style={{ color:quoteStep>=s?"#fff":"rgba(255,255,255,.3)", fontSize:11, fontWeight:800 }}>{s}</span>}
                      </div>
                      <span style={{ fontSize:12, fontWeight:700, color:quoteStep>=s?"rgba(255,255,255,.7)":"rgba(255,255,255,.25)", whiteSpace:"nowrap" }}>
                        {["Property Info","Your Details","Confirmation"][i]}
                      </span>
                    </div>
                    {s<3 && <div style={{ flex:1, height:1, background:quoteStep>s?G:"rgba(255,255,255,.07)", margin:"0 12px", transition:"background .3s" }}/>}
                  </div>
                ))}
              </div>
            )}

            <div style={{ padding:"36px 32px" }}>
              {quoteSubmitted ? (
                /* Success state */
                <div style={{ textAlign:"center", padding:"40px 20px" }}>
                  <div style={{ width:72, height:72, borderRadius:20, background:`${G}15`, border:`1px solid ${G}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, margin:"0 auto 20px" }}>✅</div>
                  <h3 style={{ fontSize:22, fontWeight:900, color:"#fff", letterSpacing:"-.4px", marginBottom:10 }}>Request Submitted!</h3>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,.4)", lineHeight:1.75, marginBottom:24 }}>
                    Salamat! Makikipag-ugnayan sa iyo ang aming team sa loob ng 24 na oras para sa inyong libreng solar assessment.
                  </p>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:`${G}12`, border:`1px solid ${G}28`, borderRadius:12, padding:"10px 18px" }}>
                    <span style={{ fontSize:13, color:"rgba(255,255,255,.5)" }}>📞 Expect a call from <strong style={{ color:G }}>+63 917 123 4567</strong></span>
                  </div>
                </div>
              ) : quoteStep === 1 ? (
                /* Step 1: Property info */
                <div>
                  <h3 style={{ fontSize:17, fontWeight:800, color:"#fff", marginBottom:4 }}>Tell us about your property</h3>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,.35)", marginBottom:28 }}>This helps us design the right system for you.</p>

                  <div style={{ marginBottom:24 }}>
                    <Label>Property Type *</Label>
                    <div style={{ display:"flex", gap:10 }}>
                      {["Residential", "Commercial", "Industrial"].map(t => (
                        <button key={t} className={`type-btn${quoteForm.type===t?" active":""}`} onClick={() => setQuoteForm({ ...quoteForm, type:t })}>
                          {t==="Residential"?"🏠 ":t==="Commercial"?"🏢 ":"🏭 "}{t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom:28 }}>
                    <Label>Monthly Electricity Bill *</Label>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                      {["₱2k–₱5k","₱5k–₱8k","₱8k–₱15k","₱15k–₱30k","₱30k+"].map(b => (
                        <button key={b} className={`bill-btn${quoteForm.bill===b?" active":""}`} onClick={() => setQuoteForm({ ...quoteForm, bill:b })}>{b}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom:28 }}>
                    <Label>City / Location</Label>
                    <input className="form-input" placeholder="e.g. Quezon City, Metro Manila" value={quoteForm.city} onChange={(e) => setQuoteForm({ ...quoteForm, city:e.target.value })}/>
                  </div>

                  {quoteError && <ErrorMsg>{quoteError}</ErrorMsg>}
                  <button className="cta-btn" style={{ width:"100%", padding:"14px", fontSize:15, borderRadius:13 }} onClick={handleQuoteNext}>
                    Next: Your Details →
                  </button>
                </div>
              ) : quoteStep === 2 ? (
                /* Step 2: Contact info */
                <div>
                  <h3 style={{ fontSize:17, fontWeight:800, color:"#fff", marginBottom:4 }}>How can we reach you?</h3>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,.35)", marginBottom:28 }}>Your info is safe with us. We'll never share it with third parties.</p>

                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                    <div>
                      <Label>Full Name *</Label>
                      <input className="form-input" placeholder="Juan dela Cruz" value={quoteForm.name} onChange={(e) => setQuoteForm({ ...quoteForm, name:e.target.value })}/>
                    </div>
                    <div>
                      <Label>Phone Number *</Label>
                      <input className="form-input" placeholder="+63 9XX XXX XXXX" value={quoteForm.phone} onChange={(e) => setQuoteForm({ ...quoteForm, phone:e.target.value })}/>
                    </div>
                  </div>

                  <div style={{ marginBottom:14 }}>
                    <Label>Email Address *</Label>
                    <input className="form-input" type="email" placeholder="juan@email.com" value={quoteForm.email} onChange={(e) => setQuoteForm({ ...quoteForm, email:e.target.value })}/>
                  </div>

                  <div style={{ marginBottom:24 }}>
                    <Label>Additional Notes (optional)</Label>
                    <textarea className="form-input" style={{ minHeight:90, resize:"vertical" }} placeholder="Tell us more about your energy needs, roof type, etc." value={quoteForm.message} onChange={(e) => setQuoteForm({ ...quoteForm, message:e.target.value })}/>
                  </div>

                  {quoteError && <ErrorMsg>{quoteError}</ErrorMsg>}
                  <div style={{ display:"flex", gap:10 }}>
                    <button className="cta-btn-outline" style={{ padding:"14px 24px", borderRadius:13, fontSize:14, flex:"0 0 auto" }} onClick={() => setQuoteStep(1)}>← Back</button>
                    <button className="cta-btn" style={{ flex:1, padding:"14px", fontSize:15, borderRadius:13 }} onClick={handleQuoteNext}>
                      Review & Submit →
                    </button>
                  </div>
                </div>
              ) : (
                /* Step 3: Review */
                <div>
                  <h3 style={{ fontSize:17, fontWeight:800, color:"#fff", marginBottom:4 }}>Review Your Request</h3>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,.35)", marginBottom:24 }}>Please confirm the details below before submitting.</p>

                  <div style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:14, padding:"20px", marginBottom:20 }}>
                    {[
                      ["Property Type", quoteForm.type],
                      ["Monthly Bill", quoteForm.bill],
                      ["Location", quoteForm.city || "—"],
                      ["Name", quoteForm.name],
                      ["Phone", quoteForm.phone],
                      ["Email", quoteForm.email],
                    ].map(([k,v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,.05)", fontSize:14 }}>
                        <span style={{ color:"rgba(255,255,255,.35)", fontWeight:600 }}>{k}</span>
                        <span style={{ color:"rgba(255,255,255,.7)" }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background:`${G}0D`, border:`1px solid ${G}25`, borderRadius:12, padding:"12px 16px", marginBottom:20, fontSize:13, color:"rgba(255,255,255,.45)", lineHeight:1.6 }}>
                    ☀️ Our solar consultant will contact you within <strong style={{ color:G }}>24 hours</strong> with a custom proposal and to schedule your free site assessment.
                  </div>

                  <div style={{ display:"flex", gap:10 }}>
                    <button className="cta-btn-outline" style={{ padding:"14px 24px", borderRadius:13, fontSize:14, flex:"0 0 auto" }} onClick={() => setQuoteStep(2)}>← Back</button>
                    <button className="submit-btn" style={{ flex:1, borderRadius:13, fontSize:15 }} disabled={quoteSubmitting} onClick={handleQuoteSubmit}>
                      {quoteSubmitting ? (
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                          <div style={{ width:17, height:17, border:"2px solid rgba(255,255,255,.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin .7s linear infinite" }}/>
                          <span>Submitting...</span>
                        </div>
                      ) : "Submit Free Quote Request ☀️"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact info below form */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:12, marginTop:16 }}>
            {[
              { icon:"📞", label:"PHONE", val:"+63 917 123 4567" },
              { icon:"📧", label:"EMAIL", val:"hello@suntasticsolar.ph" },
              { icon:"📍", label:"OFFICE", val:"Quezon City, Metro Manila" },
              { icon:"🕐", label:"HOURS", val:"Mon–Sat, 8AM–6PM" },
            ].map((c,i) => (
              <div key={i} className="contact-info-card">
                <span style={{ fontSize:20 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize:9, fontWeight:700, color:G, letterSpacing:"1.5px", marginBottom:2 }}>{c.label}</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,.45)", fontWeight:500 }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#060609", padding:"60px 24px 28px", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="footer-top" style={{ display:"grid", gridTemplateColumns:"1.2fr 2fr", gap:60, marginBottom:48 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                <img src="/suntastic_logo_png.png" alt="Suntastic" style={{ width:52, height:52, objectFit:"contain", borderRadius:11 }}/>
                <div>
                  <div style={{ fontSize:14, fontWeight:800, color:"#fff" }}>Suntastic Solar Corp</div>
                  <div style={{ fontSize:8, color:G, fontWeight:700, letterSpacing:"2px" }}>FROM SUNLIGHT TO SAVINGS</div>
                </div>
              </div>
              <p style={{ fontSize:13, color:"rgba(255,255,255,.2)", lineHeight:1.85, marginBottom:22 }}>Powering the Philippines,<br/>one rooftop at a time.</p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {["Facebook","Instagram","LinkedIn","YouTube"].map(s => (
                  <span key={s} className="social-chip">{s}</span>
                ))}
              </div>
            </div>
            <div className="footer-links-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:32 }}>
              {[
                { head:"Services", links:["Residential Solar","Commercial Solar","Battery Storage","Maintenance & Monitoring"] },
                { head:"Company", links:["About Us","Our Team","Projects","Pricing"] },
                { head:"Support", links:["FAQs","Monitoring Portal","Warranty Claims","Contact Us"] },
              ].map((col,i) => (
                <div key={i}>
                  <div style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,.18)", letterSpacing:"2px", textTransform:"uppercase", marginBottom:16 }}>{col.head}</div>
                  {col.links.map(l => <span key={l} className="footer-link">{l}</span>)}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:22, borderTop:"1px solid rgba(255,255,255,.04)", fontSize:11, color:"rgba(255,255,255,.13)", flexWrap:"wrap", gap:8 }}>
            <span>© 2026 Suntastic Solar Corp. All rights reserved.</span>
            <span>DOE-Accredited Solar Contractor · Philippines</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Helpers ── */
function SectionLabel({ children }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:16 }}>
      <div style={{ width:16, height:2, background:"#00C47A", borderRadius:1 }}/>
      <span style={{ fontSize:10, fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:"#00C47A" }}>{children}</span>
    </div>
  );
}
function Chip({ children, color }) {
  return (
    <span style={{ background:color?"#00C47A18":"rgba(255,255,255,.07)", color:color?"#00C47A":"rgba(255,255,255,.45)", fontSize:10, fontWeight:700, padding:"4px 11px", borderRadius:100, letterSpacing:".5px" }}>
      {children}
    </span>
  );
}
function Label({ children }) {
  return <label style={{ display:"block", fontSize:10, fontWeight:700, color:"rgba(255,255,255,.3)", letterSpacing:"1.5px", marginBottom:9 }}>{children}</label>;
}
function ErrorMsg({ children }) {
  return (
    <div style={{ background:"rgba(255,77,106,.1)", border:"1px solid rgba(255,77,106,.28)", borderRadius:10, padding:"10px 14px", display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
      <span style={{ fontSize:13 }}>⚠️</span>
      <span style={{ fontSize:12, color:"#FF4D6A", fontWeight:600 }}>{children}</span>
    </div>
  );
}

const sTitle = {
  fontSize:"clamp(26px, 4vw, 44px)", fontWeight:900, lineHeight:1.08,
  letterSpacing:"-1.2px", color:"#fff", marginBottom:16,
};