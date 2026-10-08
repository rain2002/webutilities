"use client";
import { useState } from "react";
export default function Base64() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");

  const handleProcess = () => {
    try {
      setOutput(mode === "encode" ? btoa(input) : atob(input));
    } catch {
      setOutput("Invalid input");
    }
  };

  return (
    <div className="space-y-4 p-8 bg-white/95 rounded-[2rem] shadow-xl ring-1 ring-slate-100">
      <select value={mode} onChange={e=>setMode(e.target.value)} className="p-2 border rounded-lg outline-none font-bold">
        <option value="encode">Encode to Base64</option>
        <option value="decode">Decode from Base64</option>
      </select>
      <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full p-4 border rounded-xl h-32" placeholder="Input text..." />
      <button onClick={handleProcess} className="px-6 py-2 bg-indigo-600 font-bold hover:bg-indigo-700 text-white rounded-lg transition-all">Process</button>
      <textarea value={output} readOnly className="w-full p-4 border rounded-xl h-32 bg-slate-50" placeholder="Output will appear here..." />
    </div>
  );
}