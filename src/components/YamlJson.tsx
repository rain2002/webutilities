"use client";
import { useState } from "react";
import yaml from "js-yaml";
export default function YamlJson() {
  const [input, setInput] = useState("name: John\nage: 30");
  const [output, setOutput] = useState("");
  const convert = () => {
    try {
      setOutput(JSON.stringify(yaml.load(input), null, 2));
    } catch { setOutput("Error parsing YAML"); }
  };
  return (
    <div className="space-y-4 p-8 bg-white/95 rounded-[2rem] shadow-xl ring-1 ring-slate-100">
      <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full p-4 border rounded-xl h-48" placeholder="Paste YAML..." />
      <button onClick={convert} className="px-6 py-2 font-bold bg-indigo-600 text-white rounded-lg">Convert to JSON</button>
      <textarea value={output} readOnly className="w-full p-4 border rounded-xl h-48 bg-slate-50" />
    </div>
  );
}