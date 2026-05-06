import React, { useMemo, useState } from "react";

// ElementOS — ARM Simulation Network
// Complete working React prototype with crypto-native labels, mock wallet, ZDAR, and 3D-style spherical orbitals.

const UI = {
  appName: "ElementOS — ARM Simulation Network",
  run: "🚀 Run Simulation",
  discover: "🎲 Discover",
  hunt: "⚡ Find Legendary Alignment",
  save: "⭐ Save Pair",
  share: "📤 Share Result",
  primary: "Primary Element",
  secondary: "Secondary Element",
  wallet: "Wallet",
  connect: "Connect Wallet",
  disconnect: "Disconnect",
  balance: "Wallet Balance",
  gas: "Gas Fee",
  faucet: "Add Funds",
  credits: "Simulation Credits",
  results: "📊 Simulation Results",
  stability: "Stability",
  confidence: "Confidence",
  structure: "Structure",
  cost: "Gas Cost",
  ranking: "🏆 Top Alignments",
  history: "🧾 Activity",
  feed: "🔥 Live Feed",
  controls: "⚙️ ARM Engine",
  headline: "Simulate Element Interactions",
  sub: "Discover rare alignments. Trigger ZDAR. Share results.",
  launch: "Launch Simulation",
};

const ELEMENTS = [
  [1, "H", "Hydrogen", 20, "Nonmetal"], [2, "He", "Helium", 90, "Noble Gas"], [3, "Li", "Lithium", 20, "Alkali Metal"], [4, "Be", "Beryllium", 35, "Alkaline Earth Metal"], [5, "B", "Boron", 10, "Metalloid"], [6, "C", "Carbon", 45, "Nonmetal"], [7, "N", "Nitrogen", 60, "Nonmetal"], [8, "O", "Oxygen", 70, "Nonmetal"], [9, "F", "Fluorine", 80, "Halogen"], [10, "Ne", "Neon", 90, "Noble Gas"],
  [11, "Na", "Sodium", 20, "Alkali Metal"], [12, "Mg", "Magnesium", 35, "Alkaline Earth Metal"], [13, "Al", "Aluminium", 0, "Post-Transition Metal"], [14, "Si", "Silicon", 50, "Metalloid"], [15, "P", "Phosphorus", 62, "Nonmetal"], [16, "S", "Sulfur", 72, "Nonmetal"], [17, "Cl", "Chlorine", 82, "Halogen"], [18, "Ar", "Argon", 90, "Noble Gas"],
  [19, "K", "Potassium", 22, "Alkali Metal"], [20, "Ca", "Calcium", 36, "Alkaline Earth Metal"], [21, "Sc", "Scandium", 76, "Transition Metal"], [22, "Ti", "Titanium", 78, "Transition Metal"], [23, "V", "Vanadium", 80, "Transition Metal"], [24, "Cr", "Chromium", 83, "Transition Metal"], [25, "Mn", "Manganese", 86, "Transition Metal"], [26, "Fe", "Iron", 88, "Transition Metal"], [27, "Co", "Cobalt", 90, "Transition Metal"], [28, "Ni", "Nickel", 92, "Transition Metal"], [29, "Cu", "Copper", 80, "Transition Metal"], [30, "Zn", "Zinc", 75, "Transition Metal"],
  [31, "Ga", "Gallium", 8, "Post-Transition Metal"], [32, "Ge", "Germanium", 52, "Metalloid"], [33, "As", "Arsenic", 64, "Metalloid"], [34, "Se", "Selenium", 74, "Nonmetal"], [35, "Br", "Bromine", 84, "Halogen"], [36, "Kr", "Krypton", 90, "Noble Gas"],
  [37, "Rb", "Rubidium", 24, "Alkali Metal"], [38, "Sr", "Strontium", 38, "Alkaline Earth Metal"], [39, "Y", "Yttrium", 77, "Transition Metal"], [40, "Zr", "Zirconium", 79, "Transition Metal"], [41, "Nb", "Niobium", 82, "Transition Metal"], [42, "Mo", "Molybdenum", 84, "Transition Metal"], [43, "Tc", "Technetium", 86, "Transition Metal"], [44, "Ru", "Ruthenium", 88, "Transition Metal"], [45, "Rh", "Rhodium", 90, "Transition Metal"], [46, "Pd", "Palladium", 92, "Transition Metal"], [47, "Ag", "Silver", 78, "Transition Metal"], [48, "Cd", "Cadmium", 73, "Transition Metal"],
  [49, "In", "Indium", 6, "Post-Transition Metal"], [50, "Sn", "Tin", 54, "Post-Transition Metal"], [51, "Sb", "Antimony", 66, "Metalloid"], [52, "Te", "Tellurium", 76, "Metalloid"], [53, "I", "Iodine", 86, "Halogen"], [54, "Xe", "Xenon", 90, "Noble Gas"],
  [55, "Cs", "Cesium", 26, "Alkali Metal"], [56, "Ba", "Barium", 40, "Alkaline Earth Metal"], [57, "La", "Lanthanum", 72, "Lanthanide"], [58, "Ce", "Cerium", 73, "Lanthanide"], [59, "Pr", "Praseodymium", 74, "Lanthanide"], [60, "Nd", "Neodymium", 75, "Lanthanide"], [61, "Pm", "Promethium", 76, "Lanthanide"], [62, "Sm", "Samarium", 77, "Lanthanide"], [63, "Eu", "Europium", 78, "Lanthanide"], [64, "Gd", "Gadolinium", 79, "Lanthanide"], [65, "Tb", "Terbium", 80, "Lanthanide"], [66, "Dy", "Dysprosium", 81, "Lanthanide"], [67, "Ho", "Holmium", 82, "Lanthanide"], [68, "Er", "Erbium", 83, "Lanthanide"], [69, "Tm", "Thulium", 84, "Lanthanide"], [70, "Yb", "Ytterbium", 85, "Lanthanide"], [71, "Lu", "Lutetium", 86, "Lanthanide"],
  [72, "Hf", "Hafnium", 79, "Transition Metal"], [73, "Ta", "Tantalum", 82, "Transition Metal"], [74, "W", "Tungsten", 85, "Transition Metal"], [75, "Re", "Rhenium", 87, "Transition Metal"], [76, "Os", "Osmium", 89, "Transition Metal"], [77, "Ir", "Iridium", 91, "Transition Metal"], [78, "Pt", "Platinum", 93, "Transition Metal"], [79, "Au", "Gold", 22, "Transition Metal"], [80, "Hg", "Mercury", 68, "Transition Metal"], [81, "Tl", "Thallium", 7, "Post-Transition Metal"], [82, "Pb", "Lead", 56, "Post-Transition Metal"], [83, "Bi", "Bismuth", 68, "Post-Transition Metal"], [84, "Po", "Polonium", 78, "Post-Transition Metal"], [85, "At", "Astatine", 88, "Halogen"], [86, "Rn", "Radon", 90, "Noble Gas"],
  [87, "Fr", "Francium", 28, "Alkali Metal"], [88, "Ra", "Radium", 42, "Alkaline Earth Metal"], [89, "Ac", "Actinium", 70, "Actinide"], [90, "Th", "Thorium", 71, "Actinide"], [91, "Pa", "Protactinium", 72, "Actinide"], [92, "U", "Uranium", 73, "Actinide"], [93, "Np", "Neptunium", 74, "Actinide"], [94, "Pu", "Plutonium", 75, "Actinide"], [95, "Am", "Americium", 76, "Actinide"], [96, "Cm", "Curium", 77, "Actinide"], [97, "Bk", "Berkelium", 78, "Actinide"], [98, "Cf", "Californium", 79, "Actinide"], [99, "Es", "Einsteinium", 80, "Actinide"], [100, "Fm", "Fermium", 81, "Actinide"], [101, "Md", "Mendelevium", 82, "Actinide"], [102, "No", "Nobelium", 83, "Actinide"], [103, "Lr", "Lawrencium", 84, "Actinide"],
  [104, "Rf", "Rutherfordium", 80, "Transition Metal"], [105, "Db", "Dubnium", 83, "Transition Metal"], [106, "Sg", "Seaborgium", 86, "Transition Metal"], [107, "Bh", "Bohrium", 88, "Transition Metal"], [108, "Hs", "Hassium", 90, "Transition Metal"], [109, "Mt", "Meitnerium", 92, "Transition Metal"], [110, "Ds", "Darmstadtium", 94, "Transition Metal"], [111, "Rg", "Roentgenium", 76, "Transition Metal"], [112, "Cn", "Copernicium", 66, "Transition Metal"], [113, "Nh", "Nihonium", 9, "Post-Transition Metal"], [114, "Fl", "Flerovium", 58, "Post-Transition Metal"], [115, "Mc", "Moscovium", 70, "Post-Transition Metal"], [116, "Lv", "Livermorium", 80, "Post-Transition Metal"], [117, "Ts", "Tennessine", 90, "Halogen"], [118, "Og", "Oganesson", 90, "Noble Gas"],
];

const PARTNER_LANES = ["DeFi Compute", "Materials AI", "Simulation Gaming", "Structure NFTs", "Research API", "ARM Cloud"];

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

function buildElement(row, settings) {
  const [num, sym, name, thetaBase, family] = row;
  let theta = thetaBase + settings.calibration;
  if (settings.origin === sym) theta = 0;
  if (settings.drift) theta += Math.sin(Date.now() / 1000 + num) * 2;
  theta = clamp(theta, 0, 180);
  const rad = (theta * Math.PI) / 180;
  const nor = Math.round(900 * Math.sin(rad) ** 2);
  const sor = Math.abs(theta - 90);
  return { num, sym, name, family, theta, nor, sor, cluster: sor < 5 ? "Prime" : sor < 25 ? "Near" : sor < 55 ? "Shift" : "Extreme", anomaly: sor > 70, influence: Math.round(clamp(100 - sor, 0, 100)) };
}

function simulate(elements, pair, settings) {
  const selected = pair.map((p) => elements.find((e) => e.sym === p)).filter(Boolean);
  const safe = selected.length ? selected : [elements[0]];
  const avgNor = safe.reduce((sum, e) => sum + e.nor, 0) / safe.length;
  const angles = safe.map((e) => e.theta);
  const delta = angles.length > 1 ? Math.max(...angles) - Math.min(...angles) : 0;
  const zdar = delta <= settings.zdarThreshold;
  const base = Math.round(avgNor / 10 - delta * 0.15 + 6);
  const stability = clamp(base + (zdar ? 15 : 0), 0, 100);
  const cost = Math.max(3, Math.round(5 + delta / 6 + (zdar ? 3 : 0)));
  return {
    stability,
    zdar,
    delta: Math.round(delta * 10) / 10,
    cost,
    structure: stability > 82 ? "Cubic Prime Lattice" : stability > 62 ? "Hex Structured Field" : stability > 38 ? "Reactive Distortion Grid" : "Chaotic Field",
    rarity: zdar ? "⚡ ZDAR — Legendary Alignment" : stability > 84 ? "🟣 Epic" : stability > 68 ? "🔵 Rare" : stability > 42 ? "🟡 Experimental" : "⚪ Volatile",
    strength: Math.round((stability + clamp(100 - delta, 0, 100)) / 2),
    future: clamp(Math.round(stability + Math.sin(delta / 8) * 8), 0, 100),
    confidence: clamp(Math.round(76 + stability * 0.19 - delta * 0.08), 48, 99),
  };
}

function runRuntimeTests() {
  const settings = { origin: "Al", calibration: 0, drift: false, zdarThreshold: 2 };
  const elements = ELEMENTS.map((row) => buildElement(row, settings));
  console.assert(ELEMENTS.length === 118, "Dataset should contain 118 elements.");
  console.assert(Boolean(elements.find((e) => e.sym === "Al")), "Aluminium should exist.");
  console.assert(Boolean(elements.find((e) => e.sym === "Og")), "Oganesson should exist.");
  console.assert(simulate(elements, ["Fe", "Ru"], settings).zdar === true, "Fe + Ru should trigger ZDAR.");
  console.assert(simulate(elements, ["Al", "Fe"], settings).cost > 0, "Simulation should have positive gas cost.");
  console.assert(simulate(elements, ["Al", "Fe"], settings).stability >= 0, "Simulation should define result.stability.");
}
runRuntimeTests();

function Icon({ name }) {
  const map = { play: "▶", star: "★", random: "⟳", zap: "⚡", export: "⇩", back: "←", spark: "✦", wallet: "▣" };
  return <span className="inline-block transition-transform duration-300 group-hover:scale-125">{map[name] || "•"}</span>;
}

function PrimaryButton({ children, onClick, className = "", disabled = false }) {
  return <button disabled={disabled} onClick={onClick} className={`group rounded-2xl bg-cyan-300 p-4 font-black text-slate-950 shadow-[0_0_35px_rgba(34,211,238,.35)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(34,211,238,.55)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>{children}</button>;
}

function GhostButton({ children, onClick, className = "", disabled = false }) {
  return <button disabled={disabled} onClick={onClick} className={`group rounded-2xl border border-white/10 bg-white/10 p-3 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/15 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>{children}</button>;
}

function Card({ title, kicker, children, className = "" }) {
  return <div className={`rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-[0_24px_80px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-white/[0.085] ${className}`}>{kicker && <div className="mb-1 text-[10px] uppercase tracking-[0.32em] text-cyan-300">{kicker}</div>}<h2 className="text-xl font-black tracking-tight text-white">{title}</h2>{children}</div>;
}

function Metric({ label, value, sub }) {
  return <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] transition duration-300 hover:border-cyan-300/25 hover:bg-slate-900/65"><div className="absolute inset-0 opacity-0 transition duration-500 hover:opacity-100 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10" /><div className="relative"><div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{label}</div><div className="mt-1 text-2xl font-black text-white tabular-nums">{value}</div>{sub && <div className="mt-1 text-xs text-cyan-200/70">{sub}</div>}</div></div>;
}

function ElementSelect({ value, onChange, elements, label }) {
  return <label className="block">{label && <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300/80">{label}</div>}<select value={value} onChange={(e) => onChange(e.target.value)} className="w-full appearance-none rounded-2xl border border-cyan-300/20 bg-slate-950/90 px-4 py-4 font-bold text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_0_25px_rgba(34,211,238,.08)] outline-none transition duration-300 hover:border-cyan-300/40 focus:border-fuchsia-300/50 focus:ring-2 focus:ring-fuchsia-300/20">{elements.map((e) => <option key={e.sym} value={e.sym} className="bg-slate-950 text-cyan-50">{e.sym} — {e.name}</option>)}</select></label>;
}

function PartnerLanes() { return <div className="mt-4 flex flex-wrap gap-2">{PARTNER_LANES.map((lane) => <span key={lane} className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-slate-200">{lane}</span>)}</div>; }

function LandingPage({ onLaunch }) {
  return <><section className="relative overflow-hidden rounded-[2.75rem] border border-cyan-300/20 bg-white/[0.065] p-8 shadow-[0_30px_140px_rgba(0,0,0,.5)] backdrop-blur-2xl"><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.22),transparent_32%),radial-gradient(circle_at_85%_35%,rgba(217,70,239,.18),transparent_30%)]" /><div className="relative grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center"><div><div className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.35em] text-cyan-200">{UI.appName}</div><h1 className="mt-6 bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300 bg-clip-text text-6xl font-black leading-[0.9] tracking-tight text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,.4)] md:text-8xl">{UI.headline}</h1><p className="mt-6 max-w-3xl text-xl leading-8 text-slate-300">{UI.sub}</p><div className="mt-7 flex flex-wrap gap-3"><button onClick={onLaunch} className="group rounded-2xl bg-cyan-300 px-6 py-4 text-lg font-black text-slate-950 shadow-[0_0_40px_rgba(34,211,238,.35)] transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_0_80px_rgba(34,211,238,.65)] active:scale-[0.99]"><Icon name="spark" /> {UI.launch}</button><a href="#investor" className="rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-lg font-black text-white transition hover:bg-white/15">View Investor Thesis</a></div><div className="mt-8 grid gap-3 sm:grid-cols-3"><Metric label="Category" value="SimulationFi" sub="DeFi + element compute" /><Metric label="Rarity Hook" value="ZDAR" sub="legendary alignment" /><Metric label="Dataset" value="118" sub="confirmed elements" /></div></div><div className="relative min-h-[520px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-5 shadow-[0_0_100px_rgba(34,211,238,.18)]" style={{ perspective: "1000px" }}><div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:28px_28px]" /><div className="absolute inset-16 rounded-full border border-cyan-300/15 shadow-[0_0_70px_rgba(34,211,238,.18)]" style={{ transform: "rotateX(64deg) rotateZ(12deg)" }} /><div className="absolute inset-24 rounded-full border border-fuchsia-300/15 shadow-[0_0_70px_rgba(217,70,239,.14)]" style={{ transform: "rotateX(28deg) rotateY(45deg)" }} /><div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200 bg-cyan-300/15 shadow-[0_0_80px_rgba(34,211,238,.75)]" /><div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"><div className="text-xs uppercase tracking-[.35em] text-cyan-200">Origin</div><div className="text-6xl font-black">Al</div></div><div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-fuchsia-300/25 bg-fuchsia-500/10 p-4 text-fuchsia-100 shadow-[0_0_50px_rgba(217,70,239,.22)]"><div className="text-xs uppercase tracking-[.3em]">Live Result</div><div className="text-2xl font-black">Fe / Ru → ZDAR Legendary</div><div className="text-sm opacity-80">Perfect alignment • spherical orbital lock</div></div></div></div></section><section id="investor" className="mt-5 grid gap-5 lg:grid-cols-3"><Card title="Investor Pitch" kicker="the story"><p className="mt-4 text-slate-300">ElementOS is a crypto-native simulation network where users spend ELM gas to run element-pair simulations, chase rare ZDAR alignments, and share structure results.</p></Card><Card title="Why It Feels Familiar" kicker="crypto UX"><div className="mt-4 grid gap-2 text-sm text-slate-300"><div>• Wallet balance and gas fee model</div><div>• Rarity tiers for results</div><div>• Live feed and activity ledger</div><div>• Simulation credits and staking loop</div></div></Card><Card title="Core Loop" kicker="retention"><div className="mt-4 grid gap-2 text-sm text-slate-300"><div>1. Choose element pair</div><div>2. Run simulation</div><div>3. Hit rare ZDAR</div><div>4. Share result and climb rankings</div></div></Card></section></>;
}

function MockWalletPanel({ walletConnected, walletAddress, elm, credits, stakedElm, onConnect, onDisconnect, onTopUp, onStake, onBuyCredits }) {
  return (
    <Card title={UI.wallet} kicker="testnet wallet" className="lg:col-span-2">
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

        <div className="grid gap-3">
          {!walletConnected ? (
            <PrimaryButton onClick={onConnect} className="w-full"><Icon name="wallet" /> {UI.connect}</PrimaryButton>
          ) : (
            <GhostButton onClick={onDisconnect} className="w-full"><Icon name="wallet" /> {UI.disconnect}</GhostButton>
          )}
          <div className="grid gap-3 sm:grid-cols-3">
            <GhostButton disabled={!walletConnected} onClick={onTopUp} className="w-full">{UI.faucet}</GhostButton>
            <GhostButton disabled={!walletConnected} onClick={onBuyCredits} className="w-full">+5 Credits</GhostButton>
            <GhostButton disabled={!walletConnected} onClick={onStake} className="w-full">Stake 100</GhostButton>
          </div>
        </div>
      </div>
    </Card>
  );
}

function OrbitalAlignment({ result, pair }) {
  const left = pair?.[0] || "Al";
  const right = pair?.[1] || "Fe";
  const beamWidth = result.zdar ? "w-[74%]" : result.stability > 80 ? "w-[62%]" : "w-[48%]";
  const beamGlow = result.zdar ? "bg-fuchsia-300 shadow-[0_0_80px_rgba(217,70,239,.95)]" : result.stability > 80 ? "bg-cyan-300/80 shadow-[0_0_45px_rgba(34,211,238,.75)]" : "bg-cyan-300/35 shadow-[0_0_25px_rgba(34,211,238,.35)]";
  return <div className="relative mt-4 h-[450px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-[0_0_90px_rgba(34,211,238,.16)]" style={{ perspective: "1200px" }}><div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_50%,rgba(249,115,22,.18),transparent_28%),radial-gradient(circle_at_72%_50%,rgba(34,211,238,.18),transparent_28%),radial-gradient(circle_at_50%_50%,rgba(217,70,239,.16),transparent_22%)]" /><div className="absolute left-[25%] top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/20 shadow-[0_0_55px_rgba(249,115,22,.25)]" style={{ transform: "translate(-50%, -50%) rotateX(62deg) rotateZ(-18deg)" }} /><div className="absolute left-[25%] top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-200/10" style={{ transform: "translate(-50%, -50%) rotateX(18deg) rotateY(68deg)" }} /><div className="absolute left-[25%] top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/20 shadow-[0_0_70px_rgba(249,115,22,.8)]" /><div className="absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"><div className="text-4xl font-black text-orange-100">{left}</div><div className="text-[10px] uppercase tracking-[.25em] text-orange-200/70">primary sphere</div></div><div className="absolute right-[25%] top-1/2 h-60 w-60 translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 shadow-[0_0_55px_rgba(34,211,238,.25)]" style={{ transform: "translate(50%, -50%) rotateX(62deg) rotateZ(18deg)" }} /><div className="absolute right-[25%] top-1/2 h-60 w-60 translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/10" style={{ transform: "translate(50%, -50%) rotateX(18deg) rotateY(-68deg)" }} /><div className="absolute right-[25%] top-1/2 h-28 w-28 translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 shadow-[0_0_70px_rgba(34,211,238,.8)]" /><div className="absolute right-[25%] top-1/2 translate-x-1/2 -translate-y-1/2 text-center"><div className="text-4xl font-black text-cyan-100">{right}</div><div className="text-[10px] uppercase tracking-[.25em] text-cyan-200/70">secondary sphere</div></div><div className={`absolute left-1/2 top-1/2 h-[5px] ${beamWidth} -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ${beamGlow}`} /><div className="absolute left-1/2 top-1/2 h-px w-[78%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent" /><div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_0_70px_rgba(255,255,255,.32)]" /><div className={`absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ${result.zdar ? "scale-125 bg-fuchsia-300 shadow-[0_0_110px_rgba(217,70,239,1)]" : "bg-cyan-300 shadow-[0_0_55px_rgba(34,211,238,.75)]"}`} /><div className="absolute left-1/2 top-[37%] -translate-x-1/2 text-center"><div className="text-[10px] uppercase tracking-[.35em] text-slate-300">Spherical Orbital Alignment</div><div className="mt-1 text-4xl font-black text-white">{result.stability}%</div></div><div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-2xl border border-yellow-300/30 bg-yellow-400/10 px-6 py-3 text-center shadow-[0_0_30px_rgba(250,204,21,.2)]"><div className="text-2xl font-black text-yellow-200">{result.rarity}</div><div className="text-[10px] uppercase tracking-[.22em] text-yellow-100/70">Alignment State</div></div>{result.zdar && <div className="pointer-events-none absolute inset-0 flex items-center justify-center"><div className="absolute h-96 w-96 animate-ping rounded-full border border-fuchsia-300/50" /></div>}</div>;
}

function OrbitalSystem({ elements, pair, setPairAt, settings, result }) {
  const origin = elements.find((e) => e.sym === settings.origin) || elements[0];
  const active = new Set(pair);
  const featured = elements.filter((e) => e.sym === origin.sym || e.influence > 55 || active.has(e.sym)).slice(0, 42);
  return <div className="relative mt-4 aspect-square max-h-[720px] overflow-hidden rounded-[3rem] border border-cyan-300/20 bg-slate-950 shadow-[0_0_120px_rgba(34,211,238,0.22)]" style={{ perspective: "1100px" }}><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.26),rgba(147,51,234,.13)_30%,rgba(2,6,23,.98)_72%)]" /><div className="absolute inset-12 rounded-full border border-cyan-300/15" style={{ transform: "rotateX(68deg) rotateZ(14deg)" }} /><div className="absolute inset-20 rounded-full border border-fuchsia-300/15" style={{ transform: "rotateX(24deg) rotateY(55deg)" }} />{featured.map((e, index) => { if (e.sym === origin.sym) return null; const angle = (index / featured.length) * Math.PI * 2 * 1.35 - Math.PI / 2; const radius = 25 + e.sor * 0.36; const depth = Math.sin(angle); const x = 50 + Math.cos(angle) * radius; const y = 50 + Math.sin(angle) * radius * 0.58; const isActive = active.has(e.sym); const size = isActive ? 68 : 28 + Math.max(0, depth) * 12; const opacity = 0.54 + Math.max(0, depth) * 0.38; return <button key={e.sym} onClick={() => setPairAt(1, e.sym)} title={`${e.name} • ARM ${Math.round(e.theta)}° • ${e.cluster}`} style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, opacity, transform: `translate(-50%, -50%) translateZ(${depth * 80}px)` }} className={`absolute rounded-full border bg-slate-950/80 font-black transition duration-300 hover:z-30 hover:scale-125 ${isActive ? "border-fuchsia-300 text-fuchsia-100 ring-4 ring-fuchsia-300/20 shadow-[0_0_40px_rgba(217,70,239,.65)]" : "border-cyan-300/50 text-cyan-100 shadow-[0_0_25px_rgba(34,211,238,.4)]"}`}><div className="text-[10px] text-slate-400">{e.num}</div><div className="text-sm">{e.sym}</div></button>; })}<button onClick={() => setPairAt(0, origin.sym)} className="absolute left-1/2 top-1/2 z-40 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan-200 bg-cyan-300/15 text-cyan-50 shadow-[0_0_90px_rgba(34,211,238,.9)] backdrop-blur-xl transition hover:scale-105"><div className="text-xs uppercase tracking-[0.3em]">ARM Origin</div><div className="text-6xl font-black">{origin.sym}</div><div className="text-xs text-cyan-200">core model</div></button><div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-slate-950/70 p-3 backdrop-blur-xl"><Metric label={UI.confidence} value={`${result.confidence}%`} /><Metric label="Rarity" value={result.rarity.split(" ")[0]} /><Metric label="API" value="Ready" /></div></div>;
}

function LatticeOutput({ result }) {
  const nodes = Array.from({ length: 49 }, (_, i) => i);
  return <div className={`mt-4 rounded-[2rem] border p-4 ${result.zdar ? "border-fuchsia-300/60 bg-fuchsia-500/10 shadow-[0_0_60px_rgba(217,70,239,.45)]" : "border-cyan-300/30 bg-cyan-500/10"}`}><div className="flex items-center justify-between gap-3"><div><div className="text-xs uppercase tracking-[0.28em] text-slate-300">{UI.results}</div><div className="text-xl font-black">{result.structure}</div><div className="text-sm text-slate-300">Strength {result.strength} • Future {result.future}% • Confidence {result.confidence}%</div></div><div className="text-right"><div className="text-5xl font-black text-cyan-200">{result.stability}%</div><div className="text-xs uppercase tracking-widest text-slate-400">stable</div></div></div><div className="mt-4 grid grid-cols-7 gap-2">{nodes.map((node) => <button key={node} title={`Lattice node ${node}`} className="aspect-square rounded-xl border border-current/30 bg-current/10 shadow-lg transition hover:scale-125" />)}</div></div>;
}

export default function ElementOS() {
  const [showApp, setShowApp] = useState(false);
  const [settings, setSettings] = useState({ origin: "Al", originLock: true, calibration: 0, drift: false, zdarThreshold: 2 });
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

  const elements = useMemo(() => ELEMENTS.map((e) => buildElement(e, settings)), [settings]);
  const result = useMemo(() => simulate(elements, pair, settings), [elements, pair, settings]);
  const ranking = useMemo(() => elements.map((e) => ({ ...e, sim: simulate(elements, [settings.origin, e.sym], settings) })).sort((a, b) => b.sim.stability - a.sim.stability), [elements, settings]);

  function setPairAt(index, symbol) { setPair((current) => current.map((value, i) => i === index ? symbol : value)); }
  function connectWallet() { setWalletConnected(true); setWalletAddress(`0xELM${Math.random().toString(16).slice(2, 8).toUpperCase()}...${Math.random().toString(16).slice(2, 6).toUpperCase()}`); }
  function disconnectWallet() { setWalletConnected(false); setWalletAddress(""); }
  function topUpElm() { if (walletConnected) setElm((e) => e + 500); }
  function buyCredits() { if (walletConnected) setCredits((c) => c + 5); }
  function stakeElm() { if (walletConnected && elm >= 100) { setElm((e) => e - 100); setStakedElm((s) => s + 100); } }
  function run() {
    if (!walletConnected) return setShareText("Connect wallet before running simulations.");
    if (elm < result.cost && credits <= 0) return setShareText("Not enough ELM or credits. Add funds to continue.");
    const reward = result.zdar ? 20 : 2;
    if (credits > 0) setCredits((c) => c - 1); else setElm((e) => e - result.cost);
    setElm((e) => e + reward);
    const newXp = xp + result.stability;
    setXp(newXp);
    if (newXp >= level * 500) setLevel((l) => l + 1);
    const res = { ...result, pair: [...pair], id: `SIM-${pair.join("-")}-${Date.now().toString().slice(-5)}` };
    setHistory((h) => [res, ...h].slice(0, 12));
    if (result.zdar) setFeed((f) => [`⚡ ${pair.join(" / ")} hit ZDAR Legendary (${result.stability}%)`, ...f].slice(0, 10));
  }
  function randomPair() { const a = elements[Math.floor(Math.random() * elements.length)].sym; const b = elements[Math.floor(Math.random() * elements.length)].sym; setPair([a, b]); }
  function discoverZDAR() { const target = ranking.find((item) => item.sim.zdar) || ranking[0]; setPair([settings.origin, target.sym]); }
  function favorite() { const key = pair.join(" / "); setFav((f) => f.includes(key) ? f : [key, ...f].slice(0, 8)); }
  function generateShareCard() { setShareText(`ElementOS • ${pair.join(" / ")} • ${result.stability}% stable • ${result.rarity}`); }

  return <div className="min-h-screen overflow-hidden bg-slate-950 p-5 text-white"><style>{`@keyframes pulse{0%,100%{opacity:.55;filter:brightness(1)}50%{opacity:1;filter:brightness(1.8)}}`}</style><div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,.3),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(217,70,239,.3),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,.25),transparent_35%)]" /><div className="pointer-events-none fixed inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:44px_44px]" /><div className="relative mx-auto max-w-7xl">{!showApp ? <LandingPage onLaunch={() => setShowApp(true)} /> : <><GhostButton onClick={() => setShowApp(false)} className="mb-4 px-4 py-2"><Icon name="back" /> Back to Landing</GhostButton><header className="rounded-[2.5rem] border border-cyan-300/20 bg-white/[0.065] p-7 shadow-[0_30px_120px_rgba(0,0,0,.45)] backdrop-blur-2xl"><div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div><div className="text-xs uppercase tracking-[0.5em] text-cyan-300">{UI.appName}</div><h1 className="mt-2 bg-gradient-to-r from-white via-cyan-100 to-fuchsia-200 bg-clip-text text-6xl font-black tracking-tight text-transparent md:text-8xl">ARM CLOUD</h1><p className="mt-3 max-w-4xl text-lg text-slate-300">A crypto-native simulation network with ELM gas, spherical ZDAR orbitals, and shareable element-pair results.</p><PartnerLanes /></div><div className="grid min-w-[360px] gap-3"><Metric label="Current Pair" value={pair.join(" / ")} sub="live simulation pair" /><Metric label={UI.balance} value={elm.toLocaleString()} sub="testnet ELM" /><Metric label={UI.wallet} value={walletConnected ? "Connected" : "Offline"} sub={walletConnected ? walletAddress : "connect to run"} /></div></div></header><section className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-6"><Metric label="Explorer Level" value={level} sub={`${xp} XP`} /><Metric label={UI.credits} value={credits} /><Metric label="Staked ELM" value={stakedElm.toLocaleString()} /><Metric label="ARM Nodes" value="118" /><Metric label="Live Feed" value={feed.length} /><Metric label="Gas Mode" value="Testnet" /></section><section className="mt-5 grid gap-5 lg:grid-cols-[1.18fr_.82fr]"><Card title="ARM Orbital Network" kicker="3D element map"><OrbitalSystem elements={elements} pair={pair} setPairAt={setPairAt} settings={settings} result={result} /></Card><Card title="Element Pair Console" kicker="ELM gas simulation"><div className="mt-4 grid gap-3">{pair.map((p, i) => <ElementSelect key={i} value={p} label={i === 0 ? UI.primary : UI.secondary} elements={elements} onChange={(value) => setPairAt(i, value)} />)}</div><div className="mt-4 grid grid-cols-2 gap-3"><Metric label={UI.stability} value={`${result.stability}%`} /><Metric label={UI.confidence} value={`${result.confidence}%`} /><Metric label={UI.structure} value={result.structure.split(" ")[0]} /><Metric label={UI.gas} value={credits > 0 ? "1 Credit" : `${result.cost} ELM`} /></div><OrbitalAlignment result={result} pair={pair} />{result.zdar && <div className="mt-4 rounded-[2rem] border border-fuchsia-300 bg-fuchsia-500/20 p-5 text-fuchsia-100 shadow-[0_0_70px_rgba(217,70,239,.55)]"><div className="text-xs uppercase tracking-[0.4em]">ZDAR Event</div><div className="mt-1 text-3xl font-black">Legendary Alignment</div><p className="mt-1 text-sm text-fuchsia-100/80">Perfect alignment detected. +20 ELM reward on run.</p></div>}<LatticeOutput result={result} /><div className="mt-5 grid gap-2"><PrimaryButton disabled={!walletConnected} onClick={run}><Icon name="play" /> {UI.run}</PrimaryButton><GhostButton onClick={discoverZDAR} className="border-fuchsia-300/40 bg-fuchsia-500/15 text-fuchsia-100 hover:bg-fuchsia-500/25"><Icon name="zap" /> {UI.hunt}</GhostButton><GhostButton onClick={randomPair}><Icon name="random" /> {UI.discover}</GhostButton><GhostButton onClick={favorite}><Icon name="star" /> {UI.save}</GhostButton><GhostButton onClick={generateShareCard} className="border-cyan-300/30 bg-cyan-500/10 text-cyan-100"><Icon name="export" /> {UI.share}</GhostButton></div>{shareText && <textarea readOnly value={shareText} onFocus={(event) => event.target.select()} className="mt-4 w-full rounded-2xl border border-cyan-300/30 bg-slate-950/80 p-3 text-sm text-cyan-100" />}</Card></section><section className="mt-5 grid gap-5 lg:grid-cols-5"><MockWalletPanel walletConnected={walletConnected} walletAddress={walletAddress} elm={elm} credits={credits} stakedElm={stakedElm} onConnect={connectWallet} onDisconnect={disconnectWallet} onTopUp={topUpElm} onStake={stakeElm} onBuyCredits={buyCredits} /><Card title={UI.controls} kicker="model settings"><label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" checked={settings.originLock} onChange={(e) => setSettings({ ...settings, originLock: e.target.checked })} /> Origin lock</label><div className="mt-4"><ElementSelect value={settings.origin} label="ARM origin" elements={elements} onChange={(value) => setSettings({ ...settings, origin: value })} /></div><label className="mt-4 block text-sm">Calibration: {settings.calibration}°</label><input type="range" min="-20" max="20" value={settings.calibration} onChange={(e) => setSettings({ ...settings, calibration: Number(e.target.value) })} className="w-full" /></Card><Card title={UI.ranking} kicker="best pairs"><div className="mt-4 grid max-h-80 gap-2 overflow-auto pr-1">{ranking.slice(0, 35).map((r, i) => <button key={r.sym} onClick={() => setPair([settings.origin, r.sym])} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:bg-white/10"><div className="flex justify-between"><b>#{i + 1} {r.sym} — {r.name}</b><span>{r.sim.stability}%</span></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300 transition-all duration-700" style={{ width: `${r.influence}%` }} /></div><div className="mt-1 text-xs text-slate-400">{r.cluster} • {r.family}</div></button>)}</div></Card><Card title={UI.history} kicker="simulation ledger"><div className="mt-4 grid max-h-80 gap-2 overflow-auto">{history.length === 0 ? <p className="text-sm text-slate-400">No simulations yet.</p> : history.map((h) => <div key={h.id} className="rounded-xl border border-white/10 bg-white/5 p-2 text-sm"><b>{h.id}</b><br />{h.pair.join(" / ")} → {h.stability}% {h.zdar ? "⚡" : ""}</div>)}</div></Card><Card title={UI.feed} kicker="live discoveries"><div className="mt-4 grid gap-2">{feed.length === 0 ? <p className="text-sm text-slate-400">No ZDAR events yet. Try Find Legendary Alignment.</p> : feed.map((item, index) => <div key={`${item}-${index}`} className="rounded-xl border border-fuchsia-300/20 bg-fuchsia-500/10 p-2 text-sm text-fuchsia-100">{item}</div>)}</div></Card></section><section className="mt-5"><Card title="⭐ Saved Pairs" kicker="watchlist"><div className="mt-4 flex flex-wrap gap-2">{favorites.length === 0 ? <p className="text-sm text-slate-400">No saved pairs yet.</p> : favorites.map((f) => <span key={f} className="rounded-xl bg-white/10 px-3 py-2 text-sm">{f}</span>)}</div></Card></section></>}</div></div>;
}
