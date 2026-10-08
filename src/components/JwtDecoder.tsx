"use client";
import { useState } from "react";
export default function JwtDecoder() {
  const [input, setInput] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");

  const decode = (val) => {
    setInput(val);
    try {
      const parts = val.split('.');
      if(parts.length !== 3) throw new Error();
      setHeader(JSON.stringify(JSON.parse(atob(parts[0])), null, 2));
      setPayload(JSON.stringify(JSON.parse(atob(parts[1])), null, 2));
    } catch {
      setHeader(""); setPayload("Invalid JWT");
    }
  };

  return (
    <div className="space-y-4 p-8 bg-white/95 rounded-[2rem] shadow-xl ring-1 ring-slate-100">
      <textarea value={input} onChange={e=>decode(e.target.value)} className="w-full p-4 border rounded-xl h-24" placeholder="Paste JWT token here..." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><h3 className="font-bold mb-2">Header</h3><pre className="p-4 bg-slate-50 border rounded-xl overflow-auto h-64">{header}</pre></div>
        <div><h3 className="font-bold mb-2">Payload</h3><pre className="p-4 bg-slate-50 border rounded-xl overflow-auto h-64">{payload}</pre></div>
      </div>
    </div>
  );
}