"use client";

import React, { useState } from "react";
import { Copy, Trash2, Code2, Check, AlertTriangle } from "lucide-react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (spaces: number) => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Invalid JSON: ${err.message}`);
      } else {
        setError("Invalid JSON format");
      }
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Invalid JSON: ${err.message}`);
      } else {
        setError("Invalid JSON format");
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Editor */}
      <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100 overflow-hidden flex flex-col h-[600px]">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
            <Code2 className="w-4 h-4" />
            JSON Input
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-gray-200 p-1 rounded-lg mr-2">
              <button
                onClick={() => formatJson(2)}
                className="px-3 py-1.5 text-xs font-medium bg-white shadow-sm rounded-md hover:text-blue-600 transition-colors"
              >
                Format (2 spaces)
              </button>
              <button
                onClick={() => formatJson(4)}
                className="px-3 py-1.5 text-xs font-medium rounded-md hover:bg-white hover:shadow-sm hover:text-blue-600 transition-all"
              >
                Format (4 spaces)
              </button>
              <button
                onClick={minifyJson}
                className="px-3 py-1.5 text-xs font-medium rounded-md hover:bg-white hover:shadow-sm hover:text-blue-600 transition-all"
              >
                Minify
              </button>
            </div>

            <button
              onClick={handleCopy}
              disabled={!input}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm font-medium"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { setInput(""); setError(null); }}
              disabled={!input}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border-b border-red-100 p-3 flex items-start gap-2 text-red-600 text-sm">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="font-mono">{error}</span>
          </div>
        )}

        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(null);
          }}
          placeholder='Paste your JSON here...&#10;{&#10;  "hello": "world"&#10;}'
          className="flex-1 w-full p-6 text-gray-800 bg-gray-50 font-mono text-sm resize-none focus:outline-none focus:ring-0"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
