import React from "react";

// Main landing page entry point
// Wraps all the sections in one component
export default function Landing() {
  return (
    <main>
      <Styles />
      <TopBar />
      <Hero />
      <TrustBar />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </main>
  );
}


// Sticky top navigation with brand + login/signup
function TopBar() {
  return (
    <header className="topbar">
      <div className="container bar">
        <a href="#home" className="brand" aria-label="Civitas home">
          <Logo />
          <span>Civitas</span>
        </a>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="actions">
          <button className="btn ghost" onClick={() => (window.location.href = "/login")}>Log in</button>
          <button className="btn" onClick={() => (window.location.href = "/signup")}>Get started</button>
        </div>
      </div>
    </header>
  );
}

// Hero: big headline + value proposition
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div>
          <h1 className="h1">Smart community management for apartments & gated societies</h1>
          <p className="lead">Collect maintenance on time, resolve complaints faster, manage visitors securely, and keep everyone updated — all in one simple web app.</p>
          <div className="cta-row">
            <button className="btn" onClick={() => (window.location.href = "/signup")}>Start free</button>
            <button className="btn ghost" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>See features</button>
          </div>
          <ul className="stats">
            <li><strong>5×</strong><span>faster collections</span></li>
            <li><strong>0</strong><span>paperwork</span></li>
            <li><strong>24/7</strong><span>self‑service</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}


// Quick benefits (security, payments, complaints, notices)
function TrustBar() {
  return (
    <section className="trust">
      <div className="container trust-grid">
        <Item icon={<ShieldIcon />} title="Gate security" desc="Approve visitors, deliveries & staff with logs." />
        <Item icon={<WalletIcon />} title="Payments" desc="Pay maintenance & track dues seamlessly." />
        <Item icon={<TicketIcon />} title="Complaints" desc="Raise, assign, resolve — with status updates." />
        <Item icon={<MegaphoneIcon />} title="Notices" desc="Broadcast announcements to all residents." />
      </div>
    </section>
  );
}

// Feature cards section
function Features() {
  const list = [
    { icon: <UsersIcon />, title: "Residents & Units", desc: "Maintain accurate resident & flat records." },
    { icon: <WalletIcon />, title: "Maintenance & Dues", desc: "Auto‑generated invoices, reminders & receipts." },
    { icon: <TicketIcon />, title: "Complaints & Tickets", desc: "Category, priority, assignee and timelines." },
    { icon: <ShieldIcon />, title: "Visitors & Staff", desc: "Entry approvals, daily helps & attendance." },
    { icon: <MegaphoneIcon />, title: "Noticeboard", desc: "Pin rules, events, minutes & attachments." },
    { icon: <KeyIcon />, title: "Role‑based Access", desc: "Separate Admin / Resident views securely." },
  ];
  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="h2">Everything your society needs</h2>
        <p className="sub">A modern toolset to run your community smoothly — built for the web.</p>
        <div className="cards">
          {list.map((f) => (
            <div className="card" key={f.title}>
              <div className="icon">{f.icon}</div>
              <h3 className="h3">{f.title}</h3>
              <p className="desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Onboarding steps
function HowItWorks() {
  const steps = [
    { n: 1, t: "Create your society", d: "Sign up, add tower/flat details and invite residents." },
    { n: 2, t: "Enable modules", d: "Switch on payments, complaints, visitors and notices." },
    { n: 3, t: "Go live", d: "Share the web link — start collecting and communicating." },
  ];
  return (
    <section id="how" className="how">
      <div className="container">
        <h2 className="h2">How it works</h2>
        <div className="steps">
          {steps.map(s => (
            <div key={s.n} className="step">
              <div className="badge">{s.n}</div>
              <div>
                <div className="h3">{s.t}</div>
                <div className="desc">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testi">
      <div className="container">
        <h2 className="h2">Loved by communities</h2>
        <div className="testi-grid">
          <Quote text="Collections improved and issues get resolved on time. Residents finally stopped spamming WhatsApp groups." name="Secretary, Skyline Towers" />
          <Quote text="Security logs & approvals gave us peace of mind. The visitor flow is smooth for guards and residents." name="MC Member, Green Acres" />
        </div>
      </div>
    </section>
  );
}


// Footer with links
function Footer() {
  return (
    <footer className="footer">
      <div className="container foot">
        <div className="brand foot-brand"><Logo /><span>Civitas</span></div>
        <div className="foot-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="copy">© {new Date().getFullYear()} Civitas</div>
      </div>
    </footer>
  );
}

/* ========== Small UI Bits ========== */
function Item({ icon, title, desc }) {
  return (
    <div className="trust-item">
      <div className="ti-icon">{icon}</div>
      <div>
        <div className="ti-title">{title}</div>
        <div className="ti-desc">{desc}</div>
      </div>
    </div>
  );
}

function Quote({ text, name }) {
  return (
    <div className="quote">
      <p>“{text}”</p>
      <div className="q-name">{name}</div>
    </div>
  );
}

function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="civitas-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#4f46e5"/>
          <stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#civitas-g)" strokeWidth="2"/>
      <path d="M7 15c2 2 8 2 10-2" stroke="url(#civitas-g)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

/* Icons */
const ShieldIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"/></svg>);
const WalletIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M16 12h2"/></svg>);
const TicketIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 10a2 2 0 012-2h14a2 2 0 012 2v1a2 2 0 010 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1a2 2 0 010-4v-1z"/></svg>);
const MegaphoneIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 11l14-6v14L3 13v-2z"/><path d="M7 14v5a2 2 0 002 2h2"/></svg>);
const UsersIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M16 11a4 4 0 10-8 0 4 4 0 008 0z"/><path d="M6 21v-1a6 6 0 0112 0v1"/></svg>);
const KeyIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="8" cy="15" r="3"/><path d="M11 15h10l-2 2 2 2h-4l-2 2"/></svg>);

/* Styles */
function Styles() {
  return (
    <style>{`
      :root { --indigo:#4f46e5; --cyan:#06b6d4; --ink:#0f172a; --muted:#475569; --line:#e2e8f0; }
      *{box-sizing:border-box}
      html,body,#root{height:100%}
      body{margin:0;font-family:Inter, ui-sans-serif, -apple-system, Segoe UI, Roboto, Arial}
      .container{width:min(1120px,92%);margin:0 auto}

      .topbar{position:sticky;top:0;z-index:40;background:rgba(255,255,255,.8);backdrop-filter:saturate(180%) blur(8px);border-bottom:1px solid var(--line)}
      .bar{display:flex;align-items:center;justify-content:space-between;padding:12px 0}
      .brand{display:flex;align-items:center;gap:8px;text-decoration:none;color:var(--ink);font-weight:700}
      .nav{display:none;gap:18px}
      .nav a{color:#334155;text-decoration:none}
      .nav a:hover{color:#0f172a}
      .actions{display:flex;gap:8px}
      .btn{border:none;border-radius:12px;padding:10px 16px;background:linear-gradient(90deg,var(--indigo),var(--cyan));color:#fff;font-weight:600;cursor:pointer}
      .btn.ghost{background:#fff;border:1px solid var(--line);color:#0f172a}

      .hero{background:linear-gradient(180deg,#fff,#f8fafc)}
      .hero-grid{display:grid;gap:28px;align-items:center;padding:56px 0}
      .h1{font-size:clamp(28px,3.5vw,48px);line-height:1.1;margin:0;font-weight:800;letter-spacing:-.02em;color:var(--ink)}
      .lead{color:var(--muted);margin-top:10px;max-width:56ch}
      .cta-row{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
      .stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;list-style:none;padding:0;margin:18px 0 0;color:#334155;max-width:420px}
      .stats strong{display:block;font-size:20px;color:var(--ink)}

      .trust{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:#fff}
      .trust-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;padding:18px 0}
      .trust-item{display:flex;gap:10px;align-items:flex-start}
      .ti-icon{width:36px;height:36px;display:grid;place-items:center;border-radius:10px;background:linear-gradient(135deg,rgba(79,70,229,.12),rgba(6,182,212,.12));color:#0f172a}
      .ti-title{font-weight:700}
      .ti-desc{color:#475569;font-size:14px}

      .features{padding:56px 0}
      .h2{font-size:clamp(22px,2.2vw,32px);font-weight:800;letter-spacing:-.01em;margin:0}
      .sub{color:#475569;margin-top:6px}
      .cards{display:grid;grid-template-columns:repeat(1,1fr);gap:14px;margin-top:20px}
      .card{border:1px solid var(--line);border-radius:16px;padding:16px;background:#fff;transition:transform .15s ease, box-shadow .15s ease}
      .card:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(2,6,23,.06)}
      .icon{width:42px;height:42px;display:grid;place-items:center;border-radius:12px;background:linear-gradient(135deg,rgba(79,70,229,.12),rgba(6,182,212,.12));color:#0f172a}
      .h3{font-weight:700;margin:10px 0 4px}
      .desc{color:#475569}

      .how{background:linear-gradient(180deg,#f8fafc,#ffffff);padding:48px 0;border-top:1px solid var(--line)}
      .steps{display:grid;gap:12px;margin-top:14px}
      .step{display:flex;gap:12px;align-items:flex-start;border:1px solid var(--line);border-radius:14px;padding:12px;background:#fff}
      .badge{width:32px;height:32px;border-radius:999px;display:grid;place-items:center;background:linear-gradient(90deg,var(--indigo),var(--cyan));color:#fff;font-weight:700}

      .testi{padding:48px 0}
      .testi-grid{display:grid;gap:12px;margin-top:16px}
      .quote{border:1px solid var(--line);border-radius:14px;padding:16px;background:#fff}
      .q-name{margin-top:8px;color:#334155;font-size:14px}

      .footer{border-top:1px solid var(--line);background:#fff}
      .foot{display:grid;gap:10px;align-items:center;padding:18px 0}
      .foot-brand{display:flex;align-items:center;gap:8px;font-weight:700;color:var(--ink)}
      .foot-links{display:flex;gap:16px}
      .foot-links a{color:#334155;text-decoration:none}
      .foot-links a:hover{color:#0f172a}
      .copy{color:#64748b;font-size:14px}

      @media (min-width: 768px){
        .nav{display:flex}
        .trust-grid{grid-template-columns:repeat(4,1fr)}
        .cards{grid-template-columns:repeat(3,1fr)}
        .steps{grid-template-columns:repeat(3,1fr)}
        .testi-grid{grid-template-columns:repeat(2,1fr)}
        .foot{grid-template-columns:1fr auto auto}
      }
    `}</style>
  );
}