"use client";
import { useState } from "react";
export default function ColorConverter() {
  const [hex, setHex] = useState("#4f46e5");
  const [rgb, setRgb] = useState("79, 70, 229");
  
  const hexToRgb = (val) => {
    setHex(val);
    let h = val.replace('#', '');
    if(h.length === 3) h = h.split('').map(c=>c+c).join('');
    if(h.length !== 6) return;
    setRgb(`${parseInt(h.substr(0,2),16)}, ${parseInt(h.substr(2,2),16)}, ${parseInt(h.substr(4,2),16)}`);
  };
  
  return (
    <div className="space-y-6 p-8 bg-white/95 rounded-[2rem] shadow-xl ring-1 ring-slate-100">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-2xl border shadow-inner" style={{backgroundColor: hex}}></div>
      </div>
      <div>
        <label className="font-bold mb-2 block">HEX Code</label>
        <input value={hex} onChange={e=>hexToRgb(e.target.value)} className="w-full p-3 border rounded-xl" />
      </div>
      <div>
        <label className="font-bold mb-2 block">RGB Code</label>
        <input value={rgb} readOnly className="w-full p-3 border rounded-xl bg-slate-50" />
      </div>
    </div>
  );
}