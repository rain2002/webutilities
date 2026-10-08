"use client";

import React, { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import { UploadCloud, Image as ImageIcon, Download, Loader2, FileWarning } from "lucide-react";

export default function ImageCompressor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [mode, setMode] = useState<"compress" | "convert">("compress");
  const [targetFormat, setTargetFormat] = useState<string>("image/jpeg");
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    setSelectedFile(file);
    setCompressedFile(null);
  };

  const processImage = async () => {
    if (!selectedFile) return;

    setIsCompressing(true);
    setError(null);

    const finalFormat = mode === "convert" ? targetFormat : selectedFile.type;
    
    // If we're ONLY converting, set size limit super high so it doesn't aggressively compress
    const options = {
      maxSizeMB: mode === "compress" ? 1 : 50, 
      maxWidthOrHeight: mode === "compress" ? 1920 : undefined,
      useWebWorker: true,
      fileType: finalFormat,
    };

    try {
      const output = await imageCompression(selectedFile, options);
      
      const extMap: Record<string, string> = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
      };
      const ext = extMap[finalFormat] || ".jpg";
      const compressedName = selectedFile.name.replace(/\.[^/.]+$/, ext);
      
      const finalFile = new File([output], compressedName, { type: finalFormat });
      setCompressedFile(finalFile);
    } catch (err) {
      console.error(err);
      setError("Failed to process the image. It might be too large or unsupported.");
    } finally {
      setIsCompressing(false);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100">
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 p-1 rounded-xl inline-flex shadow-inner">
          <button
            onClick={() => { setMode("compress"); setCompressedFile(null); }}
            className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${mode === "compress" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            Compressor
          </button>
          <button
            onClick={() => { setMode("convert"); setCompressedFile(null); }}
            className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${mode === "convert" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            Converter
          </button>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {mode === "compress" ? "Image Compressor" : "Image Converter"}
        </h2>
        <p className="text-gray-500 mb-6">
          {mode === "compress" 
            ? "Compress your images locally to save space without losing quality."
            : "Convert your images between JPG, PNG, and WEBP formats instantly."}
        </p>
        
        {mode === "convert" && (
          <div className="inline-flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100 shadow-inner">
            <label htmlFor="top-format" className="text-sm text-gray-600 font-medium ml-2">Output Format:</label>
            <select
              id="top-format"
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value)}
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none cursor-pointer shadow-sm font-semibold"
            >
              <option value="image/jpeg">Convert to JPG</option>
              <option value="image/png">Convert to PNG</option>
              <option value="image/webp">Convert to WEBP</option>
            </select>
          </div>
        )}
      </div>

      {!selectedFile && (
        <div
          className={`relative border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-colors cursor-pointer
            ${dragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <UploadCloud className="w-12 h-12 text-indigo-400 mb-4" />
          <p className="text-gray-700 font-medium mb-1">Drag and drop your image here</p>
          <p className="text-sm text-gray-500">or click to browse files</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
          <FileWarning className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {selectedFile && (
        <div className="mt-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <ImageIcon className="w-6 h-6 text-indigo-500" />
            </div>
            <div className="flex-1 text-center md:text-left min-w-0">
              <p className="font-medium text-gray-800 truncate" title={selectedFile.name}>
                {selectedFile.name}
              </p>
              <p className="text-sm text-gray-500">Original size: {formatSize(selectedFile.size)}</p>
            </div>
            
            {!compressedFile && (
              <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                <button
                  onClick={processImage}
                  disabled={isCompressing}
                  className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20"
                >
                  {isCompressing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    mode === "compress" ? "Compress Image" : "Convert Format"
                  )}
                </button>
              </div>
            )}
          </div>

          {compressedFile && (
            <div className="flex flex-col md:flex-row items-center gap-4 bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <ImageIcon className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex-1 text-center md:text-left min-w-0">
                <p className="font-medium text-gray-800 truncate" title={compressedFile.name}>
                  {compressedFile.name}
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm mt-1">
                  <span className="text-gray-600">New size: {formatSize(compressedFile.size)}</span>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">
                    Saved {Math.max(0, Math.round((1 - compressedFile.size / selectedFile.size) * 100))}%
                  </span>
                </div>
              </div>
              <a
                href={URL.createObjectURL(compressedFile)}
                download={compressedFile.name}
                className="w-full md:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          )}
          
          <div className="flex justify-center pt-2">
            <button 
              onClick={() => {
                setSelectedFile(null);
                setCompressedFile(null);
              }}
              className="text-gray-500 hover:text-gray-800 text-sm font-medium underline transition-colors"
            >
              Start over with a new file
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
