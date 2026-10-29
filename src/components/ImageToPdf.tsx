"use client";

import React, { useState, useRef } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { 
  FileImage, Upload, Download, Trash2, ArrowUp, ArrowDown, 
  Settings, RefreshCw, AlertCircle, Plus, Eye 
} from "lucide-react";

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
}

export default function ImageToPdf() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<"A4" | "LETTER" | "FIT">("A4");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [margin, setMargin] = useState<number>(20);
  const [generating, setGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setError(null);

    const newItems: ImageItem[] = [];
    Array.from(fileList).forEach((file) => {
      if (file.type.startsWith("image/")) {
        newItems.push({
          id: Math.random().toString(36).substring(7),
          file,
          previewUrl: URL.createObjectURL(file),
        });
      }
    });

    if (newItems.length === 0) {
      setError("Please select valid image files (JPG, PNG, WEBP).");
      return;
    }

    setImages((prev) => [...prev, ...newItems]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((item) => item.id !== id);
    });
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    setImages((prev) => {
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setGenerating(true);
    setError(null);

    try {
      const pdfDoc = await PDFDocument.create();

      // Dimension mappings (in points: 1 inch = 72 points)
      // A4: 595.28 x 841.89
      // Letter: 612 x 792
      let standardWidth = pageSize === "A4" ? 595.28 : 612;
      let standardHeight = pageSize === "A4" ? 841.89 : 792;

      if (orientation === "landscape") {
        const temp = standardWidth;
        standardWidth = standardHeight;
        standardHeight = temp;
      }

      for (const item of images) {
        const imageBytes = await item.file.arrayBuffer();
        let pdfImage;

        if (item.file.type === "image/png") {
          pdfImage = await pdfDoc.embedPng(imageBytes);
        } else if (item.file.type === "image/jpeg" || item.file.type === "image/jpg") {
          pdfImage = await pdfDoc.embedJpg(imageBytes);
        } else {
          // Fallback: draw on canvas to convert to PNG bytes
          const convertedPngBytes = await convertToPngBytes(item.previewUrl);
          pdfImage = await pdfDoc.embedPng(convertedPngBytes);
        }

        const imgWidth = pdfImage.width;
        const imgHeight = pdfImage.height;

        let pageWidth = standardWidth;
        let pageHeight = standardHeight;

        if (pageSize === "FIT") {
          pageWidth = imgWidth + margin * 2;
          pageHeight = imgHeight + margin * 2;
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        // Calculate fitted dimensions preserving aspect ratio
        const availWidth = pageWidth - margin * 2;
        const availHeight = pageHeight - margin * 2;

        const scale = Math.min(availWidth / imgWidth, availHeight / imgHeight, 1);
        const drawWidth = imgWidth * scale;
        const drawHeight = imgHeight * scale;

        const x = (pageWidth - drawWidth) / 2;
        const y = (pageHeight - drawHeight) / 2;

        page.drawImage(pdfImage, {
          x,
          y,
          width: drawWidth,
          height: drawHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "converted-images.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to compile images into PDF. Please verify your images are accessible.");
    } finally {
      setGenerating(false);
    }
  };

  const convertToPngBytes = (srcUrl: string): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error("Canvas conversion failed"));
          blob.arrayBuffer().then(resolve).catch(reject);
        }, "image/png");
      };
      img.onerror = reject;
      img.src = srcUrl;
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Upload Zone */}
      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100 transition-all text-center"
      >
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-indigo-200 rounded-[2rem] p-10 sm:p-14 hover:bg-indigo-50/50 transition-all cursor-pointer bg-slate-50/50 group"
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={(e) => handleFiles(e.target.files)} 
            accept="image/png, image/jpeg, image/jpg, image/webp" 
            multiple
            className="hidden" 
          />
          <div className="w-16 h-16 rounded-2xl bg-indigo-100/70 text-indigo-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <FileImage className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Drop images to convert to PDF
          </h3>
          <p className="text-slate-500 max-w-md mx-auto text-sm">
            Select one or multiple <span className="font-semibold text-slate-700">PNG, JPG, or WEBP</span> images. Reorder and export to a single document instantly.
          </p>
          <button 
            type="button"
            className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all inline-flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" /> Add Images
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2 text-sm font-medium border border-red-100">
            <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
          </div>
        )}
      </div>

      {/* Settings & Image Reorder List */}
      {images.length > 0 && (
        <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100 space-y-6">
          {/* Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-600" /> Page & PDF Formatting
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {images.length} {images.length === 1 ? "page" : "pages"} ready for conversion
              </p>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" /> Add More Images
            </button>
          </div>

          {/* Formatting Controls Bar */}
          <div className="grid sm:grid-cols-3 gap-4 p-4 bg-slate-50/70 rounded-2xl border border-slate-100 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Page Size</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as any)}
                className="w-full bg-white border border-slate-200 rounded-xl p-2.5 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="A4">A4 (Standard 210 × 297 mm)</option>
                <option value="LETTER">US Letter (8.5 × 11 in)</option>
                <option value="FIT">Fit to Original Image Size</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Orientation</label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as any)}
                disabled={pageSize === "FIT"}
                className="w-full bg-white border border-slate-200 rounded-xl p-2.5 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <option value="portrait">Portrait (Vertical)</option>
                <option value="landscape">Landscape (Horizontal)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Page Margin</label>
              <select
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-xl p-2.5 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={0}>No Margin (Edge-to-Edge)</option>
                <option value={20}>Small Margin (20pt)</option>
                <option value={40}>Standard Margin (40pt)</option>
              </select>
            </div>
          </div>

          {/* Image Thumbnails & Order */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Reorder Pages ({images.length})
            </h4>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <div 
                  key={img.id}
                  className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-300 transition-all group"
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  
                  <img 
                    src={img.previewUrl} 
                    alt={img.file.name} 
                    className="w-14 h-14 object-cover rounded-xl border border-slate-100 flex-shrink-0 bg-slate-50"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-700 truncate">{img.file.name}</p>
                    <p className="text-[11px] text-slate-400">{(img.file.size / 1024).toFixed(0)} KB</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveImage(idx, "up")}
                      disabled={idx === 0}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveImage(idx, "down")}
                      disabled={idx === images.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeImage(img.id)}
                      className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={generatePdf}
            disabled={generating}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-3 text-base disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {generating ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            )}
            {generating ? "Compiling PDF..." : `Convert ${images.length} Images to PDF`}
          </button>
        </div>
      )}
    </div>
  );
}
