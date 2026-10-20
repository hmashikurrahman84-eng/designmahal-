import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Menu, X, Shield, BookOpen, Sparkles, Send } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { settings, openOrderWithService, setIsAdminModalOpen, setIsGuideModalOpen, isAdminAuthenticated } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'হোম', href: '#home' },
    { label: 'পোর্টফোলিও', href: '#portfolio' },
    { label: 'সার্ভিসেস', href: '#services' },
    { label: 'দক্ষতা', href: '#skills' },
    { label: 'যোগাযোগ', href: '#contact' },
  ];

  const [logoClickCount, setLogoClickCount] = useState(0);

  const handleLogoSecretClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextCount = logoClickCount + 1;
    setLogoClickCount(nextCount);
    if (nextCount >= 3) {
      setLogoClickCount(0);
      setIsAdminModalOpen(true);
    } else {
      setTimeout(() => setLogoClickCount(0), 1800);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080d1a]/95 backdrop-blur-md border-b border-[#162344] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with Official Logo and Light Orbit (Secret Triple-click to open admin) */}
        <div 
          onClick={handleLogoSecretClick}
          className="flex items-center gap-3 shrink-0 group cursor-pointer select-none"
          title={isAdminAuthenticated ? "Design Mahal (অ্যাডমিন সক্রিয়)" : settings.brandName}
        >
          <div className="icon-underlight-glow">
            <div className="logo-light-orbit w-11 h-11 shrink-0">
              <div className="logo-light-orbit-inner w-full h-full p-1 bg-[#080d1a]">
                <img
                  src={settings.logoUrl || 'https://res.cloudinary.com/fht84r3o/image/upload/v1792477511/Design-Mahal-logo-122.png'}
                  alt={settings.brandName}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-xl sm:text-2xl font-extrabold tracking-tight text-[#f1f5f9] group-hover:text-[#60a5fa] transition-colors whitespace-nowrap">
              {settings.brandName}
            </span>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#38bdf8] uppercase -mt-0.5 hidden sm:block">
              Creative Studio
            </span>
          </div>
        </div>

        {/* Zone 2: 4–5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#94a3b8]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#60a5fa] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#38bdf8] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Logged-in Admin Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* ONLY SHOWN TO AUTHENTICATED ADMIN */}
          {isAdminAuthenticated && (
            <>
              {/* Guide Button */}
              <div className="icon-underlight-glow hidden sm:block">
                <button
                  onClick={() => setIsGuideModalOpen(true)}
                  title="ওয়েবসাইট পরিচালনা গাইড"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#94a3b8] hover:text-[#38bdf8] hover:bg-[#121c38] rounded-md transition-colors border border-[#1b2a4e]/70 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span className="whitespace-nowrap">গাইড</span>
                </button>
              </div>

              {/* Admin Manage Button */}
              <div className="icon-underlight-glow">
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  title="অ্যাডমিন কন্ট্রোল প্যানেল"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-[#38bdf8] bg-[#121c38] hover:bg-[#162345] border border-[#38bdf8]/60 shadow-md shadow-[#2563eb]/20 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span className="hidden sm:inline">কন্ট্রোল প্যানেল</span>
                </button>
              </div>
            </>
          )}

          {/* Primary CTA with Neon Glow (Visible to everyone) */}
          <div className="icon-underlight-glow">
            <button
              onClick={() => openOrderWithService()}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#60a5fa] hover:from-[#1d4ed8] hover:to-[#3b82f6] rounded-lg shadow-lg shadow-[#1d4ed8]/40 hover:shadow-[#38bdf8]/50 transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              <div className="icon-light-sm w-5 h-5">
                <div className="icon-light-sm-inner w-full h-full text-white bg-transparent">
                  <Send className="w-3 h-3 text-white" />
                </div>
              </div>
              <span className="whitespace-nowrap">অর্ডার করুন</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#94a3b8] hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#162344] bg-[#080d1a] px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#cbd5e1] hover:text-[#60a5fa] hover:bg-[#101932] rounded-md"
            >
              {link.label}
            </a>
          ))}

          {/* ONLY SHOWN TO AUTHENTICATED ADMIN IN MOBILE */}
          {isAdminAuthenticated && (
            <div className="pt-3 border-t border-[#162344] flex items-center gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsGuideModalOpen(true);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-[#cbd5e1] bg-[#101932] border border-[#1e2f57] rounded-md"
              >
                <BookOpen className="w-4 h-4 text-[#38bdf8]" />
                নির্দেশিকা
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminModalOpen(true);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-[#38bdf8] bg-[#162345] border border-[#38bdf8]/40 rounded-md"
              >
                <Shield className="w-4 h-4 text-[#38bdf8]" />
                কন্ট্রোল প্যানেল
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
