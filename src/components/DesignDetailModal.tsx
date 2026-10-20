import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { VectorShowcase } from './VectorShowcase';
import { X, ArrowRight, Tag, Layers, Check, Calendar, Info, Edit3 } from 'lucide-react';

export const DesignDetailModal: React.FC = () => {
  const { activeDesignModal, setActiveDesignModal, openOrderWithService, setIsAdminModalOpen } = usePortfolio();

  // Handle ESC key press to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDesignModal(null);
      }
    };
    if (activeDesignModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeDesignModal, setActiveDesignModal]);

  if (!activeDesignModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Background click dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => setActiveDesignModal(null)}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0e162c] border border-[#1b2a4e] rounded-2xl shadow-2xl z-10 flex flex-col md:flex-row">
        
        {/* Close Button Top Right */}
        <button
          onClick={() => setActiveDesignModal(null)}
          className="absolute top-4 right-4 z-20 p-2 text-[#94a3b8] hover:text-white bg-[#121c38]/80 hover:bg-[#1a2850] rounded-full transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Media Viewer (Left / Top) */}
        <div className="w-full md:w-7/12 min-h-[320px] md:min-h-[460px] bg-[#070b14] flex items-center justify-center relative border-b md:border-b-0 md:border-r border-[#162344] overflow-hidden">
          <VectorShowcase design={activeDesignModal} showBadge={true} className="w-full h-full" />
        </div>

        {/* Details & Specs Pane (Right / Bottom) */}
        <div className="w-full md:w-5/12 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs text-[#38bdf8] font-bold uppercase tracking-wider mb-1">
                <span>{activeDesignModal.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#8292ab] tabular-nums">{activeDesignModal.year}</span>
              </div>
              <h2 className="font-sans text-2xl font-bold text-[#f1f5f9] leading-tight">
                {activeDesignModal.title}
              </h2>
            </div>

            {/* Sample status indicator banner if applicable */}
            {activeDesignModal.isSample && (
              <div className="p-2.5 rounded-lg bg-[#121c38] border border-[#38bdf8]/30 flex items-start gap-2 text-xs text-[#38bdf8]">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>নমুনা শোকেস:</strong> এটি একটি ডেমো স্টুডিও কনসেপ্ট। আপনি এই ধরনের কাস্টম ডিজাইন আপনার ব্র্যান্ডের জন্য অর্ডার করতে পারেন।
                </span>
              </div>
            )}

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-[#8292ab] uppercase tracking-wider mb-1">
                ডিজাইন বিবরণ
              </h4>
              <p className="text-sm text-[#cbd5e1] leading-relaxed">
                {activeDesignModal.description}
              </p>
            </div>

            {/* Tools & Specifications */}
            <div className="space-y-2 text-xs text-[#94a3b8]">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span className="font-semibold text-[#cbd5e1]">ব্যবহৃত টুলস:</span>
                <span>{activeDesignModal.toolsUsed.join(', ')}</span>
              </div>
              {activeDesignModal.clientOrContext && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span className="font-semibold text-[#cbd5e1]">প্রসঙ্গ / ক্লায়েন্ট:</span>
                  <span>{activeDesignModal.clientOrContext}</span>
                </div>
              )}
            </div>

            {/* Tags (Zero-Pill clean typography) */}
            {activeDesignModal.tags && activeDesignModal.tags.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-[#8292ab] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-[#38bdf8]" />
                  ট্যাগসমূহ
                </h4>
                <div className="flex flex-wrap gap-1.5 text-xs text-[#cbd5e1]">
                  {activeDesignModal.tags.map((tag, idx) => (
                    <span key={idx} className="bg-[#121c38] px-2 py-0.5 rounded text-[11px] border border-[#1e2f57]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-6 border-t border-[#162344] space-y-2.5">
            <button
              onClick={() => {
                const category = activeDesignModal.category;
                const title = activeDesignModal.title;
                setActiveDesignModal(null);
                openOrderWithService(category, title);
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#60a5fa] hover:from-[#1d4ed8] hover:to-[#3b82f6] rounded-lg shadow-md cursor-pointer transition-all active:scale-[0.98]"
            >
              <span>এই ধরনের ডিজাইন অর্ডার করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActiveDesignModal(null);
                setIsAdminModalOpen(true);
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-[#94a3b8] hover:text-[#38bdf8] hover:bg-[#121c38] rounded-lg transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>ডিজাইন ম্যানেজ / সম্পাদনা করুন</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
