import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, Eye, Sparkles, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { settings, openOrderWithService } = usePortfolio();

  return (
    <section id="home" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b border-[#162344]">
      {/* Subtle ambient navy & electric blue glow in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#1d4ed8]/20 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-[#38bdf8]/10 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Designer Profile with Grand Circular Photo & 3 Compact Satellite Icons */}
          <div className="flex flex-col items-center group mb-2">
            <div className="relative flex items-center justify-center">
              
              {/* Satellite Icon 1: Adobe Illustrator (Top-Left, Tilted -12deg) */}
              <div className="absolute -left-6 sm:-left-12 top-2 sm:top-5 z-20 animate-soft-float-1" title="Adobe Illustrator">
                <div className="icon-underlight-glow">
                  <div className="icon-light-sm w-8 h-8 sm:w-9 sm:h-9 shadow-md -rotate-12 hover:-rotate-3 hover:scale-115 transition-all duration-300">
                    <div className="icon-light-sm-inner w-full h-full p-0.5 bg-[#080d1a] overflow-hidden rounded-[7px]">
                      <img
                        src="https://res.cloudinary.com/fht84r3o/image/upload/v1792481960/ai.jpg"
                        alt="Adobe Illustrator"
                        className="w-full h-full object-cover rounded-[5px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Satellite Icon 2: Adobe Photoshop (Bottom-Left, Tilted +12deg) */}
              <div className="absolute -left-6 sm:-left-12 bottom-6 sm:bottom-10 z-20 animate-soft-float-2" title="Adobe Photoshop">
                <div className="icon-underlight-glow">
                  <div className="icon-light-sm w-8 h-8 sm:w-9 sm:h-9 shadow-md rotate-12 hover:rotate-3 hover:scale-115 transition-all duration-300">
                    <div className="icon-light-sm-inner w-full h-full p-0.5 bg-[#080d1a] overflow-hidden rounded-[7px]">
                      <img
                        src="https://res.cloudinary.com/fht84r3o/image/upload/v1792481978/ps.jpg"
                        alt="Adobe Photoshop"
                        className="w-full h-full object-cover rounded-[5px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Central Designer Avatar with Inner Zoom */}
              <div className="icon-underlight-glow">
                <div className="avatar-light-orbit w-44 h-44 sm:w-56 sm:h-56">
                  <div className="avatar-light-orbit-inner w-full h-full p-1.5 bg-[#080d1a] overflow-hidden">
                    <img
                      src={settings.designerPhotoUrl || 'https://res.cloudinary.com/fht84r3o/image/upload/v1792481081/%E0%A7%A7%E0%A7%A7.jpg'}
                      alt="H.M. Ashikur Rahman"
                      className="w-full h-full object-cover object-top scale-110 rounded-full transition-transform duration-500 group-hover:scale-115"
                    />
                  </div>
                </div>
              </div>

              {/* Satellite Icon 3: Artificial Intelligence (AI) (Top-Right, Tilted +12deg) */}
              <div className="absolute -right-6 sm:-right-12 top-2 sm:top-5 z-20 animate-soft-float-1" title="Artificial Intelligence (AI)">
                <div className="icon-underlight-glow">
                  <div className="icon-light-sm w-8 h-8 sm:w-9 sm:h-9 shadow-md rotate-12 hover:rotate-3 hover:scale-115 transition-all duration-300">
                    <div className="icon-light-sm-inner w-full h-full p-0.5 bg-[#080d1a] overflow-hidden rounded-[7px]">
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#091024] to-[#040814] rounded-[5px] select-none border border-[#38bdf8]/40">
                        <span className="font-sans font-black text-[11px] sm:text-[13px] leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-[#38bdf8] via-[#93c5fd] to-[#c084fc] drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]">
                          AI
                        </span>
                        <span className="text-[6px] text-[#38bdf8] font-bold tracking-widest uppercase opacity-85 scale-90 mt-0.5">
                          GEN
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Satellite Icon 4: Canva (Bottom-Right, Tilted -12deg) */}
              <div className="absolute -right-6 sm:-right-12 bottom-6 sm:bottom-10 z-20 animate-soft-float-2" title="Canva">
                <div className="icon-underlight-glow">
                  <div className="icon-light-sm w-8 h-8 sm:w-9 sm:h-9 shadow-md -rotate-12 hover:-rotate-3 hover:scale-115 transition-all duration-300">
                    <div className="icon-light-sm-inner w-full h-full p-0.5 bg-[#080d1a] overflow-hidden rounded-[7px]">
                      <img
                        src="https://res.cloudinary.com/fht84r3o/image/upload/v1792481968/canva_aicon.jpg"
                        alt="Canva"
                        className="w-full h-full object-cover rounded-[5px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Designer Name & Designation in English */}
            <div className="flex flex-col items-center text-center mt-4 space-y-1.5">
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-[#f1f5f9] tracking-tight group-hover:text-[#60a5fa] transition-colors flex items-center justify-center gap-2">
                <span>{settings.designerName || 'H.M. Ashikur Rahman'}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-pulse"></span>
              </h2>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0e162c] border border-[#1e2f57] text-xs sm:text-sm font-bold text-[#38bdf8] shadow-md shadow-[#1d4ed8]/20">
                <span>{settings.designerTitle || 'Professional Graphic Designer & CEO, Design Mahal'}</span>
              </div>
            </div>
          </div>

          {/* Main Title - Creative Design Studio */}
          <h1 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#f1f5f9] leading-[1.12]" style={{ textWrap: 'balance' }}>
            Creative Design{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] via-[#60a5fa] to-[#3b82f6]">
              Studio.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-[#94a3b8] leading-relaxed max-w-2xl font-normal">
            {settings.brandSubhead}
          </p>

          {/* Micro value proposition bullet strip with glowing light accents */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-[#cbd5e1] pt-2">
            <div className="flex items-center gap-2.5">
              <div className="icon-light-sm w-5 h-5 shrink-0">
                <div className="icon-light-sm-inner w-full h-full text-[#38bdf8]">
                  <CheckCircle2 className="w-3 h-3 text-[#38bdf8]" />
                </div>
              </div>
              <span>১০০% কাস্টম ও ভেক্টর ফাইল</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="icon-light-sm w-5 h-5 shrink-0">
                <div className="icon-light-sm-inner w-full h-full text-[#38bdf8]">
                  <CheckCircle2 className="w-3 h-3 text-[#38bdf8]" />
                </div>
              </div>
              <span>প্রিন্ট ও ডিজিটাল রেডি ফরম্যাট</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="icon-light-sm w-5 h-5 shrink-0">
                <div className="icon-light-sm-inner w-full h-full text-[#38bdf8]">
                  <CheckCircle2 className="w-3 h-3 text-[#38bdf8]" />
                </div>
              </div>
              <span>আনলিমিটেড রিভিশন সুযোগ</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="icon-light-sm w-5 h-5 shrink-0">
                <div className="icon-light-sm-inner w-full h-full text-[#38bdf8]">
                  <CheckCircle2 className="w-3 h-3 text-[#38bdf8]" />
                </div>
              </div>
              <span>দ্রুত ও সময়মতো ডেলিভারি</span>
            </div>
          </div>

          {/* Dual CTA Buttons with Rotating Light Aura */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <div className="icon-underlight-glow">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-bold text-[#f1f5f9] bg-[#0f172a] hover:bg-[#1e293b] border border-[#1e2f57] hover:border-[#38bdf8]/60 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-sm group"
              >
                <div className="icon-light-sm w-5 h-5">
                  <div className="icon-light-sm-inner w-full h-full text-[#38bdf8]">
                    <Eye className="w-3 h-3 text-[#38bdf8]" />
                  </div>
                </div>
                <span>আমার কাজ দেখুন</span>
              </a>
            </div>

            <div className="icon-underlight-glow">
              <button
                onClick={() => openOrderWithService()}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#60a5fa] hover:from-[#1d4ed8] hover:to-[#3b82f6] rounded-xl shadow-lg shadow-[#1d4ed8]/40 hover:shadow-[#38bdf8]/50 transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                <span>ডিজাইন অর্ডার করুন</span>
                <div className="icon-light-sm w-5 h-5">
                  <div className="icon-light-sm-inner w-full h-full text-white bg-transparent">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
