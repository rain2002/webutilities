"use client";
import { useState } from "react";
import { Binary, ArrowDown } from "lucide-react";

export default function Base64() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");

  const handleProcess = () => {
    try {
      setOutput(mode === "encode" ? btoa(input) : atob(input));
    } catch {
      setOutput("Invalid input format for Base64 decoding.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 bg-white/95 p-8 rounded-[2rem] shadow-xl ring-1 ring-slate-100">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Binary className="w-6 h-6 text-emerald-500" /> Base64 Tool</h2>
        <select value={mode} onChange={e=>setMode(e.target.value)} className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500">
          <option value="encode">Encode to Base64</option>
          <option value="decode">Decode from Base64</option>
        </select>
      </div>
      <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl h-40 text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Paste your text here..." />
      <button onClick={handleProcess} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex justify-center items-center gap-2">
        Process <ArrowDown className="w-5 h-5" />
      </button>
      <textarea value={output} readOnly className="w-full p-4 bg-slate-100 border border-slate-200 rounded-xl h-40 text-slate-700 font-mono outline-none" placeholder="Result will appear here..." />
    </div>
  );
}