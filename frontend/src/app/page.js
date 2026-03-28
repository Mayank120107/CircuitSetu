import Link from 'next/link';
import { FaGithub, FaBolt, FaMicrochip, FaGlobe } from 'react-icons/fa';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="w-full px-8 py-6 flex justify-between items-center border-b border-slate-800/80 bg-slate-950/50 backdrop-blur-md fixed top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
            <FaBolt />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            Circuit<span className="text-emerald-400">Setu</span>
          </span>
        </div>
        <Link href="/simulator" className="px-5 py-2 rounded bg-slate-800 hover:bg-slate-700 text-sm font-medium transition-colors border border-slate-700 text-white shadow-sm">
          Enter Workspace
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 flex flex-col justify-center items-center text-center mt-10">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono tracking-wide uppercase shadow-[0_0_10px_rgba(16,185,129,0.2)]">
          ⚡ FOSS Hack 2026 Submission :)
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white max-w-4xl leading-tight">
          High-Performance <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            Browser Simulation.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Design, wire, and solve analog DC circuits natively. Bypassing standard bottlenecks by routing nodal matrices through a custom WebAssembly engine.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
          <Link href="/simulator" className="w-full sm:w-auto px-8 py-4 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2">
            Launch Simulator
          </Link>
          <a href="https://github.com/r17e8h/CircuitSetu" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 rounded bg-slate-800 hover:bg-slate-700 text-white font-medium text-lg border border-slate-700 transition-all flex items-center justify-center gap-2">
            <FaGithub /> View Source
          </a>
        </div>
      </main>

      {/* The Tech Flex (Features) */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-800/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="text-emerald-400 text-2xl mb-4"><FaMicrochip /></div>
            <h3 className="text-xl font-bold text-white mb-2">C++ Core Engine</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Under the hood, an optimized Modified Nodal Analysis (MNA) solver crunches matrix math faster than raw JavaScript ever could.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="text-cyan-400 text-2xl mb-4"><FaBolt /></div>
            <h3 className="text-xl font-bold text-white mb-2">WebAssembly Bridge</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Compiled directly to Wasm for near-native execution speeds. No server trips required; the physics happen right in your browser.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="text-blue-400 text-2xl mb-4"><FaGlobe /></div>
            <h3 className="text-xl font-bold text-white mb-2">React Flow UI</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              A frictionless, drag-and-drop node environment backed by Zustand state management for instant visual feedback.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}