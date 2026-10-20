import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  BookOpen,
  X,
  Upload,
  Edit3,
  MessageSquare,
  Globe,
  Database,
  Shield,
} from 'lucide-react';

export const DeploymentGuideModal: React.FC = () => {
  const { isGuideModalOpen, setIsGuideModalOpen, setIsAdminModalOpen } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsGuideModalOpen(false);
      }
    };
    if (isGuideModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isGuideModalOpen, setIsGuideModalOpen]);

  if (!isGuideModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Background click */}
      <div className="absolute inset-0" onClick={() => setIsGuideModalOpen(false)} />

      {/* Guide Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0b1224] border border-[#1b2a4e] rounded-2xl shadow-2xl z-10 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsGuideModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-[#94a3b8] hover:text-white bg-[#121c38] rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#38bdf8] uppercase mb-1">
            <BookOpen className="w-4 h-4 text-[#60a5fa]" />
            <span>DESIGN MAHAL MASTER GUIDE</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#f1f5f9]">
            ওয়েবসাইট পরিচালনা ও প্রকাশ নির্দেশিকা
          </h2>
          <p className="text-xs sm:text-sm text-[#94a3b8] mt-1.5">
            সহজ ৫টি ধাপে আপনার Design Mahal পোর্টফোলিও পরিচালনা, ডিজাইন আপলোড, অর্ডার গ্রহণ এবং ইন্টারনেটে প্রকাশের সম্পূর্ণ বিবরণ।
          </p>
        </div>

        {/* 5 Step-by-Step Sections */}
        <div className="space-y-6">
          
          {/* STEP 1 */}
          <div className="p-5 rounded-xl bg-[#0e162c] border border-[#1b2a4e] space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#2563eb] text-white font-bold text-xs flex items-center justify-center">
                ১
              </span>
              <h3 className="font-sans text-base sm:text-lg font-bold text-[#f1f5f9] flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#38bdf8]" />
                কীভাবে নিজের ডিজাইনগুলো ওয়েবসাইটে আপলোড করবেন
              </h3>
            </div>
            <div className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed pl-10 space-y-2">
              <p>
                ১. ওয়েবসাইটের ফুটারে থাকা লক আইকন বা কিবোর্ডে <code className="bg-[#080d1a] px-1.5 py-0.5 rounded text-[#38bdf8] font-mono">Ctrl+Shift+A</code> চেপে অ্যাডমিন পোর্টালে যান।
              </p>
              <p>
                ২. আপনার অনুমোদিত জিমেল (<code className="bg-[#080d1a] px-1.5 py-0.5 rounded text-[#38bdf8] font-mono">hmashikurrahman84@gmail.com</code>) ও পাসওয়ার্ড দিয়ে লগইন করুন, অথবা "Google একাউন্ট দিয়ে এক ক্লিকে প্রবেশ" চাপুন। প্রয়োজনে "সাইনআপ" ট্যাব থেকে নতুন একাউন্টও খুলতে পারেন।
              </p>
              <p>
                ৩. <strong className="text-white">"ডিজাইনসমূহ"</strong> ট্যাবে গিয়ে ডিজাইনের নাম, সঠিক ক্যাটাগরি (Logo, Poster, Banner ইত্যাদি), এবং বিবরণ লিখুন।
              </p>
              <p>
                ৪. <strong className="text-white">"ছবি আপলোড"</strong> বাটনে ক্লিক করে আপনার কম্পিউটার বা ফোন থেকে ছবির ফাইল সিলেক্ট করুন অথবা ছবির অনলাইন লিংক বসান।
              </p>
              <p>
                ৫. এটি আপনার আসল কাজ হলে <em>"নমুনা ডিজাইন"</em> চেকবক্সটি আনচেক রাখুন এবং <strong className="text-[#38bdf8]">"ডিজাইন প্রকাশ করুন"</strong> চাপুন। মুহূর্তের মধ্যে পোর্টফোলিওতে যুক্ত হয়ে যাবে!
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="p-5 rounded-xl bg-[#0e162c] border border-[#1b2a4e] space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#2563eb] text-white font-bold text-xs flex items-center justify-center">
                ২
              </span>
              <h3 className="font-sans text-base sm:text-lg font-bold text-[#f1f5f9] flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#38bdf8]" />
                কীভাবে ডিজাইন ও সার্ভিস সম্পাদনা বা মুছে ফেলবেন
              </h3>
            </div>
            <div className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed pl-10 space-y-2">
              <p>
                • <strong className="text-white">ডিজাইন এডিট করতে:</strong> অ্যাডমিন প্যানেলে যেকোনো ডিজাইনের পাশে থাকা কলম (Edit) আইকনে ক্লিক করুন, নতুন তথ্য লিখে "আপডেট সংরক্ষণ করুন" চাপুন।
              </p>
              <p>
                • <strong className="text-white">ডিজাইন ডিলিট করতে:</strong> ট্র্যাশ (Delete) আইকনে ক্লিক করলেই সেটি তাৎক্ষণিকভাবে মুছে যাবে।
              </p>
              <p>
                • <strong className="text-white">সার্ভিস ম্যানেজ করতে:</strong> "সার্ভিসেস" ট্যাবে গিয়ে নতুন গ্রাফিক সার্ভিস, ডেলিভারি দিন ও আনুমানিক ফি যুক্ত করতে পারবেন।
              </p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="p-5 rounded-xl bg-[#0e162c] border border-[#1b2a4e] space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#2563eb] text-white font-bold text-xs flex items-center justify-center">
                ৩
              </span>
              <h3 className="font-sans text-base sm:text-lg font-bold text-[#f1f5f9] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#38bdf8]" />
                কীভাবে অর্ডার ব্যবস্থা ও WhatsApp কার্যকর করবেন
              </h3>
            </div>
            <div className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed pl-10 space-y-2">
              <p>
                ১. অ্যাডমিন প্যানেলের <strong className="text-white">"সাইট সেটিংস"</strong>-এ যান।
              </p>
              <p>
                ২. আপনার আসল WhatsApp নম্বরটি কান্ট্রি কোড সহ লিখুন (যেমন: <code className="bg-[#080d1a] px-1.5 py-0.5 rounded text-[#38bdf8] font-mono">8801700000000</code>)।
              </p>
              <p>
                ৩. কোনো ক্লায়েন্ট ওয়েবসাইটে অর্ডার ফর্ম পূরণ করলে:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[#94a3b8]">
                <li>অর্ডারটি আপনার ওয়েবসাইটের <strong>"অর্ডার ইনবক্স"</strong>-এ সেভ হয়ে থাকবে (ফলে ব্রাউজার বন্ধ করলেও তথ্য হারাবে না)।</li>
                <li>একই সাথে স্বয়ংক্রিয়ভাবে একটি সুন্দর বাংলা বার্তা সহ আপনার WhatsApp খুলে যাবে, যাতে ক্লায়েন্ট সরাসরি সেন্ড করতে পারেন।</li>
                <li>আপনি অ্যাডমিন প্যানেল থেকে যেকোনো সময় এক ক্লিকে ক্লায়েন্টকে WhatsApp-এ ফিরতি রিপ্লাই দিতে পারবেন।</li>
              </ul>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="p-5 rounded-xl bg-[#0e162c] border border-[#1b2a4e] space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#2563eb] text-white font-bold text-xs flex items-center justify-center">
                ৪
              </span>
              <h3 className="font-sans text-base sm:text-lg font-bold text-[#f1f5f9] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#38bdf8]" />
                কীভাবে ওয়েবসাইট ইন্টারনেটে প্রকাশ (Deploy/Hosting) করবেন
              </h3>
            </div>
            <div className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed pl-10 space-y-2">
              <p>
                আপনার ওয়েবসাইটটি সম্পূর্ণ বিনামূল্যে ইন্টারনেটে লাইভ করার সেরা ও সহজ উপায়সমূহ:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#1e2f57]">
                  <strong className="text-white block mb-1">পদ্ধতি ক: Vercel বা Netlify (সম্পূর্ণ ফ্রি)</strong>
                  <p className="text-[11px] text-[#94a3b8]">
                    GitHub-এ প্রজেক্টটি আপলোড করে vercel.com বা netlify.com এ কানেক্ট করলেই ১ মিনিটে আপনার নামে ফ্রি ডোমেইন সহ ওয়েবসাইট লাইভ হয়ে যাবে।
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#1e2f57]">
                  <strong className="text-white block mb-1">পদ্ধতি খ: কাস্টম ডোমেইন (.com)</strong>
                  <p className="text-[11px] text-[#94a3b8]">
                    পরবর্তীতে আপনার নিজের নামে ডোমেইন (যেমন: designmahal.com) কিনলে সেটি খুব সহজেই Vercel বা হোস্টিংয়ের সাথে যুক্ত করতে পারবেন।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 5 */}
          <div className="p-5 rounded-xl bg-[#0e162c] border border-[#1b2a4e] space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#2563eb] text-white font-bold text-xs flex items-center justify-center">
                ৫
              </span>
              <h3 className="font-sans text-base sm:text-lg font-bold text-[#f1f5f9] flex items-center gap-2">
                <Database className="w-4 h-4 text-[#38bdf8]" />
                ভবিষ্যতে ডেটা পরিচালনা ও ক্লাউড ডেটাবেস সংযোগ
              </h3>
            </div>
            <div className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed pl-10 space-y-2">
              <p>
                • <strong className="text-white">এক ক্লিকে ডেটা ব্যাকআপ:</strong> অ্যাডমিন প্যানেলের "ব্যাকআপ / রিস্টোর" ট্যাব থেকে যেকোনো সময় আপনার সব ডিজাইন ও সেটিংস .json ফাইল হিসেবে নামিয়ে রাখুন। নতুন ডিভাইসে এক ক্লিকে রিস্টোর করা যাবে।
              </p>
              <p>
                • <strong className="text-white">পেইড সার্ভার ছাড়া বিনামূল্যে চলা:</strong> ওয়েবসাইটটি কোনো পেইড API বা বাধ্যতামূলক সাবস্ক্রিপশন ছাড়াই চিরকাল স্বাধীনভাবে চলবে।
              </p>
              <p>
                • <strong className="text-white">ভবিষ্যতে Firebase / Cloud DB সংযোগ:</strong> আপনি চাইলে ভবিষ্যতে একাধিক ডিভাইস থেকে সিঙ্ক করার জন্য বিনামূল্যে Google Firebase Firestore যুক্ত করতে পারেন, যা সম্পূর্ণ ঐচ্ছিক।
              </p>
            </div>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="mt-8 pt-6 border-t border-[#172343] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#828a9b]">
            কোনো প্রশ্ন বা সহায়তার প্রয়োজন হলে সরাসরি সাইট সেটিংস থেকে তথ্য আপডেট করতে পারেন।
          </p>
          <button
            onClick={() => {
              setIsGuideModalOpen(false);
              setIsAdminModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] rounded-lg cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>অ্যাডমিন প্যানেল খুলুন</span>
          </button>
        </div>

      </div>
    </div>
  );
};
