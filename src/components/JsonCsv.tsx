"use client";
import { useState } from "react";
import Papa from "papaparse";
import { Code2, ArrowRight } from "lucide-react";

export default function JsonCsv() {
  const [json, setJson] = useState("[{\"name\": \"John\", \"age\": 30}]");
  const [csv, setCsv] = useState("");
  const convert = () => {
    try { setCsv(Papa.unparse(JSON.parse(json))); } 
    catch { setCsv("Error parsing JSON. Ensure it is a valid array of objects."); }
  };
  return (
    <div className="max-w-4xl mx-auto space-y-6 bg-white/95 p-8 rounded-[2rem] shadow-xl ring-1 ring-slate-100">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Code2 className="w-6 h-6 text-sky-500"/> JSON to CSV Converter</h2>
      <textarea value={json} onChange={e=>setJson(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl h-48 text-slate-800 font-mono outline-none focus:ring-2 focus:ring-sky-500" placeholder="Paste JSON Array..." />
      <button onClick={convert} className="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-lg shadow-sky-500/30 transition-all flex justify-center items-center gap-2">
        Convert to CSV <ArrowRight className="w-5 h-5" />
      </button>
      <textarea value={csv} readOnly className="w-full p-4 bg-slate-100 border border-slate-200 rounded-xl h-48 text-slate-800 font-mono outline-none" placeholder="CSV Output..." />
    </div>
  );
}