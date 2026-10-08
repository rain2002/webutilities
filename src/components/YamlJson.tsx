"use client";
import { useState } from "react";
import * as yaml from "js-yaml";
import { FileCode2, ArrowRight } from "lucide-react";

export default function YamlJson() {
  const [input, setInput] = useState("name: John\nage: 30");
  const [output, setOutput] = useState("");
  const convert = () => {
    try { setOutput(JSON.stringify(yaml.load(input), null, 2)); } 
    catch { setOutput("Error parsing YAML. Invalid syntax."); }
  };
  return (
    <div className="max-w-4xl mx-auto space-y-6 bg-white/95 p-8 rounded-[2rem] shadow-xl ring-1 ring-slate-100">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><FileCode2 className="w-6 h-6 text-teal-500"/> YAML to JSON</h2>
      <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl h-48 text-slate-800 font-mono outline-none focus:ring-2 focus:ring-teal-500" placeholder="Paste YAML..." />
      <button onClick={convert} className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 transition-all flex justify-center items-center gap-2">
        Convert to JSON <ArrowRight className="w-5 h-5" />
      </button>
      <textarea value={output} readOnly className="w-full p-4 bg-slate-100 border border-slate-200 rounded-xl h-48 text-slate-800 font-mono outline-none" placeholder="JSON Output..." />
    </div>
  );
}