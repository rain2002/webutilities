"use client";
import { useState } from "react";
import { marked } from "marked";
import { FileCode2 } from "lucide-react";

export default function MarkdownHtml() {
  const [input, setInput] = useState("# Hello Markdown\n\nType your **markdown** here!");
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white/95 p-6 rounded-[2rem] shadow-xl ring-1 ring-slate-100 flex flex-col">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4"><FileCode2 className="w-5 h-5 text-indigo-500"/> Markdown Input</h3>
        <textarea value={input} onChange={e=>setInput(e.target.value)} className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-xl min-h-[400px] text-slate-800 font-mono outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div className="bg-white/95 p-6 rounded-[2rem] shadow-xl ring-1 ring-slate-100 flex flex-col">
        <h3 className="font-bold text-slate-800 mb-4">HTML Output Preview</h3>
        <div className="flex-1 w-full p-6 bg-slate-50 border border-slate-200 rounded-xl min-h-[400px] overflow-auto prose prose-indigo max-w-none text-slate-800" dangerouslySetInnerHTML={{__html: marked.parse(input) as string}} />
      </div>
    </div>
  );
}