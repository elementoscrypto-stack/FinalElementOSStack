import React, { useMemo, useState } from "react";

const UI = {
  headline: "Simulate Element Interactions. Discover Legendary Alignments.",
  sub: "Pick two elements → run simulation → hunt ZDAR.",
  launch: "🚀 Run Simulation",
};

const ELEMENTS = [
  ["Al", "Aluminium", 0],
  ["Fe", "Iron", 88],
  ["Ru", "Ruthenium", 88],
  ["Ti", "Titanium", 78],
  ["C", "Carbon", 45],
  ["O", "Oxygen", 70],
  ["Au", "Gold", 22],
  ["U", "Uranium", 73],
];

function simulate(a, b) {
  const delta = Math.abs(a[2] - b[2]);
  const zdar = delta <= 2;
  const stability = Math.min(
    100,
    Math.max(0, Math.round(90 - delta * 0.4 + (zdar ? 15 : 0)))
  );
  return { delta, zdar, stability };
}

export default function App() {
  const [primary, setPrimary] = useState("Al");
  const [secondary, setSecondary] = useState("Fe");
  const [wallet, setWallet] = useState(false);
  const [elm, setElm] = useState(2000);
  const [runs, setRuns] = useState([]);
  const [shareText, setShareText] = useState("");

  const a = ELEMENTS.find((e) => e[0] === primary);
  const b = ELEMENTS.find((e) => e[0] === secondary);

  const result = useMemo(() => simulate(a, b), [a, b]);

  function run() {
    if (!wallet) return;

    setElm((v) => Math.max(0, v - 8 + (result.zdar ? 20 : 0)));

    setRuns((r) => [
      {
        pair: `${primary} / ${secondary}`,
        ...result,
      },
      ...r,
    ]);
  }

  function randomPair() {
    const randA = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
    const randB = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
    setPrimary(randA[0]);
    setSecondary(randB[0]);
  }

  function generateShareCard() {
    const text = `I just discovered a ZDAR alignment on ElementOS ⚡

${primary} + ${secondary} → ${result.stability}% stability

Try it:
${window.location.href}`;

    setShareText(text);

    if (navigator.share) {
      navigator.share({
        title: "ElementOS ZDAR Alignment",
        text,
        url: window.location.href,
      });
    }
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white p-6">
      {/* HERO */}
      <section className="max-w-6xl mx-auto mb-12">
        <h1 className="text-5xl font-black bg-gradient-to-r from-white via-cyan-300 to-fuchsia-400 text-transparent bg-clip-text">
          {UI.headline}
        </h1>

        <p className="mt-4 text-slate-300 text-lg">{UI.sub}</p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setWallet(true)}
            className="px-6 py-3 rounded-xl bg-cyan-300 text-black font-bold shadow-lg hover:scale-105 transition"
          >
            {wallet ? "Wallet Connected" : "Connect Wallet"}
          </button>

          <button
            onClick={randomPair}
            className="px-6 py-3 rounded-xl bg-slate-700 text-white font-bold"
          >
            🎲 Random Pair
          </button>
        </div>
      </section>

      {/* SIMULATION */}
      <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* CONTROLS */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="font-bold mb-4">Element Pair</h2>

          <select
            className="w-full p-3 rounded-lg bg-black text-white mb-3"
            value={primary}
            onChange={(e) => setPrimary(e.target.value)}
          >
            {ELEMENTS.map((e) => (
              <option key={e[0]} value={e[0]}>
                {e[0]} — {e[1]}
              </option>
            ))}
          </select>

          <select
            className="w-full p-3 rounded-lg bg-black text-white mb-3"
            value={secondary}
            onChange={(e) => setSecondary(e.target.value)}
          >
            {ELEMENTS.map((e) => (
              <option key={e[0]} value={e[0]}>
                {e[0]} — {e[1]}
              </option>
            ))}
          </select>

          <button
            onClick={run}
            disabled={!wallet}
            className="w-full py-3 rounded-xl bg-cyan-400 text-black font-bold"
          >
            {UI.launch}
          </button>
        </div>

        {/* RESULTS */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 col-span-2">
          <h2 className="font-bold mb-4">Results</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-black/40 rounded-lg">
              Stability: {result.stability}%
            </div>
            <div className="p-4 bg-black/40 rounded-lg">
              Δ Angle: {result.delta}
            </div>
          </div>

          {/* ZDAR */}
          {result.zdar && (
            <div className="mt-4 p-6 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-300 shadow-[0_0_80px_rgba(217,70,239,.7)]">
              <div className="text-xs uppercase tracking-widest">
                ⚡ ZDAR DETECTED
              </div>

              <div className="text-3xl font-black mt-2">
                Legendary Alignment
              </div>

              <p className="mt-2">
                {primary} / {secondary} → {result.stability}% stability
              </p>

              <button
                onClick={generateShareCard}
                className="mt-4 w-full py-3 bg-fuchsia-300 text-black rounded-xl font-bold"
              >
                📤 Share This Result
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SHARE TEXT */}
      {shareText && (
        <div className="mt-8 p-4 bg-black/60 rounded-xl max-w-3xl mx-auto text-sm whitespace-pre-wrap">
          {shareText}
        </div>
      )}
    </main>
  );
}
