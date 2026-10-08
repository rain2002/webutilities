"use client";
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
      link.download = `resized-${file?.name || "image.png"}`;
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
}