"use client";
import { useState } from "react";
import Papa from "papaparse";
export default function JsonCsv() {
  const [json, setJson] = useState("[{\"name\": \"John\", \"age\": 30}]");
  const [csv, setCsv] = useState("");
  const convert = () => {
    try {
      setCsv(Papa.unparse(JSON.parse(json)));
    } catch { setCsv("Error parsing JSON"); }
  };
  return (
    <div className="space-y-4 p-8 bg-white/95 rounded-[2rem] shadow-xl ring-1 ring-slate-100">
      <textarea value={json} onChange={e=>setJson(e.target.value)} className="w-full p-4 border rounded-xl h-48" placeholder="Paste JSON Array..." />
      <button onClick={convert} className="px-6 py-2 bg-indigo-600 font-bold text-white rounded-lg">Convert to CSV</button>
      <textarea value={csv} readOnly className="w-full p-4 border rounded-xl h-48 bg-slate-50" />
    </div>
  );
}