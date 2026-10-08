import ImageCompressor from "@/components/ImageCompressor";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image Converter & Compressor Online | WebToolKit",
  description: "Free online image converter and compressor. Convert PNG, JPG, and WEBP formats locally without quality loss. Zero server uploads.",
  keywords: "image converter, free image converter online, convert to webp, convert to jpg, png to jpg converter, image compressor",
};

export default function ImageCompressorPage() {
  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all tools
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Image Compressor & Converter
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Reduce the file size of your images and convert them between JPG, PNG, and WEBP directly in your browser. Our tool uses local processing, ensuring 100% privacy with zero server uploads. Fast, free, and secure.
        </p>
      </div>

      <ImageCompressor />
    </main>
  );
}
