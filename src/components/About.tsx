import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, CheckCircle2, Wrench } from 'lucide-react';

export const About: React.FC = () => {
  const { settings } = usePortfolio();

  // Exactly as requested: Adobe Illustrator, Adobe Photoshop kept, other 2 replaced with AI and Canva
  const softwareSkills = [
    {
      name: 'Adobe Illustrator',
      tagline: 'ভেক্টর গ্রাফিক্স, লোগো ও ব্র্যান্ডমার্ক',
      level: '৯৮% দক্ষতা',
      badge: 'Industry Standard',
      color: 'from-[#3b82f6] to-[#1d4ed8]',
      iconUrl: 'https://res.cloudinary.com/fht84r3o/image/upload/v1792481960/ai.jpg',
    },
    {
      name: 'Adobe Photoshop',
      tagline: 'ফটো ম্যানিপুলেশন, ব্যানার ও পোস্টার',
      level: '৯৫% দক্ষতা',
      badge: 'Advanced Pro',
      color: 'from-[#60a5fa] to-[#2563eb]',
      iconUrl: 'https://res.cloudinary.com/fht84r3o/image/upload/v1792481978/ps.jpg',
    },
    {
      name: 'AI',
      tagline: 'জেনারেটিভ কনসেপ্ট ও ভিজ্যুয়াল এনহ্যান্সমেন্ট',
      level: '৯২% দক্ষতা',
      badge: 'Next-Gen Workflow',
      color: 'from-[#38bdf8] to-[#0284c7]',
    },
    {
      name: 'Canva',
      tagline: 'দ্রুত সোশ্যাল মিডিয়া ও ডিজিটাল গ্রাফিক্স',
      level: '৯৫% দক্ষতা',
      badge: 'Rapid Design',
      color: 'from-[#93c5fd] to-[#3b82f6]',
      iconUrl: 'https://res.cloudinary.com/fht84r3o/image/upload/v1792481968/canva_aicon.jpg',
    },
  ];

  const studioHighlights = [
    {
      title: '১০০% কাস্টম ভেক্টর আর্টওয়ার্ক',
      desc: 'কোনো নিম্নমানের স্টক কপি নয়, প্রতিটি ডিজাইন স্ক্র্যাচ থেকে আপনার ব্রান্ডের চাহিদা অনুযায়ী তৈরি করা হয়।',
    },
    {
      title: 'প্রিন্ট ও ডিজিটাল ডুয়াল কালার মোড',
      desc: 'অফসেট প্রিন্টের জন্য নিখুঁত CMYK এবং ওয়েব/সোশ্যাল মিডিয়ার জন্য ভাইব্রেন্ট RGB কালার গ্যারান্টি।',
    },
    {
      title: 'সকল প্রয়োজনীয় সোর্স ফাইল',
      desc: 'ভবিষ্যতে ব্যবহারের জন্য AI, EPS, SVG, PDF এবং হাই-রেজোলিউশন ট্র্যান্সপারেন্ট PNG ফাইল সরবরাহ।',
    },
    {
      title: 'দ্রুত রেসপন্স ও সন্তুষ্টির নিশ্চয়তা',
      desc: 'কাজ চলাকালীন তাৎক্ষণিক আপডেট এবং আপনার ১০০% সন্তুষ্টি নিশ্চিত হওয়া পর্যন্ত সার্বক্ষণিক সহায়তা।',
    },
  ];

  return (
    <section id="skills" className="py-20 bg-[#080d1a] border-b border-[#162344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#38bdf8] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#60a5fa]" />
            <span>CREATIVE CAPABILITIES & WORKFLOW</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#f1f5f9] tracking-tight">
            সফটওয়্যার ও প্রযুক্তিগত দক্ষতা
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] mt-3 leading-relaxed">
            {settings.brandName}-এ আমরা আধুনিক টুলস ও সফটওয়্যারের সমন্বয়ে প্রতিটি গ্রাফিক্সে নিশ্চিত করি সর্বোচ্চ কোয়ালিটি ও নান্দনিক ফিনিশিং।
          </p>
        </div>

        {/* 4 Software Skills Grid - Adobe Illustrator, Adobe Photoshop, AI, Canva */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {softwareSkills.map((tool, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#0e162c] border border-[#1b2a4e] hover:border-[#38bdf8]/60 hover:shadow-xl hover:shadow-[#1d4ed8]/20 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="icon-underlight-glow">
                    <div className="icon-light-orbit w-12 h-12 group-hover:scale-105 transition-transform">
                      <div className="icon-light-orbit-inner w-full h-full p-1 bg-[#080d1a] overflow-hidden rounded-[9px] flex items-center justify-center">
                        {tool.iconUrl ? (
                          <img
                            src={tool.iconUrl}
                            alt={tool.name}
                            className="w-full h-full object-cover rounded-[7px]"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0c152e] via-[#091024] to-[#040814] rounded-[7px] border border-[#38bdf8]/30">
                            <span className="font-sans font-black text-xs tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-[#38bdf8] via-[#93c5fd] to-[#c084fc] drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]">
                              AI
                            </span>
                            <span className="text-[6px] text-[#38bdf8] font-bold tracking-widest uppercase opacity-85 scale-90">
                              GEN
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#111c38] text-[#38bdf8] border border-[#1d2f59]">
                    {tool.badge}
                  </span>
                </div>

                <h3 className="font-sans text-lg font-bold text-[#f1f5f9] group-hover:text-[#60a5fa] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-[#94a3b8] mt-1.5 leading-relaxed">
                  {tool.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#172343] flex items-center justify-between text-xs">
                <span className="text-[#64748b] font-medium">দক্ষতার মানদণ্ড</span>
                <span className="font-bold text-[#38bdf8] tabular-nums">{tool.level}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Workflow Standards */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0e162c] border border-[#1b2a4e]">
          <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-[#172343]">
            <Wrench className="w-5 h-5 text-[#38bdf8]" />
            <h3 className="font-sans text-lg sm:text-xl font-bold text-[#f1f5f9]">
              ডিজাইন মহলের কাজের মান ও কর্মপদ্ধতি
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {studioHighlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-[#111c38] border border-[#1e2f57]">
                <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#f1f5f9]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
