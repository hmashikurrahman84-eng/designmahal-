import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { OrderForm } from './OrderForm';
import { Sparkles, MessageSquare, PhoneCall, ShieldCheck, Clock, FileCheck } from 'lucide-react';
import { formatWhatsAppNumber } from '../utils/whatsapp';

export const OrderSection: React.FC = () => {
  const { settings } = usePortfolio();

  return (
    <section id="order" className="py-20 bg-[#080d1a] border-b border-[#162344] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split grid: Left perks / trust, Right interactive form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Ordering info & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#38bdf8] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#60a5fa]" />
                <span>SEAMLESS ORDER SYSTEM</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#f1f5f9] tracking-tight">
                ডিজাইন অর্ডার ব্যবস্থা
              </h2>
              <p className="text-sm sm:text-base text-[#94a3b8] mt-3 leading-relaxed">
                আপনার ব্রান্ডের জন্য নিখুঁত ডিজাইন পেতে ফর্মটি পূরণ করুন অথবা সরাসরি আমাদের অফিসিয়াল হোয়াটসঅ্যাপে মেসেজ পাঠান।
              </p>
            </div>

            {/* Direct WhatsApp Box with Rotating Light Aura */}
            <div className="p-5 rounded-xl bg-[#0e162c] border border-[#1b2a4e] space-y-3">
              <div className="flex items-center gap-3">
                <div className="icon-underlight-glow">
                  <div className="icon-light-orbit icon-light-orbit-green w-11 h-11">
                    <div className="icon-light-orbit-inner w-full h-full text-[#25D366]">
                      <MessageSquare className="w-5 h-5 icon-glow" />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#f1f5f9]">হোয়াটসঅ্যাপে দ্রুত কথা বলুন</h4>
                  <p className="text-xs text-[#94a3b8]">তাৎক্ষণিক রিপ্লাই ও ভয়েস নোট পাঠান</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#94a3b8]">WhatsApp নম্বর:</span>
                <span className="font-mono text-[#38bdf8] font-bold">
                  {settings.displayPhone || settings.whatsappNumber}
                </span>
              </div>

              <div className="icon-underlight-glow">
                <a
                  href={`https://wa.me/${formatWhatsAppNumber(settings.whatsappNumber)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-[#080d1a] bg-[#25D366] hover:bg-[#20ba5a] rounded-lg transition-colors shadow-lg shadow-[#25D366]/30 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#080d1a]" />
                  <span>সরাসরি WhatsApp খুলুন</span>
                </a>
              </div>
            </div>

            {/* Guarantees checklist with Light Orbits */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="icon-underlight-glow shrink-0">
                  <div className="icon-light-sm w-8 h-8">
                    <div className="icon-light-sm-inner w-full h-full text-[#38bdf8]">
                      <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-[#f1f5f9]">১০০% মানসম্পন্ন কাজের নিশ্চয়তা</h5>
                  <p className="text-xs text-[#94a3b8]">ক্লায়েন্ট সন্তুষ্ট না হওয়া পর্যন্ত আন্তরিকতার সাথে সংশোধন করে দেওয়া হয়।</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="icon-underlight-glow shrink-0">
                  <div className="icon-light-sm w-8 h-8">
                    <div className="icon-light-sm-inner w-full h-full text-[#38bdf8]">
                      <Clock className="w-4 h-4 text-[#38bdf8]" />
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-[#f1f5f9]">সময়মতো ডেলিভারি</h5>
                  <p className="text-xs text-[#94a3b8]">প্রতিশ্রুতি অনুযায়ী নির্ধারিত তারিখের মধ্যেই চূড়ান্ত ডিজাইন ড্রাফট পাঠানো হয়।</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="icon-underlight-glow shrink-0">
                  <div className="icon-light-sm w-8 h-8">
                    <div className="icon-light-sm-inner w-full h-full text-[#38bdf8]">
                      <FileCheck className="w-4 h-4 text-[#38bdf8]" />
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-[#f1f5f9]">সকল সোর্স ও প্রিন্ট রেডি ফাইল</h5>
                  <p className="text-xs text-[#94a3b8]">AI, EPS, SVG, PDF, High-Res PNG সহ ভবিষ্যতে ব্যবহারের সকল ফাইল প্রদান করা হয়।</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right: The Interactive Order Form Card */}
          <div className="lg:col-span-7 bg-[#0e162c] p-6 sm:p-8 rounded-2xl border border-[#1b2a4e] luxury-card-glow">
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#f1f5f9] mb-1">
              প্রজেক্ট বিবরণ পাঠান
            </h3>
            <p className="text-xs sm:text-sm text-[#94a3b8] mb-6">
              ফর্মটি পূরণ করে সাবমিট করলেই এটি আমাদের সিস্টেমে যুক্ত হবে এবং আপনাকে সরাসরি WhatsApp-এ বার্তা পাঠাতে সাহায্য করবে।
            </p>

            <OrderForm />
          </div>

        </div>

      </div>
    </section>
  );
};
