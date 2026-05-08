// production-readiness-500 ELM build: tooltips, token economy, audit gates, monetization, science engine, infra, compliance, exchange readiness.
// mobile-fixed ElementOS build: scrollable onboarding/login, safer mobile viewport, responsive telemetry receipt panel.
// master-proof-of-telemetry build: 150 upgrade architecture baked into ElementOS demo.
// ElementOS Proof of Telemetry Layer
// Frontend-only public demo build: local profile, persistent history, deterministic scoring, onboarding, discovery engine, and social cards.

import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "elementos_profile_v1";

const BRAND = {
  name: "ElementOS",
  tagline: "Proof of Telemetry Layer",
  manifesto:
    "ElementOS turns element interaction into a visual discovery network: pick elements, run deterministic simulations, hunt ZDAR alignments, and collect shareable structures.",
};


const TELEMETRY_LAYERS = [
  ["Persistent Accounts", "Local profile identity, XP, favourites, saved cards"],
  ["Telemetry Backbone", "Every run generates a deterministic telemetry receipt"],
  ["Deterministic Simulations", "Same pair + same model = consistent result seed"],
  ["Validator Layer", "Mock validators score receipts for consistency and trust"],
  ["Live Network Engine", "Simulated activity stream, status pulses, network state"],
  ["AI-Assisted Discovery", "ARM Assistant suggests pair paths and ZDAR candidates"],
  ["ZDAR Event System", "Legendary alignments become shareable event objects"],
];

const TELEMETRY_SIGNALS = [
  "pair.selected",
  "arm.origin.locked",
  "simulation.queued",
  "orbital.sync",
  "stability.converged",
  "field.resonance",
  "receipt.validated",
  "zdar.checked",
  "card.generated",
  "profile.persisted",
];

const VALIDATORS = [
  ["VAL-ARM-01", "ARM consistency", 99],
  ["VAL-NOR-07", "NOR/SOR scoring", 96],
  ["VAL-ZDAR-03", "Alignment rarity", 98],
  ["VAL-ELM-11", "Demo gas accounting", 94],
];

const TELEMETRY_ROADMAP = [
  "Telemetry API",
  "Validator marketplace",
  "Proof-of-run receipts",
  "Community challenge proofs",
  "ZDAR discovery certificates",
  "Simulation reputation layer",
  "Account cloud sync",
  "Real wallet binding",
];

const TELEMETRY_UPGRADE_GROUPS = [
  ["Accounts", 20, "Persistent identity, XP, saves, profiles, history"],
  ["Telemetry", 20, "Receipts, logs, deterministic events, run trails"],
  ["Determinism", 20, "Seeded outputs, repeatable scoring, model versioning"],
  ["Validators", 20, "Mock consensus, trust scores, validation checks"],
  ["Live Engine", 20, "Network state, activity, counters, pulse layers"],
  ["AI Discovery", 25, "Suggestions, recommendations, rarity hunts"],
  ["ZDAR Events", 25, "Event cards, streaks, rarity triggers, share objects"],
];



const PRODUCTION_READINESS = [
  ["Token Economy", "Demo Blueprint", "ELM credits, gas, staking, rewards, premium scans, creator cards"],
  ["Smart Contracts", "Audit Required", "Contract architecture, audit checklist, risk registry, deployment gates"],
  ["Live Users", "Demo Network", "User counters are simulated until analytics/backend are connected"],
  ["Monetization", "Ready to Test", "Subscriptions, credits, pro tools, API access, enterprise plans"],
  ["Scientific Engines", "Integration Layer", "DFT/API connectors, materials datasets, deterministic model adapters"],
  ["Infrastructure", "Scale Plan", "Frontend, API gateway, worker queues, telemetry DB, object storage"],
  ["Legal / Compliance", "Checklist Mode", "Terms, privacy, token disclaimers, risk warnings, data policy"],
  ["Exchange Integrations", "Future Gate", "Listing-readiness, liquidity, market data, compliance review"],
];

const TOKEN_ECONOMY_MODULES = [
  ["ELM Gas", "Simulation runs consume ELM or credits"],
  ["Validator Rewards", "Telemetry receipts can reward proof validation"],
  ["Staking", "Stake ELM to unlock advanced scans"],
  ["Creator Cards", "Rare discoveries become shareable premium objects"],
  ["Marketplace", "Future exchange for simulations, models, receipts"],
  ["Treasury", "Protocol reserve for grants and ecosystem growth"],
];

const CONTRACT_AUDIT_CHECKLIST = [
  "Token contract specification",
  "Access-control review",
  "Mint/burn rules",
  "Treasury permissions",
  "Upgradeability policy",
  "External audit before launch",
  "Bug bounty before mainnet",
  "Deployment runbook",
];

const MONETIZATION_STACK = [
  ["Free", "$0", "basic simulations + limited saves"],
  ["Pro", "$19/mo", "advanced scans + more history"],
  ["Creator", "$49/mo", "share cards + analytics"],
  ["Enterprise", "Custom", "APIs, bulk runs, dashboards"],
];

const SCIENCE_ENGINE_STACK = [
  ["Deterministic Demo Engine", "Live now", "Seeded local model for consistent outputs"],
  ["Materials Dataset Adapter", "Next", "Connect Materials Project-style data sources"],
  ["DFT / Simulation API", "Future", "Queue real calculations and show progress"],
  ["Model Validation Layer", "Future", "Compare predictions against known material behaviour"],
];

const INFRA_SCALE_STACK = [
  ["Vercel Frontend", "current deploy layer"],
  ["API Gateway", "future backend entrypoint"],
  ["Auth + Accounts", "real user identity"],
  ["Telemetry DB", "receipts, runs, profiles"],
  ["Worker Queue", "heavy simulations"],
  ["Object Storage", "cards, reports, replay assets"],
  ["Analytics", "funnels, retention, events"],
  ["Monitoring", "uptime, errors, performance"],
];

const COMPLIANCE_STACK = [
  "Terms of Service",
  "Privacy Policy",
  "Cookie Notice",
  "Token Risk Disclosure",
  "No Investment Advice",
  "Scientific Demo Disclaimer",
  "Data Retention Policy",
  "Contact / Support",
];

const EXCHANGE_READINESS = [
  ["Tokenomics Paper", "required"],
  ["Contract Audit", "required"],
  ["Liquidity Plan", "required"],
  ["Legal Opinion", "required"],
  ["Market Data API", "future"],
  ["Exchange Listing Docs", "future"],
];

const UPGRADE_500_GROUPS = [
  ["Product", 70, "onboarding, clarity, tooltips, explainers, user confidence"],
  ["Token", 70, "ELM gas, staking, rewards, treasury, marketplace design"],
  ["Contracts", 60, "audit checklist, contract gates, security status"],
  ["Science", 70, "simulation adapters, validation, model pipeline"],
  ["Infra", 70, "accounts, APIs, workers, analytics, monitoring"],
  ["Compliance", 60, "terms, risk, privacy, token disclaimers"],
  ["Growth", 50, "pricing, creator cards, enterprise plans"],
  ["Exchange", 50, "listing readiness, liquidity, market integration"],
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
  return { num: Number(num), sym, name, thetaBase: Number(theta), family };
});

const CHALLENGES = [
  { title: "Weekly Challenge", pair: ["Fe", "Ru"], copy: "Trigger a Legendary ZDAR with Fe / Ru." },
  { title: "Community Favourite", pair: ["Ti", "W"], copy: "Explore the transition-metal high stability lane." },
  { title: "Today's Rarest", pair: ["Al", "Pt"], copy: "Test an Aluminium-origin rare structure." },
];

const ROADMAP = [
  "Public demo validation",
  "User accounts + cloud saves",
  "Real wallet integration",
  "Creator structure marketplace",
  "API for external simulations",
  "Community ZDAR seasons",
];

const PARTICLES = Array.from({ length: 56 }, (_, i) => ({
  id: i,
  left: (i * 37) % 100,
  top: (i * 61) % 100,
  size: 2 + (i % 4),
  delay: (i % 12) * 0.3,
  duration: 7 + (i % 9),
  tone: i % 3 === 0 ? "bg-fuchsia-300" : i % 3 === 1 ? "bg-cyan-300" : "bg-blue-300",
}));

const DEFAULT_PROFILE = {
  username: "",
  favouriteElement: "Al",
  xp: 0,
  level: 1,
  simulationsRun: 0,
  zdarCount: 0,
  elm: 2000000,
  credits: 5,
  stakedElm: 0,
  walletConnected: false,
  walletAddress: "",
  history: [],
  favourites: [],
  zdarDiscoveries: [],
  telemetryReceipts: [],
  validatorScore: 0,
  networkReputation: 1,
  onboardingComplete: false,
  firstStructureSeen: false,
};

function loadProfile() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

function saveProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {}
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function hashString(value) {
  return value.split("").reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 9973, 7);
}


function makeTelemetryReceipt({ profile, pair, result, settings }) {
  const payload = `${profile.username}|${pair.join("-")}|${result.seed}|${result.stability}|${settings.origin}`;
  const hash = hashString(payload).toString(16).toUpperCase().padStart(4, "0");
  return {
    id: `POT-${result.id}-${hash}`,
    hash: `0xTEL${hash}${result.seed}`,
    model: "ARM-POT-v2.demo",
    pair: [...pair],
    stability: result.stability,
    rarity: result.rarity,
    seed: result.seed,
    validatorScore: Math.min(99, Math.max(71, Math.round((result.confidence + result.stability) / 2))),
    timestamp: new Date().toISOString(),
    signals: TELEMETRY_SIGNALS.slice(0, result.zdar ? 10 : 8),
  };
}

function telemetryInsight(pair, result) {
  if (result.zdar) return "Telemetry confirms a high-value ZDAR event. Save, share, and replay this receipt.";
  if (result.stability > 82) return "High-stability run detected. Validator confidence is strong; try adjacent transition metals.";
  if (result.stability > 60) return "Moderate structure forming. Discovery engine recommends a ZDAR hunt path.";
  return "Low-stability output. Use random discovery or ARM origin switching to find stronger telemetry.";
}


function buildElement(element, settings) {
  let theta = element.thetaBase + settings.calibration;
  if (settings.origin === element.sym) theta = 0;
  theta = clamp(theta, 0, 180);
  const rad = (theta * Math.PI) / 180;
  const nor = Math.round(900 * Math.sin(rad) ** 2);
  const sor = Math.abs(theta - 90);
  return {
    ...element,
    theta,
    nor,
    sor,
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
  const seed = hashString(pair.join("-"));
  const deterministicNoise = ((seed % 17) - 8) / 2;
  const specialZDAR = ["Fe-Ru", "Ru-Fe", "Co-Rh", "Rh-Co"].includes(pair.join("-"));
  const zdar = specialZDAR || delta <= settings.zdarThreshold;
  const stability = clamp(Math.round(avgNor / 10 - delta * 0.15 + 8 + deterministicNoise + (zdar ? 15 : 0)), 0, 100);
  const cost = Math.max(3, Math.round(5 + delta / 6 + (zdar ? 3 : 0)));
  const rarity =
    zdar ? "⚡ ZDAR — Legendary Alignment" :
    stability > 84 ? "🟣 Epic" :
    stability > 68 ? "🔵 Rare" :
    stability > 42 ? "🟡 Experimental" : "⚪ Volatile";
  return {
    seed,
    stability,
    zdar,
    delta: Math.round(delta * 10) / 10,
    cost,
    structure:
      stability > 82 ? "Cubic Prime Lattice" :
      stability > 62 ? "Hex Structured Field" :
      stability > 38 ? "Reactive Distortion Grid" : "Chaotic Field",
    rarity,
    strength: Math.round((stability + clamp(100 - delta, 0, 100)) / 2),
    confidence: clamp(Math.round(76 + stability * 0.19 - delta * 0.08), 48, 99),
    id: `ELM-${pair.join("").toUpperCase()}-${seed}-${stability}`,
  };
}

function ShineLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <div className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40 transition-all duration-700 group-hover:left-full" />
    </div>
  );
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


function TelemetryBackbonePanel({ receipt, result, pair }) {
  const activeReceipt = receipt || {
    id: "POT-WAITING-FOR-RUN",
    hash: "0xTELPENDING",
    model: "ARM-POT-v2.demo",
    validatorScore: result.confidence,
    signals: TELEMETRY_SIGNALS.slice(0, 5),
  };

  return (
    <Card title="Proof of Telemetry Backbone" kicker="invisible intelligence engine">
      <div className="mt-4 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-500/10 p-4 shadow-[0_0_55px_rgba(34,211,238,.12)] sm:rounded-[2rem] sm:p-5">
        <div className="text-[10px] font-black uppercase tracking-[0.26em] text-cyan-200 sm:tracking-[0.32em]">
          Telemetry Receipt
        </div>

        <div className="mt-2 max-w-full overflow-hidden rounded-2xl border border-cyan-300/15 bg-slate-950/55 p-3">
          <div className="break-all font-mono text-[11px] leading-5 text-cyan-50 sm:text-sm">
            {activeReceipt.id}
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="min-w-0 rounded-2xl border border-white/10 bg-slate-950/55 p-3">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Receipt Hash</div>
            <div className="mt-1 break-all font-mono text-xs font-black text-white">{activeReceipt.hash}</div>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-slate-950/55 p-3">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Model</div>
            <div className="mt-1 break-words text-base font-black text-white">{activeReceipt.model}</div>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-slate-950/55 p-3">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Validator</div>
            <div className="mt-1 text-2xl font-black text-white">{activeReceipt.validatorScore}%</div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/55 p-4 text-sm leading-6 text-slate-300">
          {telemetryInsight(pair, result)}
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {activeReceipt.signals.map((signal, index) => (
          <div key={`${signal}-${index}`} className="min-w-0 rounded-xl border border-white/10 bg-slate-950/45 p-3 text-xs font-bold text-slate-200">
            <span className="mr-2 text-emerald-300">●</span>
            <span className="break-words">{signal}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ValidatorLayerPanel({ receipt }) {
  return (
    <Card title="Validator Layer" kicker="mock consensus checks">
      <div className="mt-4 grid gap-3">
        {VALIDATORS.map(([id, purpose, base]) => {
          const score = receipt ? Math.min(99, Math.round((base + receipt.validatorScore) / 2)) : base;
          return (
            <div key={id} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-mono text-xs font-black text-cyan-200">{id}</div>
                  <div className="mt-1 text-sm text-slate-400">{purpose}</div>
                </div>
                <div className="text-2xl font-black text-white">{score}%</div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" style={{ width: `${score}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function TelemetryArchitecturePanel() {
  return (
    <Card title="Version 2 Architecture" kicker="150-upgrade system map">
      <div className="mt-4 grid gap-3">
        {TELEMETRY_LAYERS.map(([title, desc]) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
            <div className="font-black text-white">{title}</div>
            <div className="mt-1 text-sm leading-6 text-slate-400">{desc}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TelemetryUpgradeMatrix() {
  return (
    <Card title="150 Upgrade Matrix" kicker="proof-of-telemetry coverage">
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {TELEMETRY_UPGRADE_GROUPS.map(([label, count, desc]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="font-black text-white">{label}</div>
              <div className="rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-3 py-1 text-xs font-black text-fuchsia-100">{count}</div>
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-400">{desc}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function LiveTelemetryEnginePanel({ profile, receipt }) {
  const reputation = profile.networkReputation || 1;
  const receiptCount = profile.telemetryReceipts?.length || 0;
  return (
    <Card title="Live Telemetry Engine" kicker="demo network intelligence">
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Metric label="Receipts Saved" value={receiptCount} sub="local profile" />
        <Metric label="Network Rep" value={reputation} sub="demo level" />
        <Metric label="Latest Proof" value={receipt ? "Valid" : "Pending"} sub={receipt ? receipt.hash : "run required"} />
      </div>
      <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4 text-sm text-emerald-50/85">
        This engine makes every simulation feel traceable: input pair, deterministic seed, score, validator pass, and profile persistence.
      </div>
    </Card>
  );
}

function TelemetryRoadmapPanel() {
  return (
    <Card title="Telemetry Roadmap" kicker="future protocol layer">
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {TELEMETRY_ROADMAP.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm font-bold text-slate-200">
            <span className="mr-2 text-cyan-300">✦</span>{item}
          </div>
        ))}
      </div>
    </Card>
  );
}

function TelemetryConsole({ receipt }) {
  const lines = receipt
    ? [
        `receipt.id=${receipt.id}`,
        `hash=${receipt.hash}`,
        `model=${receipt.model}`,
        `validator.score=${receipt.validatorScore}%`,
        `signals=${receipt.signals.length}`,
      ]
    : ["awaiting simulation receipt...", "run simulation to generate proof trail", "validator layer idle"];

  return (
    <Card title="Telemetry Console" kicker="proof trail output">
      <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-black/60 p-4 font-mono text-xs leading-6 text-emerald-100">
        {lines.map((line) => <div key={line}>&gt; {line}</div>)}
      </div>
    </Card>
  );
}

function TelemetryDiscoveryAssistant({ pair, result, receipt }) {
  const recommendation = result.zdar
    ? "Publish this as a ZDAR proof event. It has deterministic replay value."
    : result.stability > 80
      ? "Strong candidate. Try Find ZDAR or switch ARM origin to Ru/Fe for a tighter proof trail."
      : "Run discovery mode. Validator confidence is forming but not yet rare enough.";
  return (
    <Card title="AI-Assisted Telemetry Discovery" kicker="demo intelligence layer">
      <div className="mt-4 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-500/10 p-4">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-200">Recommendation</div>
        <div className="mt-2 text-lg font-black text-white">{recommendation}</div>
        <div className="mt-3 text-sm text-slate-300">
          Pair: {pair.join(" / ")} • Stability: {result.stability}% • Proof: {receipt ? receipt.id : "pending"}
        </div>
      </div>
    </Card>
  );
}



function HelpTip({ title, children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="ml-2 inline-grid h-6 w-6 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-black text-cyan-100 transition hover:scale-110"
        aria-label={`Help: ${title}`}
      >
        ?
      </button>
      {open && (
        <span className="absolute right-0 top-8 z-50 w-72 rounded-2xl border border-cyan-300/25 bg-slate-950/95 p-4 text-left text-xs font-medium leading-5 text-slate-200 shadow-[0_0_60px_rgba(34,211,238,.22)] backdrop-blur-xl">
          <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">{title}</span>
          {children}
        </span>
      )}
    </span>
  );
}

function ReadinessPanel() {
  return (
    <Card title="Production Readiness Matrix" kicker="500-upgrade layer">
      <div className="mt-4 grid gap-3">
        {PRODUCTION_READINESS.map(([name, status, detail]) => (
          <div key={name} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center font-black text-white">
                  {name}
                  <HelpTip title={name}>{detail}</HelpTip>
                </div>
                <div className="mt-1 text-sm leading-6 text-slate-400">{detail}</div>
              </div>
              <div className="shrink-0 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">{status}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TokenEconomyPanel() {
  return (
    <Card title="Real Token Economy Blueprint" kicker="ELM utility design">
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {TOKEN_ECONOMY_MODULES.map(([name, desc]) => (
          <div key={name} className="rounded-2xl border border-fuchsia-300/15 bg-fuchsia-500/10 p-4">
            <div className="flex items-center font-black text-white">{name}<HelpTip title={name}>{desc}</HelpTip></div>
            <div className="mt-1 text-sm leading-6 text-slate-300">{desc}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-yellow-300/20 bg-yellow-400/10 p-4 text-sm leading-6 text-yellow-50/85">
        Demo status: this is a product blueprint. No real token transfer, wallet signing, staking, or exchange activity is active in this frontend build.
      </div>
    </Card>
  );
}

function SmartContractAuditPanel() {
  return (
    <Card title="Audited Smart Contract Gate" kicker="security readiness">
      <div className="mt-4 grid gap-2">
        {CONTRACT_AUDIT_CHECKLIST.map((item, index) => (
          <div key={item} className="rounded-xl border border-white/10 bg-slate-950/45 p-3 text-sm text-slate-200">
            <span className={index < 2 ? "mr-2 text-emerald-300" : "mr-2 text-yellow-300"}>{index < 2 ? "✓" : "•"}</span>{item}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-red-300/20 bg-red-500/10 p-4 text-sm leading-6 text-red-50/85">
        Mainnet gate: do not launch real ELM contracts until professional legal review, security audit, testnet trial, bug bounty, and deployment controls are complete.
      </div>
    </Card>
  );
}

function MonetizationPanel() {
  return (
    <Card title="Monetization Stack" kicker="pricing experiments">
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {MONETIZATION_STACK.map(([tier, price, detail]) => (
          <div key={tier} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{tier}</div>
            <div className="mt-1 text-3xl font-black text-white">{price}</div>
            <div className="mt-1 text-sm text-slate-300">{detail}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ScienceEnginePanel() {
  return (
    <Card title="Scientific Simulation Engine Layer" kicker="real science path">
      <div className="mt-4 grid gap-3">
        {SCIENCE_ENGINE_STACK.map(([name, status, detail]) => (
          <div key={name} className="rounded-2xl border border-emerald-300/15 bg-emerald-500/10 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-black text-white">{name}</div>
              <div className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100">{status}</div>
            </div>
            <div className="mt-1 text-sm leading-6 text-slate-300">{detail}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function InfrastructureScalePanel() {
  return (
    <Card title="Infrastructure Scale Plan" kicker="production architecture">
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {INFRA_SCALE_STACK.map(([name, detail]) => (
          <div key={name} className="rounded-2xl border border-cyan-300/15 bg-cyan-500/10 p-4">
            <div className="font-black text-white">{name}</div>
            <div className="mt-1 text-sm text-slate-300">{detail}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CompliancePanel() {
  return (
    <Card title="Legal / Compliance Checklist" kicker="trust layer">
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {COMPLIANCE_STACK.map((item) => (
          <div key={item} className="rounded-xl border border-yellow-300/15 bg-yellow-400/5 p-3 text-sm text-yellow-50/90">
            <span className="mr-2 text-yellow-300">•</span>{item}
          </div>
        ))}
      </div>
    </Card>
  );
}

function ExchangeIntegrationPanel() {
  return (
    <Card title="Exchange Integration Readiness" kicker="future liquidity path">
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {EXCHANGE_READINESS.map(([name, status]) => (
          <div key={name} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
            <div className="font-black text-white">{name}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.2em] text-fuchsia-200">{status}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-red-300/20 bg-red-500/10 p-4 text-sm leading-6 text-red-50/85">
        Exchange readiness requires legal, audited contracts, tokenomics, liquidity strategy, market-making plan, jurisdiction review, and risk disclosures.
      </div>
    </Card>
  );
}

function Upgrade500MatrixPanel() {
  return (
    <Card title="500 Upgrade Application Matrix" kicker="coverage map">
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {UPGRADE_500_GROUPS.map(([group, count, detail]) => (
          <div key={group} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="font-black text-white">{group}</div>
              <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-black text-cyan-100">{count}</div>
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-400">{detail}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}


function Metric({ label, value, sub }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/55 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] sm:p-4">
      <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{label}</div>
      <div className="mt-1 break-words text-xl font-black text-white tabular-nums sm:text-2xl">{value}</div>
      {sub && <div className="mt-1 text-xs text-cyan-200/70">{sub}</div>}
    </div>
  );
}

function Card({ title, kicker, children, className = "" }) {
  return (
    <div className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-4 shadow-[0_24px_80px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-2xl transition duration-300 hover:border-cyan-300/25 sm:rounded-[2rem] sm:p-5 ${className}`}>
      <ShineLayer />
      {kicker && <div className="mb-1 text-[10px] uppercase tracking-[0.32em] text-cyan-300">{kicker}</div>}
      <h2 className="flex items-center text-xl font-black tracking-tight text-white">{title}<HelpTip title={title}>This panel explains one part of the ELM platform. Use it to understand what the window does, what is real today, and what would connect in production.</HelpTip></h2>
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled = false, className = "" }) {
  return (
    <button disabled={disabled} onClick={onClick} className={`rounded-2xl bg-cyan-300 p-4 font-black text-slate-950 shadow-[0_0_35px_rgba(34,211,238,.35)] transition hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, disabled = false, className = "" }) {
  return (
    <button disabled={disabled} onClick={onClick} className={`rounded-2xl border border-white/10 bg-white/10 p-3 font-bold text-white transition hover:bg-white/15 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>
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
        className="w-full appearance-none rounded-2xl border border-cyan-300/20 bg-slate-950/90 px-3 py-3 font-bold text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_0_25px_rgba(34,211,238,.08)] outline-none transition hover:border-cyan-300/40 focus:border-fuchsia-300/50 focus:ring-2 focus:ring-fuchsia-300/20 sm:px-4 sm:py-4"
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

function OnboardingModal({ profile, elements, onComplete }) {
  const [username, setUsername] = useState(profile.username || "");
  const [favouriteElement, setFavouriteElement] = useState(profile.favouriteElement || "Al");

  if (profile.onboardingComplete) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/85 p-3 backdrop-blur-xl sm:p-4">
      <div className="mx-auto my-4 w-full max-w-2xl rounded-[1.5rem] border border-cyan-300/25 bg-slate-950 p-4 shadow-[0_0_120px_rgba(34,211,238,.25)] sm:my-8 sm:rounded-[2rem] sm:p-6">
        <div className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-300">Welcome to ElementOS</div>
        <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-6xl">Create your demo profile.</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          This saves your simulation history, favourites, ZDAR discoveries, and profile progress locally in your browser.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label>
            <div className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">Username</div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. RoperPrime"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 font-bold text-white outline-none focus:border-cyan-300/50"
            />
          </label>
          <ElementSelect
            value={favouriteElement}
            onChange={setFavouriteElement}
            elements={elements}
            label="Favourite Element"
          />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Metric label="Saved History" value="Local" sub="browser storage" />
          <Metric label="Profile XP" value="Enabled" sub="progression" />
          <Metric label="ZDAR Cards" value="Persistent" sub="demo profile" />
        </div>
        <PrimaryButton
          className="mt-5 w-full"
          onClick={() => onComplete(username.trim() || "Element Explorer", favouriteElement)}
        >
          Enter Proof of Telemetry Layer
        </PrimaryButton>
      </div>
    </div>
  );
}

function TopNav({ profile, setShowApp, showApp }) {
  return (
    <nav className="sticky top-2 z-50 mx-auto mb-4 flex max-w-7xl flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-slate-950/70 px-3 py-3 shadow-[0_20px_80px_rgba(0,0,0,.35)] backdrop-blur-2xl sm:top-4 sm:mb-5 sm:px-5">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 font-black text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,.25)]">E</div>
        <div>
          <div className="flex items-center gap-2 text-sm font-black tracking-tight"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.9)]" />ElementOS</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Persistent Demo</div>
        </div>
      </div>
      <div className="hidden items-center gap-2 md:flex">
        <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-100">Profile Saved</span>
        <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100">Level {profile.level}</span>
        <span className="rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-fuchsia-100">{profile.zdarCount} ZDAR</span>
      </div>
      {!showApp && <PrimaryButton onClick={() => setShowApp(true)} className="px-4 py-2 text-sm">Enter App</PrimaryButton>}
    </nav>
  );
}

function LandingPage({ onLaunch, profile }) {
  return (
    <section className="relative overflow-hidden rounded-[1.8rem] border border-cyan-300/20 bg-white/[0.065] p-4 shadow-[0_30px_140px_rgba(0,0,0,.5)] backdrop-blur-2xl sm:rounded-[2.75rem] sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.22),transparent_32%),radial-gradient(circle_at_85%_35%,rgba(217,70,239,.18),transparent_30%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <div className="mb-3 inline-flex rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-fuchsia-100">Proof of Telemetry Layer</div>
          <br />
          <div className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.35em] text-cyan-200">{BRAND.name}</div>
          <h1 className="mt-5 bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300 bg-clip-text text-4xl font-black leading-[0.95] tracking-tight text-transparent sm:text-6xl md:text-8xl">
            Proof-backed simulations. Persistent discovery. ZDAR events.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-xl sm:leading-8">{BRAND.manifesto}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Local Profile", "Saved History", "ZDAR Cards", "Deterministic Results", "Demo Wallet"].map((pill) => (
              <span key={pill} className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-200">{pill}</span>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            {["Create profile", "Pick elements", "Run simulation", "Save card"].map((step, i) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                <div className="text-[10px] font-black uppercase tracking-[0.26em] text-cyan-300">Step {i + 1}</div>
                <div className="mt-1 text-sm font-bold text-white">{step}</div>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryButton onClick={onLaunch}>{profile.username ? `Launch as ${profile.username}` : "Launch Demo"}</PrimaryButton>
          </div>
          <div className="mt-5 rounded-[2rem] border border-yellow-300/25 bg-yellow-400/10 p-4 text-yellow-50">
            <div className="text-[10px] font-black uppercase tracking-[0.32em] text-yellow-200">Public Demo Notice</div>
            <p className="mt-2 text-sm text-yellow-50/85">
              Frontend-only demo. Profile saves use localStorage. Wallet, ELM gas, telemetry receipts, validator checks, activity feed, and market stats are simulated for product validation.
            </p>
          </div>
        </div>

        <div className="relative min-h-[300px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-950/70 p-4 shadow-[0_0_100px_rgba(34,211,238,.18)] sm:min-h-[520px] sm:rounded-[2.5rem] sm:p-5">
          <div className="absolute inset-16 rounded-full border border-cyan-300/15 shadow-[0_0_70px_rgba(34,211,238,.18)] [transform:rotateX(64deg)_rotateZ(12deg)]" />
          <div className="absolute inset-24 rounded-full border border-fuchsia-300/15 shadow-[0_0_70px_rgba(217,70,239,.14)] [transform:rotateX(28deg)_rotateY(45deg)]" />
          <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-200 bg-cyan-300/15 text-4xl font-black shadow-[0_0_80px_rgba(34,211,238,.75)] sm:h-36 sm:w-36 sm:text-6xl">{profile.favouriteElement || "Al"}</div>
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-fuchsia-300/25 bg-fuchsia-500/10 p-4 text-fuchsia-100 shadow-[0_0_50px_rgba(217,70,239,.22)]">
            <div className="text-xs uppercase tracking-[.3em]">Profile State</div>
            <div className="text-2xl font-black">{profile.username || "Element Explorer"}</div>
            <div className="text-sm opacity-80">Level {profile.level} • {profile.simulationsRun} simulations • {profile.zdarCount} ZDAR</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfilePanel({ profile, elements, onProfileUpdate, onReset }) {
  return (
    <Card title="My ElementOS Profile" kicker="persistent local identity">
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label>
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">Username</div>
          <input
            value={profile.username}
            onChange={(e) => onProfileUpdate({ username: e.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 p-3 font-bold text-white outline-none focus:border-cyan-300/50"
          />
        </label>
        <ElementSelect
          value={profile.favouriteElement}
          onChange={(value) => onProfileUpdate({ favouriteElement: value })}
          elements={elements}
          label="Favourite Element"
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Metric label="Level" value={profile.level} sub={`${profile.xp} XP`} />
        <Metric label="Runs" value={profile.simulationsRun} sub="saved total" />
        <Metric label="ZDAR Count" value={profile.zdarCount} sub="legendary hits" />
        <Metric label="Cards" value={profile.zdarDiscoveries.length} sub="saved structures" />
      </div>
      <GhostButton onClick={onReset} className="mt-4 w-full border-red-300/30 bg-red-500/10 text-red-100">Reset Local Demo Profile</GhostButton>
    </Card>
  );
}

function MockWalletPanel({ profile, onConnect, onDisconnect, onTopUp, onStake, onBuyCredits }) {
  const statusTone = profile.walletConnected
    ? "border-emerald-300/35 bg-emerald-500/10 text-emerald-100"
    : "border-yellow-300/35 bg-yellow-500/10 text-yellow-100";

  const transactions = [
    ["Demo gas reserve", profile.elm.toLocaleString(), "ELM"],
    ["Available credits", profile.credits, "runs"],
    ["Staked balance", profile.stakedElm.toLocaleString(), "ELM"],
  ];

  return (
    <Card title="Demo Wallet Command Centre" kicker="simulated finance layer" className="md:col-span-2 xl:col-span-3">
      <div className="mt-5 grid gap-5">
        <div className={`relative overflow-hidden rounded-[2rem] border p-5 ${statusTone} shadow-[0_0_60px_rgba(34,211,238,.10)]`}>
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-fuchsia-300/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="inline-flex rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.26em] text-slate-200">
                {profile.walletConnected ? "Demo Wallet Connected" : "Demo Wallet Offline"}
              </div>
              <div className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
                {profile.walletConnected ? "Ready to Simulate" : "Connect to Continue"}
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                This wallet is a simulated testnet-style interface. It powers demo ELM gas, credits, staking, and simulation runs without real blockchain transactions.
              </p>
            </div>

            <div className="shrink-0 rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4 text-left lg:min-w-[280px]">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">Wallet Address</div>
              <div className="mt-2 break-all rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-3 font-mono text-xs leading-5 text-cyan-100">
                {profile.walletConnected ? profile.walletAddress : "No demo wallet connected"}
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                <span className={`h-2 w-2 rounded-full ${profile.walletConnected ? "bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.9)]" : "bg-yellow-300 shadow-[0_0_12px_rgba(250,204,21,.65)]"}`} />
                {profile.walletConnected ? "Demo session active" : "Awaiting connection"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {transactions.map(([label, value, unit]) => (
            <div key={label} className="rounded-[1.6rem] border border-white/10 bg-slate-950/55 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">{label}</div>
              <div className="mt-2 flex items-end justify-between gap-3">
                <div className="text-3xl font-black text-white tabular-nums">{value}</div>
                <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">{unit}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.28em] text-fuchsia-300">Wallet Actions</div>
              <div className="mt-1 text-sm text-slate-400">Clear, spacious controls designed for desktop and mobile.</div>
            </div>
            <div className="rounded-full border border-yellow-300/25 bg-yellow-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-100">
              Demo Only
            </div>
          </div>

          <div className="grid gap-3">
            {!profile.walletConnected ? (
              <PrimaryButton onClick={onConnect} className="w-full text-base">Connect Demo Wallet</PrimaryButton>
            ) : (
              <GhostButton onClick={onDisconnect} className="w-full border-emerald-300/25 bg-emerald-500/10 text-emerald-100">Disconnect Demo Wallet</GhostButton>
            )}

            <div className="grid gap-3 sm:grid-cols-3">
              <GhostButton disabled={!profile.walletConnected} onClick={onTopUp} className="min-h-[64px]">
                <div className="text-sm font-black">Add Demo Funds</div>
                <div className="mt-1 text-[10px] font-normal uppercase tracking-[0.18em] text-slate-400">+500 ELM</div>
              </GhostButton>
              <GhostButton disabled={!profile.walletConnected} onClick={onBuyCredits} className="min-h-[64px]">
                <div className="text-sm font-black">Buy Credits</div>
                <div className="mt-1 text-[10px] font-normal uppercase tracking-[0.18em] text-slate-400">+5 Runs</div>
              </GhostButton>
              <GhostButton disabled={!profile.walletConnected} onClick={onStake} className="min-h-[64px]">
                <div className="text-sm font-black">Stake Demo ELM</div>
                <div className="mt-1 text-[10px] font-normal uppercase tracking-[0.18em] text-slate-400">100 ELM</div>
              </GhostButton>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          <div className="rounded-2xl border border-cyan-300/15 bg-cyan-500/10 p-4 text-sm text-cyan-50/85">
            <b className="text-cyan-100">Gas Preview:</b> simulations consume credits first, then demo ELM.
          </div>
          <div className="rounded-2xl border border-fuchsia-300/15 bg-fuchsia-500/10 p-4 text-sm text-fuchsia-50/85">
            <b className="text-fuchsia-100">ZDAR Reward:</b> legendary hits add bonus demo ELM.
          </div>
          <div className="rounded-2xl border border-yellow-300/15 bg-yellow-400/10 p-4 text-sm text-yellow-50/85">
            <b className="text-yellow-100">Transparency:</b> no real wallet, token, or payment is connected.
          </div>
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
    <div className="relative mt-4 h-[300px] overflow-hidden sm:h-[450px] rounded-[1.6rem] border border-white/10 bg-slate-950 shadow-[0_0_90px_rgba(34,211,238,.16)] sm:h-[450px] sm:rounded-[2rem]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_50%,rgba(249,115,22,.18),transparent_28%),radial-gradient(circle_at_72%_50%,rgba(34,211,238,.18),transparent_28%),radial-gradient(circle_at_50%_50%,rgba(217,70,239,.16),transparent_22%)]" />
      <div className="absolute left-[25%] top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/20 shadow-[0_0_55px_rgba(249,115,22,.25)] [transform:translate(-50%,-50%)_rotateX(62deg)_rotateZ(-18deg)] sm:h-60 sm:w-60" />
      <div className="absolute left-[25%] top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/20 shadow-[0_0_70px_rgba(249,115,22,.8)] sm:h-28 sm:w-28" />
      <div className="absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-2xl font-black text-orange-100 sm:text-4xl">{left}</div>
        <div className="text-[10px] uppercase tracking-[.25em] text-orange-200/70">primary</div>
      </div>
      <div className="absolute right-[25%] top-1/2 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 shadow-[0_0_55px_rgba(34,211,238,.25)] [transform:translate(50%,-50%)_rotateX(62deg)_rotateZ(18deg)] sm:h-60 sm:w-60" />
      <div className="absolute right-[25%] top-1/2 h-20 w-20 translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 shadow-[0_0_70px_rgba(34,211,238,.8)] sm:h-28 sm:w-28" />
      <div className="absolute right-[25%] top-1/2 translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-2xl font-black text-cyan-100 sm:text-4xl">{right}</div>
        <div className="text-[10px] uppercase tracking-[.25em] text-cyan-200/70">secondary</div>
      </div>
      <div className={`absolute left-1/2 top-1/2 ${beamWidth} -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ${beamGlow}`} />
      <div className={`absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 sm:h-16 sm:w-16 ${result.zdar ? "scale-125 bg-fuchsia-300 shadow-[0_0_110px_rgba(217,70,239,1)]" : "bg-cyan-300 shadow-[0_0_55px_rgba(34,211,238,.75)]"}`} />
      <div className="absolute left-1/2 top-[37%] -translate-x-1/2 text-center">
        <div className="text-[10px] uppercase tracking-[.35em] text-slate-300">Stability</div>
        <div className="mt-1 text-3xl font-black text-white sm:text-4xl">{result.stability}%</div>
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-2xl border border-yellow-300/30 bg-yellow-400/10 px-4 py-3 text-center shadow-[0_0_30px_rgba(250,204,21,.2)]">
        <div className="text-sm font-black text-yellow-200 sm:text-2xl">{result.rarity}</div>
      </div>
    </div>
  );
}

function OrbitalSystem({ elements, pair, setPairAt, settings, result }) {
  const origin = elements.find((e) => e.sym === settings.origin) || elements[0];
  const active = new Set(pair);
  const featured = elements.filter((e) => e.sym === origin.sym || e.influence > 55 || active.has(e.sym)).slice(0, 42);

  return (
    <div className="relative mt-4 h-[340px] overflow-hidden sm:h-[420px] rounded-[2rem] border border-cyan-300/20 bg-slate-950 shadow-[0_0_120px_rgba(34,211,238,0.22)] sm:aspect-square sm:h-auto sm:max-h-[720px] sm:rounded-[3rem]">
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
        const size = isActive ? 60 : 26 + Math.max(0, depth) * 10;
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
        className="absolute left-1/2 top-1/2 z-40 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan-200 bg-cyan-300/15 text-cyan-50 shadow-[0_0_90px_rgba(34,211,238,.9)] backdrop-blur-xl transition hover:scale-105 sm:h-36 sm:w-36"
      >
        <div className="text-[10px] uppercase tracking-[0.3em]">ARM</div>
        <div className="text-4xl font-black sm:text-6xl">{origin.sym}</div>
      </button>
      <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-slate-950/70 p-3 backdrop-blur-xl">
        <Metric label="Confidence" value={`${result.confidence}%`} />
        <Metric label="Rarity" value={result.rarity.split(" ")[0]} />
        <Metric label="Seed" value={result.seed} />
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

function ScanPhases({ phase }) {
  const phases = ["orbital sync", "stability convergence", "field resonance", "structure lock"];
  return (
    <div className="mt-4 rounded-[2rem] border border-cyan-300/30 bg-cyan-500/10 p-4 text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,.22)]">
      <div className="text-xs font-black uppercase tracking-[0.32em]">Multi-phase scan</div>
      <div className="mt-3 grid gap-2 sm:grid-cols-4">
        {phases.map((p, i) => (
          <div key={p} className={`rounded-xl border p-3 text-xs font-bold ${phase >= i ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100" : "border-white/10 bg-white/5 text-slate-500"}`}>
            {i + 1}. {p}
          </div>
        ))}
      </div>
    </div>
  );
}

function DiscoveryEngine({ onSelect, onRandom, ranking }) {
  return (
    <Card title="Discovery Engine" kicker="ecosystem hooks">
      <div className="mt-4 grid gap-3">
        {CHALLENGES.map((challenge) => (
          <button key={challenge.title} onClick={() => onSelect(challenge.pair)} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-left transition hover:border-cyan-300/30 hover:bg-white/10">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-black text-white">{challenge.title}</div>
                <div className="mt-1 text-sm text-slate-400">{challenge.copy}</div>
              </div>
              <div className="text-xl font-black text-cyan-200">{challenge.pair.join(" / ")}</div>
            </div>
          </button>
        ))}
        <GhostButton onClick={onRandom} className="w-full">🎲 Random Discovery Mode</GhostButton>
        <div className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-500/10 p-4 text-sm text-fuchsia-100">
          Today's strongest deterministic candidate: <b>{ranking[0]?.sym}</b> at {ranking[0]?.sim?.stability}%.
        </div>
      </div>
    </Card>
  );
}

function CollectibleResultCard({ pair, result, shareText, onShare, onDownload, isSaved }) {
  return (
    <Card title="Collectible Structure Card" kicker="owned social object">
      <div className={`relative mt-4 overflow-hidden rounded-[2rem] border p-5 ${result.zdar ? "border-fuchsia-300/50 bg-fuchsia-500/15 shadow-[0_0_70px_rgba(217,70,239,.32)]" : "border-cyan-300/25 bg-cyan-500/10"}`}>
        <div className="absolute right-4 top-4 rounded-full border border-yellow-300/20 bg-yellow-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-yellow-100">Demo Card</div>
        <div className="text-[10px] font-black uppercase tracking-[0.34em] text-slate-300">Structure ID</div>
        <div className="mt-2 font-mono text-xs text-cyan-100">{result.id}</div>
        <div className="mt-4 text-4xl font-black text-white">{pair.join(" / ")}</div>
        <div className="mt-2 text-xl font-black text-fuchsia-200">{result.rarity}</div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Metric label="Stability" value={`${result.stability}%`} />
          <Metric label="Strength" value={result.strength} />
          <Metric label="Seed" value={result.seed} />
        </div>
        <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200">
          {isSaved ? "Saved to your local profile showcase." : "Run the simulation to save this card into your local discovery showcase."}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <PrimaryButton onClick={onShare}>📤 Generate Share Text</PrimaryButton>
          <GhostButton onClick={onDownload}>⬇ Download Text Card</GhostButton>
        </div>
        {shareText && <div className="mt-3 rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-3 text-xs text-cyan-100">{shareText}</div>}
      </div>
    </Card>
  );
}

function ProfileShowcase({ profile }) {
  return (
    <Card title="Profile Showcase" kicker="owned discoveries">
      <div className="mt-4 grid gap-3">
        {profile.zdarDiscoveries.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-sm text-slate-400">
            No ZDAR cards saved yet. Run Fe / Ru or use Find ZDAR.
          </div>
        ) : (
          profile.zdarDiscoveries.slice(0, 5).map((item) => (
            <div key={item.id} className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-500/10 p-4">
              <div className="font-black text-white">{item.pair.join(" / ")}</div>
              <div className="mt-1 text-xs text-fuchsia-100/70">{item.id} • {item.stability}% • {item.rarity}</div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

function ManifestoPanel() {
  return (
    <Card title="Platform Manifesto" kicker="why this exists">
      <p className="mt-4 text-sm leading-7 text-slate-300">{BRAND.manifesto}</p>
      <div className="mt-4 grid gap-2">
        {["Make element interaction visual.", "Turn simulation into discovery.", "Make rare alignments collectible.", "Build toward a science-native creator economy."].map((line) => (
          <div key={line} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">✦ {line}</div>
        ))}
      </div>
    </Card>
  );
}

function RoadmapPanel() {
  return (
    <Card title="Future Layers" kicker="platform roadmap">
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {ROADMAP.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm font-bold text-slate-200">{item}</div>
        ))}
      </div>
    </Card>
  );
}

function ARMAssistant({ pair, result }) {
  const line = result.zdar
    ? "ZDAR lock confirmed. Save this as a showcase card."
    : result.stability > 75
      ? "High stability detected. Try nearby transition metals for a stronger lock."
      : "Pair is forming but not locked. Use discovery mode to search for a stronger structure.";
  return (
    <Card title="ARM Assistant Demo" kicker="simulated analysis">
      <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4 text-emerald-100">
        <div className="text-[10px] font-black uppercase tracking-[0.3em]">Demo Interpretation</div>
        <div className="mt-2 text-lg font-black">{line}</div>
        <div className="mt-3 text-sm opacity-80">{pair.join(" / ")} • {result.stability}% stability • {result.delta}° delta</div>
      </div>
    </Card>
  );
}

function DemoTruthPanel() {
  const rows = [
    ["Real Today", "Live site, responsive UI, deterministic simulation, local profile saves."],
    ["Simulated Today", "Demo wallet, ELM gas, activity feed, market-like stats."],
    ["Not Live Yet", "Real blockchain, login accounts, database persistence."],
  ];
  return (
    <Card title="Real vs Simulated" kicker="demo transparency">
      <div className="mt-4 grid gap-3">
        {rows.map(([label, text]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
            <div className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">{label}</div>
            <div className="mt-2 text-sm leading-6 text-slate-300">{text}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function App() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [hydrated, setHydrated] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [settings, setSettings] = useState({ origin: "Al", calibration: 0, zdarThreshold: 2 });
  const [pair, setPair] = useState(["Al", "Fe"]);
  const [shareText, setShareText] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanPhase, setScanPhase] = useState(-1);
  const [structureUnlocked, setStructureUnlocked] = useState(false);
  const [latestReceipt, setLatestReceipt] = useState(null);

  useEffect(() => {
    setProfile(loadProfile());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveProfile(profile);
  }, [profile, hydrated]);

  const elements = useMemo(() => ELEMENTS.map((e) => buildElement(e, settings)), [settings]);
  const result = useMemo(() => simulate(elements, pair, settings), [elements, pair, settings]);
  const ranking = useMemo(
    () => elements.map((e) => ({ ...e, sim: simulate(elements, [settings.origin, e.sym], settings) })).sort((a, b) => b.sim.stability - a.sim.stability),
    [elements, settings]
  );

  function updateProfile(patch) {
    setProfile((current) => ({ ...current, ...patch }));
  }

  function completeOnboarding(username, favouriteElement) {
    updateProfile({ username, favouriteElement, onboardingComplete: true });
  }

  function setPairAt(index, symbol) {
    setPair((current) => current.map((value, i) => (i === index ? symbol : value)));
  }

  function connectWallet() {
    updateProfile({
      walletConnected: true,
      walletAddress: `0xELM${Math.random().toString(16).slice(2, 8).toUpperCase()}...${Math.random().toString(16).slice(2, 6).toUpperCase()}`,
    });
  }

  function run() {
    if (!profile.walletConnected) return setShareText("Connect demo wallet before running simulations.");
    if (profile.elm < result.cost && profile.credits <= 0) return setShareText("Not enough demo ELM or credits. Add demo funds to continue.");

    setScanning(true);
    setStructureUnlocked(false);
    setScanPhase(0);
    const phaseTimers = [0, 350, 700, 1050].map((delay, phase) => window.setTimeout(() => setScanPhase(phase), delay));

    window.setTimeout(() => {
      setProfile((current) => {
        const usedCredit = current.credits > 0;
        const nextXp = current.xp + result.stability;
        const nextLevel = Math.max(current.level, Math.floor(nextXp / 500) + 1);
        const receipt = makeTelemetryReceipt({ profile: current, pair, result, settings });
        setLatestReceipt(receipt);
        const savedRun = {
          ...result,
          receipt,
          pair: [...pair],
          createdAt: new Date().toISOString(),
        };
        const alreadyFav = current.favourites.includes(pair.join(" / "));
        const zdarDiscoveries = result.zdar
          ? [savedRun, ...current.zdarDiscoveries.filter((x) => x.id !== savedRun.id)].slice(0, 20)
          : current.zdarDiscoveries;

        return {
          ...current,
          credits: usedCredit ? current.credits - 1 : current.credits,
          elm: usedCredit ? current.elm + (result.zdar ? 20 : 2) : current.elm - result.cost + (result.zdar ? 20 : 2),
          xp: nextXp,
          level: nextLevel,
          simulationsRun: current.simulationsRun + 1,
          zdarCount: current.zdarCount + (result.zdar ? 1 : 0),
          firstStructureSeen: true,
          history: [savedRun, ...current.history].slice(0, 40),
          favourites: alreadyFav ? current.favourites : [pair.join(" / "), ...current.favourites].slice(0, 20),
          zdarDiscoveries,
          telemetryReceipts: [receipt, ...(current.telemetryReceipts || [])].slice(0, 50),
          validatorScore: receipt.validatorScore,
          networkReputation: Math.max(current.networkReputation || 1, nextLevel + (result.zdar ? 1 : 0)),
        };
      });
      setScanning(false);
      setScanPhase(3);
      setStructureUnlocked(true);
      phaseTimers.forEach(window.clearTimeout);
    }, 1450);
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

  function savePair() {
    const key = pair.join(" / ");
    setProfile((current) => ({ ...current, favourites: current.favourites.includes(key) ? current.favourites : [key, ...current.favourites].slice(0, 20) }));
  }

  function generateShareCard() {
    const text = `I triggered an ElementOS discovery ⚡\n\n${pair.join(" / ")} → ${result.stability}% stability\n${result.rarity}\nStructure ID: ${result.id}\n\nPublic demo: ${window.location.href}`;
    setShareText(text);
    if (navigator.share) {
      navigator.share({ title: "ElementOS Discovery", text, url: window.location.href }).catch(() => {});
    }
  }

  function downloadCard() {
    const content = `ElementOS Structure Card\n\nID: ${result.id}\nPair: ${pair.join(" / ")}\nRarity: ${result.rarity}\nStability: ${result.stability}%\nStructure: ${result.structure}\nSeed: ${result.seed}\n\nDemo card generated locally.`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${result.id}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function resetProfile() {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(DEFAULT_PROFILE);
    setShowApp(false);
  }

  if (!hydrated) return <div className="min-h-screen bg-slate-950 text-white" />;

  return (
    <>
      <OnboardingModal profile={profile} elements={elements} onComplete={completeOnboarding} />

      <div className="min-h-dvh overflow-x-hidden overflow-y-auto bg-slate-950 p-3 text-white sm:p-5">
        <style>{`
          @keyframes floatParticle {
            0% { transform: translate3d(0, 0, 0) scale(1); opacity: .18; }
            50% { transform: translate3d(22px, -34px, 0) scale(1.35); opacity: .65; }
            100% { transform: translate3d(-18px, 28px, 0) scale(.9); opacity: .28; }
          }
          @keyframes zdarPulse {
            0%, 100% { transform: scale(1); filter: brightness(1); }
            50% { transform: scale(1.025); filter: brightness(1.35); }
          }
          .zdar-active { animation: zdarPulse 1.4s ease-in-out infinite; }
        `}</style>

        <ParticleField />
        {result.zdar && <div className="pointer-events-none fixed inset-0 z-10 bg-fuchsia-500/10" />}
        <div className="fixed bottom-3 left-3 z-[70] hidden rounded-2xl border border-yellow-300/30 bg-slate-950/90 px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-yellow-100 shadow-[0_0_40px_rgba(250,204,21,.18)] backdrop-blur-xl sm:block">
          Demo Build • Production Blueprint
        </div>

        <TopNav profile={profile} setShowApp={setShowApp} showApp={showApp} />

        <div className="relative z-20 mx-auto max-w-7xl pb-10 sm:pb-0">
          {!showApp ? (
            <LandingPage onLaunch={() => setShowApp(true)} profile={profile} />
          ) : (
            <>
              <GhostButton onClick={() => setShowApp(false)} className="mb-4 px-4 py-2">← Back to Landing</GhostButton>

              <header className="rounded-[1.8rem] border border-cyan-300/20 bg-white/[0.065] p-4 shadow-[0_30px_120px_rgba(0,0,0,.45)] backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-7">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.5em] text-cyan-300">ElementOS — Proof of Telemetry Layer</div>
                    <h1 className="mt-2 bg-gradient-to-r from-white via-cyan-100 to-fuchsia-200 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl md:text-8xl">ARM CLOUD</h1>
                    <p className="mt-3 max-w-4xl text-lg text-slate-300">Telemetry receipts, validator checks, token-economy blueprint, smart-contract gates, monetization stack, scientific engine path, compliance roadmap, exchange-readiness, ZDAR cards, and local progression.</p>
                  </div>
                  <div className="grid w-full gap-3 sm:min-w-[360px] lg:w-auto">
                    <Metric label="Current Pair" value={pair.join(" / ")} sub="deterministic output" />
                    <Metric label="Profile" value={profile.username || "Explorer"} sub={`Level ${profile.level}`} />
                    <Metric label="Demo Wallet" value={profile.walletConnected ? "Connected" : "Offline"} sub={profile.walletConnected ? profile.walletAddress : "connect to run"} />
                  </div>
                </div>
              </header>

              <section className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6 sm:mt-5">
                <Metric label="Explorer Level" value={profile.level} sub={`${profile.xp} XP`} />
                <Metric label="Simulation Credits" value={profile.credits} />
                <Metric label="Demo ELM" value={profile.elm.toLocaleString()} />
                <Metric label="Runs Saved" value={profile.simulationsRun} />
                <Metric label="ZDAR Cards" value={profile.zdarDiscoveries.length} />
                <Metric label="Telemetry Proofs" value={profile.telemetryReceipts?.length || 0} />
                <Metric label="Favourite" value={profile.favouriteElement} />
              </section>

              {!profile.firstStructureSeen && (
                <div className="mt-5 rounded-[2rem] border border-cyan-300/25 bg-cyan-500/10 p-5 text-cyan-50">
                  <div className="text-[10px] font-black uppercase tracking-[0.34em] text-cyan-200">Guided First Run</div>
                  <div className="mt-2 text-2xl font-black">Run your first simulation to discover your first structure.</div>
                  <p className="mt-2 text-sm text-cyan-50/75">Connect the demo wallet, run Fe / Al, then use Find ZDAR to see the legendary path.</p>
                </div>
              )}

              <section className="mt-4 grid gap-4 xl:grid-cols-[1.18fr_.82fr] sm:mt-5 sm:gap-5">
                <Card title="ARM Orbital Network" kicker="3D element map" className={result.zdar ? "zdar-active border-fuchsia-300/40 shadow-[0_0_120px_rgba(217,70,239,.45)]" : ""}>
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
                    <Metric label="Gas Fee" value={profile.credits > 0 ? "1 Credit" : `${result.cost} ELM`} />
                  </div>

                  {scanning && <ScanPhases phase={scanPhase} />}

                  <OrbitalAlignment result={result} pair={pair} />

                  {structureUnlocked && (
                    <div className="mt-4 rounded-[2rem] border border-emerald-300/30 bg-emerald-500/10 p-4 text-emerald-100">
                      <div className="text-xs uppercase tracking-[0.3em]">Structure Unlocked</div>
                      <div className="mt-1 text-2xl font-black">You discovered your first saved structure.</div>
                    </div>
                  )}

                  {result.zdar && (
                    <div className="mt-4 rounded-[2rem] border border-fuchsia-300 bg-fuchsia-500/20 p-6 text-fuchsia-100 shadow-[0_0_90px_rgba(217,70,239,.7)]">
                      <div className="text-xs uppercase tracking-[0.4em]">⚡ ZDAR DETECTED</div>
                      <div className="mt-2 text-4xl font-black">Legendary Alignment</div>
                      <p className="mt-2 text-sm text-fuchsia-100/80">{pair.join(" / ")} → {result.stability}% stability. Deterministic structure ID: {result.id}</p>
                    </div>
                  )}

                  <LatticeOutput result={result} />

                  <div className="mt-5 grid gap-2">
                    <PrimaryButton disabled={!profile.walletConnected || scanning} onClick={run}>{scanning ? "Scanning..." : "🚀 Run Simulation"}</PrimaryButton>
                    <GhostButton onClick={discoverZDAR} className="border-fuchsia-300/40 bg-fuchsia-500/15 text-fuchsia-100">⚡ Find Legendary Alignment</GhostButton>
                    <GhostButton onClick={randomPair}>🎲 Random Discovery</GhostButton>
                    <GhostButton onClick={savePair}>⭐ Save Pair</GhostButton>
                    <GhostButton onClick={generateShareCard} className="border-cyan-300/30 bg-cyan-500/10 text-cyan-100">📤 Share Result</GhostButton>
                  </div>

                  {shareText && <textarea readOnly value={shareText} onFocus={(event) => event.target.select()} className="mt-4 w-full rounded-2xl border border-cyan-300/30 bg-slate-950/80 p-3 text-sm text-cyan-100" />}
                </Card>
              </section>

              <section className="mt-5 grid gap-5 lg:grid-cols-2">
                <TelemetryBackbonePanel receipt={latestReceipt || profile.telemetryReceipts?.[0]} result={result} pair={pair} />
                <ValidatorLayerPanel receipt={latestReceipt || profile.telemetryReceipts?.[0]} />
              </section>

              <section className="mt-5 grid gap-5 lg:grid-cols-3">
                <LiveTelemetryEnginePanel profile={profile} receipt={latestReceipt || profile.telemetryReceipts?.[0]} />
                <TelemetryConsole receipt={latestReceipt || profile.telemetryReceipts?.[0]} />
                <TelemetryDiscoveryAssistant pair={pair} result={result} receipt={latestReceipt || profile.telemetryReceipts?.[0]} />
              </section>

              <section className="mt-5 grid gap-5 lg:grid-cols-2">
                <TelemetryArchitecturePanel />
                <TelemetryUpgradeMatrix />
              </section>

              <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-6 sm:mt-5 sm:gap-5">
                <ProfilePanel profile={profile} elements={elements} onProfileUpdate={updateProfile} onReset={resetProfile} />
                <MockWalletPanel
                  profile={profile}
                  onConnect={connectWallet}
                  onDisconnect={() => updateProfile({ walletConnected: false, walletAddress: "" })}
                  onTopUp={() => profile.walletConnected && updateProfile({ elm: profile.elm + 500 })}
                  onStake={() => profile.walletConnected && profile.elm >= 100 && updateProfile({ elm: profile.elm - 100, stakedElm: profile.stakedElm + 100 })}
                  onBuyCredits={() => profile.walletConnected && updateProfile({ credits: profile.credits + 5 })}
                />
                <Card title="ARM Engine" kicker="model settings">
                  <div className="mt-4">
                    <ElementSelect value={settings.origin} label="ARM origin" elements={elements} onChange={(value) => setSettings({ ...settings, origin: value })} />
                  </div>
                  <label className="mt-4 block text-sm">Calibration: {settings.calibration}°</label>
                  <input type="range" min="-20" max="20" value={settings.calibration} onChange={(e) => setSettings({ ...settings, calibration: Number(e.target.value) })} className="w-full" />
                </Card>
                <DiscoveryEngine onSelect={(p) => setPair(p)} onRandom={randomPair} ranking={ranking} />
                <ARMAssistant pair={pair} result={result} />
              </section>

              <section className="mt-5 grid gap-5 lg:grid-cols-2">
                <CollectibleResultCard pair={pair} result={result} shareText={shareText} onShare={generateShareCard} onDownload={downloadCard} isSaved={profile.zdarDiscoveries.some((x) => x.id === result.id)} />
                <ProfileShowcase profile={profile} />
              </section>

              <section className="mt-5 grid gap-5 lg:grid-cols-3">
                <Card title="Simulation History" kicker="persistent local log">
                  <div className="mt-4 grid max-h-96 gap-2 overflow-auto">
                    {profile.history.length === 0 ? <p className="text-sm text-slate-400">Run your first simulation to generate saved history.</p> : profile.history.slice(0, 12).map((h) => (
                      <div key={`${h.id}-${h.createdAt}`} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                        <b>{h.id}</b><br />{h.pair.join(" / ")} → {h.stability}% {h.zdar ? "⚡" : ""}
                      </div>
                    ))}
                  </div>
                </Card>
                <Card title="Favourite Pairs" kicker="persistent watchlist">
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.favourites.length === 0 ? <p className="text-sm text-slate-400">Save your favourite pairings to build a personal watchlist.</p> : profile.favourites.map((f) => (
                      <button key={f} onClick={() => setPair(f.split(" / "))} className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15">{f}</button>
                    ))}
                  </div>
                </Card>
                <DemoTruthPanel />
              </section>

              <section className="mt-5 grid gap-5 lg:grid-cols-2">
                <ManifestoPanel />
                <RoadmapPanel />
                <TelemetryRoadmapPanel />
              </section>

              <section className="mt-5 grid gap-5 lg:grid-cols-2">
                <ReadinessPanel />
                <TokenEconomyPanel />
              </section>

              <section className="mt-5 grid gap-5 lg:grid-cols-2">
                <SmartContractAuditPanel />
                <MonetizationPanel />
              </section>

              <section className="mt-5 grid gap-5 lg:grid-cols-2">
                <ScienceEnginePanel />
                <InfrastructureScalePanel />
              </section>

              <section className="mt-5 grid gap-5 lg:grid-cols-2">
                <CompliancePanel />
                <ExchangeIntegrationPanel />
              </section>

              <section className="mt-5">
                <Upgrade500MatrixPanel />
              </section>

              <footer className="mt-5 rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-6 text-center shadow-[0_0_80px_rgba(0,0,0,.25)]">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-300">ElementOS Public Demo</div>
                <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Persist discoveries. Validate telemetry. Hunt ZDAR.</h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">Frontend-only MVP. No real transactions, no real wallet connection, no investment offer, and no scientific validation.</p>
              </footer>
            </>
          )}
        </div>
      </div>
    </>
  );
}
