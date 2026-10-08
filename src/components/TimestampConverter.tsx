"use client";

import React, { useState, useEffect } from "react";
import { Clock, ArrowDown, ArrowUp, Copy, Check } from "lucide-react";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState<string>("");
  const [dateInput, setDateInput] = useState<string>("");
  const [resultDate, setResultDate] = useState<Date | null>(null);
  const [resultTimestamp, setResultTimestamp] = useState<number | null>(null);
  const [copiedTime, setCopiedTime] = useState(false);
  const [copiedDate, setCopiedDate] = useState(false);
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  // Set initial date input and current time only on the client to avoid Next.js hydration errors
  useEffect(() => {
    const now = new Date();
    setTimestamp(Math.floor(now.getTime() / 1000).toString());
    setResultDate(now);
    setCurrentTime(Math.floor(now.getTime() / 1000));
    
    // format to YYYY-MM-DDTHH:mm
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now.getTime() - offset)).toISOString().slice(0, 16);
    setDateInput(localISOTime);
    
    // Set up a ticking clock for the live widget
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTimestamp(val);
    if (!val) {
      setResultDate(null);
      return;
    }
    
    // Auto-detect seconds vs milliseconds
    let parsed = parseInt(val);
    if (isNaN(parsed)) {
      setResultDate(null);
      return;
    }
    
    if (val.length <= 10) {
      parsed = parsed * 1000; // it's in seconds
    }
    
    setResultDate(new Date(parsed));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDateInput(val);
    if (!val) {
      setResultTimestamp(null);
      return;
    }
    const d = new Date(val);
    if (isNaN(d.getTime())) {
      setResultTimestamp(null);
    } else {
      setResultTimestamp(Math.floor(d.getTime() / 1000));
    }
  };

  const handleCopy = (text: string, type: 'time' | 'date') => {
    navigator.clipboard.writeText(text);
    if (type === 'time') {
      setCopiedTime(true);
      setTimeout(() => setCopiedTime(false), 2000);
    } else {
      setCopiedDate(true);
      setTimeout(() => setCopiedDate(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Current Time Widget */}
      <div className="bg-indigo-600 text-white p-6 rounded-[2rem] shadow-xl shadow-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <p className="text-indigo-200 font-medium">Current Unix Timestamp</p>
            <p className="text-3xl font-mono font-bold">{currentTime !== null ? currentTime : "Loading..."}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Epoch to Date */}
        <div className="bg-white/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100 flex flex-col">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ArrowDown className="w-5 h-5 text-indigo-500" />
            Timestamp to Date
          </h2>
          
          <div className="space-y-4 mb-8">
            <label className="text-sm font-bold text-slate-600">Enter Epoch / Unix Timestamp</label>
            <input
              type="text"
              value={timestamp}
              onChange={handleTimestampChange}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-lg transition-all"
              placeholder="e.g. 1718293012"
            />
          </div>

          <div className="mt-auto bg-slate-50 rounded-xl p-4 border border-slate-100 relative group">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Local Time Result</p>
            <p className="font-mono text-slate-800 text-lg">
              {resultDate && !isNaN(resultDate.getTime()) ? resultDate.toLocaleString() : "Invalid Timestamp"}
            </p>
            {resultDate && !isNaN(resultDate.getTime()) && (
              <button
                onClick={() => handleCopy(resultDate.toLocaleString(), 'date')}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all shadow-sm opacity-0 group-hover:opacity-100"
              >
                {copiedDate ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Date to Epoch */}
        <div className="bg-white/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100 flex flex-col">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ArrowUp className="w-5 h-5 text-fuchsia-500" />
            Date to Timestamp
          </h2>
          
          <div className="space-y-4 mb-8">
            <label className="text-sm font-bold text-slate-600">Select Date & Time</label>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={handleDateChange}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none font-mono text-lg transition-all"
            />
          </div>

          <div className="mt-auto bg-slate-50 rounded-xl p-4 border border-slate-100 relative group">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Epoch Timestamp Result</p>
            <p className="font-mono text-slate-800 text-lg">
              {resultTimestamp !== null ? resultTimestamp : "Invalid Date"}
            </p>
            {resultTimestamp !== null && (
              <button
                onClick={() => handleCopy(resultTimestamp.toString(), 'time')}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-fuchsia-600 hover:bg-white rounded-lg transition-all shadow-sm opacity-0 group-hover:opacity-100"
              >
                {copiedTime ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
