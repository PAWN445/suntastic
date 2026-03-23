import { useState, useEffect, useRef } from "react";

const G = "#00C47A";

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
    name: "Starter", tagline: "Perfect for small homes", price: "289,000",
    system: "3kW System", panels: "6–8 Panels", badge: null,
    features: ["3kW solar panel system","Tier-1 monocrystalline panels","String inverter included","Meralco net metering setup","1-year monitoring subscription","10-yr workmanship warranty","25-yr panel warranty"],
    savings: "₱3,500–₱5,000/mo", payback: "2–3 years",
  },
  {
    name: "Home Solar", tagline: "Best for medium homes", price: "379,000",
    system: "6kW System", panels: "12–14 Panels", badge: "Most Popular",
    features: ["6kW solar panel system","Tier-1 monocrystalline panels","Hybrid inverter included","Meralco net metering setup","3-year monitoring subscription","Battery-ready configuration","10-yr workmanship warranty","25-yr panel warranty"],
    savings: "₱8,000–₱9,000/mo", payback: "3–4 years",
  },
  {
    name: "Power Home", tagline: "For large homes & estates", price: "579,000",
    system: "10kW System", panels: "20–24 Panels", badge: null,
    features: ["10kW solar panel system","Premium Tier-1 panels","Premium hybrid inverter","Meralco net metering setup","Lifetime monitoring included","Battery storage included","Priority service support","10-yr workmanship warranty","25-yr panel warranty"],
    savings: "₱11,000–₱16,000/mo", payback: "3–4 years",
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
  { icon: "🛡️", text: "10-yr workmanship + 25-yr panel warranty" },
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
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState("next");
  const autoplayRef = useRef(null);
  const heroRef = useRef(null);

  const [quoteStep, setQuoteStep] = useState(1);
  const [quoteForm, setQuoteForm] = useState({ type:"", bill:"", name:"", phone:"", email:"", city:"", message:"" });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteError, setQuoteError] = useState("");

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const heroH = heroRef.current?.offsetHeight || 700;
      setPastHero(window.scrollY > heroH - 80);
    };
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
    setIsAnimating(true); setSlideDir(dir);
    setTimeout(() => {
      setCurrentSlide(prev => dir==="next"?(prev+1)%PROJECTS.length:(prev-1+PROJECTS.length)%PROJECTS.length);
      setIsAnimating(false);
    }, 350);
  };
  const goToIndex = (i) => {
    if (i===currentSlide||isAnimating) return;
    clearInterval(autoplayRef.current);
    setSlideDir(i>currentSlide?"next":"prev"); setIsAnimating(true);
    setTimeout(()=>{setCurrentSlide(i);setIsAnimating(false);},350);
  };
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); };

  const handleQuoteNext = () => {
    setQuoteError("");
    if (quoteStep===1&&!quoteForm.type){setQuoteError("Pumili ng uri ng property.");return;}
    if (quoteStep===1&&!quoteForm.bill){setQuoteError("Piliin ang iyong buwanang bayad sa kuryente.");return;}
    if (quoteStep===2&&(!quoteForm.name||!quoteForm.phone||!quoteForm.email)){setQuoteError("Punan ang lahat ng required fields.");return;}
    setQuoteStep(s=>s+1);
  };
  const handleQuoteSubmit = async () => {
    setQuoteError(""); setQuoteSubmitting(true);
    await new Promise(r=>setTimeout(r,1400));
    setQuoteSubmitting(false); setQuoteSubmitted(true);
  };

  const proj = PROJECTS[currentSlide];
  const navBg = !scrolled?"transparent":pastHero?"rgba(255,255,255,0.97)":"rgba(10,10,15,0.95)";
  const navShadow = scrolled&&pastHero?"0 2px 20px rgba(0,0,0,0.08)":"none";
  const navBorder = !scrolled?"none":pastHero?"1px solid rgba(0,0,0,0.07)":"1px solid rgba(255,255,255,0.05)";
  const logoColor = pastHero?"#1a1a2e":"#fff";
  const navLinkColor = pastHero?"rgba(0,0,0,0.55)":"rgba(255,255,255,0.5)";

  return (
    <div style={{minHeight:"100vh",background:"#F7F8FA",color:"#1a1a2e",fontFamily:"'Plus Jakarta Sans','DM Sans',sans-serif",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.95)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes slideInNext{from{opacity:0;transform:translateX(32px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slideInPrev{from{opacity:0;transform:translateX(-32px)}to{opacity:1;transform:translateX(0)}}
        .slide-enter-next{animation:slideInNext .35s ease forwards;}
        .slide-enter-prev{animation:slideInPrev .35s ease forwards;}

        .nav-btn{background:none;border:none;font-size:13px;font-weight:600;cursor:pointer;padding:8px 14px;border-radius:8px;font-family:inherit;transition:color .3s,background .2s;}

        .cta-btn{background:${G};color:#fff;border:none;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer;font-family:inherit;transition:opacity .2s,transform .15s;letter-spacing:.2px;}
        .cta-btn:hover{opacity:.88;transform:translateY(-1px);}

        .outline-white{background:transparent;color:rgba(255,255,255,.8);border:1.5px solid rgba(255,255,255,.22);border-radius:10px;font-weight:600;font-size:14px;cursor:pointer;font-family:inherit;transition:all .2s;}
        .outline-white:hover{border-color:rgba(255,255,255,.5);color:#fff;}

        .outline-dark{background:transparent;color:#1a1a2e;border:1.5px solid rgba(0,0,0,.15);border-radius:10px;font-weight:600;font-size:14px;cursor:pointer;font-family:inherit;transition:all .2s;}
        .outline-dark:hover{border-color:${G};color:${G};background:${G}08;}

        /* Light cards */
        .svc-card{background:#fff;border:1px solid rgba(0,0,0,.07);border-radius:18px;padding:28px;position:relative;overflow:hidden;transition:border-color .25s,transform .25s,box-shadow .25s;cursor:pointer;}
        .svc-card:hover{border-color:${G}65;transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,196,122,.09);}

        .proc-card{background:#fff;border:1px solid rgba(0,0,0,.07);border-radius:16px;padding:28px 24px;transition:border-color .2s,box-shadow .2s;}
        .proc-card:hover{border-color:${G}50;box-shadow:0 8px 32px rgba(0,196,122,.07);}

        .price-card{background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:20px;padding:32px 28px;position:relative;transition:transform .25s,box-shadow .25s;}
        .price-card:hover{transform:translateY(-4px);box-shadow:0 20px 56px rgba(0,0,0,.09);}

        .price-card-feat{background:#0D1F16;border:1.5px solid ${G};border-radius:20px;padding:32px 28px;position:relative;transition:transform .25s,box-shadow .25s;}
        .price-card-feat:hover{transform:translateY(-4px);box-shadow:0 20px 56px rgba(0,196,122,.18);}

        .why-item{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid rgba(0,0,0,.07);border-radius:12px;padding:14px 16px;transition:border-color .2s,box-shadow .2s;}
        .why-item:hover{border-color:${G}55;box-shadow:0 4px 16px rgba(0,196,122,.06);}

        .team-card{background:#fff;border:1px solid rgba(0,0,0,.07);border-radius:18px;padding:28px 22px;text-align:center;transition:border-color .25s,transform .25s,box-shadow .25s;}
        .team-card:hover{border-color:${G}55;transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,196,122,.09);}

        .testi-card{background:#fff;border:1px solid rgba(0,0,0,.07);border-radius:18px;padding:28px;transition:border-color .25s,transform .25s,box-shadow .25s;}
        .testi-card:hover{border-color:${G}55;transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,196,122,.07);}

        .contact-card{display:flex;align-items:center;gap:14px;background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:14px;padding:16px 18px;transition:border-color .2s,box-shadow .2s;}
        .contact-card:hover{border-color:${G}45;box-shadow:0 4px 16px rgba(0,196,122,.06);}

        .carousel-btn{width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.7);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;font-family:inherit;flex-shrink:0;}
        .carousel-btn:hover{background:${G}30;border-color:${G}70;color:${G};}

        .form-input{width:100%;background:#fff;border:1.5px solid rgba(0,0,0,.1);border-radius:12px;padding:13px 16px;color:#1a1a2e;font-size:14px;font-family:inherit;outline:none;transition:border-color .2s,box-shadow .2s;}
        .form-input:focus{border-color:${G};box-shadow:0 0 0 3px ${G}18;}
        .form-input::placeholder{color:rgba(0,0,0,.25);}

        .type-btn{flex:1;padding:14px 12px;background:#fff;border:1.5px solid rgba(0,0,0,.1);border-radius:12px;color:rgba(0,0,0,.45);font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;text-align:center;}
        .type-btn:hover{border-color:${G}55;}
        .type-btn.active{border-color:${G};background:${G}10;color:#1a1a2e;}

        .bill-btn{padding:11px 14px;background:#fff;border:1.5px solid rgba(0,0,0,.1);border-radius:10px;color:rgba(0,0,0,.45);font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap;}
        .bill-btn:hover{border-color:${G}55;}
        .bill-btn.active{border-color:${G};background:${G}10;color:#1a1a2e;}

        .submit-btn{width:100%;height:52px;background:${G};border:none;border-radius:13px;color:#fff;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;transition:opacity .2s,transform .15s;}
        .submit-btn:hover:not(:disabled){opacity:.9;transform:translateY(-1px);}
        .submit-btn:disabled{background:${G}55;cursor:not-allowed;}

        .dot-btn{border-radius:100px;border:none;cursor:pointer;padding:0;transition:all .25s;}

        .footer-link{font-size:13px;color:rgba(255,255,255,.3);margin-bottom:10px;cursor:pointer;transition:color .15s;display:block;}
        .footer-link:hover{color:${G};}
        .social-chip{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.32);font-size:11px;font-weight:600;padding:5px 13px;border-radius:100px;cursor:pointer;font-family:inherit;transition:all .15s;}
        .social-chip:hover{border-color:${G}55;color:${G};}

        .sec-divider{height:1px;background:rgba(0,0,0,.06);}

        @media(max-width:900px){
          .dnav{display:none!important;} .burger{display:flex!important;}
          .hero-grid{grid-template-columns:1fr!important;}
          .svcs-grid{grid-template-columns:1fr 1fr!important;}
          .proc-grid{grid-template-columns:1fr 1fr!important;}
          .price-grid{grid-template-columns:1fr!important;max-width:420px!important;margin:0 auto!important;}
          .why-outer{grid-template-columns:1fr!important;}
          .why-grid{grid-template-columns:1fr!important;}
          .about-grid{grid-template-columns:1fr!important;}
          .ci{flex-direction:column!important;}
          .footer-top{grid-template-columns:1fr!important;gap:40px!important;}
          .flinks{grid-template-columns:repeat(2,1fr)!important;}
        }
        @media(max-width:600px){
          .svcs-grid{grid-template-columns:1fr!important;}
          .proc-grid{grid-template-columns:1fr!important;}
          .stats-row{flex-wrap:wrap!important;}
          .stat-b{flex-basis:50%!important;border-right:none!important;border-bottom:1px solid rgba(255,255,255,.06)!important;}
          .stat-b:nth-child(odd){border-right:1px solid rgba(255,255,255,.06)!important;}
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:scrolled?"10px 0":"16px 0",background:navBg,backdropFilter:scrolled?"blur(20px)":"none",borderBottom:navBorder,boxShadow:navShadow,transition:"all .35s ease"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>scrollTo("hero")}>
            <img src="/suntastic_logo_png.png" alt="Suntastic" style={{width:46,height:46,objectFit:"contain",borderRadius:10}}/>
            <div>
              <div style={{fontSize:14,fontWeight:800,color:logoColor,letterSpacing:"-.2px",lineHeight:1.1,transition:"color .3s"}}>Suntastic Solar</div>
              <div style={{fontSize:8,color:G,fontWeight:700,letterSpacing:"2px"}}>CORP.</div>
            </div>
          </div>

          <div className="dnav" style={{display:"flex",alignItems:"center",gap:2}}>
            {NAV_LINKS.map(l=>(
              <button key={l} className="nav-btn" onClick={()=>scrollTo(l.toLowerCase())} style={{color:navLinkColor}}
                onMouseEnter={e=>{e.currentTarget.style.color=pastHero?"#000":"#fff";e.currentTarget.style.background=pastHero?"rgba(0,0,0,.04)":"rgba(255,255,255,.05)";}}
                onMouseLeave={e=>{e.currentTarget.style.color=navLinkColor;e.currentTarget.style.background="none";}}
              >{l}</button>
            ))}
            <div style={{width:1,height:20,background:pastHero?"rgba(0,0,0,.1)":"rgba(255,255,255,.1)",margin:"0 10px"}}/>
            <button className="cta-btn" style={{padding:"9px 20px"}} onClick={()=>scrollTo("quote")}>Get Free Quote →</button>
          </div>

          <button className="burger" onClick={()=>setMenuOpen(!menuOpen)} style={{display:"none",background:"none",border:pastHero?"1px solid rgba(0,0,0,.12)":"1px solid rgba(255,255,255,.1)",color:pastHero?"rgba(0,0,0,.5)":"rgba(255,255,255,.6)",fontSize:15,padding:"6px 12px",borderRadius:8,cursor:"pointer",fontFamily:"inherit",alignItems:"center",justifyContent:"center",transition:"all .3s"}}>
            {menuOpen?"✕":"☰"}
          </button>
        </div>
        {menuOpen&&(
          <div style={{background:pastHero?"rgba(255,255,255,.98)":"rgba(10,10,15,.98)",borderTop:`1px solid ${pastHero?"rgba(0,0,0,.06)":"rgba(255,255,255,.05)"}`,padding:"16px 24px 20px"}}>
            {NAV_LINKS.map(l=>(
              <button key={l} onClick={()=>scrollTo(l.toLowerCase())} style={{display:"block",width:"100%",background:"none",border:"none",color:pastHero?"rgba(0,0,0,.55)":"rgba(255,255,255,.5)",fontSize:15,padding:"13px 0",textAlign:"left",cursor:"pointer",fontFamily:"inherit",borderBottom:`1px solid ${pastHero?"rgba(0,0,0,.05)":"rgba(255,255,255,.04)"}`}}>{l}</button>
            ))}
            <button className="cta-btn" style={{width:"100%",marginTop:16,height:48,borderRadius:12,fontSize:14}} onClick={()=>scrollTo("quote")}>Get Free Quote →</button>
          </div>
        )}
      </nav>

      {/* ══════════ DARK HERO ══════════ */}
      <section ref={heroRef} id="hero" style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"120px 24px 100px",background:"#0A0A0F",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
          <svg width="100%" height="100%" style={{opacity:.028,position:"absolute",inset:0}}>
            <defs><pattern id="hg" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke={G} strokeWidth="0.6"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#hg)"/>
          </svg>
          <div style={{position:"absolute",top:"8%",right:"4%",width:540,height:540,borderRadius:"50%",background:`radial-gradient(circle, ${G}0A 0%, transparent 70%)`,filter:"blur(70px)"}}/>
          <div style={{position:"absolute",bottom:"10%",left:"-5%",width:420,height:420,borderRadius:"50%",background:"radial-gradient(circle,rgba(80,100,255,0.06) 0%,transparent 70%)",filter:"blur(55px)"}}/>
        </div>

        <div style={{maxWidth:1200,margin:"0 auto",width:"100%",position:"relative"}}>
          <div className="hero-grid" style={{display:"grid",gridTemplateColumns:"1.05fr 1fr",gap:64,alignItems:"center"}}>
            <div style={{opacity:mounted?1:0,transform:mounted?"translateX(0)":"translateX(-20px)",transition:"opacity .7s,transform .7s"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:7,background:`${G}12`,border:`1px solid ${G}30`,borderRadius:100,padding:"5px 14px 5px 10px",marginBottom:28}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:G,animation:"pulse 2s infinite"}}/>
                <span style={{fontSize:10,color:G,fontWeight:700,letterSpacing:"1.2px"}}>DOE-ACCREDITED SOLAR CONTRACTOR</span>
              </div>
              <h1 style={{fontSize:"clamp(36px,5vw,64px)",fontWeight:900,lineHeight:1.06,letterSpacing:"-2px",marginBottom:22,color:"#fff"}}>
                Power Your World<br/><span style={{color:G}}>With the Sun.</span>
              </h1>
              <p style={{fontSize:16,color:"rgba(255,255,255,.4)",lineHeight:1.8,marginBottom:36,maxWidth:480}}>
                Suntastic Solar Corp delivers world-class solar installations for homes and businesses across the Philippines. Cut costs. Go green. Live free.
              </p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:44}}>
                <button className="cta-btn" style={{padding:"14px 28px",fontSize:15}} onClick={()=>scrollTo("quote")}>Get Free Quote →</button>
                <button className="outline-white" style={{padding:"14px 24px"}} onClick={()=>scrollTo("projects")}>View Projects</button>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {[
                  {icon:"☀️",label:"Residential & Commercial Solar Installations"},
                  {icon:"🔋",label:"Battery Storage Systems for 24/7 Power"},
                  {icon:"📊",label:"Real-time Remote Performance Monitoring"},
                  {icon:"🛡️",label:"10-Year Workmanship + 25-Year Panel Warranty"},
                ].map((f,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,opacity:mounted?1:0,transform:mounted?"translateX(0)":"translateX(-10px)",transition:`opacity .5s ease ${.2+i*.08}s,transform .5s ease ${.2+i*.08}s`}}>
                    <div style={{width:32,height:32,borderRadius:9,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{f.icon}</div>
                    <span style={{fontSize:13,color:"rgba(255,255,255,.38)",fontWeight:500}}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{opacity:mounted?1:0,transform:mounted?"translateX(0)":"translateX(20px)",transition:"opacity .7s .1s,transform .7s .1s"}}>
              <div style={{background:"#111118",border:"1px solid rgba(255,255,255,.09)",borderRadius:22,padding:"36px 32px",marginBottom:14,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:-60,right:-60,width:200,height:200,borderRadius:"50%",background:`radial-gradient(circle,${G}18 0%,transparent 70%)`,pointerEvents:"none"}}/>
                <div style={{textAlign:"center",marginBottom:28}}>
                  <img src="/suntastic_logo_png.png" alt="Suntastic" style={{width:72,height:72,objectFit:"contain",borderRadius:12,marginBottom:12}}/>
                  <div style={{fontSize:17,fontWeight:800,color:"#fff",marginBottom:4,letterSpacing:"-.3px"}}>Suntastic Solar Corp</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,.25)"}}>Trusted by 500+ Filipino homes & businesses</div>
                </div>
                <div className="stats-row" style={{display:"flex",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:14,overflow:"hidden"}}>
                  {STATS.map((s,i)=>(
                    <div key={i} className="stat-b" style={{flex:1,padding:"18px 12px",textAlign:"center",borderRight:"1px solid rgba(255,255,255,.06)"}}>
                      <div style={{fontSize:20,fontWeight:900,color:G,letterSpacing:"-.5px",lineHeight:1}}>{s.value}</div>
                      <div style={{fontSize:9,color:"rgba(255,255,255,.25)",marginTop:5,fontWeight:700,letterSpacing:".4px"}}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:8,marginTop:18,flexWrap:"wrap"}}>
                  {["DOE Accredited","10-yr Warranty","0% Installment"].map(b=>(
                    <div key={b} style={{display:"inline-flex",alignItems:"center",gap:5,background:`${G}0D`,border:`1px solid ${G}25`,borderRadius:8,padding:"6px 12px"}}>
                      <div style={{width:5,height:5,borderRadius:"50%",background:G}}/>
                      <span style={{fontSize:10,color:"rgba(255,255,255,.55)",fontWeight:700}}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{background:`${G}12`,border:`1px solid ${G}32`,borderRadius:14,padding:"16px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:2}}>Free Site Assessment</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.3)"}}>No commitment required · 100% free</div>
                </div>
                <button className="cta-btn" style={{padding:"9px 16px",fontSize:12,whiteSpace:"nowrap",flexShrink:0}} onClick={()=>scrollTo("quote")}>Book Now</button>
              </div>
            </div>
          </div>
        </div>

        {/* Wave to light */}
        <div style={{position:"absolute",bottom:-1,left:0,right:0,zIndex:2}}>
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{display:"block",width:"100%",height:64}}>
            <path d="M0,0 C480,64 960,64 1440,0 L1440,64 L0,64 Z" fill="#F7F8FA"/>
          </svg>
        </div>
      </section>

      {/* ══════════ LIGHT SECTIONS ══════════ */}

      {/* SERVICES */}
      <section id="services" style={{padding:"96px 24px",background:"#F7F8FA"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SL>What We Offer</SL>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:20,marginBottom:44}}>
            <h2 style={TL}>Solar Solutions<br/><span style={{color:G}}>Built for You</span></h2>
            <p style={{fontSize:15,color:"rgba(0,0,0,.45)",lineHeight:1.75,maxWidth:420}}>From residential rooftops to industrial installations, end-to-end solar services with zero compromise on quality.</p>
          </div>
          <div className="svcs-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
            {SERVICES.map((s,i)=>(
              <div key={i} className="svc-card">
                <div style={{position:"absolute",top:16,right:16,background:`${G}15`,color:G,fontSize:9,fontWeight:700,letterSpacing:".8px",padding:"4px 10px",borderRadius:100,textTransform:"uppercase"}}>{s.tag}</div>
                <div style={{width:48,height:48,borderRadius:13,background:`${G}12`,border:`1px solid ${G}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:20}}>{s.icon}</div>
                <h3 style={{fontSize:16,fontWeight:800,color:"#1a1a2e",marginBottom:10}}>{s.title}</h3>
                <p style={{fontSize:13,color:"rgba(0,0,0,.45)",lineHeight:1.75,marginBottom:16}}>{s.desc}</p>
                <span style={{fontSize:13,color:G,fontWeight:700}}>Learn more →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sec-divider"/>

      {/* HOW IT WORKS */}
      <section style={{padding:"96px 24px",background:"#fff"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SL>Our Process</SL>
          <h2 style={{...TL,marginBottom:48}}>From Quote to<br/><span style={{color:G}}>Clean Energy</span></h2>
          <div className="proc-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,position:"relative"}}>
            <div style={{position:"absolute",top:32,left:"10%",right:"10%",height:1,background:`linear-gradient(to right,transparent,${G}35,transparent)`,pointerEvents:"none"}}/>
            {PROCESS.map((p,i)=>(
              <div key={i} className="proc-card">
                <div style={{width:40,height:40,borderRadius:12,background:`${G}15`,border:`1px solid ${G}32`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}>
                  <span style={{fontSize:12,fontWeight:800,color:G}}>{p.step}</span>
                </div>
                <h3 style={{fontSize:15,fontWeight:800,color:"#1a1a2e",marginBottom:10}}>{p.title}</h3>
                <p style={{fontSize:13,color:"rgba(0,0,0,.45)",lineHeight:1.75}}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS — keep dark for drama */}
      <section id="projects" style={{padding:"96px 24px",background:"#0D0D16"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SLD>Our Work</SLD>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:20,marginBottom:36}}>
            <h2 style={TD}>Featured<br/><span style={{color:G}}>Solar Projects</span></h2>
            <p style={{fontSize:15,color:"rgba(255,255,255,.35)",lineHeight:1.7,maxWidth:420}}>Bawat project ay patunay ng aming dedikasyon sa kalidad at sustainable energy solutions.</p>
          </div>
          <div style={{background:"#111118",border:"1px solid rgba(255,255,255,.07)",borderRadius:22,overflow:"hidden"}}>
            <div className="ci" style={{display:"flex",minHeight:400}}>
              <div style={{flex:"0 0 52%",position:"relative",overflow:"hidden",minHeight:340}}>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,#0f2018,#0a1710)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <div style={{textAlign:"center",opacity:.18}}>
                    <img src="/suntastic_logo_png.png" alt="" style={{width:64,height:64,objectFit:"contain"}}/>
                    <div style={{fontSize:10,color:G,fontWeight:700,letterSpacing:"2px",marginTop:8}}>PROJECT PHOTO</div>
                    <div style={{fontSize:9,color:"rgba(255,255,255,.4)",fontFamily:"monospace",marginTop:4}}>public/projects/project{currentSlide+1}.jpg</div>
                  </div>
                </div>
                <img key={currentSlide} src={proj.image} alt={proj.title} className={isAnimating?"":slideDir==="next"?"slide-enter-next":"slide-enter-prev"} onError={e=>{e.target.style.display="none";}} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,transparent 55%,#111118 100%)",pointerEvents:"none"}}/>
                <div style={{position:"absolute",top:18,left:18,background:"rgba(0,0,0,.55)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,.1)",borderRadius:100,padding:"4px 12px",fontSize:10,fontWeight:700,color:"rgba(255,255,255,.6)"}}>{currentSlide+1} / {PROJECTS.length}</div>
              </div>
              <div style={{flex:1,padding:"40px 36px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <div key={`i-${currentSlide}`} className={isAnimating?"":slideDir==="next"?"slide-enter-next":"slide-enter-prev"}>
                  <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:18}}>
                    <DC accent>{proj.size}</DC><DC>📍 {proj.location}</DC><DC>📅 {proj.year}</DC>
                  </div>
                  <h3 style={{fontSize:"clamp(18px,2.5vw,26px)",fontWeight:900,color:"#fff",letterSpacing:"-.6px",marginBottom:12,lineHeight:1.2}}>{proj.title}</h3>
                  <p style={{fontSize:14,color:"rgba(255,255,255,.38)",lineHeight:1.8,marginBottom:28}}>{proj.desc}</p>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <button className="carousel-btn" onClick={()=>goTo("prev")}>←</button>
                    <button className="carousel-btn" onClick={()=>goTo("next")}>→</button>
                    <div style={{display:"flex",gap:5,marginLeft:6}}>
                      {PROJECTS.map((_,i)=>(
                        <button key={i} className="dot-btn" onClick={()=>goToIndex(i)} style={{width:i===currentSlide?20:7,height:7,background:i===currentSlide?G:"rgba(255,255,255,.15)"}}/>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{height:2,background:"rgba(255,255,255,.03)"}}>
              <div style={{height:"100%",background:G,width:`${((currentSlide+1)/PROJECTS.length)*100}%`,transition:"width .4s ease"}}/>
            </div>
          </div>
          <div style={{display:"flex",gap:10,marginTop:14,overflowX:"auto",paddingBottom:4}}>
            {PROJECTS.map((p,i)=>(
              <button key={i} onClick={()=>goToIndex(i)} style={{flexShrink:0,width:76,height:54,borderRadius:10,overflow:"hidden",border:`2px solid ${i===currentSlide?G:"rgba(255,255,255,.08)"}`,cursor:"pointer",background:"#111118",position:"relative",padding:0,transition:"border-color .2s"}}>
                <img src="/suntastic_logo_png.png" alt="" style={{width:36,height:36,objectFit:"contain",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
                <img src={p.image} alt="" onError={e=>{e.target.style.display="none";}} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
                {i===currentSlide&&<div style={{position:"absolute",inset:0,background:`${G}28`}}/>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{padding:"96px 24px",background:"#F7F8FA"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SL>Transparent Pricing</SL>
          <div style={{textAlign:"center",marginBottom:56}}>
            <h2 style={{...TL,textAlign:"center"}}>Solar Packages for<br/><span style={{color:G}}>Every Home</span></h2>
            <p style={{fontSize:15,color:"rgba(0,0,0,.45)",lineHeight:1.75,maxWidth:520,margin:"0 auto"}}>All packages include free site assessment, professional installation, permits, and net metering setup. No hidden fees.</p>
          </div>
          <div className="price-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
            {PRICING.map((plan,i)=>(
              <div key={i} className={plan.badge?"price-card-feat":"price-card"}>
                {plan.badge&&(
                  <div style={{position:"absolute",top:-1,left:"50%",transform:"translateX(-50%)",background:G,color:"#fff",fontSize:10,fontWeight:800,padding:"5px 16px",borderRadius:"0 0 10px 10px",letterSpacing:".8px",whiteSpace:"nowrap"}}>{plan.badge.toUpperCase()}</div>
                )}
                <div style={{paddingTop:plan.badge?20:0}}>
                  <div style={{fontSize:11,color:G,fontWeight:700,letterSpacing:"1px",marginBottom:6}}>{plan.system} · {plan.panels}</div>
                  <h3 style={{fontSize:22,fontWeight:900,color:plan.badge?"#fff":"#1a1a2e",letterSpacing:"-.4px",marginBottom:4}}>{plan.name}</h3>
                  <p style={{fontSize:13,color:plan.badge?"rgba(255,255,255,.45)":"rgba(0,0,0,.45)",marginBottom:22}}>{plan.tagline}</p>
                  <div style={{marginBottom:24}}>
                    <div style={{fontSize:11,color:plan.badge?"rgba(255,255,255,.4)":"rgba(0,0,0,.4)",fontWeight:600,marginBottom:4}}>Starting at</div>
                    <div style={{display:"flex",alignItems:"baseline",gap:2}}>
                      <span style={{fontSize:14,color:G,fontWeight:700}}>₱</span>
                      <span style={{fontSize:36,fontWeight:900,color:plan.badge?"#fff":"#1a1a2e",letterSpacing:"-1.5px",lineHeight:1}}>{plan.price}</span>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8,marginBottom:24}}>
                    {[["MONTHLY SAVINGS",plan.savings,G],["PAYBACK PERIOD",plan.payback,plan.badge?"rgba(255,255,255,.75)":"#1a1a2e"]].map(([k,v,c])=>(
                      <div key={k} style={{flex:1,background:plan.badge?"rgba(255,255,255,.06)":"rgba(0,0,0,.04)",border:`1px solid ${plan.badge?"rgba(255,255,255,.1)":"rgba(0,0,0,.07)"}`,borderRadius:10,padding:"10px 12px"}}>
                        <div style={{fontSize:9,color:plan.badge?"rgba(255,255,255,.35)":"rgba(0,0,0,.35)",fontWeight:700,letterSpacing:".8px",marginBottom:3}}>{k}</div>
                        <div style={{fontSize:13,fontWeight:800,color:c}}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{height:1,background:plan.badge?"rgba(255,255,255,.08)":"rgba(0,0,0,.07)",marginBottom:22}}/>
                  <ul style={{listStyle:"none",padding:0,margin:"0 0 28px",display:"flex",flexDirection:"column",gap:9}}>
                    {plan.features.map((f,fi)=>(
                      <li key={fi} style={{display:"flex",alignItems:"flex-start",gap:9,fontSize:13,color:plan.badge?"rgba(255,255,255,.55)":"rgba(0,0,0,.5)",lineHeight:1.5}}>
                        <span style={{color:G,fontSize:12,flexShrink:0,marginTop:1}}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <button className="cta-btn" style={{width:"100%",padding:"13px",fontSize:14,borderRadius:12,background:plan.badge?G:"transparent",border:plan.badge?"none":`1.5px solid ${G}`,color:plan.badge?"#fff":G}} onClick={()=>scrollTo("quote")}>
                    {plan.badge?"Get This Package →":"Get a Quote →"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:20,background:"#fff",border:"1px solid rgba(0,0,0,.07)",borderRadius:18,padding:"24px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16,boxShadow:"0 2px 12px rgba(0,0,0,.04)"}}>
            <div>
              <div style={{fontSize:14,fontWeight:800,color:"#1a1a2e",marginBottom:4}}>Need a Commercial Solution? 🏭</div>
              <p style={{fontSize:13,color:"rgba(0,0,0,.45)",lineHeight:1.6}}>Custom systems for warehouses, offices, and industrial facilities. Talk to our commercial team for a tailored proposal.</p>
            </div>
            <button className="outline-dark" style={{padding:"12px 24px",whiteSpace:"nowrap",flexShrink:0}} onClick={()=>scrollTo("quote")}>Request Commercial Quote →</button>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <div className="sec-divider"/>
      <section style={{padding:"96px 24px",background:"#fff"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="why-outer" style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:64,alignItems:"center"}}>
            <div>
              <SL>Our Edge</SL>
              <h2 style={{...TL,marginBottom:16}}>Why Choose<br/><span style={{color:G}}>Suntastic?</span></h2>
              <p style={{fontSize:15,color:"rgba(0,0,0,.45)",lineHeight:1.75,marginBottom:28}}>We're not just installers — we're your long-term clean energy partners dedicated to maximizing your ROI.</p>
              <button className="cta-btn" style={{padding:"12px 22px",fontSize:14}} onClick={()=>scrollTo("quote")}>Get Free Assessment</button>
            </div>
            <div className="why-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {WHY.map((item,i)=>(
                <div key={i} className="why-item">
                  <span style={{fontSize:18,flexShrink:0}}>{item.icon}</span>
                  <span style={{fontSize:13,color:"rgba(0,0,0,.5)",fontWeight:500,lineHeight:1.45}}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <div className="sec-divider"/>
      <section id="about" style={{padding:"96px 24px",background:"#F7F8FA"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SL>Who We Are</SL>
          <div className="about-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start",marginBottom:56}}>
            <h2 style={TL}>The Team Behind<br/><span style={{color:G}}>Suntastic Solar</span></h2>
            <p style={{fontSize:15,color:"rgba(0,0,0,.45)",lineHeight:1.85,paddingTop:8}}>
              Suntastic Solar Corp. was founded in March 2026 with a mission to make solar energy simple, affordable, and accessible to everyone. Recognizing the growing demand for alternative energy, we help Filipino households and businesses transition to clean and cost-efficient solar power. As a forward-thinking company, Suntastic aims to become a trusted partner in building a sustainable and energy-independent future.
            </p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:16}}>
            {TEAM.map((m,i)=>(
              <div key={i} className="team-card">
                <div style={{width:56,height:56,borderRadius:16,background:`${G}15`,border:`1px solid ${G}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 16px"}}>{m.emoji}</div>
                <div style={{fontSize:16,fontWeight:800,color:"#1a1a2e",marginBottom:4}}>{m.name}</div>
                <div style={{fontSize:9,fontWeight:700,color:G,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:12}}>{m.role}</div>
                <p style={{fontSize:13,color:"rgba(0,0,0,.45)",lineHeight:1.7}}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <div className="sec-divider"/>
      <section id="testimonials" style={{padding:"96px 24px",background:"#fff"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SL>What Clients Say</SL>
          <h2 style={{...TL,marginBottom:48}}>Real People.<br/><span style={{color:G}}>Real Savings.</span></h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
            {TESTIMONIALS.map((t,i)=>(
              <div key={i} className="testi-card">
                <div style={{color:"#FBBF24",fontSize:14,letterSpacing:3,marginBottom:16}}>{"★".repeat(t.stars)}</div>
                <p style={{fontSize:14,color:"rgba(0,0,0,.5)",lineHeight:1.8,marginBottom:24,fontStyle:"italic"}}>"{t.text}"</p>
                <div style={{height:1,background:"rgba(0,0,0,.06)",marginBottom:18}}/>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:40,height:40,borderRadius:12,background:`${G}18`,border:`1px solid ${G}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:G,flexShrink:0}}>{t.initials}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:800,color:"#1a1a2e",marginBottom:2}}>{t.name}</div>
                    <div style={{fontSize:11,color:"rgba(0,0,0,.35)"}}>📍 {t.location}</div>
                  </div>
                  <div style={{background:`${G}12`,color:G,fontSize:10,fontWeight:700,padding:"5px 11px",borderRadius:8,letterSpacing:".4px",whiteSpace:"nowrap"}}>{t.system}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE QUOTE */}
      <div className="sec-divider"/>
      <section id="quote" style={{padding:"96px 24px",background:"#F7F8FA"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <SL>Free Quote</SL>
            <h2 style={{...TL,textAlign:"center",marginBottom:12}}>Get Your Free<br/><span style={{color:G}}>Solar Assessment</span></h2>
            <p style={{fontSize:15,color:"rgba(0,0,0,.45)",lineHeight:1.75}}>Answer a few quick questions and our solar consultants will reach out within 24 hours with a custom proposal — no commitment required.</p>
          </div>

          <div style={{background:"#fff",border:"1px solid rgba(0,0,0,.08)",borderRadius:22,overflow:"hidden",boxShadow:"0 4px 40px rgba(0,0,0,.06)"}}>
            {!quoteSubmitted&&(
              <div style={{padding:"20px 32px",borderBottom:"1px solid rgba(0,0,0,.06)",display:"flex",alignItems:"center"}}>
                {[1,2,3].map((s,i)=>(
                  <div key={s} style={{display:"flex",alignItems:"center",flex:s<3?1:undefined}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:28,height:28,borderRadius:8,background:quoteStep>=s?G:"rgba(0,0,0,.06)",border:`1px solid ${quoteStep>=s?G:"rgba(0,0,0,.1)"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .3s"}}>
                        {quoteStep>s?<span style={{color:"#fff",fontSize:12,fontWeight:700}}>✓</span>:<span style={{color:quoteStep>=s?"#fff":"rgba(0,0,0,.3)",fontSize:11,fontWeight:800}}>{s}</span>}
                      </div>
                      <span style={{fontSize:12,fontWeight:700,color:quoteStep>=s?"#1a1a2e":"rgba(0,0,0,.3)",whiteSpace:"nowrap"}}>{["Property Info","Your Details","Confirmation"][i]}</span>
                    </div>
                    {s<3&&<div style={{flex:1,height:1,background:quoteStep>s?G:"rgba(0,0,0,.08)",margin:"0 12px",transition:"background .3s"}}/>}
                  </div>
                ))}
              </div>
            )}
            <div style={{padding:"36px 32px"}}>
              {quoteSubmitted?(
                <div style={{textAlign:"center",padding:"40px 20px"}}>
                  <div style={{width:72,height:72,borderRadius:20,background:`${G}15`,border:`1px solid ${G}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 20px"}}>✅</div>
                  <h3 style={{fontSize:22,fontWeight:900,color:"#1a1a2e",marginBottom:10}}>Request Submitted!</h3>
                  <p style={{fontSize:14,color:"rgba(0,0,0,.45)",lineHeight:1.75,marginBottom:24}}>Salamat! Makikipag-ugnayan sa iyo ang aming team sa loob ng 24 na oras para sa inyong libreng solar assessment.</p>
                  <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${G}10`,border:`1px solid ${G}30`,borderRadius:12,padding:"10px 18px"}}>
                    <span style={{fontSize:13,color:"rgba(0,0,0,.5)"}}>📞 Expect a call from <strong style={{color:G}}>+63 917 123 4567</strong></span>
                  </div>
                </div>
              ):quoteStep===1?(
                <div>
                  <h3 style={{fontSize:17,fontWeight:800,color:"#1a1a2e",marginBottom:4}}>Tell us about your property</h3>
                  <p style={{fontSize:13,color:"rgba(0,0,0,.45)",marginBottom:28}}>This helps us design the right system for you.</p>
                  <div style={{marginBottom:24}}>
                    <LL>Property Type *</LL>
                    <div style={{display:"flex",gap:10}}>
                      {["Residential","Commercial","Industrial"].map(t=>(
                        <button key={t} className={`type-btn${quoteForm.type===t?" active":""}`} onClick={()=>setQuoteForm({...quoteForm,type:t})}>
                          {t==="Residential"?"🏠 ":t==="Commercial"?"🏢 ":"🏭 "}{t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{marginBottom:28}}>
                    <LL>Monthly Electricity Bill *</LL>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {["₱2k–₱5k","₱5k–₱8k","₱8k–₱15k","₱15k–₱30k","₱30k+"].map(b=>(
                        <button key={b} className={`bill-btn${quoteForm.bill===b?" active":""}`} onClick={()=>setQuoteForm({...quoteForm,bill:b})}>{b}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{marginBottom:28}}>
                    <LL>City / Location</LL>
                    <input className="form-input" placeholder="e.g. Quezon City, Metro Manila" value={quoteForm.city} onChange={e=>setQuoteForm({...quoteForm,city:e.target.value})}/>
                  </div>
                  {quoteError&&<EM>{quoteError}</EM>}
                  <button className="cta-btn" style={{width:"100%",padding:"14px",fontSize:15,borderRadius:13}} onClick={handleQuoteNext}>Next: Your Details →</button>
                </div>
              ):quoteStep===2?(
                <div>
                  <h3 style={{fontSize:17,fontWeight:800,color:"#1a1a2e",marginBottom:4}}>How can we reach you?</h3>
                  <p style={{fontSize:13,color:"rgba(0,0,0,.45)",marginBottom:28}}>Your info is safe with us. We'll never share it with third parties.</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                    <div><LL>Full Name *</LL><input className="form-input" placeholder="Juan dela Cruz" value={quoteForm.name} onChange={e=>setQuoteForm({...quoteForm,name:e.target.value})}/></div>
                    <div><LL>Phone Number *</LL><input className="form-input" placeholder="+63 9XX XXX XXXX" value={quoteForm.phone} onChange={e=>setQuoteForm({...quoteForm,phone:e.target.value})}/></div>
                  </div>
                  <div style={{marginBottom:14}}><LL>Email Address *</LL><input className="form-input" type="email" placeholder="juan@email.com" value={quoteForm.email} onChange={e=>setQuoteForm({...quoteForm,email:e.target.value})}/></div>
                  <div style={{marginBottom:24}}><LL>Additional Notes (optional)</LL><textarea className="form-input" style={{minHeight:90,resize:"vertical"}} placeholder="Tell us more about your energy needs, roof type, etc." value={quoteForm.message} onChange={e=>setQuoteForm({...quoteForm,message:e.target.value})}/></div>
                  {quoteError&&<EM>{quoteError}</EM>}
                  <div style={{display:"flex",gap:10}}>
                    <button className="outline-dark" style={{padding:"14px 24px",borderRadius:13,flex:"0 0 auto"}} onClick={()=>setQuoteStep(1)}>← Back</button>
                    <button className="cta-btn" style={{flex:1,padding:"14px",fontSize:15,borderRadius:13}} onClick={handleQuoteNext}>Review & Submit →</button>
                  </div>
                </div>
              ):(
                <div>
                  <h3 style={{fontSize:17,fontWeight:800,color:"#1a1a2e",marginBottom:4}}>Review Your Request</h3>
                  <p style={{fontSize:13,color:"rgba(0,0,0,.45)",marginBottom:24}}>Please confirm the details below before submitting.</p>
                  <div style={{background:"rgba(0,0,0,.03)",border:"1px solid rgba(0,0,0,.07)",borderRadius:14,padding:"20px",marginBottom:20}}>
                    {[["Property Type",quoteForm.type],["Monthly Bill",quoteForm.bill],["Location",quoteForm.city||"—"],["Name",quoteForm.name],["Phone",quoteForm.phone],["Email",quoteForm.email]].map(([k,v])=>(
                      <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid rgba(0,0,0,.05)",fontSize:14}}>
                        <span style={{color:"rgba(0,0,0,.4)",fontWeight:600}}>{k}</span>
                        <span style={{color:"#1a1a2e",fontWeight:500}}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{background:`${G}0C`,border:`1px solid ${G}28`,borderRadius:12,padding:"12px 16px",marginBottom:20,fontSize:13,color:"rgba(0,0,0,.5)",lineHeight:1.6}}>
                    ☀️ Our solar consultant will contact you within <strong style={{color:G}}>24 hours</strong> with a custom proposal and to schedule your free site assessment.
                  </div>
                  <div style={{display:"flex",gap:10}}>
                    <button className="outline-dark" style={{padding:"14px 24px",borderRadius:13,flex:"0 0 auto"}} onClick={()=>setQuoteStep(2)}>← Back</button>
                    <button className="submit-btn" style={{flex:1,borderRadius:13}} disabled={quoteSubmitting} onClick={handleQuoteSubmit}>
                      {quoteSubmitting?(
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                          <div style={{width:17,height:17,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>
                          <span>Submitting...</span>
                        </div>
                      ):"Submit Free Quote Request ☀️"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12,marginTop:16}}>
            {[{icon:"📞",label:"PHONE",val:"+63 917 123 4567"},{icon:"📧",label:"EMAIL",val:"hello@suntasticsolar.ph"},{icon:"📍",label:"OFFICE",val:"Quezon City, Metro Manila"},{icon:"🕐",label:"HOURS",val:"Mon–Sat, 8AM–6PM"}].map((c,i)=>(
              <div key={i} className="contact-card">
                <span style={{fontSize:20}}>{c.icon}</span>
                <div>
                  <div style={{fontSize:9,fontWeight:700,color:G,letterSpacing:"1.5px",marginBottom:2}}>{c.label}</div>
                  <div style={{fontSize:13,color:"rgba(0,0,0,.5)",fontWeight:500}}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:"#0A0A0F",padding:"60px 24px 28px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="footer-top" style={{display:"grid",gridTemplateColumns:"1.2fr 2fr",gap:60,marginBottom:48}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
                <img src="/suntastic_logo_png.png" alt="Suntastic" style={{width:50,height:50,objectFit:"contain",borderRadius:11}}/>
                <div>
                  <div style={{fontSize:14,fontWeight:800,color:"#fff"}}>Suntastic Solar Corp</div>
                  <div style={{fontSize:8,color:G,fontWeight:700,letterSpacing:"2px"}}>FROM SUNLIGHT TO SAVINGS</div>
                </div>
              </div>
              <p style={{fontSize:13,color:"rgba(255,255,255,.2)",lineHeight:1.85,marginBottom:22}}>Powering the Philippines,<br/>one rooftop at a time.</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {["Facebook","Instagram","LinkedIn","YouTube"].map(s=><span key={s} className="social-chip">{s}</span>)}
              </div>
            </div>
            <div className="flinks" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:32}}>
              {[
                {head:"Services",links:["Residential Solar","Commercial Solar","Battery Storage","Maintenance & Monitoring"]},
                {head:"Company",links:["About Us","Our Team","Projects","Pricing"]},
                {head:"Support",links:["FAQs","Monitoring Portal","Warranty Claims","Contact Us"]},
              ].map((col,i)=>(
                <div key={i}>
                  <div style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,.18)",letterSpacing:"2px",textTransform:"uppercase",marginBottom:16}}>{col.head}</div>
                  {col.links.map(l=><span key={l} className="footer-link">{l}</span>)}
                </div>
              ))}
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:22,borderTop:"1px solid rgba(255,255,255,.05)",fontSize:11,color:"rgba(255,255,255,.14)",flexWrap:"wrap",gap:8}}>
            <span>© 2026 Suntastic Solar Corp. All rights reserved.</span>
            <span>DOE-Accredited Solar Contractor · Philippines</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Helpers ── */
function SL({children}){return(<div style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:16}}><div style={{width:16,height:2,background:"#00C47A",borderRadius:1}}/><span style={{fontSize:10,fontWeight:700,letterSpacing:"2.5px",textTransform:"uppercase",color:"#00C47A"}}>{children}</span></div>);}
function SLD({children}){return(<div style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:16}}><div style={{width:16,height:2,background:"#00C47A",borderRadius:1}}/><span style={{fontSize:10,fontWeight:700,letterSpacing:"2.5px",textTransform:"uppercase",color:"#00C47A"}}>{children}</span></div>);}
function DC({children,accent}){return(<span style={{background:accent?"#00C47A18":"rgba(255,255,255,.07)",color:accent?"#00C47A":"rgba(255,255,255,.5)",fontSize:10,fontWeight:700,padding:"4px 11px",borderRadius:100,letterSpacing:".5px"}}>{children}</span>);}
function LL({children}){return(<label style={{display:"block",fontSize:10,fontWeight:700,color:"rgba(0,0,0,0.4)",letterSpacing:"1.5px",marginBottom:9}}>{children}</label>);}
function EM({children}){return(<div style={{background:"rgba(220,38,38,.06)",border:"1px solid rgba(220,38,38,.2)",borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:8,marginBottom:14}}><span style={{fontSize:13}}>⚠️</span><span style={{fontSize:12,color:"#dc2626",fontWeight:600}}>{children}</span></div>);}

const TL={fontSize:"clamp(26px,4vw,44px)",fontWeight:900,lineHeight:1.08,letterSpacing:"-1.2px",color:"#1a1a2e",marginBottom:16};
const TD={fontSize:"clamp(26px,4vw,44px)",fontWeight:900,lineHeight:1.08,letterSpacing:"-1.2px",color:"#fff",marginBottom:16};