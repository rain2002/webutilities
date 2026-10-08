"use client";
import { useState } from "react";
import { marked } from "marked";
export default function MarkdownHtml() {
  const [input, setInput] = useState("# Hello Markdown");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 bg-white/95 rounded-[2rem] shadow-xl ring-1 ring-slate-100">
      <div><h3 className="font-bold mb-2">Markdown</h3><textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full p-4 border rounded-xl h-96" /></div>
      <div><h3 className="font-bold mb-2">HTML Output</h3><div className="w-full p-4 border rounded-xl h-96 overflow-auto bg-slate-50 prose" dangerouslySetInnerHTML={{__html: marked.parse(input)}} /></div>
    </div>
  );
}