import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { MessageSquare, X } from 'lucide-react';
import { formatWhatsAppNumber } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = usePortfolio();
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanPhone = formatWhatsAppNumber(settings.whatsappNumber);
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'আসসালামু আলাইকুম! আমি Design Mahal পোর্টফোলিও থেকে যোগাযোগ করছি। ডিজাইন সার্ভিসের ব্যাপারে কথা বলতে চাই।'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Speech bubble / Tooltip prompt */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 py-2 px-3.5 rounded-full bg-[#0e172e] border border-[#25D366]/40 text-xs text-[#f1f5f9] shadow-xl shadow-black/40 backdrop-blur-md animate-fade-in group">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          <span className="font-medium text-[#25D366]">WhatsApp চ্যাট</span>
          <span className="text-[#94a3b8]">|</span>
          <span className="font-mono text-[#cbd5e1]">{settings.displayPhone || '+880 1629-947628'}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-[#64748b] hover:text-[#cbd5e1] ml-1 p-0.5 rounded transition-colors"
            title="বন্ধ করুন"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button with Rotating Light Aura */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp-এ যোগাযোগ করুন"
        className="relative group p-1 block focus:outline-none"
      >
        <div className="icon-light-orbit icon-light-orbit-green w-14 h-14 !rounded-full shadow-2xl shadow-[#25D366]/30">
          <div className="icon-light-orbit-inner !rounded-full bg-[#07161b] group-hover:bg-[#09222a] text-[#25D366] flex items-center justify-center">
            <MessageSquare className="w-7 h-7 transition-transform group-hover:scale-110 drop-shadow-[0_0_8px_#25D366]" />
          </div>
        </div>

        {/* Pulse ring indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366] border-2 border-[#080d1a]"></span>
        </span>
      </a>
    </div>
  );
};
