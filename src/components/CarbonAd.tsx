"use client";

import { useEffect, useRef } from "react";

export default function CarbonAd() {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carbon ads script should only be appended once
    if (adContainerRef.current && !adContainerRef.current.hasChildNodes()) {
      const script = document.createElement("script");
      
      // IMPORTANT: Replace these with your actual Serve and Placement IDs once approved!
      script.src = "//cdn.carbonads.com/carbon.js?serve=YOUR_SERVE_ID&placement=YOUR_PLACEMENT_ID";
      script.id = "_carbonads_js";
      script.async = true;
      
      adContainerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full px-4 mb-4">
      {/* 
        This wrapper is styled to match the site's aesthetic while the ad loads,
        and provides the required container for the Carbon script to inject into. 
      */}
      <div 
        ref={adContainerRef} 
        className="w-full min-h-[130px] bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center text-xs text-slate-400 font-medium"
      >
        <span>Carbon Ad Placeholder</span>
      </div>
    </div>
  );
}
