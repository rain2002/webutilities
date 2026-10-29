const fs = require('fs');

const writeTool = (name, content) => {
  fs.writeFileSync('src/components/' + name + '.tsx', content);
};

writeTool('Base64', `"use client";
import { useState } from "react";
import { Binary, ArrowDown } from "lucide-react";

export default function Base64() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");

  const handleProcess = () => {
    try {
      setOutput(mode === "encode" ? btoa(input) : atob(input));
    } catch {
      setOutput("Invalid input format for Base64 decoding.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 bg-white/95 p-8 rounded-[2rem] shadow-xl ring-1 ring-slate-100">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Binary className="w-6 h-6 text-emerald-500" /> Base64 Tool</h2>
        <select value={mode} onChange={e=>setMode(e.target.value)} className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500">
          <option value="encode">Encode to Base64</option>
          <option value="decode">Decode from Base64</option>
        </select>
      </div>
      <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl h-40 text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Paste your text here..." />
      <button onClick={handleProcess} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex justify-center items-center gap-2">
        Process <ArrowDown className="w-5 h-5" />
      </button>
      <textarea value={output} readOnly className="w-full p-4 bg-slate-100 border border-slate-200 rounded-xl h-40 text-slate-700 font-mono outline-none" placeholder="Result will appear here..." />
    </div>
  );
}`);

writeTool('JwtDecoder', `"use client";
import { useState } from "react";
import { Lock } from "lucide-react";

export default function JwtDecoder() {
  const [input, setInput] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");

  const decode = (val: string) => {
    setInput(val);
    try {
      if(!val) { setHeader(""); setPayload(""); return; }
      const parts = val.split('.');
      if(parts.length !== 3) throw new Error();
      setHeader(JSON.stringify(JSON.parse(atob(parts[0])), null, 2));
      setPayload(JSON.stringify(JSON.parse(atob(parts[1])), null, 2));
    } catch {
      setHeader("Invalid JWT"); setPayload("Invalid JWT");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 bg-white/95 p-8 rounded-[2rem] shadow-xl ring-1 ring-slate-100">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4"><Lock className="w-6 h-6 text-fuchsia-500" /> Decode JWT</h2>
      <textarea value={input} onChange={e=>decode(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl h-24 text-slate-800 font-mono outline-none focus:ring-2 focus:ring-fuchsia-500" placeholder="Paste JWT token here..." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-slate-700 mb-2">Header (Algorithm)</h3>
          <pre className="p-4 bg-slate-800 text-emerald-400 rounded-xl overflow-auto h-64 font-mono text-sm">{header}</pre>
        </div>
        <div>
          <h3 className="font-bold text-slate-700 mb-2">Payload (Data)</h3>
          <pre className="p-4 bg-slate-800 text-sky-400 rounded-xl overflow-auto h-64 font-mono text-sm">{payload}</pre>
        </div>
      </div>
    </div>
  );
}`);

writeTool('MarkdownHtml', `"use client";
import { useState } from "react";
import { marked } from "marked";
import { FileCode2 } from "lucide-react";

export default function MarkdownHtml() {
  const [input, setInput] = useState("# Hello Markdown\\n\\nType your **markdown** here!");
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
}`);

writeTool('JsonCsv', `"use client";
import { useState } from "react";
import Papa from "papaparse";
import { Code2, ArrowRight } from "lucide-react";

export default function JsonCsv() {
  const [json, setJson] = useState("[{\\"name\\": \\"John\\", \\"age\\": 30}]");
  const [csv, setCsv] = useState("");
  const convert = () => {
    try { setCsv(Papa.unparse(JSON.parse(json))); } 
    catch { setCsv("Error parsing JSON. Ensure it is a valid array of objects."); }
  };
  return (
    <div className="max-w-4xl mx-auto space-y-6 bg-white/95 p-8 rounded-[2rem] shadow-xl ring-1 ring-slate-100">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Code2 className="w-6 h-6 text-sky-500"/> JSON to CSV Converter</h2>
      <textarea value={json} onChange={e=>setJson(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl h-48 text-slate-800 font-mono outline-none focus:ring-2 focus:ring-sky-500" placeholder="Paste JSON Array..." />
      <button onClick={convert} className="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-lg shadow-sky-500/30 transition-all flex justify-center items-center gap-2">
        Convert to CSV <ArrowRight className="w-5 h-5" />
      </button>
      <textarea value={csv} readOnly className="w-full p-4 bg-slate-100 border border-slate-200 rounded-xl h-48 text-slate-800 font-mono outline-none" placeholder="CSV Output..." />
    </div>
  );
}`);

writeTool('YamlJson', `"use client";
import { useState } from "react";
import * as yaml from "js-yaml";
import { FileCode2, ArrowRight } from "lucide-react";

export default function YamlJson() {
  const [input, setInput] = useState("name: John\\nage: 30");
  const [output, setOutput] = useState("");
  const convert = () => {
    try { setOutput(JSON.stringify(yaml.load(input), null, 2)); } 
    catch { setOutput("Error parsing YAML. Invalid syntax."); }
  };
  return (
    <div className="max-w-4xl mx-auto space-y-6 bg-white/95 p-8 rounded-[2rem] shadow-xl ring-1 ring-slate-100">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><FileCode2 className="w-6 h-6 text-teal-500"/> YAML to JSON</h2>
      <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl h-48 text-slate-800 font-mono outline-none focus:ring-2 focus:ring-teal-500" placeholder="Paste YAML..." />
      <button onClick={convert} className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 transition-all flex justify-center items-center gap-2">
        Convert to JSON <ArrowRight className="w-5 h-5" />
      </button>
      <textarea value={output} readOnly className="w-full p-4 bg-slate-100 border border-slate-200 rounded-xl h-48 text-slate-800 font-mono outline-none" placeholder="JSON Output..." />
    </div>
  );
}`);

writeTool('ColorConverter', `"use client";
import { useState, useEffect } from "react";
import { Type } from "lucide-react";

export default function ColorConverter() {
  const [hex, setHex] = useState("#4f46e5");
  const [rgb, setRgb] = useState("79, 70, 229");
  
  const hexToRgb = (val: string) => {
    setHex(val);
    let h = val.replace('#', '');
    if(h.length === 3) h = h.split('').map((c: string)=>c+c).join('');
    if(h.length !== 6) { setRgb("Invalid HEX"); return; }
    setRgb(\`\${parseInt(h.substr(0,2),16)}, \${parseInt(h.substr(2,2),16)}, \${parseInt(h.substr(4,2),16)}\`);
  };
  
  // Set initial state on mount to avoid hydration mismatch if needed
  useEffect(() => { hexToRgb("#4f46e5"); }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white/95 p-10 rounded-[2rem] shadow-xl ring-1 ring-slate-100 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2"><Type className="w-6 h-6 text-pink-500"/> Color Converter</h2>
      
      <div className="w-40 h-40 rounded-full shadow-inner border-4 border-white ring-2 ring-slate-100 mb-10 transition-colors duration-300" style={{backgroundColor: hex.length===7 ? hex : '#ccc'}}></div>
      
      <div className="w-full space-y-6">
        <div>
          <label className="font-bold text-slate-700 mb-2 block">HEX Code</label>
          <input value={hex} onChange={e=>hexToRgb(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:ring-2 focus:ring-pink-500 text-lg font-mono uppercase" />
        </div>
        <div>
          <label className="font-bold text-slate-700 mb-2 block">RGB Code</label>
          <input value={rgb} readOnly className="w-full p-4 bg-slate-100 border border-slate-200 rounded-xl text-slate-800 outline-none text-lg font-mono" />
        </div>
      </div>
    </div>
  );
}`);

writeTool('ImageResizer', `"use client";
import React, { useState, useRef } from "react";
import { Crop, Upload, Download, Settings } from "lucide-react";

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      const url = URL.createObjectURL(f);
      setPreview(url);
      
      // Auto-detect dimensions
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = url;
    }
  };

  const downloadResized = () => {
    if (!preview || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      
      const link = document.createElement("a");
      link.download = \`resized-\${file?.name || "image.png"}\`;
      link.href = canvas.toDataURL(file?.type || "image/png");
      link.click();
    };
    img.src = preview;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-white/95 p-10 rounded-[2rem] shadow-xl ring-1 ring-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Crop className="text-indigo-500 w-6 h-6"/> Image Resizer</h2>
        
        <div className="border-2 border-dashed border-indigo-200 rounded-[2rem] p-12 text-center hover:bg-indigo-50 transition-colors cursor-pointer relative bg-slate-50">
          <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <Upload className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-700">Upload Image to Resize</h3>
          <p className="text-slate-500 mt-2">JPG, PNG, WEBP allowed</p>
        </div>
      </div>

      {preview && (
        <div className="bg-white/95 p-10 rounded-[2rem] shadow-xl ring-1 ring-slate-100 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Settings className="w-5 h-5"/> Resize Dimensions</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-600 block mb-2">Width (px)</label>
                <input type="number" value={width} onChange={e=>setWidth(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-600 block mb-2">Height (px)</label>
                <input type="number" value={height} onChange={e=>setHeight(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <button onClick={downloadResized} className="w-full py-4 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex justify-center items-center gap-2">
                Download Resized Image <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Original Preview</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="max-h-64 object-contain rounded-lg shadow-sm" />
            <canvas ref={canvasRef} className="hidden"></canvas>
          </div>
        </div>
      )}
    </div>
  );
}`);

writeTool('PdfSplitter', `"use client";
import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Scissors, Upload, Download } from "lucide-react";

export default function PdfSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState("1");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    if (!file || !pageRange) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();
      
      const ranges = pageRange.split(',').map(s => s.trim());
      for (const range of ranges) {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(Number);
          for(let i = start; i <= end; i++) {
            if(i > 0 && i <= pdf.getPageCount()) {
              const [copied] = await newPdf.copyPages(pdf, [i - 1]);
              newPdf.addPage(copied);
            }
          }
        } else {
          const i = Number(range);
          if(i > 0 && i <= pdf.getPageCount()) {
            const [copied] = await newPdf.copyPages(pdf, [i - 1]);
            newPdf.addPage(copied);
          }
        }
      }
      
      const bytes = await newPdf.save();
      const blob = new Blob([bytes as any], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "split_" + file.name;
      link.click();
    } catch (e) {
      alert("Error processing PDF. Ensure page ranges are valid.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/95 p-10 rounded-[2rem] shadow-xl ring-1 ring-slate-100 space-y-8">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Scissors className="w-6 h-6 text-orange-500" /> PDF Splitter</h2>
      
      <div className="border-2 border-dashed border-orange-200 rounded-[2rem] p-12 text-center hover:bg-orange-50 transition-colors cursor-pointer relative bg-slate-50">
        <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        <Upload className="w-12 h-12 text-orange-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-700">{file ? file.name : "Upload PDF to Split"}</h3>
      </div>

      {file && (
        <div className="space-y-4">
          <div>
            <label className="font-bold text-slate-700 block mb-2">Pages to Extract</label>
            <input type="text" value={pageRange} onChange={e=>setPageRange(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g. 1-3, 5, 7-9" />
            <p className="text-xs text-slate-500 mt-2">Format: "1-5", "1, 3, 5", or "1-3, 5"</p>
          </div>
          <button onClick={handleProcess} disabled={isProcessing} className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all flex justify-center items-center gap-2">
            {isProcessing ? "Processing..." : "Split & Download PDF"} <Download className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}`);

writeTool('PdfWatermark', `"use client";
import React, { useState } from "react";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import { ShieldCheck, Upload, Download } from "lucide-react";

export default function PdfWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [watermark, setWatermark] = useState("CONFIDENTIAL");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    if (!file || !watermark) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = pdf.getPages();
      
      for (const page of pages) {
        const { width, height } = page.getSize();
        page.drawText(watermark, {
          x: width / 4,
          y: height / 2,
          size: 60,
          color: rgb(0.8, 0.8, 0.8),
          rotate: degrees(45),
          opacity: 0.5,
        });
      }
      
      const bytes = await pdf.save();
      const blob = new Blob([bytes as any], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "watermarked_" + file.name;
      link.click();
    } catch (e) {
      alert("Error adding watermark.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/95 p-10 rounded-[2rem] shadow-xl ring-1 ring-slate-100 space-y-8">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-orange-500" /> PDF Watermarker</h2>
      
      <div className="border-2 border-dashed border-orange-200 rounded-[2rem] p-12 text-center hover:bg-orange-50 transition-colors cursor-pointer relative bg-slate-50">
        <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        <Upload className="w-12 h-12 text-orange-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-700">{file ? file.name : "Upload PDF to Watermark"}</h3>
      </div>

      {file && (
        <div className="space-y-4">
          <div>
            <label className="font-bold text-slate-700 block mb-2">Watermark Text</label>
            <input type="text" value={watermark} onChange={e=>setWatermark(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:ring-2 focus:ring-orange-500 uppercase" placeholder="CONFIDENTIAL" />
          </div>
          <button onClick={handleProcess} disabled={isProcessing} className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all flex justify-center items-center gap-2">
            {isProcessing ? "Processing..." : "Add Watermark & Download"} <Download className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}`);
