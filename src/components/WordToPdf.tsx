"use client";

import React, { useState, useRef } from "react";
import mammoth from "mammoth";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DOMPurify from "dompurify";
import { 
  FileText, Upload, Download, Copy, Check, Printer, 
  Settings, RefreshCw, AlertCircle, Eye, FileCode2 
} from "lucide-react";

export default function WordToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [rawText, setRawText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [converting, setConverting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<"p" | "l">("p");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const processWordFile = async (uploadedFile: File) => {
    setLoading(true);
    setError(null);
    setFile(uploadedFile);

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();

      // Convert docx to HTML using mammoth
      const htmlResult = await mammoth.convertToHtml({ arrayBuffer });
      const textResult = await mammoth.extractRawText({ arrayBuffer });

      const clean = DOMPurify.sanitize(htmlResult.value);
      setHtmlContent(clean);
      setRawText(textResult.value);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to parse Word document. Please ensure it is a valid .docx file.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;
    setConverting(true);
    setError(null);

    try {
      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: orientation,
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth - 20; // 10mm margins on left/right
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10; // 10mm top margin

      // First page
      pdf.addImage(imgData, "JPEG", 10, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - 20);

      // Subsequent pages if document exceeds 1 page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 10, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 20);
      }

      const baseName = file?.name ? file.name.replace(/\.[^/.]+$/, "") : "document";
      pdf.save(`${baseName}.pdf`);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to compile PDF. You can also use the 'Print to PDF' button as an instant alternative.");
    } finally {
      setConverting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    if (!rawText) return;
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processWordFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processWordFile(e.target.files[0]);
    }
  };

  const wordCount = rawText.trim() ? rawText.trim().split(/\s+/).length : 0;

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
          className="border-2 border-dashed border-sky-200 rounded-[2rem] p-10 sm:p-14 hover:bg-sky-50/50 transition-all cursor-pointer bg-slate-50/50 group"
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileSelect} 
            accept=".docx, application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
            className="hidden" 
          />
          <div className="w-16 h-16 rounded-2xl bg-sky-100/70 text-sky-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            {file ? file.name : "Drop your Word document (.docx) here"}
          </h3>
          <p className="text-slate-500 max-w-md mx-auto text-sm">
            Converts <span className="font-semibold text-slate-700">Microsoft Word (.docx)</span> into a clean, formatted PDF. 100% private in your browser.
          </p>
          <button 
            type="button"
            className="mt-6 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/20 transition-all inline-flex items-center gap-2 text-sm"
          >
            <Upload className="w-4 h-4" /> Select Word Document
          </button>
        </div>

        {loading && (
          <div className="mt-4 p-4 bg-sky-50 text-sky-700 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold">
            <RefreshCw className="w-4 h-4 animate-spin" /> Reading Word document structure and layout...
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2 text-sm font-medium border border-red-100">
            <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
          </div>
        )}
      </div>

      {/* Document Preview & Export Controls */}
      {htmlContent && !loading && (
        <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100 space-y-6">
          {/* Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Eye className="w-5 h-5 text-sky-600" /> Document Preview
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {wordCount.toLocaleString()} words • {rawText.length.toLocaleString()} characters
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
                onClick={handlePrint}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all"
                title="Print or Save via Browser System Print"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                Print / Save PDF
              </button>
            </div>
          </div>

          {/* Orientation selector */}
          <div className="flex items-center gap-4 p-4 bg-slate-50/70 rounded-2xl border border-slate-100 text-sm">
            <label className="text-xs font-bold text-slate-600">Page Orientation:</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOrientation("p")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  orientation === "p"
                    ? "bg-white text-sky-700 shadow-sm border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Portrait (A4)
              </button>
              <button
                onClick={() => setOrientation("l")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  orientation === "l"
                    ? "bg-white text-sky-700 shadow-sm border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Landscape
              </button>
            </div>
          </div>

          {/* Styled Document Sheet Container */}
          <div className="bg-slate-100/70 p-4 sm:p-8 rounded-2xl overflow-x-auto flex justify-center">
            <div 
              ref={previewRef}
              className={`bg-white shadow-lg rounded-xl p-8 sm:p-12 border border-slate-200 text-slate-800 prose prose-slate max-w-none transition-all ${
                orientation === "p" ? "w-full max-w-[760px] min-h-[900px]" : "w-full max-w-[960px] min-h-[680px]"
              }`}
              style={{
                fontFamily: "Calibri, Arial, sans-serif",
                lineHeight: "1.6",
              }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>

          {/* Primary Action Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={converting}
            className="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl shadow-xl shadow-sky-500/25 transition-all flex items-center justify-center gap-3 text-base disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {converting ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            )}
            {converting ? "Generating PDF..." : "Convert & Download as PDF"}
          </button>
        </div>
      )}
    </div>
  );
}
