"use client";

import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, QrCode, Link2, Type, Wifi } from "lucide-react";

export default function QrCodeGenerator() {
  const [activeTab, setActiveTab] = useState<"url" | "text" | "wifi">("url");
  const [url, setUrl] = useState("https://example.com");
  const [text, setText] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");
  const qrRef = useRef<HTMLDivElement>(null);

  const getQrValue = () => {
    if (activeTab === "url") return url || "https://example.com";
    if (activeTab === "text") return text || "Enter some text";
    if (activeTab === "wifi") {
      return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;
    }
    return "";
  };

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qrcode-${activeTab}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100 flex flex-col md:flex-row gap-12 items-start">
      
      {/* Settings Panel */}
      <div className="flex-1 w-full space-y-6">
        <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner mb-6 w-full max-w-sm">
          <button
            onClick={() => setActiveTab("url")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === "url" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
          >
            <Link2 className="w-4 h-4" /> URL
          </button>
          <button
            onClick={() => setActiveTab("text")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === "text" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
          >
            <Type className="w-4 h-4" /> Text
          </button>
          <button
            onClick={() => setActiveTab("wifi")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === "wifi" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
          >
            <Wifi className="w-4 h-4" /> Wi-Fi
          </button>
        </div>

        {activeTab === "url" && (
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Website URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        )}

        {activeTab === "text" && (
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Plain Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your message here..."
              rows={4}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
            />
          </div>
        )}

        {activeTab === "wifi" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Network Name (SSID)</label>
              <input
                type="text"
                value={wifiSsid}
                onChange={(e) => setWifiSsid(e.target.value)}
                placeholder="My Home WiFi"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Password</label>
              <input
                type="text"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                placeholder="secretpassword123"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Security</label>
              <select
                value={wifiEncryption}
                onChange={(e) => setWifiEncryption(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Preview Panel */}
      <div className="w-full md:w-[320px] shrink-0 bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col items-center justify-center gap-6">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <QrCode className="w-5 h-5 text-indigo-500" />
          Live Preview
        </h3>
        
        <div ref={qrRef} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <QRCodeCanvas 
            value={getQrValue()} 
            size={200}
            level={"H"}
            includeMargin={true}
            fgColor={"#000000"}
          />
        </div>

        <button
          onClick={handleDownload}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20"
        >
          <Download className="w-5 h-5" />
          Download PNG
        </button>
      </div>
    </div>
  );
}
