"use client";

import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, ShieldCheck, Check } from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (useUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
      setPassword("Please select at least one option.");
      return;
    }

    let newPassword = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate strength roughly
  const getStrength = () => {
    if (!password || password.includes("Please select")) return { label: "Invalid", color: "bg-red-500", text: "text-red-500" };
    let score = 0;
    if (length > 8) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (useUpper) score++;
    if (useLower) score++;
    if (useNumbers) score++;
    if (useSymbols) score++;

    if (score < 4) return { label: "Weak", color: "bg-red-500", text: "text-red-500" };
    if (score < 6) return { label: "Medium", color: "bg-amber-500", text: "text-amber-500" };
    return { label: "Strong", color: "bg-emerald-500", text: "text-emerald-500" };
  };

  const strength = getStrength();

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100">
      
      {/* Password Display */}
      <div className="relative mb-8">
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl p-4 pr-32 min-h-[5rem]">
          <p className="font-mono text-2xl md:text-3xl tracking-wider text-gray-800 break-all select-all">
            {password}
          </p>
        </div>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
          <button
            onClick={generatePassword}
            className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            title="Generate new password"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={handleCopy}
            className={`p-3 text-white rounded-xl transition-all shadow-md ${copied ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20"}`}
            title="Copy password"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Strength Indicator */}
      <div className="flex items-center justify-between mb-10 px-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className={`w-5 h-5 ${strength.text}`} />
          <span className={`font-bold ${strength.text}`}>Password Strength: {strength.label}</span>
        </div>
        <div className="flex gap-1 w-32 h-2">
          <div className={`flex-1 rounded-full ${strength.label !== 'Invalid' ? strength.color : 'bg-gray-200'}`}></div>
          <div className={`flex-1 rounded-full ${strength.label === 'Medium' || strength.label === 'Strong' ? strength.color : 'bg-gray-200'}`}></div>
          <div className={`flex-1 rounded-full ${strength.label === 'Strong' ? strength.color : 'bg-gray-200'}`}></div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-8 bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-bold text-gray-700">Password Length</label>
            <span className="font-mono bg-white px-3 py-1 rounded-lg border border-gray-200 font-bold text-indigo-600 text-lg">
              {length}
            </span>
          </div>
          <input
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-colors">
            <input
              type="checkbox"
              checked={useUpper}
              onChange={(e) => setUseUpper(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <span className="font-medium text-gray-700">Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-colors">
            <input
              type="checkbox"
              checked={useLower}
              onChange={(e) => setUseLower(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <span className="font-medium text-gray-700">Lowercase (a-z)</span>
          </label>
          <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-colors">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <span className="font-medium text-gray-700">Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-colors">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <span className="font-medium text-gray-700">Symbols (!@#$%^&*)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
