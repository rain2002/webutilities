import ExcelToCsv from "@/components/ExcelToCsv";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Excel to CSV Converter Online (.xlsx & .xls) | WebToolKit",
  description: "Convert Excel spreadsheets (.xlsx, .xls, .ods) to CSV or TSV format online. Preview data, select workbook sheets, and download formatted CSV locally with 100% privacy.",
  keywords: "excel to csv, convert excel to csv online, xlsx to csv, xls to csv converter, free excel converter, sheet to csv, convert spreadsheet to csv",
};

export default function ExcelToCsvPage() {
  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all tools
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Excel to CSV Converter
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          Quickly convert your Excel spreadsheets (<span className="font-semibold text-slate-700">.xlsx, .xls, .ods</span>) into clean CSV, TSV, or JSON data. Choose your delimiters, select workbook sheets, and preview rows in real-time. Processed 100% locally in your browser.
        </p>
      </div>

      <ExcelToCsv />
    </main>
  );
}
