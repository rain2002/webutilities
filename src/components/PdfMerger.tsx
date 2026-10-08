"use client";

import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, FileText, Download, Loader2, Trash2, GripVertical } from "lucide-react";

export default function PdfMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [isMerging, setIsMerging] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    const pdfFiles = newFiles.filter((file) => file.type === "application/pdf");
    if (pdfFiles.length > 0) {
      setFiles((prev) => [...prev, ...pdfFiles]);
      setMergedPdfUrl(null); // Reset when new files are added
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setMergedPdfUrl(null);
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;

    setIsMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("Failed to merge PDF files. Some files might be encrypted or corrupted.");
    } finally {
      setIsMerging(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100 space-y-8">
      {/* Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-colors cursor-pointer bg-white
          ${dragActive ? "border-orange-500 bg-orange-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleChange}
          className="hidden"
        />
        <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-700 font-medium mb-1">Drag and drop PDF files here</p>
        <p className="text-sm text-gray-500">Select multiple files to combine them</p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Files to Merge ({files.length})</h3>
            <button
              onClick={() => { setFiles([]); setMergedPdfUrl(null); }}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear all
            </button>
          </div>
          
          <ul className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {files.map((file, idx) => (
              <li key={`${file.name}-${idx}`} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                <GripVertical className="w-5 h-5 text-gray-300 cursor-grab" />
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate" title={file.name}>{file.name}</p>
                  <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
                </div>
                <button
                  onClick={() => removeFile(idx)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
          
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              {files.length < 2 ? "Add at least 2 files to merge." : "Files will be merged in the order shown above."}
            </p>
            {!mergedPdfUrl ? (
              <button
                onClick={mergePdfs}
                disabled={files.length < 2 || isMerging}
                className="w-full md:w-auto px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isMerging ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Merging...
                  </>
                ) : (
                  "Merge PDFs"
                )}
              </button>
            ) : (
              <a
                href={mergedPdfUrl}
                download="merged-document.pdf"
                className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Download className="w-5 h-5" />
                Download Merged PDF
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
