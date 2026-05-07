// demo-ready build: simulated features clearly labelled, wallet/ELM/network marked as demo, feedback path included.
// 50-upgrade go-live enhancement pack: probability meter, launch proof, share prompts, quick actions, trust panels.
// live-ready public beta build: clear status, feedback loop, FAQ, community cues, beta disclaimer.
// 100-polish launch pack: premium UX, onboarding, market pulse, trust layer, terminal output, sharing polish.
import React, { useEffect, useMemo, useState } from "react";

const UI = {
  appName: "ElementOS — ARM Simulation Network",
  headline: "Simulate Element Interactions. Discover Legendary Alignments.",
  sub: "Pick two elements → run simulation → hunt ZDAR.",
  launch: "🚀 Run Simulation",
};


const PARTICLES = Array.from({ length: 48 }, (_, i) => ({
  id: i,
  left: (i * 37) % 100,
  top: (i * 61) % 100,
  size: 2 + (i % 4),
  delay: (i % 12) * 0.35,
  duration: 7 + (i % 9),
  tone: i % 3 === 0 ? "bg-fuchsia-300" : i % 3 === 1 ? "bg-cyan-300" : "bg-blue-300",
}));


const MARKET_STATS = [
  ["Demo ELM Price", "$0.284", "+12.4%"],
  ["24h Volume", "$2.1M", "mock"],
  ["Sim Runs", "2.4M", "network"],
  ["ZDAR Events", "12,904", "demo global"],
];

const FEATURE_PILLS = [
  "SimulationFi", "ARM Engine", "ELM Gas", "ZDAR Rarity",
  "118 Elements", "Simulated Demo Network", "Mobile Ready", "Shareable Results"
];

const LAUNCH_CHECKLIST = ["Pick two elements", "Run simulation", "Trigger ZDAR", "Share the result"];

const PROOF_POINTS = [
  "Live deployed MVP",
  "Responsive desktop + mobile UI",
  "Crypto-native wallet flow",
  "Cinematic ZDAR mechanic"
];


const TRENDING_PAIRS = [
  ["Fe / Ru", "ZDAR Legendary", "98%"],
  ["Ti / W", "Epic", "91%"],
  ["Al / Pt", "Rare", "87%"],
  ["Si / C", "Prime Lattice", "84%"],
];

const COMING_SOON = [
  "Structure Marketplace",
  "Ranked Discoveries",
  "ELM Staking Seasons",
  "Global ARM Index",
  "Creator Simulation Cards",
  "Public ZDAR Challenges",
];

const ARM_AI_LINES = [
  "Pair stability is trending upward.",
  "Orbital distance suggests a possible rarity spike.",
  "ARM field lock is stable.",
  "ZDAR probability rises when angular delta compresses.",
  "This pair is suitable for a shareable simulation card.",
];



const LAUNCH_STATUS = [
  ["Public Demo", "Live"],
  ["Network", "Online"],
  ["Build", "Launch Ready"],
  ["Access", "Open"],
];

const COMMUNITY_LINKS = [
  ["X / Twitter", "Share ZDAR clips"],
  ["Discord", "Community coming soon"],
  ["Product Hunt", "Launch candidate"],
  ["GitHub", "Public build ready"],
];

const FAQS = [
  ["What is ElementOS?", "A crypto-native element simulation experience built around ARM, ELM gas, and ZDAR rarity events."],
  ["Is this real blockchain?", "This public beta uses a testnet-style mock wallet while the core product loop is validated."],
  ["What is ZDAR?", "ZDAR is the rare Legendary Alignment event users hunt for inside the simulation."],
  ["What should users do first?", "Connect the demo wallet, run a simulation, then try Find Legendary Alignment."],
];



const PRESS_LINES = [
  "A new way to explore element interactions.",
  "SimulationFi meets collectible discovery.",
  "Built around rare ZDAR alignment events.",
];

const USER_QUOTES = [
  ["Beta User", "The ZDAR moment is instantly shareable."],
  ["Crypto Builder", "Feels like DeFi, gaming, and science merged."],
  ["Early Tester", "I understood the loop in under 10 seconds."],
];

const PLATFORM_MODES = [
  ["Discover", "Random pair hunting"],
  ["Rank", "Top alignment scoring"],
  ["Collect", "Result card output"],
  ["Share", "Social-ready clips"],
];

const LAUNCH_METRICS = [
  ["Time to First Run", "<10s"],
  ["Core Loop", "4 steps"],
  ["Mobile Ready", "Yes"],
  ["Backend Required", "No"],
];

const SAFETY_NOTES = [
  "Prototype/demo wallet only",
  "No real token transfer",
  "Experimental scoring model",
  "Public beta feedback welcomed",
];



const DEMO_TRUTH_TABLE = [
  ["Real Today", "Live website, responsive UI, interactive simulations, shareable result cards"],
  ["Simulated Today", "Demo Wallet, ELM gas, activity feed, market stats, ARM Assistant output"],
  ["Not Live Yet", "Real blockchain, user accounts, database persistence, token trading"],
  ["Next Step", "Tester feedback, analytics, saved runs, real authentication"],
];

const DEMO_STEPS = [
  ["1", "Connect Demo Demo Wallet", "Starts the testnet-style experience. No real wallet or transaction occurs."],
  ["2", "Run Simulation", "Spend demo ELM/credits and generate a result card."],
  ["3", "Hunt ZDAR", "Trigger the rare Legendary Alignment moment."],
  ["4", "Share Result", "Copy or share a demo result card for feedback."],
];

const DEMO_LIMITATIONS = [
  "No real crypto transactions.",
  "No user login or saved cloud accounts yet.",
  "Network activity and ELM price are simulated.",
  "Scoring model is experimental and for product demonstration.",
  "Demo Wallet is a mock testnet-style interaction.",
];

const WHAT_FEEDBACK = [
  "Did the site make sense in 10 seconds?",
  "Was the ZDAR moment exciting?",
  "Would you share a result card?",
  "Where did the demo feel confusing?",
  "What feature would make you return?",
];


const RAW_ELEMENTS = [
  "1|H|Hydrogen|20|Nonmetal","2|He|Helium|90|Noble Gas","3|Li|Lithium|20|Alkali Metal","4|Be|Beryllium|35|Alkaline Earth Metal","5|B|Boron|10|Metalloid","6|C|Carbon|45|Nonmetal","7|N|Nitrogen|60|Nonmetal","8|O|Oxygen|70|Nonmetal","9|F|Fluorine|80|Halogen","10|Ne|Neon|90|Noble Gas",
  "11|Na|Sodium|20|Alkali Metal","12|Mg|Magnesium|35|Alkaline Earth Metal","13|Al|Aluminium|0|Post-Transition Metal","14|Si|Silicon|50|Metalloid","15|P|Phosphorus|62|Nonmetal","16|S|Sulfur|72|Nonmetal","17|Cl|Chlorine|82|Halogen","18|Ar|Argon|90|Noble Gas",
  "19|K|Potassium|22|Alkali Metal","20|Ca|Calcium|36|Alkaline Earth Metal","21|Sc|Scandium|76|Transition Metal","22|Ti|Titanium|78|Transition Metal","23|V|Vanadium|80|Transition Metal","24|Cr|Chromium|83|Transition Metal","25|Mn|Manganese|86|Transition Metal","26|Fe|Iron|88|Transition Metal","27|Co|Cobalt|90|Transition Metal","28|Ni|Nickel|92|Transition Metal","29|Cu|Copper|80|Transition Metal","30|Zn|Zinc|75|Transition Metal",
  "31|Ga|Gallium|8|Post-Transition Metal","32|Ge|Germanium|52|Metalloid","33|As|Arsenic|64|Metalloid","34|Se|Selenium|74|Nonmetal","35|Br|Bromine|84|Halogen","36|Kr|Krypton|90|Noble Gas",
  "37|Rb|Rubidium|24|Alkali Metal","38|Sr|Strontium|38|Alkaline Earth Metal","39|Y|Yttrium|77|Transition Metal","40|Zr|Zirconium|79|Transition Metal","41|Nb|Niobium|82|Transition Metal","42|Mo|Molybdenum|84|Transition Metal","43|Tc|Technetium|86|Transition Metal","44|Ru|Ruthenium|88|Transition Metal","45|Rh|Rhodium|90|Transition Metal","46|Pd|Palladium|92|Transition Metal","47|Ag|Silver|78|Transition Metal","48|Cd|Cadmium|73|Transition Metal",
  "49|In|Indium|6|Post-Transition Metal","50|Sn|Tin|54|Post-Transition Metal","51|Sb|Antimony|66|Metalloid","52|Te|Tellurium|76|Metalloid","53|I|Iodine|86|Halogen","54|Xe|Xenon|90|Noble Gas",
  "55|Cs|Cesium|26|Alkali Metal","56|Ba|Barium|40|Alkaline Earth Metal","57|La|Lanthanum|72|Lanthanide","58|Ce|Cerium|73|Lanthanide","59|Pr|Praseodymium|74|Lanthanide","60|Nd|Neodymium|75|Lanthanide","61|Pm|Promethium|76|Lanthanide","62|Sm|Samarium|77|Lanthanide","63|Eu|Europium|78|Lanthanide","64|Gd|Gadolinium|79|Lanthanide","65|Tb|Terbium|80|Lanthanide","66|Dy|Dysprosium|81|Lanthanide","67|Ho|Holmium|82|Lanthanide","68|Er|Erbium|83|Lanthanide","69|Tm|Thulium|84|Lanthanide","70|Yb|Ytterbium|85|Lanthanide","71|Lu|Lutetium|86|Lanthanide",
  "72|Hf|Hafnium|79|Transition Metal","73|Ta|Tantalum|82|Transition Metal","74|W|Tungsten|85|Transition Metal","75|Re|Rhenium|87|Transition Metal","76|Os|Osmium|89|Transition Metal","77|Ir|Iridium|91|Transition Metal","78|Pt|Platinum|93|Transition Metal","79|Au|Gold|22|Transition Metal","80|Hg|Mercury|68|Transition Metal","81|Tl|Thallium|7|Post-Transition Metal","82|Pb|Lead|56|Post-Transition Metal","83|Bi|Bismuth|68|Post-Transition Metal","84|Po|Polonium|78|Post-Transition Metal","85|At|Astatine|88|Halogen","86|Rn|Radon|90|Noble Gas",
  "87|Fr|Francium|28|Alkali Metal","88|Ra|Radium|42|Alkaline Earth Metal","89|Ac|Actinium|70|Actinide","90|Th|Thorium|71|Actinide","91|Pa|Protactinium|72|Actinide","92|U|Uranium|73|Actinide","93|Np|Neptunium|74|Actinide","94|Pu|Plutonium|75|Actinide","95|Am|Americium|76|Actinide","96|Cm|Curium|77|Actinide","97|Bk|Berkelium|78|Actinide","98|Cf|Californium|79|Actinide","99|Es|Einsteinium|80|Actinide","100|Fm|Fermium|81|Actinide","101|Md|Mendelevium|82|Actinide","102|No|Nobelium|83|Actinide","103|Lr|Lawrencium|84|Actinide",
  "104|Rf|Rutherfordium|80|Transition Metal","105|Db|Dubnium|83|Transition Metal","106|Sg|Seaborgium|86|Transition Metal","107|Bh|Bohrium|88|Transition Metal","108|Hs|Hassium|90|Transition Metal","109|Mt|Meitnerium|92|Transition Metal","110|Ds|Darmstadtium|94|Transition Metal","111|Rg|Roentgenium|76|Transition Metal","112|Cn|Copernicium|66|Transition Metal","113|Nh|Nihonium|9|Post-Transition Metal","114|Fl|Flerovium|58|Post-Transition Metal","115|Mc|Moscovium|70|Post-Transition Metal","116|Lv|Livermorium|80|Post-Transition Metal","117|Ts|Tennessine|90|Halogen","118|Og|Oganesson|90|Noble Gas"
];

const ELEMENTS = RAW_ELEMENTS.map((row) => {
  const [num, sym, name, theta, family] = row.split("|");
  return [Number(num), sym, name, Number(theta), family];
});


const LIVE_EVENT_TEMPLATES = [
  "⚡ User_442 discovered Fe / Ru — ZDAR Legendary",
  "🔵 User_128 ran Ti / W — Epic 91%",
  "🟣 User_905 saved Al / Pt to watchlist",
  "⚡ User_317 triggered ZDAR with Co / Rh",
  "💠 User_611 minted Si / C structure card",
  "🔥 User_084 joined the ARM Simulation Network",
  "🧪 User_720 ran Au / Al — Rare alignment",
  "⚡ User_993 discovered Ru / Fe — ZDAR Legendary",
];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function buildElement(row, settings) {
  const [num, sym, name, thetaBase, family] = row;
  let theta = thetaBase + settings.calibration;
  if (settings.origin === sym) theta = 0;
  theta = clamp(theta, 0, 180);

  const rad = (theta * Math.PI) / 180;
  const nor = Math.round(900 * Math.sin(rad) ** 2);
  const sor = Math.abs(theta - 90);

  return {
    num, sym, name, family, theta, nor, sor,
    cluster: sor < 5 ? "Prime" : sor < 25 ? "Near" : sor < 55 ? "Shift" : "Extreme",
    influence: Math.round(clamp(100 - sor, 0, 100)),
  };
}

function simulate(elements, pair, settings) {
  const selected = pair.map((p) => elements.find((e) => e.sym === p)).filter(Boolean);
  const safe = selected.length ? selected : [elements[0]];
  const avgNor = safe.reduce((sum, e) => sum + e.nor, 0) / safe.length;
  const angles = safe.map((e) => e.theta);
  const delta = angles.length > 1 ? Math.max(...angles) - Math.min(...angles) : 0;
  const zdar = delta <= settings.zdarThreshold;
  const stability = clamp(Math.round(avgNor / 10 - delta * 0.15 + 6 + (zdar ? 15 : 0)), 0, 100);
  const cost = Math.max(3, Math.round(5 + delta / 6 + (zdar ? 3 : 0)));

  return {
    stability,
    zdar,
    delta: Math.round(delta * 10) / 10,
    cost,
    structure: stability > 82 ? "Cubic Prime Lattice" : stability > 62 ? "Hex Structured Field" : stability > 38 ? "Reactive Distortion Grid" : "Chaotic Field",
    rarity: zdar ? "⚡ ZDAR — Legendary Alignment" : stability > 84 ? "🟣 Epic" : stability > 68 ? "🔵 Rare" : stability > 42 ? "🟡 Experimental" : "⚪ Volatile",
    strength: Math.round((stability + clamp(100 - delta, 0, 100)) / 2),
    confidence: clamp(Math.round(76 + stability * 0.19 - delta * 0.08), 48, 99),
  };
}


function ParticleField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full ${p.tone} opacity-40 blur-[1px] shadow-[0_0_18px_currentColor]`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}


function ShineLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <div className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40 transition-all duration-700 group-hover:left-full" />
    </div>
  );
}

function StatusPill({ children, tone = "cyan" }) {
  const tones = {
    cyan: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
    fuchsia: "border-fuchsia-300/30 bg-fuchsia-300/10 text-fuchsia-100",
    emerald: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
    yellow: "border-yellow-300/30 bg-yellow-300/10 text-yellow-100",
  };
  return (
    <span className={`rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] ${tones[tone] || tones.cyan}`}>
      {children}
    </span>
  );
}

function RarityBadge({ result }) {
  const cls = result.zdar
    ? "border-fuchsia-300/50 bg-fuchsia-400/20 text-fuchsia-100 shadow-[0_0_30px_rgba(217,70,239,.25)]"
    : result.stability > 84
      ? "border-purple-300/40 bg-purple-400/15 text-purple-100"
      : result.stability > 68
        ? "border-cyan-300/40 bg-cyan-400/15 text-cyan-100"
        : result.stability > 42
          ? "border-yellow-300/40 bg-yellow-400/15 text-yellow-100"
          : "border-slate-300/30 bg-slate-400/10 text-slate-200";
  return <div className={`inline-flex rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em] ${cls}`}>{result.rarity}</div>;
}

function TopNav({ onLaunch, showApp, walletConnected }) {
  return (
    <nav className="sticky top-2 z-50 mx-auto mb-4 flex max-w-7xl items-center justify-between gap-3 rounded-3xl border border-white/10 bg-slate-950/70 px-3 py-3 sm:top-4 sm:mb-5 sm:px-5 shadow-[0_20px_80px_rgba(0,0,0,.35)] backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 font-black text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,.25)]">E</div>
        <div>
          <div className="flex items-center gap-2 text-sm font-black tracking-tight"><span className="h-2 w-2 rounded-full bg-emerald-300 signal-blink shadow-[0_0_12px_rgba(110,231,183,.9)]" />ElementOS</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">ARM Network</div>
        </div>
      </div>
      <div className="hidden items-center gap-2 md:flex">
        <StatusPill tone="emerald">Simulated Demo Network</StatusPill>
        <StatusPill tone="cyan">118 Elements</StatusPill>
        <StatusPill tone="fuchsia">ZDAR Enabled</StatusPill>
        <StatusPill tone={walletConnected ? "emerald" : "yellow"}>{walletConnected ? "Demo Demo Wallet" : "Testnet"}</StatusPill>
      </div>
      {!showApp && (
        <button onClick={onLaunch} className="rounded-2xl bg-cyan-300 px-4 py-2 text-sm font-black text-slate-950 shadow-[0_0_30px_rgba(34,211,238,.35)] transition hover:scale-[1.03]">
          Enter App
        </button>
      )}
    </nav>
  );
}

function CTAFooter({ onFindZDAR, onRun, walletConnected }) {
  return (
    <section className="mt-5 rounded-[2.5rem] border border-fuchsia-300/20 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-blue-500/10 p-8 text-center shadow-[0_0_90px_rgba(217,70,239,.16)]">
      <div className="text-xs font-black uppercase tracking-[0.38em] text-fuchsia-200">Ready for a legendary alignment?</div>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-6xl">Discover your first ZDAR.</h2>
      <p className="mx-auto mt-3 max-w-2xl text-slate-300">Pick a pair, run the simulation, and generate a shareable alignment result from the ARM network.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button onClick={onFindZDAR} className="rounded-2xl border border-fuchsia-300/40 bg-fuchsia-500/15 px-6 py-4 font-black text-fuchsia-100 shadow-[0_0_35px_rgba(217,70,239,.2)] transition hover:scale-[1.03]">⚡ Find ZDAR</button>
        <button disabled={!walletConnected} onClick={onRun} className="rounded-2xl bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-[0_0_35px_rgba(34,211,238,.35)] transition hover:scale-[1.03] disabled:opacity-50">🚀 Run Simulation</button>
      </div>
    </section>
  );
}



function AnimatedGlowDivider() {
  return <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent shadow-[0_0_30px_rgba(34,211,238,.25)]" />;
}

function OnboardingStrip() {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-4">
      {LAUNCH_CHECKLIST.map((item, index) => (
        <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
          <div className="text-[10px] font-black uppercase tracking-[0.26em] text-cyan-300">Step {index + 1}</div>
          <div className="mt-1 text-sm font-bold text-white">{item}</div>
        </div>
      ))}
    </div>
  );
}

function MarketPanel() {
  return (
    <Card title="Demo ELM Market Pulse" kicker="simulated ecosystem signal">
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {MARKET_STATS.map(([label, value, sub]) => <Metric key={label} label={label} value={value} sub={sub} />)}
      </div>
    </Card>
  );
}

function TrustPanel() {
  return (
    <Card title="Why ElementOS Feels Different" kicker="launch-ready positioning">
      <div className="mt-4 grid gap-3">
        {PROOF_POINTS.map((point) => (
          <div key={point} className="rounded-2xl border border-white/10 bg-slate-950/45 p-3 text-sm text-slate-200">
            <span className="mr-2 text-emerald-300">✓</span>{point}
          </div>
        ))}
      </div>
    </Card>
  );
}

function LaunchBanner({ onFindZDAR }) {
  return (
    <div className="mt-5 rounded-[2rem] border border-cyan-300/20 bg-cyan-500/10 p-4 shadow-[0_0_60px_rgba(34,211,238,.12)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.34em] text-cyan-200">Public Launch Mode</div>
          <div className="mt-1 text-lg font-black text-white">ElementOS is live. Your first viral moment is one ZDAR away.</div>
        </div>
        <button onClick={onFindZDAR} className="rounded-2xl border border-fuchsia-300/40 bg-fuchsia-500/20 px-5 py-3 font-black text-fuchsia-100 shadow-[0_0_35px_rgba(217,70,239,.22)] transition hover:scale-[1.03]">
          ⚡ Prime ZDAR
        </button>
      </div>
    </div>
  );
}

function FeatureRibbon() {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {FEATURE_PILLS.map((pill, index) => (
        <span key={pill} className={`rounded-full border px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] ${
          index % 4 === 0 ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100" :
          index % 4 === 1 ? "border-fuchsia-300/30 bg-fuchsia-300/10 text-fuchsia-100" :
          index % 4 === 2 ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100" :
          "border-yellow-300/30 bg-yellow-300/10 text-yellow-100"
        }`}>{pill}</span>
      ))}
    </div>
  );
}

function MiniTerminal({ pair, result }) {
  return (
    <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-black/50 p-4 font-mono text-xs text-emerald-100 shadow-[0_0_35px_rgba(16,185,129,.12)]">
      <div>&gt; arm.scan --pair {pair.join("/")}</div>
      <div>&gt; stability: {result.stability}%</div>
      <div>&gt; rarity: {result.rarity}</div>
      <div>&gt; gas: {result.cost} ELM</div>
    </div>
  );
}


function NetworkStatsPanel({ history, feed, result }) {
  const simsToday = 18420 + history.length * 17;
  const online = 128 + feed.length * 3;
  const zdarGlobal = 12904 + feed.length;
  const streak = result.zdar ? 7 : 3;

  return (
    <section className="mt-5 grid gap-3 md:grid-cols-4">
      <Metric label="Demo Users Online" value={online.toLocaleString()} sub="simulated network" />
      <Metric label="Demo Simulations Today" value={simsToday.toLocaleString()} sub="simulated activity" />
      <Metric label="Demo ZDAR Events" value={zdarGlobal.toLocaleString()} sub="legendary hits" />
      <Metric label="ZDAR Streak" value={`${streak}x`} sub="active challenge" />
    </section>
  );
}

function CollectibleResultCard({ pair, result, shareText, onShare }) {
  const id = `ZDAR-${Math.abs(pair.join("").split("").reduce((a, c) => a + c.charCodeAt(0), 0) * 137 + result.stability * 11)}`;
  return (
    <Card title="Collectible Result Card" kicker="share-ready output">
      <div className={`relative mt-4 overflow-hidden rounded-[2rem] border p-5 ${
        result.zdar
          ? "border-fuchsia-300/50 bg-fuchsia-500/15 shadow-[0_0_70px_rgba(217,70,239,.32)]"
          : "border-cyan-300/25 bg-cyan-500/10"
      }`}>
        <DemoWatermark />
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.34em] text-slate-300">Simulation Card</div>
            <div className="mt-2 text-3xl font-black text-white">{pair.join(" / ")}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2 text-right font-mono text-xs text-cyan-100">
            {id}
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Metric label="Stability" value={`${result.stability}%`} />
          <Metric label="Rarity" value={result.zdar ? "ZDAR" : result.rarity.split(" ")[0]} />
          <Metric label="Structure" value={result.structure.split(" ")[0]} />
        </div>
        <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200">
          {result.zdar
            ? "Legendary alignment detected. This card is optimized for screenshots and social sharing."
            : "Run more simulations or hunt ZDAR to generate a legendary share card."}
        </div>
        <button onClick={onShare} className="mt-4 w-full rounded-2xl bg-cyan-300 p-4 font-black text-slate-950 shadow-[0_0_40px_rgba(34,211,238,.35)] transition hover:scale-[1.02]">
          📤 Generate Share Text
        </button>
        {shareText && <div className="mt-3 rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-3 text-xs text-cyan-100">{shareText}</div>}
      </div>
    </Card>
  );
}

function ARMAIPanel({ pair, result }) {
  const advice = result.zdar
    ? "ARM AI: ZDAR lock confirmed. This is a prime share event."
    : result.stability > 75
      ? "ARM AI: Strong candidate. Run again or compare against nearby transition metals."
      : "ARM AI: Stability is forming. Try Discover or Find Legendary Alignment.";

  return (
    <Card title="ARM Assistant Demo" kicker="simulated assistant">
      <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4 text-emerald-100 shadow-[0_0_35px_rgba(16,185,129,.12)]">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200">Demo Interpretation</div>
        <div className="mt-2 text-lg font-black">{advice}</div>
        <div className="mt-3 text-sm text-emerald-100/75">
          {pair.join(" / ")} currently resolves at {result.stability}% stability with {result.delta}° angular delta.
        </div>
      </div>
      <div className="mt-4 grid gap-2">
        {ARM_AI_LINES.slice(0, 4).map((line) => (
          <div key={line} className="rounded-xl border border-white/10 bg-slate-950/45 p-3 text-sm text-slate-300">
            <span className="mr-2 text-cyan-300">›</span>{line}
          </div>
        ))}
      </div>
    </Card>
  );
}

function TrendingPairsPanel({ onSelect }) {
  return (
    <Card title="Trending Pairs" kicker="network discovery map">
      <div className="mt-4 grid gap-3">
        {TRENDING_PAIRS.map(([pair, rarity, score]) => {
          const [a, b] = pair.split(" / ");
          return (
            <button key={pair} onClick={() => onSelect(a, b)} className="rounded-2xl border border-white/10 bg-slate-950/45 p-3 text-left transition hover:border-cyan-300/30 hover:bg-white/10">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-black text-white">{pair}</div>
                  <div className="text-xs text-slate-400">{rarity}</div>
                </div>
                <div className="text-xl font-black text-cyan-200">{score}</div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function ComingSoonPanel() {
  return (
    <Card title="Coming Soon" kicker="ecosystem roadmap">
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {COMING_SOON.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm font-bold text-slate-200">
            <span className="mr-2 text-fuchsia-300">✦</span>{item}
          </div>
        ))}
      </div>
    </Card>
  );
}

function ScreenshotFrame({ pair, result }) {
  return (
    <Card title="Screenshot Frame" kicker="social-ready preview">
      <div className="mt-4 rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-slate-950 via-cyan-950/30 to-fuchsia-950/30 p-5 shadow-[0_0_70px_rgba(34,211,238,.16)]">
        <div className="flex items-center justify-between">
          <div className="text-xs font-black uppercase tracking-[0.3em] text-cyan-200">ElementOS</div>
          <div className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100">Live</div>
        </div>
        <div className="mt-8 text-center">
          <div className="text-5xl font-black text-white">{pair.join(" / ")}</div>
          <div className="mt-3 text-xl font-black text-fuchsia-200">{result.rarity}</div>
          <div className="mt-2 text-4xl font-black text-cyan-200">{result.stability}%</div>
          <div className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">stability score</div>
        </div>
        <div className="mt-8 h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300" style={{ width: `${result.stability}%` }} />
        </div>
      </div>
    </Card>
  );
}



function LaunchStatusBar() {
  return (
    <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {LAUNCH_STATUS.map(([label, value]) => (
        <div key={label} className="rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4 shadow-[0_0_35px_rgba(16,185,129,.1)]">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200">{label}</div>
          <div className="mt-1 text-2xl font-black text-white">{value}</div>
        </div>
      ))}
    </section>
  );
}

function PublicBetaNotice() {
  return (
    <div className="mt-5 rounded-[2rem] border border-yellow-300/25 bg-yellow-400/10 p-4 text-yellow-50 shadow-[0_0_45px_rgba(250,204,21,.1)]">
      <div className="text-[10px] font-black uppercase tracking-[0.32em] text-yellow-200">Public Demo Notice</div>
      <p className="mt-2 text-sm text-yellow-50/85">
        ElementOS is live as an experimental SimulationFi MVP. Demo Wallet, ELM gas, market stats, and activity signals are prototype/testnet mechanics while the product loop is validated.
      </p>
    </div>
  );
}

function FeedbackPanel() {
  return (
    <Card title="Public Demo Feedback" kicker="help shape ElementOS">
      <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-500/10 p-4">
        <div className="text-lg font-black text-white">What should users tell us?</div>
        <div className="mt-3 grid gap-2 text-sm text-slate-300">
          <div>• Did you understand the product in 10 seconds?</div>
          <div>• Did ZDAR feel exciting?</div>
          <div>• Would you share a result card?</div>
          <div>• What confused you?</div>
        </div>
      </div>
      <button
        onClick={() => window.location.href = "mailto:hello@elementos.app?subject=ElementOS%20Beta%20Feedback"}
        className="mt-4 w-full rounded-2xl bg-cyan-300 p-4 font-black text-slate-950 shadow-[0_0_35px_rgba(34,211,238,.3)] transition hover:scale-[1.02]"
      >
        Send Beta Feedback
      </button>
    </Card>
  );
}

function CommunityPanel() {
  return (
    <Card title="Community Launch Channels" kicker="public growth layer">
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {COMMUNITY_LINKS.map(([name, detail]) => (
          <div key={name} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
            <div className="font-black text-white">{name}</div>
            <div className="mt-1 text-xs text-slate-400">{detail}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function FAQPanel() {
  return (
    <Card title="New User FAQ" kicker="reduce launch confusion">
      <div className="mt-4 grid gap-3">
        {FAQS.map(([q, a]) => (
          <details key={q} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
            <summary className="cursor-pointer font-black text-white">{q}</summary>
            <p className="mt-2 text-sm leading-6 text-slate-300">{a}</p>
          </details>
        ))}
      </div>
    </Card>
  );
}

function LiveLaunchFooter({ onFindZDAR, onRun, walletConnected }) {
  return (
    <footer className="mt-5 rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-6 text-center shadow-[0_0_80px_rgba(0,0,0,.25)]">
      <div className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-300">ElementOS Public Demo</div>
      <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Run a simulation. Hunt ZDAR. Share the result. Go live.</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
        Public demo build for validating the ElementOS SimulationFi loop before accounts, backend persistence, and real token integrations.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <button onClick={onFindZDAR} className="rounded-2xl border border-fuchsia-300/40 bg-fuchsia-500/20 px-5 py-3 font-black text-fuchsia-100 shadow-[0_0_35px_rgba(217,70,239,.22)] transition hover:scale-[1.03]">⚡ Find ZDAR</button>
        <button disabled={!walletConnected} onClick={onRun} className="rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950 shadow-[0_0_35px_rgba(34,211,238,.35)] transition hover:scale-[1.03] disabled:opacity-50">🚀 Run Simulation</button>
      </div>
      <div className="mt-5 text-xs text-slate-500">
        ElementOS Public Demo — experimental MVP. No real transactions, no real wallet connection, no investment offer, and no scientific validation.
      </div>
    </footer>
  );
}



function PressStrip() {
  return (
    <div className="mt-5 grid gap-3 md:grid-cols-3">
      {PRESS_LINES.map((line) => (
        <div key={line} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm font-bold text-slate-200 shadow-[0_0_35px_rgba(34,211,238,.07)]">
          <span className="mr-2 text-cyan-300">✦</span>{line}
        </div>
      ))}
    </div>
  );
}

function UserQuotePanel() {
  return (
    <Card title="Early Beta Reactions" kicker="social proof mockup">
      <div className="mt-4 grid gap-3">
        {USER_QUOTES.map(([name, quote]) => (
          <div key={quote} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
            <div className="text-sm text-slate-200">“{quote}”</div>
            <div className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-300">{name}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function QuickActionsPanel({ onRun, onFindZDAR, onShare, walletConnected }) {
  return (
    <Card title="Quick Actions" kicker="launch control">
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button disabled={!walletConnected} onClick={onRun} className="rounded-2xl bg-cyan-300 p-4 font-black text-slate-950 shadow-[0_0_35px_rgba(34,211,238,.32)] transition hover:scale-[1.02] disabled:opacity-50">🚀 Run</button>
        <button onClick={onFindZDAR} className="rounded-2xl border border-fuchsia-300/40 bg-fuchsia-500/20 p-4 font-black text-fuchsia-100 shadow-[0_0_35px_rgba(217,70,239,.18)] transition hover:scale-[1.02]">⚡ ZDAR</button>
        <button onClick={onShare} className="rounded-2xl border border-white/10 bg-white/10 p-4 font-black text-white transition hover:bg-white/15">📤 Share</button>
        <button onClick={onFindZDAR} className="rounded-2xl border border-emerald-300/30 bg-emerald-500/10 p-4 font-black text-emerald-100 transition hover:bg-emerald-500/15">🎲 Hunt</button>
      </div>
    </Card>
  );
}

function PlatformModesPanel() {
  return (
    <Card title="Platform Modes" kicker="what users can do">
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {PLATFORM_MODES.map(([mode, desc]) => (
          <div key={mode} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
            <div className="text-xl font-black text-white">{mode}</div>
            <div className="mt-1 text-xs text-slate-400">{desc}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function LaunchMetricsPanel() {
  return (
    <Card title="Launch Readiness" kicker="public beta metrics">
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {LAUNCH_METRICS.map(([label, value]) => (
          <Metric key={label} label={label} value={value} />
        ))}
      </div>
    </Card>
  );
}

function SafetyNotesPanel() {
  return (
    <Card title="Beta Transparency" kicker="trust layer">
      <div className="mt-4 grid gap-2">
        {SAFETY_NOTES.map((note) => (
          <div key={note} className="rounded-xl border border-yellow-300/15 bg-yellow-400/5 p-3 text-sm text-yellow-50/85">
            <span className="mr-2 text-yellow-300">•</span>{note}
          </div>
        ))}
      </div>
    </Card>
  );
}

function ZDARProbabilityPanel({ result }) {
  const probability = result.zdar ? 97 : Math.max(8, Math.min(88, Math.round(result.stability - result.delta / 2)));
  return (
    <Card title="ZDAR Probability" kicker="anticipation meter">
      <div className="mt-4">
        <div className="flex items-end justify-between">
          <div className="text-5xl font-black text-fuchsia-200">{probability}%</div>
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">{result.zdar ? "locked" : "scanning"}</div>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-yellow-300 transition-all duration-700" style={{ width: `${probability}%` }} />
        </div>
        <p className="mt-3 text-sm text-slate-300">Higher probability creates a stronger reason to run, hunt, and share.</p>
      </div>
    </Card>
  );
}

function SharePromptPanel({ result, onShare }) {
  return (
    <Card title="Share Moment" kicker="viral prompt">
      <div className="mt-4 rounded-2xl border border-fuchsia-300/25 bg-fuchsia-500/10 p-4">
        <div className="text-2xl font-black text-white">{result.zdar ? "You hit Legendary." : "Generate a shareable result."}</div>
        <p className="mt-2 text-sm text-slate-300">Use this panel to push users toward screenshots, clips, and social posts.</p>
        <button onClick={onShare} className="mt-4 w-full rounded-2xl bg-fuchsia-300 p-4 font-black text-slate-950 shadow-[0_0_35px_rgba(217,70,239,.35)] transition hover:scale-[1.02]">📤 Prepare Share Text</button>
      </div>
    </Card>
  );
}



function DemoModeBadge() {
  return (
    <div className="fixed bottom-3 left-3 z-[70] rounded-2xl border border-yellow-300/30 bg-slate-950/90 px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-yellow-100 shadow-[0_0_40px_rgba(250,204,21,.18)] backdrop-blur-xl">
      Demo Build • No Real Transactions
    </div>
  );
}

function DemoTruthPanel() {
  return (
    <Card title="What Is Real vs Simulated?" kicker="demo transparency">
      <div className="mt-4 grid gap-3">
        {DEMO_TRUTH_TABLE.map(([label, detail]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
            <div className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">{label}</div>
            <div className="mt-2 text-sm leading-6 text-slate-300">{detail}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function GuidedDemoPanel({ onConnect, onRun, onFindZDAR, onShare, walletConnected }) {
  return (
    <Card title="Guided Demo Mode" kicker="recommended first path">
      <div className="mt-4 grid gap-3">
        {DEMO_STEPS.map(([num, title, desc]) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
            <div className="flex gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 font-black text-cyan-100">{num}</div>
              <div>
                <div className="font-black text-white">{title}</div>
                <div className="mt-1 text-sm leading-6 text-slate-400">{desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button onClick={onConnect} className="rounded-2xl bg-cyan-300 p-4 font-black text-slate-950 shadow-[0_0_35px_rgba(34,211,238,.3)] transition hover:scale-[1.02]">
          {walletConnected ? "Demo Demo Wallet Connected" : "Connect Demo Demo Wallet"}
        </button>
        <button disabled={!walletConnected} onClick={onRun} className="rounded-2xl border border-cyan-300/30 bg-cyan-500/10 p-4 font-black text-cyan-100 transition hover:bg-cyan-500/15 disabled:opacity-50">Run Demo Simulation</button>
        <button onClick={onFindZDAR} className="rounded-2xl border border-fuchsia-300/40 bg-fuchsia-500/20 p-4 font-black text-fuchsia-100 transition hover:scale-[1.02]">Find ZDAR</button>
        <button onClick={onShare} className="rounded-2xl border border-white/10 bg-white/10 p-4 font-black text-white transition hover:bg-white/15">Generate Share Card</button>
      </div>
    </Card>
  );
}

function DemoLimitationsPanel() {
  return (
    <Card title="Current Demo Limitations" kicker="honest product status">
      <div className="mt-4 grid gap-2">
        {DEMO_LIMITATIONS.map((item) => (
          <div key={item} className="rounded-xl border border-yellow-300/15 bg-yellow-400/5 p-3 text-sm text-yellow-50/85">
            <span className="mr-2 text-yellow-300">!</span>{item}
          </div>
        ))}
      </div>
    </Card>
  );
}

function FeedbackChecklistPanel() {
  return (
    <Card title="What Feedback We Need" kicker="early tester prompt">
      <div className="mt-4 grid gap-2">
        {WHAT_FEEDBACK.map((item) => (
          <div key={item} className="rounded-xl border border-emerald-300/15 bg-emerald-400/5 p-3 text-sm text-emerald-50/85">
            <span className="mr-2 text-emerald-300">✓</span>{item}
          </div>
        ))}
      </div>
    </Card>
  );
}

function DemoWatermark() {
  return (
    <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-yellow-300/20 bg-yellow-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-yellow-100">
      Demo Data
    </div>
  );
}

function AboutDemoPanel() {
  return (
    <Card title="What Is ElementOS?" kicker="10-second explanation">
      <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-500/10 p-5">
        <p className="text-sm leading-7 text-slate-200">
          ElementOS is an interactive SimulationFi demo where users select elements, run simulated ARM-based pairings, hunt rare ZDAR alignment events, and generate shareable result cards. This build is designed for early feedback before real accounts, persistence, and blockchain integrations.
        </p>
      </div>
    </Card>
  );
}


function Metric({ label, value, sub }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/55 p-3 sm:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
      <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{label}</div>
      <div className="mt-1 text-xl font-black text-white tabular-nums sm:text-2xl">{value}</div>
      {sub && <div className="mt-1 text-xs text-cyan-200/70">{sub}</div>}
    </div>
  );
}

function Card({ title, kicker, children, className = "" }) {
  return (
    <div className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-4 sm:rounded-[2rem] sm:p-5 shadow-[0_24px_80px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-2xl transition duration-300 hover:border-cyan-300/25 ${className}`}><ShineLayer />
      {kicker && <div className="mb-1 text-[10px] uppercase tracking-[0.32em] text-cyan-300">{kicker}</div>}
      <h2 className="text-xl font-black tracking-tight text-white">{title}</h2>
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled = false, className = "" }) {
  return (
    <button disabled={disabled} onClick={onClick} className={`rounded-2xl bg-cyan-300 p-4 font-black text-slate-950 shadow-[0_0_35px_rgba(34,211,238,.35)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, disabled = false, className = "" }) {
  return (
    <button disabled={disabled} onClick={onClick} className={`rounded-2xl border border-white/10 bg-white/10 p-3 font-bold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>
      {children}
    </button>
  );
}

function ElementSelect({ value, onChange, elements, label }) {
  return (
    <label className="block">
      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300/80">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-2xl border border-cyan-300/20 bg-slate-950/90 px-3 py-3 sm:px-4 sm:py-4 font-bold text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_0_25px_rgba(34,211,238,.08)] outline-none transition hover:border-cyan-300/40 focus:border-fuchsia-300/50 focus:ring-2 focus:ring-fuchsia-300/20"
      >
        {elements.map((e) => (
          <option key={e.sym} value={e.sym} className="bg-slate-950 text-cyan-50">
            {e.sym} — {e.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function LandingPage({ onLaunch }) {
  return (
    <section className="relative overflow-hidden rounded-[1.8rem] border border-cyan-300/20 bg-white/[0.065] p-4 sm:rounded-[2.75rem] sm:p-8 shadow-[0_30px_140px_rgba(0,0,0,.5)] backdrop-blur-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.22),transparent_32%),radial-gradient(circle_at_85%_35%,rgba(217,70,239,.18),transparent_30%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <div className="mb-3 inline-flex rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-fuchsia-100">PUBLIC BETA LIVE</div>
          <br />
          <div className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.35em] text-cyan-200">
            {UI.appName}
          </div>
          <h1 className="mt-5 bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300 bg-clip-text text-4xl font-black leading-[0.95] tracking-tight text-transparent sm:text-6xl md:text-8xl">
            {UI.headline}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-xl sm:leading-8">{UI.sub}</p>
          <FeatureRibbon />
          <OnboardingStrip />
          <LaunchStatusBar />
          <PublicBetaNotice />
          <PressStrip />
          <div className="mt-5 flex flex-wrap gap-2">
            <StatusPill tone="cyan">SimulationFi</StatusPill>
            <StatusPill tone="fuchsia">ARM Engine</StatusPill>
            <StatusPill tone="emerald">ELM Gas</StatusPill>
            <StatusPill tone="yellow">ZDAR Rarity</StatusPill>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={onLaunch} className="rounded-2xl bg-cyan-300 px-6 py-4 text-lg font-black text-slate-950 shadow-[0_0_40px_rgba(34,211,238,.35)] transition hover:scale-[1.03]">
              {UI.launch}
            </button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Metric label="Category" value="SimulationFi" sub="DeFi + element compute" />
            <Metric label="Rarity Hook" value="ZDAR" sub="legendary alignment" />
            <Metric label="Dataset" value="118" sub="confirmed elements" />
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden slow-float rounded-[1.8rem] border border-white/10 bg-slate-950/70 p-4 sm:min-h-[520px] sm:rounded-[2.5rem] sm:p-5 shadow-[0_0_100px_rgba(34,211,238,.18)]">
          <div className="absolute inset-16 rounded-full border border-cyan-300/15 shadow-[0_0_70px_rgba(34,211,238,.18)] [transform:rotateX(64deg)_rotateZ(12deg)]" />
          <div className="absolute inset-24 rounded-full border border-fuchsia-300/15 shadow-[0_0_70px_rgba(217,70,239,.14)] [transform:rotateX(28deg)_rotateY(45deg)]" />
          <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-200 bg-cyan-300/15 text-4xl font-black sm:h-36 sm:w-36 sm:text-6xl shadow-[0_0_80px_rgba(34,211,238,.75)]">Al</div>
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-fuchsia-300/25 bg-fuchsia-500/10 p-4 text-fuchsia-100 shadow-[0_0_50px_rgba(217,70,239,.22)]">
            <div className="text-xs uppercase tracking-[.3em]">Live Result</div>
            <div className="text-2xl font-black">Fe / Ru → ZDAR Legendary</div>
            <div className="text-sm opacity-80">Perfect alignment • spherical orbital lock</div>
          </div>
        </div>
      </div>
    </section>
  );
}


function LiveFeedPanel({ feed }) {
  const fallbackFeed = LIVE_EVENT_TEMPLATES;
  const merged = [...feed, ...fallbackFeed].slice(0, 9);

  return (
    <Card title="🔥 Simulated Activity Feed" kicker="demo activity stream">
      <div className="mt-4 grid gap-2">
        {merged.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="rounded-2xl border border-cyan-300/15 bg-slate-950/60 p-3 text-sm text-slate-200 shadow-[0_0_22px_rgba(34,211,238,.08)]"
          >
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,.9)]" />
              <span>{item}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MockDemo WalletPanel({ walletConnected, walletAddress, elm, credits, stakedElm, onConnect, onDisconnect, onTopUp, onStake, onBuyCredits }) {
  return (
    <Card title="Demo Wallet" kicker="demo wallet" className="md:col-span-2 xl:col-span-2">
      <div className="mt-4 grid gap-4">
        <div className={`rounded-3xl border p-5 ${walletConnected ? "border-emerald-300/30 bg-emerald-500/10" : "border-yellow-300/30 bg-yellow-500/10"}`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-slate-300">Demo Demo Wallet Status</div>
              <div className="mt-1 text-3xl font-black">{walletConnected ? "Connected" : "Disconnected"}</div>
            </div>
            <div className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.22em] ${walletConnected ? "bg-emerald-300/20 text-emerald-100" : "bg-yellow-300/20 text-yellow-100"}`}>
              {walletConnected ? "Demo Mode Live" : "Demo Demo Wallet Required"}
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-3 font-mono text-xs text-cyan-100 break-all">
            {walletConnected ? walletAddress : "Connect wallet to run simulations and spend ELM gas."}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Metric label="Demo ELM Balance" value={elm.toLocaleString()} sub="testnet gas" />
          <Metric label="Credits" value={credits} sub="free runs" />
          <Metric label="Staked ELM" value={stakedElm.toLocaleString()} sub="mock staking" />
        </div>

        {!walletConnected ? (
          <PrimaryButton onClick={onConnect} className="w-full">Connect Demo Wallet</PrimaryButton>
        ) : (
          <GhostButton onClick={onDisconnect} className="w-full">Disconnect Demo Wallet</GhostButton>
        )}

        <div className="grid gap-3 sm:grid-cols-3">
          <GhostButton disabled={!walletConnected} onClick={onTopUp}>Add Funds</GhostButton>
          <GhostButton disabled={!walletConnected} onClick={onBuyCredits}>+5 Credits</GhostButton>
          <GhostButton disabled={!walletConnected} onClick={onStake}>Stake 100</GhostButton>
        </div>
      </div>
    </Card>
  );
}

function OrbitalAlignment({ result, pair }) {
  const left = pair?.[0] || "Al";
  const right = pair?.[1] || "Fe";
  const beamWidth = result.zdar ? "w-[86%] h-[9px]" : result.stability > 80 ? "w-[62%] h-[5px]" : "w-[48%] h-[5px]";
  const beamGlow = result.zdar
    ? "bg-fuchsia-300 shadow-[0_0_140px_rgba(217,70,239,1)]"
    : result.stability > 80
      ? "bg-cyan-300/80 shadow-[0_0_45px_rgba(34,211,238,.75)]"
      : "bg-cyan-300/35 shadow-[0_0_25px_rgba(34,211,238,.35)]";

  return (
    <div className="relative mt-4 h-[360px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-950 sm:h-[450px] sm:rounded-[2rem] shadow-[0_0_90px_rgba(34,211,238,.16)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_50%,rgba(249,115,22,.18),transparent_28%),radial-gradient(circle_at_72%_50%,rgba(34,211,238,.18),transparent_28%),radial-gradient(circle_at_50%_50%,rgba(217,70,239,.16),transparent_22%)]" />

      <div className="absolute left-[25%] top-1/2 h-40 w-40 sm:h-60 sm:w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/20 shadow-[0_0_55px_rgba(249,115,22,.25)] [transform:translate(-50%,-50%)_rotateX(62deg)_rotateZ(-18deg)]" />
      <div className="absolute left-[25%] top-1/2 h-20 w-20 sm:h-28 sm:w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/20 shadow-[0_0_70px_rgba(249,115,22,.8)]" />
      <div className="absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-2xl font-black text-orange-100 sm:text-4xl">{left}</div>
        <div className="text-[10px] uppercase tracking-[.25em] text-orange-200/70">primary sphere</div>
      </div>

      <div className="absolute right-[25%] top-1/2 h-40 w-40 sm:h-60 sm:w-60 translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 shadow-[0_0_55px_rgba(34,211,238,.25)] [transform:translate(50%,-50%)_rotateX(62deg)_rotateZ(18deg)]" />
      <div className="absolute right-[25%] top-1/2 h-20 w-20 sm:h-28 sm:w-28 translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 shadow-[0_0_70px_rgba(34,211,238,.8)]" />
      <div className="absolute right-[25%] top-1/2 translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-2xl font-black text-cyan-100 sm:text-4xl">{right}</div>
        <div className="text-[10px] uppercase tracking-[.25em] text-cyan-200/70">secondary sphere</div>
      </div>

      <div className={`absolute left-1/2 top-1/2 ${beamWidth} -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ${beamGlow}`} />
      <div className={`absolute left-1/2 top-1/2 h-12 w-12 sm:h-16 sm:w-16 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ${result.zdar ? "scale-125 bg-fuchsia-300 shadow-[0_0_110px_rgba(217,70,239,1)]" : "bg-cyan-300 shadow-[0_0_55px_rgba(34,211,238,.75)]"}`} />

      <div className="absolute left-1/2 top-[37%] -translate-x-1/2 text-center">
        <div className="text-[10px] uppercase tracking-[.35em] text-slate-300">Spherical Orbital Alignment</div>
        <div className="mt-1 text-3xl font-black text-white sm:text-4xl">{result.stability}%</div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-2xl border border-yellow-300/30 bg-yellow-400/10 px-6 py-3 text-center shadow-[0_0_30px_rgba(250,204,21,.2)]">
        <div className="text-2xl font-black text-yellow-200">{result.rarity}</div>
        <div className="text-[10px] uppercase tracking-[.22em] text-yellow-100/70">Alignment State</div>
      </div>
    </div>
  );
}

function OrbitalSystem({ elements, pair, setPairAt, settings, result }) {
  const origin = elements.find((e) => e.sym === settings.origin) || elements[0];
  const active = new Set(pair);
  const featured = elements.filter((e) => e.sym === origin.sym || e.influence > 55 || active.has(e.sym)).slice(0, 42);

  return (
    <div className="relative mt-4 h-[420px] overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-950 sm:aspect-square sm:h-auto sm:max-h-[720px] sm:rounded-[3rem] shadow-[0_0_120px_rgba(34,211,238,0.22)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.26),rgba(147,51,234,.13)_30%,rgba(2,6,23,.98)_72%)]" />
      <div className="absolute inset-12 rounded-full border border-cyan-300/15 [transform:rotateX(68deg)_rotateZ(14deg)]" />
      <div className="absolute inset-20 rounded-full border border-fuchsia-300/15 [transform:rotateX(24deg)_rotateY(55deg)]" />

      {featured.map((e, index) => {
        if (e.sym === origin.sym) return null;
        const angle = (index / featured.length) * Math.PI * 2 * 1.35 - Math.PI / 2;
        const radius = 25 + e.sor * 0.36;
        const depth = Math.sin(angle);
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius * 0.58;
        const isActive = active.has(e.sym);
        const size = isActive ? 68 : 28 + Math.max(0, depth) * 12;

        return (
          <button
            key={e.sym}
            onClick={() => setPairAt(1, e.sym)}
            title={`${e.name} • ARM ${Math.round(e.theta)}° • ${e.cluster}`}
            style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border bg-slate-950/80 font-black transition hover:z-30 hover:scale-125 ${isActive ? "border-fuchsia-300 text-fuchsia-100 ring-4 ring-fuchsia-300/20 shadow-[0_0_40px_rgba(217,70,239,.65)]" : "border-cyan-300/50 text-cyan-100 shadow-[0_0_25px_rgba(34,211,238,.4)]"}`}
          >
            <div className="text-[10px] text-slate-400">{e.num}</div>
            <div className="text-sm">{e.sym}</div>
          </button>
        );
      })}

      <button
        onClick={() => setPairAt(0, origin.sym)}
        className="absolute left-1/2 top-1/2 z-40 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full sm:h-36 sm:w-36 border border-cyan-200 bg-cyan-300/15 text-cyan-50 shadow-[0_0_90px_rgba(34,211,238,.9)] backdrop-blur-xl transition hover:scale-105"
      >
        <div className="text-xs uppercase tracking-[0.3em]">ARM Origin</div>
        <div className="text-4xl font-black sm:text-6xl">{origin.sym}</div>
        <div className="text-xs text-cyan-200">core model</div>
      </button>

      <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-slate-950/70 p-3 backdrop-blur-xl">
        <Metric label="Confidence" value={`${result.confidence}%`} />
        <Metric label="Rarity" value={result.rarity.split(" ")[0]} />
        <Metric label="API" value="Ready" />
      </div>
    </div>
  );
}

function LatticeOutput({ result }) {
  const nodes = Array.from({ length: 49 }, (_, i) => i);
  return (
    <div className={`mt-4 rounded-[2rem] border p-4 ${result.zdar ? "border-fuchsia-300/60 bg-fuchsia-500/10 shadow-[0_0_60px_rgba(217,70,239,.45)]" : "border-cyan-300/30 bg-cyan-500/10"}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.28em] text-slate-300">📊 Simulation Results</div>
          <div className="text-xl font-black">{result.structure}</div>
          <div className="text-sm text-slate-300">Strength {result.strength} • Confidence {result.confidence}%</div>
        </div>
        <div className="text-right">
          <div className="text-5xl font-black text-cyan-200">{result.stability}%</div>
          <div className="text-xs uppercase tracking-widest text-slate-400">stable</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-2">
        {nodes.map((node) => (
          <button key={node} title={`Lattice node ${node}`} className="aspect-square rounded-xl border border-current/30 bg-current/10 shadow-lg transition hover:scale-125" />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [showApp, setShowApp] = useState(false);
  const [settings, setSettings] = useState({ origin: "Al", originLock: true, calibration: 0, zdarThreshold: 2 });
  const [pair, setPair] = useState(["Al", "Fe"]);
  const [elm, setElm] = useState(2000000);
  const [credits, setCredits] = useState(5);
  const [stakedElm, setStakedElm] = useState(0);
  const [walletConnected, setDemo WalletConnected] = useState(false);
  const [walletAddress, setDemo WalletAddress] = useState("");
  const [history, setHistory] = useState([]);
  const [favorites, setFav] = useState([]);
  const [shareText, setShareText] = useState("");
  const [copied, setCopied] = useState(false);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [feed, setFeed] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [liveStream, setLiveStream] = useState(LIVE_EVENT_TEMPLATES.slice(0, 5));

  const elements = useMemo(() => ELEMENTS.map((e) => buildElement(e, settings)), [settings]);
  const result = useMemo(() => simulate(elements, pair, settings), [elements, pair, settings]);
  const ranking = useMemo(
    () => elements.map((e) => ({ ...e, sim: simulate(elements, [settings.origin, e.sym], settings) })).sort((a, b) => b.sim.stability - a.sim.stability),
    [elements, settings]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const next = LIVE_EVENT_TEMPLATES[Math.floor(Math.random() * LIVE_EVENT_TEMPLATES.length)];
      setLiveStream((current) => [next, ...current].slice(0, 8));
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  function setPairAt(index, symbol) {
    setPair((current) => current.map((value, i) => (i === index ? symbol : value)));
  }

  function connectDemo Wallet() {
    setDemo WalletConnected(true);
    setDemo WalletAddress(`0xELM${Math.random().toString(16).slice(2, 8).toUpperCase()}...${Math.random().toString(16).slice(2, 6).toUpperCase()}`);
  }

  function run() {
    if (!walletConnected) return setShareText("Connect wallet before running simulations.");
    if (elm < result.cost && credits <= 0) return setShareText("Not enough ELM or credits. Add funds to continue.");

    setScanning(true);
    window.setTimeout(() => {
      if (credits > 0) setCredits((c) => c - 1);
      else setElm((e) => e - result.cost);

      setElm((e) => e + (result.zdar ? 20 : 2));

      const newXp = xp + result.stability;
      setXp(newXp);
      if (newXp >= level * 500) setLevel((l) => l + 1);

      const res = { ...result, pair: [...pair], id: `SIM-${pair.join("-")}-${Date.now().toString().slice(-5)}` };
      setHistory((h) => [res, ...h].slice(0, 12));

      if (result.zdar) setFeed((f) => [`⚡ ${pair.join(" / ")} hit ZDAR Legendary (${result.stability}%)`, ...f].slice(0, 10));
      setScanning(false);
    }, 700);
  }

  function discoverZDAR() {
    const target = ranking.find((item) => item.sim.zdar) || ranking[0];
    setPair([settings.origin, target.sym]);
  }

  function randomPair() {
    const a = elements[Math.floor(Math.random() * elements.length)].sym;
    const b = elements[Math.floor(Math.random() * elements.length)].sym;
    setPair([a, b]);
  }

  function favorite() {
    const key = pair.join(" / ");
    setFav((f) => (f.includes(key) ? f : [key, ...f].slice(0, 8)));
  }

  function generateShareCard() {
    const text = `I just triggered a Legendary ZDAR alignment on ElementOS ⚡\n\n${pair.join(" / ")} → ${result.stability}% stability\n\nTry it:\n${window.location.href}`;
    setShareText(text);
    setCopied(false);

    if (navigator.share) {
      navigator.share({ title: "ElementOS ZDAR Alignment", text, url: window.location.href }).catch(() => {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }).catch(() => {});
    }
  }

  return (
    <>
      <DemoModeBadge />
      <div className="min-h-screen overflow-hidden bg-slate-950 p-3 text-white sm:p-5">
      <style>{`
        @keyframes zdarPulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.025); filter: brightness(1.35); }
        }

        @keyframes zdarFlash {
          0%, 100% { opacity: 0; }
          50% { opacity: .35; }
        }

        @keyframes floatParticle {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: .18; }
          50% { transform: translate3d(22px, -34px, 0) scale(1.35); opacity: .65; }
          100% { transform: translate3d(-18px, 28px, 0) scale(.9); opacity: .28; }
        }

        .zdar-active {
          animation: zdarPulse 1.4s ease-in-out infinite;
        }

        .zdar-flash {
          animation: zdarFlash 1.2s ease-in-out infinite;
        }
      
        @keyframes slowFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .slow-float { animation: slowFloat 5s ease-in-out infinite; }
      
        @keyframes holoPulse {
          0%, 100% { box-shadow: 0 0 24px rgba(34,211,238,.18); }
          50% { box-shadow: 0 0 70px rgba(217,70,239,.32); }
        }
        .holo-pulse { animation: holoPulse 3.2s ease-in-out infinite; }
      
        @keyframes signalBlink {
          0%, 100% { opacity: .45; }
          50% { opacity: 1; }
        }
        .signal-blink { animation: signalBlink 1.6s ease-in-out infinite; }
      `}</style>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,.3),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(217,70,239,.3),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,.25),transparent_35%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:44px_44px]" />
      <ParticleField />
      {result.zdar && <div className="pointer-events-none fixed inset-0 z-10 bg-fuchsia-500/20 zdar-flash" />}

      <TopNav onLaunch={() => setShowApp(true)} showApp={showApp} walletConnected={walletConnected} />
      <div className="relative z-20 mx-auto max-w-7xl">
        {!showApp ? (
          <LandingPage onLaunch={() => setShowApp(true)} />
        ) : (
          <>
            <GhostButton onClick={() => setShowApp(false)} className="mb-4 px-4 py-2">← Back to Landing</GhostButton>

            <header className="holo-pulse rounded-[1.8rem] border border-cyan-300/20 bg-white/[0.065] p-4 sm:rounded-[2.5rem] sm:p-7 shadow-[0_30px_120px_rgba(0,0,0,.45)] backdrop-blur-2xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.5em] text-cyan-300">ElementOS — ARM Simulation Network</div>
                  <h1 className="mt-2 bg-gradient-to-r from-white via-cyan-100 to-fuchsia-200 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl md:text-8xl">ARM CLOUD</h1>
                  <p className="mt-3 max-w-4xl text-lg text-slate-300">A crypto-native simulation network with ELM gas, spherical ZDAR orbitals, and shareable element-pair results.</p>
                  <div className="mt-4 flex flex-wrap gap-2"><StatusPill tone="emerald">LIVE NETWORK</StatusPill><StatusPill tone="cyan">118 ELEMENTS</StatusPill><StatusPill tone="fuchsia">ZDAR ENABLED</StatusPill></div>
                </div>
                <div className="grid w-full gap-3 sm:min-w-[360px] lg:w-auto">
                  <Metric label="Current Pair" value={pair.join(" / ")} sub="live simulation pair" />
                  <Metric label="Demo Demo Demo ELM Balance" value={elm.toLocaleString()} sub="demo ELM" />
                  <Metric label="Demo Wallet" value={walletConnected ? "Connected" : "Offline"} sub={walletConnected ? walletAddress : "connect to run"} />
                </div>
              </div>
            </header>

            <LaunchBanner onFindZDAR={discoverZDAR} />

            <section className="mt-5 grid gap-5 lg:grid-cols-2">
              <AboutDemoPanel />
              <GuidedDemoPanel
                onConnect={connectWallet}
                onRun={run}
                onFindZDAR={discoverZDAR}
                onShare={generateShareCard}
                walletConnected={walletConnected}
              />
            </section>

            <section className="mt-5 grid gap-5 lg:grid-cols-3">
              <DemoTruthPanel />
              <DemoLimitationsPanel />
              <FeedbackChecklistPanel />
            </section>

            <section className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6 sm:mt-5">
              <Metric label="Explorer Level" value={level} sub={`${xp} XP`} />
              <Metric label="Simulation Credits" value={credits} />
              <Metric label="Staked ELM" value={stakedElm.toLocaleString()} />
              <Metric label="ARM Nodes" value="118" />
              <Metric label="Simulated Demo Network" value="Online" sub="activity stream" />
              <Metric label="Demo Gas" value="Testnet" />
            </section>

            <NetworkStatsPanel history={history} feed={feed} result={result} />

            <section className="mt-4 grid gap-4 xl:grid-cols-[1.18fr_.82fr] sm:mt-5 sm:gap-5">
              <Card
                title="ARM Orbital Network"
                kicker="3D element map"
                className={result.zdar ? "zdar-active border-fuchsia-300/40 shadow-[0_0_120px_rgba(217,70,239,.45)]" : ""}
              >
                <OrbitalSystem elements={elements} pair={pair} setPairAt={setPairAt} settings={settings} result={result} />
              </Card>

              <Card title="Element Pair Console" kicker="ELM gas simulation">
                <div className="mt-4 grid gap-3">
                  {pair.map((p, i) => (
                    <ElementSelect key={i} value={p} label={i === 0 ? "Primary Element" : "Secondary Element"} elements={elements} onChange={(value) => setPairAt(i, value)} />
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Metric label="Stability" value={`${result.stability}%`} />
                  <Metric label="Confidence" value={`${result.confidence}%`} />
                  <Metric label="Structure" value={result.structure.split(" ")[0]} />
                  <Metric label="Gas Fee" value={credits > 0 ? "1 Credit" : `${result.cost} ELM`} />
                </div>

                {scanning && (
                  <div className="mt-4 rounded-[2rem] border border-cyan-300/30 bg-cyan-500/10 p-4 text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,.22)]">
                    <div className="text-xs font-black uppercase tracking-[0.32em]">Scanning ARM field...</div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300" />
                    </div>
                  </div>
                )}

                <OrbitalAlignment result={result} pair={pair} />
                <div className="mt-4"><RarityBadge result={result} /></div>
                <MiniTerminal pair={pair} result={result} />

                {result.zdar && (
                  <div className="mt-4 rounded-[2rem] border border-fuchsia-300 bg-fuchsia-500/20 p-6 text-fuchsia-100 shadow-[0_0_90px_rgba(217,70,239,.7)]">
                    <div className="text-xs uppercase tracking-[0.4em]">⚡ ZDAR DETECTED</div>
                    <div className="mt-2 text-3xl font-black sm:text-4xl">Legendary Alignment</div>
                    <p className="mt-2 text-sm text-fuchsia-100/80">
                      {pair.join(" / ")} → {result.stability}% stability. Perfect alignment detected.
                    </p>
                    <button
                      onClick={generateShareCard}
                      className="mt-4 w-full rounded-2xl bg-fuchsia-300 p-4 font-black text-slate-950 shadow-[0_0_45px_rgba(217,70,239,.55)] transition hover:scale-[1.02]"
                    >
                      📤 Share This Result
                    </button>
                  </div>
                )}

                <LatticeOutput result={result} />

                <div className="mt-5 grid gap-2">
                  <PrimaryButton disabled={!walletConnected || scanning} onClick={run}>{scanning ? "Scanning..." : "🚀 Run Simulation"}</PrimaryButton>
                  <GhostButton onClick={discoverZDAR} className="border-fuchsia-300/40 bg-fuchsia-500/15 text-fuchsia-100">⚡ Find Legendary Alignment</GhostButton>
                  <GhostButton onClick={randomPair}>🎲 Discover</GhostButton>
                  <GhostButton onClick={favorite}>⭐ Save Pair</GhostButton>
                  <GhostButton onClick={generateShareCard} className="border-cyan-300/30 bg-cyan-500/10 text-cyan-100">📤 Share Result</GhostButton>
                </div>

                {shareText && (
                  <textarea readOnly value={shareText} onFocus={(event) => event.target.select()} className="mt-4 w-full rounded-2xl border border-cyan-300/30 bg-slate-950/80 p-3 text-sm text-cyan-100" />
                )}
              </Card>
            </section>

            <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5 sm:mt-5 sm:gap-5">
              <MockDemo WalletPanel
                walletConnected={walletConnected}
                walletAddress={walletAddress}
                elm={elm}
                credits={credits}
                stakedElm={stakedElm}
                onConnect={connectDemo Wallet}
                onDisconnect={() => {
                  setDemo WalletConnected(false);
                  setDemo WalletAddress("");
                }}
                onTopUp={() => walletConnected && setElm((e) => e + 500)}
                onStake={() => {
                  if (walletConnected && elm >= 100) {
                    setElm((e) => e - 100);
                    setStakedElm((s) => s + 100);
                  }
                }}
                onBuyCredits={() => walletConnected && setCredits((c) => c + 5)}
              />

              <Card title="⚙️ ARM Engine" kicker="model settings">
                <label className="mt-4 flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={settings.originLock} onChange={(e) => setSettings({ ...settings, originLock: e.target.checked })} /> Origin lock
                </label>
                <div className="mt-4">
                  <ElementSelect value={settings.origin} label="ARM origin" elements={elements} onChange={(value) => setSettings({ ...settings, origin: value })} />
                </div>
                <label className="mt-4 block text-sm">Calibration: {settings.calibration}°</label>
                <input type="range" min="-20" max="20" value={settings.calibration} onChange={(e) => setSettings({ ...settings, calibration: Number(e.target.value) })} className="w-full" />
              </Card>

              <Card title="🏆 Top Alignments" kicker="best pairs">
                <div className="mt-4 grid max-h-80 gap-2 overflow-auto pr-1">
                  {ranking.slice(0, 35).map((r, i) => (
                    <button key={r.sym} onClick={() => setPair([settings.origin, r.sym])} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:bg-white/10">
                      <div className="flex justify-between"><b>#{i + 1} {r.sym} — {r.name}</b><span>{r.sim.stability}%</span></div>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300" style={{ width: `${r.influence}%` }} /></div>
                      <div className="mt-1 text-xs text-slate-400">{r.cluster} • {r.family}</div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card title="🧾 Activity" kicker="simulation ledger">
                <div className="mt-4 grid max-h-80 gap-2 overflow-auto">
                  {history.length === 0 ? <p className="text-sm text-slate-400">Run your first simulation to generate an activity record.</p> : history.map((h) => (
                    <div key={h.id} className="rounded-xl border border-white/10 bg-white/5 p-2 text-sm"><b>{h.id}</b><br />{h.pair.join(" / ")} → {h.stability}% {h.zdar ? "⚡" : ""}</div>
                  ))}
                </div>
              </Card>

              <LiveFeedPanel feed={[...feed, ...liveStream]} /></section>

            <NetworkStatsPanel history={history} feed={feed} result={result} />

            <section className="mt-5 grid gap-5 lg:grid-cols-2"><MarketPanel /><TrustPanel /></section>

            <section className="mt-5 grid gap-5 lg:grid-cols-2">
              <CollectibleResultCard pair={pair} result={result} shareText={shareText} onShare={generateShareCard} />
              <ARMAIPanel pair={pair} result={result} />
            </section>

            <section className="mt-5 grid gap-5 lg:grid-cols-3">
              <TrendingPairsPanel onSelect={(a, b) => setPair([a, b])} />
              <ScreenshotFrame pair={pair} result={result} />
              <ComingSoonPanel />
            </section>

            <section className="mt-5 grid gap-5 lg:grid-cols-3">
              <ZDARProbabilityPanel result={result} />
              <SharePromptPanel result={result} onShare={generateShareCard} />
              <QuickActionsPanel onRun={run} onFindZDAR={discoverZDAR} onShare={generateShareCard} walletConnected={walletConnected} />
            </section>

            <section className="mt-5 grid gap-5 lg:grid-cols-3">
              <PlatformModesPanel />
              <LaunchMetricsPanel />
              <SafetyNotesPanel />
            </section>

            <section className="mt-5 grid gap-5 lg:grid-cols-2">
              <UserQuotePanel />
              <CommunityPanel />
            </section>

            <section className="mt-5 grid gap-5 lg:grid-cols-3">
              <FeedbackPanel />
              <CommunityPanel />
              <FAQPanel />
            </section>

            <LiveLaunchFooter onFindZDAR={discoverZDAR} onRun={run} walletConnected={walletConnected} />

            <section className="mt-5">
              <Card title="⭐ Saved Pairs" kicker="watchlist">
                <div className="mt-4 flex flex-wrap gap-2">
                  {favorites.length === 0 ? <p className="text-sm text-slate-400">Save your favourite pairings to build a personal watchlist.</p> : favorites.map((f) => (
                    <span key={f} className="rounded-xl bg-white/10 px-3 py-2 text-sm">{f}</span>
                  ))}
                </div>
              </Card>
            </section>
          </>
        )}
      </div>
    </div>
      </div>
    </>
  );
}
