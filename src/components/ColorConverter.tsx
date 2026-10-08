"use client";
import { useState, useEffect } from "react";
import { Type } from "lucide-react";

export default function ColorConverter() {
  const [hex, setHex] = useState("#4f46e5");
  const [rgb, setRgb] = useState("79, 70, 229");
  
  const hexToRgb = (val: string) => {
    setHex(val);
    let h = val.replace('#', '');
    if(h.length === 3) h = h.split('').map((c: string)=>c+c).join('');
    if(h.length !== 6) { setRgb("Invalid HEX"); return; }
    setRgb(`${parseInt(h.substr(0,2),16)}, ${parseInt(h.substr(2,2),16)}, ${parseInt(h.substr(4,2),16)}`);
  };
  
  // Set initial state on mount to avoid hydration mismatch if needed
  useEffect(() => { hexToRgb("#4f46e5"); }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white/95 p-10 rounded-[2rem] shadow-xl ring-1 ring-slate-100 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2"><Type className="w-6 h-6 text-pink-500"/> Color Converter</h2>
      
      <div className="w-40 h-40 rounded-full shadow-inner border-4 border-white ring-2 ring-slate-100 mb-10 transition-colors duration-300" style={{backgroundColor: hex.length===7 ? hex : '#ccc'}}></div>
      
      <div className="w-full space-y-6">
        <div>
          <label className="font-bold text-slate-700 mb-2 block">HEX Code</label>
          <input value={hex} onChange={e=>hexToRgb(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:ring-2 focus:ring-pink-500 text-lg font-mono uppercase" />
        </div>
        <div>
          <label className="font-bold text-slate-700 mb-2 block">RGB Code</label>
          <input value={rgb} readOnly className="w-full p-4 bg-slate-100 border border-slate-200 rounded-xl text-slate-800 outline-none text-lg font-mono" />
        </div>
      </div>
    </div>
  );
}