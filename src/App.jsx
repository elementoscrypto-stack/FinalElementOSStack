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
    <nav className="sticky top-4 z-50 mx-auto mb-5 flex max-w-7xl items-center justify-between rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-3 shadow-[0_20px_80px_rgba(0,0,0,.35)] backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 font-black text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,.25)]">E</div>
        <div>
          <div className="text-sm font-black tracking-tight">ElementOS</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">ARM Network</div>
        </div>
      </div>
      <div className="hidden items-center gap-2 md:flex">
        <StatusPill tone="emerald">Live Network</StatusPill>
        <StatusPill tone="cyan">118 Elements</StatusPill>
        <StatusPill tone="fuchsia">ZDAR Enabled</StatusPill>
        <StatusPill tone={walletConnected ? "emerald" : "yellow"}>{walletConnected ? "Wallet Online" : "Testnet"}</StatusPill>
      </div>
      {!showApp && (
        <button onClick={onLaunch} className="rounded-2xl bg-cyan-300 px-4 py-2 text-sm font-black text-slate-950 shadow-[0_0_30px_rgba(34,211,238,.35)] transition hover:scale-[1.03]">
          Launch App
        </button>
      )}
    </nav>
  );
}

function CTAFooter({ onFindZDAR, onRun, walletConnected }) {
  return (
    <section className="mt-5 rounded-[2.5rem] border border-fuchsia-300/20 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-blue-500/10 p-8 text-center shadow-[0_0_90px_rgba(217,70,239,.16)]">
      <div className="text-xs font-black uppercase tracking-[0.38em] text-fuchsia-200">Ready for a legendary alignment?</div>
      <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">Discover your first ZDAR.</h2>
      <p className="mx-auto mt-3 max-w-2xl text-slate-300">Pick a pair, run the simulation, and generate a shareable alignment result from the ARM network.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button onClick={onFindZDAR} className="rounded-2xl border border-fuchsia-300/40 bg-fuchsia-500/15 px-6 py-4 font-black text-fuchsia-100 shadow-[0_0_35px_rgba(217,70,239,.2)] transition hover:scale-[1.03]">⚡ Find ZDAR</button>
        <button disabled={!walletConnected} onClick={onRun} className="rounded-2xl bg-cyan-300 px-6 py-4 font-black text-slate-950 shadow-[0_0_35px_rgba(34,211,238,.35)] transition hover:scale-[1.03] disabled:opacity-50">🚀 Run Simulation</button>
      </div>
    </section>
  );
}


function Metric({ label, value, sub }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
      <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-black text-white tabular-nums">{value}</div>
      {sub && <div className="mt-1 text-xs text-cyan-200/70">{sub}</div>}
    </div>
  );
}

function Card({ title, kicker, children, className = "" }) {
  return (
    <div className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-[0_24px_80px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-2xl transition duration-300 hover:border-cyan-300/25 ${className}`}><ShineLayer />
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
        className="w-full appearance-none rounded-2xl border border-cyan-300/20 bg-slate-950/90 px-4 py-4 font-bold text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_0_25px_rgba(34,211,238,.08)] outline-none transition hover:border-cyan-300/40 focus:border-fuchsia-300/50 focus:ring-2 focus:ring-fuchsia-300/20"
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
    <section className="relative overflow-hidden rounded-[2.75rem] border border-cyan-300/20 bg-white/[0.065] p-8 shadow-[0_30px_140px_rgba(0,0,0,.5)] backdrop-blur-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.22),transparent_32%),radial-gradient(circle_at_85%_35%,rgba(217,70,239,.18),transparent_30%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <div className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.35em] text-cyan-200">
            {UI.appName}
          </div>
          <h1 className="mt-6 bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300 bg-clip-text text-6xl font-black leading-[0.9] tracking-tight text-transparent md:text-8xl">
            {UI.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-300">{UI.sub}</p>
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

        <div className="relative min-h-[520px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-5 shadow-[0_0_100px_rgba(34,211,238,.18)]">
          <div className="absolute inset-16 rounded-full border border-cyan-300/15 shadow-[0_0_70px_rgba(34,211,238,.18)] [transform:rotateX(64deg)_rotateZ(12deg)]" />
          <div className="absolute inset-24 rounded-full border border-fuchsia-300/15 shadow-[0_0_70px_rgba(217,70,239,.14)] [transform:rotateX(28deg)_rotateY(45deg)]" />
          <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-200 bg-cyan-300/15 text-6xl font-black shadow-[0_0_80px_rgba(34,211,238,.75)]">Al</div>
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
    <Card title="🔥 Live Network Feed" kicker="real-time simulation stream">
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

function MockWalletPanel({ walletConnected, walletAddress, elm, credits, stakedElm, onConnect, onDisconnect, onTopUp, onStake, onBuyCredits }) {
  return (
    <Card title="Wallet" kicker="testnet wallet" className="lg:col-span-2">
      <div className="mt-4 grid gap-4">
        <div className={`rounded-3xl border p-5 ${walletConnected ? "border-emerald-300/30 bg-emerald-500/10" : "border-yellow-300/30 bg-yellow-500/10"}`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-slate-300">Wallet Status</div>
              <div className="mt-1 text-3xl font-black">{walletConnected ? "Connected" : "Disconnected"}</div>
            </div>
            <div className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.22em] ${walletConnected ? "bg-emerald-300/20 text-emerald-100" : "bg-yellow-300/20 text-yellow-100"}`}>
              {walletConnected ? "Testnet Live" : "Wallet Required"}
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-3 font-mono text-xs text-cyan-100 break-all">
            {walletConnected ? walletAddress : "Connect wallet to run simulations and spend ELM gas."}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Metric label="ELM Balance" value={elm.toLocaleString()} sub="testnet gas" />
          <Metric label="Credits" value={credits} sub="free runs" />
          <Metric label="Staked ELM" value={stakedElm.toLocaleString()} sub="mock staking" />
        </div>

        {!walletConnected ? (
          <PrimaryButton onClick={onConnect} className="w-full">Connect Wallet</PrimaryButton>
        ) : (
          <GhostButton onClick={onDisconnect} className="w-full">Disconnect Wallet</GhostButton>
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
    <div className="relative mt-4 h-[450px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-[0_0_90px_rgba(34,211,238,.16)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_50%,rgba(249,115,22,.18),transparent_28%),radial-gradient(circle_at_72%_50%,rgba(34,211,238,.18),transparent_28%),radial-gradient(circle_at_50%_50%,rgba(217,70,239,.16),transparent_22%)]" />

      <div className="absolute left-[25%] top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/20 shadow-[0_0_55px_rgba(249,115,22,.25)] [transform:translate(-50%,-50%)_rotateX(62deg)_rotateZ(-18deg)]" />
      <div className="absolute left-[25%] top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/20 shadow-[0_0_70px_rgba(249,115,22,.8)]" />
      <div className="absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-4xl font-black text-orange-100">{left}</div>
        <div className="text-[10px] uppercase tracking-[.25em] text-orange-200/70">primary sphere</div>
      </div>

      <div className="absolute right-[25%] top-1/2 h-60 w-60 translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 shadow-[0_0_55px_rgba(34,211,238,.25)] [transform:translate(50%,-50%)_rotateX(62deg)_rotateZ(18deg)]" />
      <div className="absolute right-[25%] top-1/2 h-28 w-28 translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 shadow-[0_0_70px_rgba(34,211,238,.8)]" />
      <div className="absolute right-[25%] top-1/2 translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-4xl font-black text-cyan-100">{right}</div>
        <div className="text-[10px] uppercase tracking-[.25em] text-cyan-200/70">secondary sphere</div>
      </div>

      <div className={`absolute left-1/2 top-1/2 ${beamWidth} -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ${beamGlow}`} />
      <div className={`absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ${result.zdar ? "scale-125 bg-fuchsia-300 shadow-[0_0_110px_rgba(217,70,239,1)]" : "bg-cyan-300 shadow-[0_0_55px_rgba(34,211,238,.75)]"}`} />

      <div className="absolute left-1/2 top-[37%] -translate-x-1/2 text-center">
        <div className="text-[10px] uppercase tracking-[.35em] text-slate-300">Spherical Orbital Alignment</div>
        <div className="mt-1 text-4xl font-black text-white">{result.stability}%</div>
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
    <div className="relative mt-4 aspect-square max-h-[720px] overflow-hidden rounded-[3rem] border border-cyan-300/20 bg-slate-950 shadow-[0_0_120px_rgba(34,211,238,0.22)]">
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
        className="absolute left-1/2 top-1/2 z-40 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan-200 bg-cyan-300/15 text-cyan-50 shadow-[0_0_90px_rgba(34,211,238,.9)] backdrop-blur-xl transition hover:scale-105"
      >
        <div className="text-xs uppercase tracking-[0.3em]">ARM Origin</div>
        <div className="text-6xl font-black">{origin.sym}</div>
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
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [history, setHistory] = useState([]);
  const [favorites, setFav] = useState([]);
  const [shareText, setShareText] = useState("");
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

  function connectWallet() {
    setWalletConnected(true);
    setWalletAddress(`0xELM${Math.random().toString(16).slice(2, 8).toUpperCase()}...${Math.random().toString(16).slice(2, 6).toUpperCase()}`);
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
    const text = `I just discovered a ZDAR alignment on ElementOS ⚡\n\n${pair.join(" / ")} → ${result.stability}% stability\n\nTry it:\n${window.location.href}`;
    setShareText(text);
    if (navigator.share) {
      navigator.share({ title: "ElementOS ZDAR Alignment", text, url: window.location.href }).catch(() => {});
    }
  }

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 p-5 text-white">
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
      `}</style>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,.3),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(217,70,239,.3),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,.25),transparent_35%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:44px_44px]" />
      <ParticleField />
      {result.zdar && <div className="pointer-events-none fixed inset-0 z-10 bg-fuchsia-500/20 zdar-flash" />}

      <TopNav onLaunch={() => setShowApp(true)} showApp={showApp} walletConnected={walletConnected} />
      <div className="relative mx-auto max-w-7xl">
        {!showApp ? (
          <LandingPage onLaunch={() => setShowApp(true)} />
        ) : (
          <>
            <GhostButton onClick={() => setShowApp(false)} className="mb-4 px-4 py-2">← Back to Landing</GhostButton>

            <header className="rounded-[2.5rem] border border-cyan-300/20 bg-white/[0.065] p-7 shadow-[0_30px_120px_rgba(0,0,0,.45)] backdrop-blur-2xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.5em] text-cyan-300">ElementOS — ARM Simulation Network</div>
                  <h1 className="mt-2 bg-gradient-to-r from-white via-cyan-100 to-fuchsia-200 bg-clip-text text-6xl font-black tracking-tight text-transparent md:text-8xl">ARM CLOUD</h1>
                  <p className="mt-3 max-w-4xl text-lg text-slate-300">A crypto-native simulation network with ELM gas, spherical ZDAR orbitals, and shareable element-pair results.</p>
                  <div className="mt-4 flex flex-wrap gap-2"><StatusPill tone="emerald">LIVE NETWORK</StatusPill><StatusPill tone="cyan">118 ELEMENTS</StatusPill><StatusPill tone="fuchsia">ZDAR ENABLED</StatusPill></div>
                </div>
                <div className="grid min-w-[360px] gap-3">
                  <Metric label="Current Pair" value={pair.join(" / ")} sub="live simulation pair" />
                  <Metric label="Wallet Balance" value={elm.toLocaleString()} sub="testnet ELM" />
                  <Metric label="Wallet" value={walletConnected ? "Connected" : "Offline"} sub={walletConnected ? walletAddress : "connect to run"} />
                </div>
              </div>
            </header>

            <section className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              <Metric label="Explorer Level" value={level} sub={`${xp} XP`} />
              <Metric label="Simulation Credits" value={credits} />
              <Metric label="Staked ELM" value={stakedElm.toLocaleString()} />
              <Metric label="ARM Nodes" value="118" />
              <Metric label="Live Network" value="Online" sub="activity stream" />
              <Metric label="Gas Mode" value="Testnet" />
            </section>

            <section className="mt-5 grid gap-5 lg:grid-cols-[1.18fr_.82fr]">
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

                {result.zdar && (
                  <div className="mt-4 rounded-[2rem] border border-fuchsia-300 bg-fuchsia-500/20 p-6 text-fuchsia-100 shadow-[0_0_90px_rgba(217,70,239,.7)]">
                    <div className="text-xs uppercase tracking-[0.4em]">⚡ ZDAR DETECTED</div>
                    <div className="mt-2 text-4xl font-black">Legendary Alignment</div>
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

            <section className="mt-5 grid gap-5 lg:grid-cols-5">
              <MockWalletPanel
                walletConnected={walletConnected}
                walletAddress={walletAddress}
                elm={elm}
                credits={credits}
                stakedElm={stakedElm}
                onConnect={connectWallet}
                onDisconnect={() => {
                  setWalletConnected(false);
                  setWalletAddress("");
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

            <CTAFooter onFindZDAR={discoverZDAR} onRun={run} walletConnected={walletConnected} />

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
  );
}
