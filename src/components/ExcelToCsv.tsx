"use client";

import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { 
  FileSpreadsheet, Upload, Download, Copy, Check, Table, 
  Settings, RefreshCw, FileText, ArrowRight, AlertCircle 
} from "lucide-react";

export default function ExcelToCsv() {
  const [file, setFile] = useState<File | null>(null);
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [sheets, setSheets] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>("");
  const [tableData, setTableData] = useState<string[][]>([]);
  const [delimiter, setDelimiter] = useState<string>(",");
  const [hasHeaders, setHasHeaders] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (uploadedFile: File) => {
    setLoading(true);
    setError(null);
    setFile(uploadedFile);

    try {
      const data = await uploadedFile.arrayBuffer();
      const wb = XLSX.read(data, { type: "array" });
      setWorkbook(wb);
      setSheets(wb.SheetNames);

      const firstSheet = wb.SheetNames[0];
      setSelectedSheet(firstSheet);
      loadSheetData(wb, firstSheet);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to parse spreadsheet. Please ensure it's a valid Excel (.xlsx, .xls) or ODS file.");
    } finally {
      setLoading(false);
    }
  };

  const loadSheetData = (wb: XLSX.WorkBook, sheetName: string) => {
    const ws = wb.Sheets[sheetName];
    if (!ws) return;
    const json: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
    setTableData(json);
  };

  const handleSheetChange = (sheetName: string) => {
    setSelectedSheet(sheetName);
    if (workbook) {
      loadSheetData(workbook, sheetName);
    }
  };

  const generateCsvString = () => {
    if (!workbook || !selectedSheet) return "";
    const ws = workbook.Sheets[selectedSheet];
    if (!ws) return "";
    return XLSX.utils.sheet_to_csv(ws, { FS: delimiter });
  };

  const handleDownloadCsv = () => {
    const csvContent = generateCsvString();
    if (!csvContent) return;

    const extName = delimiter === "\t" ? "tsv" : "csv";
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const baseName = file?.name ? file.name.replace(/\.[^/.]+$/, "") : "converted";
    link.href = url;
    link.download = `${baseName}-${selectedSheet || "sheet"}.${extName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    if (!workbook || !selectedSheet) return;
    const ws = workbook.Sheets[selectedSheet];
    if (!ws) return;
    const jsonObject = XLSX.utils.sheet_to_json(ws);
    const jsonString = JSON.stringify(jsonObject, null, 2);
    const blob = new Blob([jsonString], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const baseName = file?.name ? file.name.replace(/\.[^/.]+$/, "") : "converted";
    link.href = url;
    link.download = `${baseName}-${selectedSheet || "sheet"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const csvContent = generateCsvString();
    if (!csvContent) return;
    navigator.clipboard.writeText(csvContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const previewRows = tableData.slice(0, 15);
  const totalRows = tableData.length;
  const totalCols = tableData[0]?.length || 0;

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
          className="border-2 border-dashed border-emerald-200 rounded-[2rem] p-10 sm:p-14 hover:bg-emerald-50/50 transition-all cursor-pointer bg-slate-50/50 group"
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileSelect} 
            accept=".xlsx, .xls, .csv, .ods, .tsv" 
            className="hidden" 
          />
          <div className="w-16 h-16 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            {file ? file.name : "Drop your Excel spreadsheet here"}
          </h3>
          <p className="text-slate-500 max-w-md mx-auto text-sm">
            Supports <span className="font-semibold text-slate-700">.xlsx, .xls, .ods, .csv</span>. Completely processed in your browser for 100% privacy.
          </p>
          <button 
            type="button"
            className="mt-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 transition-all inline-flex items-center gap-2 text-sm"
          >
            <Upload className="w-4 h-4" /> Browse Files
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2 text-sm font-medium border border-red-100">
            <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
          </div>
        )}
      </div>

      {/* Editor & Controls */}
      {tableData.length > 0 && (
        <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100 space-y-6">
          {/* Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Table className="w-5 h-5 text-emerald-600" /> Spreadsheet Overview
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {totalRows.toLocaleString()} rows • {totalCols} columns • Sheet: <span className="font-semibold text-slate-700">{selectedSheet}</span>
              </p>
            </div>

            {/* Sheets selector */}
            {sheets.length > 1 && (
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 pl-2">Sheet:</span>
                {sheets.map((sheet) => (
                  <button
                    key={sheet}
                    onClick={() => handleSheetChange(sheet)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedSheet === sheet
                        ? "bg-white text-emerald-700 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {sheet}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Settings Bar */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50/70 rounded-2xl border border-slate-100 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Delimiter</label>
              <select
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl p-2.5 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value=",">Comma ( , ) – Standard CSV</option>
                <option value=";">Semicolon ( ; ) – European Excel</option>
                <option value="&#9;">Tab ( \t ) – TSV format</option>
                <option value="|">Pipe ( | )</option>
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer p-2.5 bg-white rounded-xl border border-slate-200 text-slate-700 font-medium select-none">
                <input
                  type="checkbox"
                  checked={hasHeaders}
                  onChange={(e) => setHasHeaders(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-xs font-semibold">Treat Row 1 as Column Headers</span>
              </label>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 p-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy CSV"}
              </button>
              <button
                onClick={handleDownloadJson}
                className="flex-1 p-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <FileText className="w-4 h-4 text-indigo-600" />
                Export JSON
              </button>
            </div>
          </div>

          {/* Table Preview */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto max-h-[420px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold sticky top-0 backdrop-blur-sm z-10">
                    <th className="p-3 w-12 text-center text-slate-400 font-mono">#</th>
                    {previewRows[0]?.map((col, idx) => (
                      <th key={idx} className="p-3 border-l border-slate-200 whitespace-nowrap font-semibold">
                        {hasHeaders ? String(col || `Col ${idx + 1}`) : `Col ${idx + 1}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-600">
                  {previewRows.slice(hasHeaders ? 1 : 0).map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-emerald-50/30 transition-colors">
                      <td className="p-2.5 text-center text-slate-400 bg-slate-50/50 font-sans text-[11px]">
                        {rIdx + (hasHeaders ? 2 : 1)}
                      </td>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-2.5 border-l border-slate-100 whitespace-nowrap max-w-xs truncate">
                          {String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalRows > 15 && (
              <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
                Showing first 15 of {totalRows.toLocaleString()} rows. Full dataset will be exported.
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              onClick={handleDownloadCsv}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-3 text-base group"
            >
              <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              Download {selectedSheet ? `"${selectedSheet}"` : ""} as {delimiter === "\t" ? "TSV" : "CSV"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
