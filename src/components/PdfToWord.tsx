"use client";

import React, { useState, useRef } from "react";
import { extractText } from "unpdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { 
  FileText, Upload, Download, Copy, Check, RefreshCw, 
  Eye, FileCode, AlertCircle, FileCheck2, Sparkles 
} from "lucide-react";

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageTexts, setPageTexts] = useState<string[]>([]);
  const [combinedText, setCombinedText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [converting, setConverting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processPdf = async (uploadedFile: File) => {
    setLoading(true);
    setError(null);
    setFile(uploadedFile);

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const result = await extractText(arrayBuffer);

      setTotalPages(result.totalPages);
      const pages = Array.isArray(result.text) ? result.text : [result.text];
      setPageTexts(pages);

      const fullText = pages
        .map((p, idx) => `--- [ Page ${idx + 1} ] ---\n${p.trim()}`)
        .join("\n\n");
      setCombinedText(fullText);
    } catch (err: unknown) {
      console.error(err);
      setError("Could not extract text from this PDF. Please ensure the PDF contains selectable text (not scanned images).");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDocx = async () => {
    if (!combinedText) return;
    setConverting(true);

    try {
      const paragraphs: Paragraph[] = [];
      const pagesToProcess = pageTexts.length > 0 ? pageTexts : [combinedText];

      pagesToProcess.forEach((pageContent, pageIdx) => {
        // Add page break between pages
        if (pageIdx > 0) {
          paragraphs.push(
            new Paragraph({
              children: [new TextRun("")],
              pageBreakBefore: true,
            })
          );
        }

        const lines = pageContent.split("\n");
        lines.forEach((line) => {
          const trimmed = line.trim();
          if (trimmed.length > 0) {
            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: trimmed,
                    size: 24, // 12pt
                    font: "Calibri",
                  }),
                ],
                spacing: {
                  after: 140,
                  line: 280,
                },
              })
            );
          }
        });
      });

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs.length > 0 ? paragraphs : [
              new Paragraph({
                children: [new TextRun(combinedText)],
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const baseName = file?.name ? file.name.replace(/\.[^/.]+$/, "") : "document";
      link.href = url;
      link.download = `${baseName}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to generate Word document. Please try again.");
    } finally {
      setConverting(false);
    }
  };

  const handleDownloadTxt = () => {
    if (!combinedText) return;
    const blob = new Blob([combinedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const baseName = file?.name ? file.name.replace(/\.[^/.]+$/, "") : "document";
    link.href = url;
    link.download = `${baseName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!combinedText) return;
    navigator.clipboard.writeText(combinedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processPdf(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processPdf(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Upload Zone */}
      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100 transition-all text-center"
      >
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-blue-200 rounded-[2rem] p-10 sm:p-14 hover:bg-blue-50/50 transition-all cursor-pointer bg-slate-50/50 group"
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileSelect} 
            accept="application/pdf" 
            className="hidden" 
          />
          <div className="w-16 h-16 rounded-2xl bg-blue-100/70 text-blue-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            {file ? file.name : "Drop your PDF file here"}
          </h3>
          <p className="text-slate-500 max-w-md mx-auto text-sm">
            Converts any standard PDF into an editable <span className="font-semibold text-slate-700">Microsoft Word (.docx)</span> document. 100% private in browser.
          </p>
          <button 
            type="button"
            className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all inline-flex items-center gap-2 text-sm"
          >
            <Upload className="w-4 h-4" /> Select PDF
          </button>
        </div>

        {loading && (
          <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold">
            <RefreshCw className="w-4 h-4 animate-spin" /> Extracting PDF pages and text layout...
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2 text-sm font-medium border border-red-100">
            <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
          </div>
        )}
      </div>

      {/* Editor & Results */}
      {combinedText && !loading && (
        <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-blue-600" /> Extracted Document Text
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {totalPages} {totalPages === 1 ? "page" : "pages"} extracted • {combinedText.length.toLocaleString()} characters
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy Text"}
              </button>
              <button
                onClick={handleDownloadTxt}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all"
              >
                <FileCode className="w-4 h-4 text-slate-600" />
                Download .TXT
              </button>
            </div>
          </div>

          {/* Textarea Preview */}
          <div className="relative">
            <textarea
              value={combinedText}
              onChange={(e) => setCombinedText(e.target.value)}
              rows={14}
              placeholder="Extracted document text will appear here..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs leading-relaxed text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={handleDownloadDocx}
            disabled={converting}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-3 text-base disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {converting ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            )}
            {converting ? "Generating Word Document..." : "Download as Microsoft Word (.docx)"}
          </button>
        </div>
      )}
    </div>
  );
}
