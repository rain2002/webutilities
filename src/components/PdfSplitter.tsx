"use client";
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
}