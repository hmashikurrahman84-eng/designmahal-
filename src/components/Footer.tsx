import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Shield, BookOpen, ArrowUp, Facebook, Instagram, Globe, Lock, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setIsAdminModalOpen, setIsGuideModalOpen, isAdminAuthenticated } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050812] text-[#94a3b8] border-t border-[#141f3d] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#141f3d]">
          
          {/* Brand Info & Socials */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="icon-underlight-glow">
                <div className="logo-light-orbit w-9 h-9 shrink-0">
                  <div className="logo-light-orbit-inner w-full h-full p-1 bg-[#080d1a]">
                    <img
                      src={settings.logoUrl || 'https://res.cloudinary.com/fht84r3o/image/upload/v1792477511/Design-Mahal-logo-122.png'}
                      alt={settings.brandName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
              <span className="font-sans text-xl font-extrabold text-[#f1f5f9]">
                {settings.brandName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#8292ab] max-w-sm leading-relaxed">
              {settings.brandSubhead} উচ্চমানের লোগো, ব্র্যান্ডিং, প্রিন্ট ও ডিজিটাল মিডিয়া ডিজাইন সমাধান।
            </p>

            {/* Social Links with Rotating Light Orbit */}
            <div className="flex items-center gap-3 pt-2">
              {settings.facebookUrl && (
                <div className="icon-underlight-glow">
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-light-orbit cursor-pointer"
                    title="Facebook"
                  >
                    <div className="icon-light-orbit-inner p-2.5 text-[#cbd5e1] hover:text-[#38bdf8]">
                      <Facebook className="w-4 h-4" />
                    </div>
                  </a>
                </div>
              )}
              {settings.instagramUrl && (
                <div className="icon-underlight-glow">
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-light-orbit cursor-pointer"
                    title="Instagram"
                  >
                    <div className="icon-light-orbit-inner p-2.5 text-[#cbd5e1] hover:text-[#f43f5e]">
                      <Instagram className="w-4 h-4" />
                    </div>
                  </a>
                </div>
              )}
              {settings.behanceUrl && (
                <div className="icon-underlight-glow">
                  <a
                    href={settings.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-light-orbit cursor-pointer"
                    title="ইন্টারনেট / Behance"
                  >
                    <div className="icon-light-orbit-inner p-2.5 text-[#cbd5e1] hover:text-[#38bdf8]">
                      <Globe className="w-4 h-4" />
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-2 text-xs sm:text-sm">
            <h5 className="font-bold text-[#f1f5f9] uppercase tracking-wider text-xs mb-3">
              ওয়েবসাইট লিংক
            </h5>
            <div className="grid grid-cols-2 gap-2 text-[#94a3b8]">
              <a href="#home" className="hover:text-[#38bdf8] transition-colors">হোম</a>
              <a href="#portfolio" className="hover:text-[#38bdf8] transition-colors">পোর্টফোলিও</a>
              <a href="#services" className="hover:text-[#38bdf8] transition-colors">সার্ভিসেস</a>
              <a href="#skills" className="hover:text-[#38bdf8] transition-colors">দক্ষতা</a>
              <a href="#order" className="hover:text-[#38bdf8] transition-colors">অর্ডার করুন</a>
              <a href="#contact" className="hover:text-[#38bdf8] transition-colors">যোগাযোগ</a>
            </div>
          </div>

          {/* Column 3: Guarantees for visitors / Admin controls for authenticated owner */}
          <div className="md:col-span-3 space-y-3">
            {isAdminAuthenticated ? (
              <>
                <h5 className="font-bold text-[#38bdf8] uppercase tracking-wider text-xs mb-3 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>অ্যাডমিন ম্যানেজমেন্ট</span>
                </h5>
                <div className="space-y-2">
                  <button
                    onClick={() => setIsAdminModalOpen(true)}
                    className="w-full inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#38bdf8] bg-[#162345] hover:bg-[#1f305e] border border-[#38bdf8]/40 rounded-lg transition-colors cursor-pointer shadow-sm shadow-[#2563eb]/20"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>কন্ট্রোল প্যানেল খুলুন</span>
                  </button>
                  <button
                    onClick={() => setIsGuideModalOpen(true)}
                    className="w-full inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#cbd5e1] bg-[#0e162c] hover:bg-[#162345] border border-[#1b2a4e] rounded-lg transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>সাইট পরিচালনা নির্দেশিকা</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <h5 className="font-bold text-[#f1f5f9] uppercase tracking-wider text-xs mb-3">
                  আমাদের বিশেষত্ব
                </h5>
                <ul className="space-y-2 text-xs text-[#94a3b8]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                    <span>১০০% কাস্টম ও প্রফেশনাল ভেক্টর ডিজাইন</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                    <span>প্রিন্ট ও সোশ্যাল মিডিয়ার জন্য নিখুঁত ফাইল</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                    <span>সময়মত ডেলিভারি ও সন্তুষ্টির নিশ্চয়তা</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                    <span>সহজ অর্ডার ও সার্বক্ষণিক যোগাযোগ</span>
                  </li>
                </ul>
              </>
            )}
          </div>

        </div>

        {/* Quiet Copyright & Back to Top with discreet owner lock */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {settings.brandName}. সর্বস্বত্ব সংরক্ষিত।</span>
            {/* Subtle owner lock trigger */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              title="মালিকের সিকিউর এক্সেস"
              aria-label="Admin Access"
              className="p-1 rounded opacity-25 hover:opacity-100 hover:text-[#38bdf8] transition-all cursor-pointer"
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-[#38bdf8] transition-colors cursor-pointer"
          >
            <span>উপরে যান</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
