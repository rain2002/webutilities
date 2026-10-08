"use client";

import React, { useState } from "react";
import { Copy, Trash2, FileText, Check } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    paragraphs: text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200) || 0,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-8 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm text-gray-500 font-medium mb-1">Words</p>
          <p className="text-3xl font-bold text-blue-600">{stats.words}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm text-gray-500 font-medium mb-1">Characters</p>
          <p className="text-3xl font-bold text-gray-800">{stats.characters}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm text-gray-500 font-medium mb-1">Sentences</p>
          <p className="text-3xl font-bold text-gray-800">{stats.sentences}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm text-gray-500 font-medium mb-1">Paragraphs</p>
          <p className="text-3xl font-bold text-gray-800">{stats.paragraphs}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm text-gray-500 font-medium mb-1">No Spaces</p>
          <p className="text-3xl font-bold text-gray-800">{stats.charactersNoSpaces}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm text-gray-500 font-medium mb-1">Reading Time</p>
          <p className="text-3xl font-bold text-gray-800">{stats.readingTime} <span className="text-base font-normal text-gray-500">min</span></p>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
            <FileText className="w-4 h-4" />
            Type or paste your text
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              disabled={!text}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm font-medium"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
            </button>
            <button
              onClick={handleClear}
              disabled={!text}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full h-[400px] p-6 text-gray-800 bg-transparent resize-y focus:outline-none focus:ring-0 leading-relaxed"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
