"use client";

import { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { FileCode2, Copy, Check } from "lucide-react";

export default function MarkdownHtml() {
  const [input, setInput] = useState("# Hello Markdown\n\nType your **markdown** here!");
  const [copied, setCopied] = useState(false);
  const [sanitizedHtml, setSanitizedHtml] = useState("");

  useEffect(() => {
    const rawHtml = marked.parse(input) as string;
    if (typeof window !== "undefined") {
      setSanitizedHtml(DOMPurify.sanitize(rawHtml));
    }
  }, [input]);

  const handleCopy = () => {
    const rawHtml = marked.parse(input) as string;
    navigator.clipboard.writeText(rawHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white/95 p-6 rounded-[2rem] shadow-xl ring-1 ring-slate-100 flex flex-col">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
          <FileCode2 className="w-5 h-5 text-indigo-500" /> Markdown Input
        </h3>
        <textarea 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-xl min-h-[400px] text-slate-800 font-mono outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-y" 
        />
      </div>

      <div className="bg-white/95 p-6 rounded-[2rem] shadow-xl ring-1 ring-slate-100 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">HTML Output Preview</h3>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy Raw HTML"}
          </button>
        </div>
        <div 
          className="flex-1 w-full p-6 bg-slate-50 border border-slate-200 rounded-xl min-h-[400px] overflow-auto prose prose-indigo max-w-none text-slate-800" 
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }} 
        />
      </div>
    </div>
  );
}
