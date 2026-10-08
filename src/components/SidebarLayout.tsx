"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, ChevronDown, ChevronRight, Wrench, ImageIcon, 
  FileText, Code2, QrCode, Type, Binary, Lock, Crop, Scissors, ShieldCheck,
  KeyRound, FileCode2, Coffee, MoreVertical, LayoutPanelLeft
} from "lucide-react";

const navigation = [
  {
    name: "Image & Visual Tools",
    icon: <ImageIcon className="w-5 h-5" />,
    items: [
      { name: "Image Compressor", href: "/tools/image-compressor" },
      { name: "QR Code Generator", href: "/tools/qr-generator" },
      { name: "Image Resizer", href: "/tools/image-resizer" },
    ]
  },
  {
    name: "PDF Documents",
    icon: <FileText className="w-5 h-5" />,
    items: [
      { name: "PDF Merger", href: "/tools/pdf-merger" },
      { name: "PDF Splitter", href: "/tools/pdf-splitter" },
      { name: "PDF Watermark", href: "/tools/pdf-watermark" },
    ]
  },
  {
    name: "Text & Dev Tools",
    icon: <Type className="w-5 h-5" />,
    items: [
      { name: "Word Counter", href: "/tools/word-counter" },
      { name: "JSON Formatter", href: "/tools/json-formatter" },
      { name: "Password Generator", href: "/tools/password-generator" },
      { name: "Base64 Encoder", href: "/tools/base64" },
      { name: "JWT Decoder", href: "/tools/jwt-decoder" },
      { name: "Markdown to HTML", href: "/tools/markdown-html" },
    ]
  },
  {
    name: "Developer Converters",
    icon: <Code2 className="w-5 h-5" />,
    items: [
      { name: "JSON ↔ CSV", href: "/tools/json-csv" },
      { name: "YAML ↔ JSON", href: "/tools/yaml-json" },
      { name: "Color Converter", href: "/tools/color-converter" },
      { name: "Timestamp Converter", href: "/tools/timestamp-converter" },
    ]
  }
];

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    "Image & Visual Tools": true,
    "Text & Dev Tools": true,
    "Developer Converters": true
  });
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setSidebarOpen(false);
      } else {
        setIsMobile(false);
        setSidebarOpen(true);
      }
    };
    handleResize(); // Initialize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCategory = (name: string) => {
    setOpenCategories(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-72 bg-white/95 backdrop-blur-xl border-r border-slate-200 shadow-xl lg:shadow-none
        transition-transform duration-300 ease-in-out transform flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80" onClick={handleLinkClick}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl text-slate-900 tracking-tight">WebToolKit</span>
          </Link>
          <button 
            className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-lg transition-colors" 
            onClick={() => setSidebarOpen(false)}
            title="Collapse Sidebar"
          >
            <LayoutPanelLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
          {navigation.map((category) => (
            <div key={category.name} className="mb-2">
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between p-3 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-colors font-bold"
              >
                <div className="flex items-center gap-3">
                  <span className="text-indigo-500">{category.icon}</span>
                  {category.name}
                </div>
                {openCategories[category.name] ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${openCategories[category.name] ? "max-h-[500px] mt-1" : "max-h-0"}`}>
                <div className="flex flex-col pl-11 pr-2 space-y-1">
                  {category.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={handleLinkClick}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive 
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" 
                            : "text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <a 
            href="https://buymeacoffee.com/rain15" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 w-full bg-[#FFDD00] hover:bg-[#FFD000] text-slate-900 rounded-xl transition-all shadow-sm hover:shadow-md group"
          >
            <div className="flex items-center gap-2 font-black text-sm mb-1">
              <Coffee className="w-5 h-5 group-hover:animate-bounce" />
              Buy me a coffee
            </div>
            <p className="text-[10px] font-medium opacity-80 text-center leading-tight">
              Did this save you time?<br/>Support the free tool!
            </p>
          </a>
          <div className="mt-4 text-[10px] text-slate-400 text-center font-medium">
            © 2026 WebToolKit
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative transition-all duration-300 ease-in-out ${sidebarOpen && !isMobile ? "ml-72" : "ml-0"}`}
      >
        {/* Global Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 font-bold"
                title="Expand Sidebar"
              >
                <MoreVertical className="w-6 h-6 text-indigo-600" />
                <span className="hidden sm:block text-sm">Menu</span>
              </button>
            )}
            {!sidebarOpen && (
              <span className="font-extrabold text-xl text-slate-900 tracking-tight ml-2">WebToolKit</span>
            )}
          </div>
          
          <a 
            href="https://buymeacoffee.com/rain15" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFDD00] hover:bg-[#FFD000] transition-colors text-slate-900 rounded-lg font-bold text-xs shadow-sm"
          >
            <Coffee className="w-4 h-4" />
            <span className="hidden sm:block">Buy me a coffee</span>
            <span className="sm:hidden">Support</span>
          </a>
        </header>

        <main className="flex-1 w-full relative">
          {children}
        </main>
      </div>
    </div>
  );
}
