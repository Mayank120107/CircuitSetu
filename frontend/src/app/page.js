import Link from 'next/link';
import { FaGithub, FaBolt } from 'react-icons/fa';
import Logo from '../components/logo';

export default function LandingPage() {
  return (
    // The master wrapper with the mathematical graph-paper background
    <div 
      className="min-h-screen font-mono text-slate-800 flex flex-col selection:bg-[#a8d5ba]"
      style={{
        backgroundColor: '#F9F8F4', // Cream/Off-white base
        backgroundImage: 'linear-gradient(#e2e2e2 1px, transparent 1px), linear-gradient(90deg, #e2e2e2 1px, transparent 1px)',
        backgroundSize: '24px 24px' // The grid squares
      }}
    >
      
      {/* Navbar */}
      <nav className="w-full px-8 py-6 flex flex-col sm:flex-row justify-between items-center border-b-2 border-slate-800 bg-[#F9F8F4]">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <Logo className="h-10 w-auto drop-shadow-lg" />
          <span className="text-2xl font-bold tracking-tight text-slate-600">
            Circuit<span className="text-[#64a982]">Setu</span>
          </span>
        </div>
        
        <div className="flex gap-6 text-sm font-bold tracking-widest uppercase text-slate-700">
          <Link href="#" className="border-b-2 border-transparent hover:border-slate-800 pb-1">Docs</Link>
          <Link href="/simulator" className="border-b-2 border-slate-800 pb-1">Simulator</Link>
          <Link href="#" className="border-b-2 border-transparent hover:border-slate-800 pb-1">Examples</Link>

        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-20 text-center border-b-2 border-slate-800 bg-white/40">
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-slate-600 uppercase">
          High-Performance <br/> Circuit Simulation.
        </h1>

        <div className="inline-block mb-8 px-4 py-2 border-2 border-dashed border-[#bfa75d] bg-[#fcf9e3] text-[#9c8438] text-sm md:text-base font-bold tracking-widest uppercase">
          [FOSS Hack 2026: Submission]
        </div>
        
        <p className="text-lg text-slate-700 mb-10 max-w-3xl mx-auto leading-relaxed">
          Design, wire, and solve analog DC circuits natively. Bypassing JavaScript bottlenecks by routing nodal matrices through a custom WebAssembly engine.
        </p>

        {/* Retro Hard-Shadow Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link 
            href="/simulator" 
            className="px-8 py-3 bg-[#a8d5ba] text-slate-900 font-bold uppercase tracking-wider border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a] hover:shadow-[2px_2px_0px_#0f172a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2"
          >
            <FaBolt /> Enter Workspace
          </Link>
          <a 
            href="https://github.com/r17e8h/CircuitSetu" 
            target="_blank" 
            rel="noreferrer" 
            className="px-8 py-3 bg-[#8ab4f8] text-slate-900 font-bold uppercase tracking-wider border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a] hover:shadow-[2px_2px_0px_#0f172a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2"
          >
            <FaGithub /> Github Repo
          </a>
        </div>
      </main>

      {/* Feature Columns */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-slate-800">
        
        <div className="bg-[#c8e1e9] border-b-2 md:border-b-0 md:border-r-2 border-slate-800 p-8 flex flex-col items-center text-center">
          <h3 className="font-bold uppercase tracking-widest mb-6 border-b-2 border-slate-800 pb-2 w-full">C++ MNA Core Engine</h3>
          {/* Mockup SVG: Gear and pulse */}
          <svg width="100" height="60" viewBox="0 0 100 60" className="stroke-slate-800 stroke-2 fill-none mb-4">
            <circle cx="25" cy="30" r="12" className="fill-[#9aaeb8]" />
            <path d="M 45 30 L 55 30 L 60 15 L 70 45 L 75 30 L 90 30" />
          </svg>
        </div>

        <div className="bg-[#bfe3cc] border-b-2 md:border-b-0 md:border-r-2 border-slate-800 p-8 flex flex-col items-center text-center">
          <h3 className="font-bold uppercase tracking-widest mb-6 border-b-2 border-slate-800 pb-2 w-full">WebAssembly Solver</h3>
          {/* Mockup SVG: Matrix Table */}
          <svg width="80" height="60" viewBox="0 0 80 60" className="stroke-slate-800 stroke-2">
            <rect x="0" y="0" width="80" height="60" fill="white" />
            <rect x="0" y="0" width="20" height="60" fill="#a4c2b0" />
            <rect x="0" y="0" width="80" height="20" fill="#a4c2b0" />
            <line x1="0" y1="20" x2="80" y2="20" />
            <line x1="0" y1="40" x2="80" y2="40" />
            <line x1="20" y1="0" x2="20" y2="60" />
            <line x1="50" y1="0" x2="50" y2="60" />
          </svg>
        </div>

        <div className="bg-[#fce6b6] p-8 flex flex-col items-center text-center">
          <h3 className="font-bold uppercase tracking-widest mb-6 border-b-2 border-slate-800 pb-2 w-full">Visual Editor</h3>
          {/* Mockup SVG: Flowchart */}
          <svg width="100" height="60" viewBox="0 0 100 60" className="stroke-slate-800 stroke-2">
            <rect x="10" y="20" width="20" height="15" fill="#8ab4f8" />
            <rect x="40" y="5" width="20" height="15" fill="#a8d5ba" />
            <rect x="70" y="20" width="20" height="15" fill="#ffcda2" />
            <rect x="40" y="40" width="20" height="15" fill="#e2a099" />
            <line x1="30" y1="27" x2="70" y2="27" />
            <line x1="50" y1="20" x2="50" y2="40" />
          </svg>
        </div>

      </section>

      {/* Bottom Section - The Process */}
      <section className="bg-[#f0c2a5] border-b-2 border-slate-800 py-4 text-center">
         <h2 className="font-bold uppercase tracking-widest text-slate-800">The Math Process</h2>
      </section>

    </div>
  );
}