"use client";
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
}