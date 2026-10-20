import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { OrderForm } from './OrderForm';
import { X, Sparkles } from 'lucide-react';

export const OrderModal: React.FC = () => {
  const { isOrderModalOpen, setIsOrderModalOpen, preselectedService, prefilledReference } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOrderModalOpen(false);
      }
    };
    if (isOrderModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOrderModalOpen, setIsOrderModalOpen]);

  if (!isOrderModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Background click dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => setIsOrderModalOpen(false)}
      />

      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0e162c] border border-[#1b2a4e] rounded-2xl shadow-2xl z-10 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsOrderModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-[#94a3b8] hover:text-white bg-[#121c38] hover:bg-[#1b2a4e] rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#38bdf8] uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#60a5fa]" />
            <span>START A PROJECT</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#f1f5f9]">
            ডিজাইন অর্ডার করুন
          </h2>
          <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
            আপনার কাঙ্ক্ষিত ডিজাইন ও প্রজেক্টের তথ্য প্রদান করুন। সরাসরি WhatsApp-এ বার্তা পৌঁছে যাবে।
          </p>
        </div>

        {/* Form Body */}
        <OrderForm
          onSuccess={() => setIsOrderModalOpen(false)}
          defaultService={preselectedService}
          defaultReference={prefilledReference}
        />

      </div>
    </div>
  );
};
