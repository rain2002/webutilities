"use client";
import { useState } from "react";
import { Lock } from "lucide-react";

export default function JwtDecoder() {
  const [input, setInput] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");

  const decode = (val: string) => {
    setInput(val);
    try {
      if(!val) { setHeader(""); setPayload(""); return; }
      const parts = val.split('.');
      if(parts.length !== 3) throw new Error();
      setHeader(JSON.stringify(JSON.parse(atob(parts[0])), null, 2));
      setPayload(JSON.stringify(JSON.parse(atob(parts[1])), null, 2));
    } catch {
      setHeader("Invalid JWT"); setPayload("Invalid JWT");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 bg-white/95 p-8 rounded-[2rem] shadow-xl ring-1 ring-slate-100">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4"><Lock className="w-6 h-6 text-fuchsia-500" /> Decode JWT</h2>
      <textarea value={input} onChange={e=>decode(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl h-24 text-slate-800 font-mono outline-none focus:ring-2 focus:ring-fuchsia-500" placeholder="Paste JWT token here..." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-slate-700 mb-2">Header (Algorithm)</h3>
          <pre className="p-4 bg-slate-800 text-emerald-400 rounded-xl overflow-auto h-64 font-mono text-sm">{header}</pre>
        </div>
        <div>
          <h3 className="font-bold text-slate-700 mb-2">Payload (Data)</h3>
          <pre className="p-4 bg-slate-800 text-sky-400 rounded-xl overflow-auto h-64 font-mono text-sm">{payload}</pre>
        </div>
      </div>
    </div>
  );
}