import Link from "next/link";
import { 
  Image as ImageIcon, Type, Code2, FileText, ArrowRight, ShieldCheck, Zap, Coins,
  QrCode, Crop, Scissors, KeyRound, Binary, Lock, FileCode2
} from "lucide-react";

export default function Home() {
  const categories = [
    {
      title: "Image & Visual Tools",
      description: "Compress, convert, and generate visual assets locally.",
      tools: [
        {
          id: "image-compressor",
          title: "Image Compressor & Converter",
          description: "Compress and convert images between JPG, PNG, and WEBP formats locally in your browser. 100% privacy.",
          icon: <ImageIcon className="w-6 h-6 text-indigo-600" />,
          href: "/tools/image-compressor",
          color: "bg-indigo-50 border-indigo-100",
          gradient: "hover:border-indigo-300 hover:shadow-indigo-500/20",
          soon: false
        },
        {
          id: "qr-generator",
          title: "QR Code Generator",
          description: "Instantly create downloadable QR codes for URLs, text, Wi-Fi networks, and more.",
          icon: <QrCode className="w-6 h-6 text-indigo-600" />,
          href: "/tools/qr-generator",
          color: "bg-indigo-50 border-indigo-100",
          gradient: "hover:border-indigo-300 hover:shadow-indigo-500/20",
          soon: false
        },
        {
          id: "image-resizer",
          title: "Image Resizer & Cropper",
          description: "Crop and scale images to exact dimensions. Perfect for social media and thumbnails.",
          icon: <Crop className="w-6 h-6 text-indigo-600" />,
          href: "/tools/image-resizer",
          color: "bg-indigo-50 border-indigo-100",
          gradient: "hover:border-indigo-300 hover:shadow-indigo-500/20",
          soon: false
        }
      ]
    },
    {
      title: "PDF Documents",
      description: "Manipulate sensitive documents securely without server uploads.",
      tools: [
        {
          id: "pdf-merger",
          title: "PDF Merger",
          description: "Combine multiple PDF files into one document instantly. Processed locally for 100% privacy.",
          icon: <FileText className="w-6 h-6 text-orange-600" />,
          href: "/tools/pdf-merger",
          color: "bg-orange-50 border-orange-100",
          gradient: "hover:border-orange-300 hover:shadow-orange-500/20",
          soon: false
        },
        {
          id: "pdf-splitter",
          title: "PDF Splitter",
          description: "Extract specific pages or split large PDFs into multiple smaller documents.",
          icon: <Scissors className="w-6 h-6 text-orange-600" />,
          href: "/tools/pdf-splitter",
          color: "bg-orange-50 border-orange-100",
          gradient: "hover:border-orange-300 hover:shadow-orange-500/20",
          soon: false
        },
        {
          id: "pdf-watermark",
          title: "PDF Watermarker",
          description: "Add text or image watermarks to your PDF pages to protect your intellectual property.",
          icon: <ShieldCheck className="w-6 h-6 text-orange-600" />,
          href: "/tools/pdf-watermark",
          color: "bg-orange-50 border-orange-100",
          gradient: "hover:border-orange-300 hover:shadow-orange-500/20",
          soon: false
        }
      ]
    },
    {
      title: "Text & Developer Tools",
      description: "Fast utilities for developers, writers, and security.",
      tools: [
        {
          id: "json-formatter",
          title: "JSON Formatter",
          description: "Beautify, validate, and minify JSON data. Formats your code perfectly with error highlighting.",
          icon: <Code2 className="w-6 h-6 text-emerald-600" />,
          href: "/tools/json-formatter",
          color: "bg-emerald-50 border-emerald-100",
          gradient: "hover:border-emerald-300 hover:shadow-emerald-500/20",
          soon: false
        },
        {
          id: "word-counter",
          title: "Word & Character Counter",
          description: "Instantly count words, characters, sentences, and paragraphs as you type. Real-time metrics.",
          icon: <Type className="w-6 h-6 text-fuchsia-600" />,
          href: "/tools/word-counter",
          color: "bg-fuchsia-50 border-fuchsia-100",
          gradient: "hover:border-fuchsia-300 hover:shadow-fuchsia-500/20",
          soon: false
        },
        {
          id: "password-generator",
          title: "Strong Password Generator",
          description: "Generate highly secure, random passwords entirely on your device.",
          icon: <KeyRound className="w-6 h-6 text-rose-600" />,
          href: "/tools/password-generator",
          color: "bg-rose-50 border-rose-100",
          gradient: "hover:border-rose-300 hover:shadow-rose-500/20",
          soon: false
        },
        {
          id: "base64",
          title: "Base64 Encoder/Decoder",
          description: "Safely encode or decode strings to and from Base64 format locally.",
          icon: <Binary className="w-6 h-6 text-emerald-600" />,
          href: "/tools/base64",
          color: "bg-emerald-50 border-emerald-100",
          gradient: "hover:border-emerald-300 hover:shadow-emerald-500/20",
          soon: false
        },
        {
          id: "jwt-decoder",
          title: "JWT Decoder",
          description: "Decode JSON Web Tokens instantly to inspect payloads without risking your secrets.",
          icon: <Lock className="w-6 h-6 text-emerald-600" />,
          href: "/tools/jwt-decoder",
          color: "bg-emerald-50 border-emerald-100",
          gradient: "hover:border-emerald-300 hover:shadow-emerald-500/20",
          soon: false
        },
        {
          id: "markdown-html",
          title: "Markdown to HTML",
          description: "Convert Markdown syntax into clean, copyable HTML code.",
          icon: <FileCode2 className="w-6 h-6 text-fuchsia-600" />,
          href: "/tools/markdown-html",
          color: "bg-fuchsia-50 border-fuchsia-100",
          gradient: "hover:border-fuchsia-300 hover:shadow-fuchsia-500/20",
          soon: false
        }
      ]
    },
    {
      title: "Developer Converters",
      description: "Convert data formats instantly without sending sensitive data to external servers.",
      tools: [
        {
          id: "json-csv",
          title: "JSON ↔ CSV Converter",
          description: "Instantly convert JSON arrays to CSV spreadsheets or vice versa.",
          icon: <Code2 className="w-6 h-6 text-sky-600" />,
          href: "/tools/json-csv",
          color: "bg-sky-50 border-sky-100",
          gradient: "hover:border-sky-300 hover:shadow-sky-500/20",
          soon: false
        },
        {
          id: "yaml-json",
          title: "YAML ↔ JSON Converter",
          description: "Safely parse and convert configuration files between YAML and JSON.",
          icon: <FileCode2 className="w-6 h-6 text-teal-600" />,
          href: "/tools/yaml-json",
          color: "bg-teal-50 border-teal-100",
          gradient: "hover:border-teal-300 hover:shadow-teal-500/20",
          soon: false
        },
        {
          id: "color-converter",
          title: "Color Format Converter",
          description: "Convert between HEX, RGB, HSL, and CMYK color codes instantly.",
          icon: <Type className="w-6 h-6 text-pink-600" />,
          href: "/tools/color-converter",
          color: "bg-pink-50 border-pink-100",
          gradient: "hover:border-pink-300 hover:shadow-pink-500/20",
          soon: false
        },
        {
          id: "timestamp-converter",
          title: "Unix Timestamp Converter",
          description: "Convert Unix epoch timestamps to human-readable dates and timezones.",
          icon: <Binary className="w-6 h-6 text-blue-600" />,
          href: "/tools/timestamp-converter",
          color: "bg-blue-50 border-blue-100",
          gradient: "hover:border-blue-300 hover:shadow-blue-500/20",
          soon: false
        }
      ]
    }
  ];

  return (
    <main className="flex-1 w-full relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-700 text-sm font-bold mb-8 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <Zap className="w-4 h-4 fill-indigo-500" />
            100% Client-Side Processing
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Your free online <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 drop-shadow-sm">
              utilities hub
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed drop-shadow-sm">
            A collection of privacy-first, blazing fast tools that run entirely in your browser. 
            No uploads, no servers, zero waiting.
          </p>
        </div>

        {categories.map((category, catIdx) => (
          <div key={catIdx} className="mb-24">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{category.title}</h2>
              <p className="text-slate-600 text-lg">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map((tool) => {
                const CardContent = (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-4 rounded-2xl border shadow-inner ${tool.color}`}>
                        {tool.icon}
                      </div>
                      {tool.soon && (
                        <span className="text-[10px] uppercase tracking-wider font-bold bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{tool.title}</h3>
                    
                    <p className="text-gray-600 text-[15px] flex-1 mb-8 leading-relaxed">
                      {tool.description}
                    </p>
                    
                    {!tool.soon && (
                      <div className="mt-auto inline-flex items-center font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                        Open Tool
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    )}
                  </>
                );

                if (tool.soon) {
                  return (
                    <div
                      key={tool.id}
                      className="group flex flex-col bg-white/50 backdrop-blur-sm rounded-[2rem] p-8 border border-white/40 opacity-70 cursor-not-allowed grayscale-[30%]"
                    >
                      {CardContent}
                    </div>
                  );
                }

                return (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className={`group flex flex-col bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${tool.gradient} ring-1 ring-slate-100 hover:ring-2`}
                  >
                    {CardContent}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <section className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl mt-32">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-fuchsia-600/20 opacity-50 mix-blend-overlay"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-16 tracking-tight">Why choose WebToolKit?</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">100% Private</h3>
                <p className="text-gray-400 leading-relaxed text-center">All processing happens locally on your device. Your sensitive files are never uploaded to any server.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                  <Coins className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">Free Forever</h3>
                <p className="text-gray-400 leading-relaxed text-center">No subscriptions, no hidden fees, and no usage limits. Enjoy unlimited use completely free.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                  <Zap className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">Lightning Fast</h3>
                <p className="text-gray-400 leading-relaxed text-center">Powered by modern WebAssembly and browser APIs, tasks are nearly instantaneous.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
