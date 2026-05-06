import React, { useMemo, useState } from 'react'

const ELEMENTS = [
  ['Al', 'Aluminium', 0],
  ['Fe', 'Iron', 88],
  ['Ru', 'Ruthenium', 88],
  ['Ti', 'Titanium', 78],
  ['C', 'Carbon', 45],
  ['O', 'Oxygen', 70],
  ['Au', 'Gold', 22],
  ['U', 'Uranium', 73],
]

function simulate(a, b) {
  const delta = Math.abs(a[2] - b[2])
  const zdar = delta <= 2
  const stability = Math.min(100, Math.max(0, Math.round(90 - delta * 0.4 + (zdar ? 15 : 0))))
  return { delta, zdar, stability }
}

export default function App() {
  const [primary, setPrimary] = useState('Al')
  const [secondary, setSecondary] = useState('Fe')
  const [wallet, setWallet] = useState(false)
  const [elm, setElm] = useState(2000)
  const [runs, setRuns] = useState([])

  const a = ELEMENTS.find(e => e[0] === primary) || ELEMENTS[0]
  const b = ELEMENTS.find(e => e[0] === secondary) || ELEMENTS[1]
  const result = useMemo(() => simulate(a, b), [a, b])

  function run() {
    if (!wallet) return
    setElm(v => Math.max(0, v - 8 + (result.zdar ? 20 : 0)))
    setRuns(r => [{ pair: `${primary} / ${secondary}`, ...result }, ...r].slice(0, 8))
  }

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">ElementOS — ARM Simulation Network</p>
          <h1>Simulate Element Interactions</h1>
          <p className="sub">Discover rare alignments. Trigger ZDAR. Share results.</p>
          <button className="primary" onClick={() => setWallet(true)}>
            {wallet ? 'Wallet Connected' : 'Connect Wallet'}
          </button>
        </div>
        <div className="sphere">
          <div className="orbit orbitA"></div>
          <div className="orbit orbitB"></div>
          <div className="core">Al</div>
        </div>
      </section>

      <section className="grid">
        <div className="card">
          <h2>Element Pair Console</h2>
          <label>Primary Element</label>
          <select value={primary} onChange={e => setPrimary(e.target.value)}>
            {ELEMENTS.map(e => <option key={e[0]} value={e[0]}>{e[0]} — {e[1]}</option>)}
          </select>

          <label>Secondary Element</label>
          <select value={secondary} onChange={e => setSecondary(e.target.value)}>
            {ELEMENTS.map(e => <option key={e[0]} value={e[0]}>{e[0]} — {e[1]}</option>)}
          </select>

          <button className="primary wide" disabled={!wallet} onClick={run}>🚀 Run Simulation</button>
        </div>

        <div className="card">
          <h2>📊 Simulation Results</h2>
          <div className="metrics">
            <div><span>Stability</span><strong>{result.stability}%</strong></div>
            <div><span>Gas Fee</span><strong>8 ELM</strong></div>
            <div><span>Wallet Balance</span><strong>{elm}</strong></div>
            <div><span>Angle Δ</span><strong>{result.delta}°</strong></div>
          </div>
          <div className={result.zdar ? 'zdar on' : 'zdar'}>
            {result.zdar ? '⚡ ZDAR — Legendary Alignment' : 'Alignment scanning...'}
          </div>
        </div>

        <div className="card">
          <h2>🧾 Activity</h2>
          {runs.length === 0 ? <p className="muted">No simulations yet.</p> : runs.map((r, i) => (
            <p key={i}>{r.pair} → {r.stability}% {r.zdar ? '⚡' : ''}</p>
          ))}
        </div>
      </section>
    </main>
  )
}
