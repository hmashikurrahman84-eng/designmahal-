import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Star,
  Quote,
  CheckCircle2,
  Sparkles,
  MessageSquarePlus,
  X,
  Send,
  User,
  Building,
  Layers,
} from 'lucide-react';

export const Reviews: React.FC = () => {
  const { reviews, addReview, services } = usePortfolio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [companyOrRole, setCompanyOrRole] = useState('');
  const [serviceName, setServiceName] = useState('প্রফেশনাল লোগো ডিজাইন');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filter only approved reviews for public view
  const approvedReviews = reviews.filter((r) => r.status === 'approved');

  // Compute average rating from approved reviews
  const averageRating =
    approvedReviews.length > 0
      ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length).toFixed(1)
      : '5.0';

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!clientName.trim()) {
      setErrorMessage('দয়া করে আপনার নাম লিখুন।');
      return;
    }
    if (!comment.trim()) {
      setErrorMessage('দয়া করে আপনার বাস্তব অভিজ্ঞতা বা মতামত লিখুন।');
      return;
    }

    addReview({
      clientName: clientName.trim(),
      companyOrRole: companyOrRole.trim() || undefined,
      serviceName: serviceName || 'গ্রাফিক ডিজাইন সার্ভিস',
      rating,
      comment: comment.trim(),
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setClientName('');
      setCompanyOrRole('');
      setComment('');
      setRating(5);
    }, 3200);
  };

  const ratingDescriptions: Record<number, string> = {
    1: 'খুবই হতাশাজনক (১ স্টার)',
    2: 'মোটামুটি (২ স্টার)',
    3: 'ভালো (৩ স্টার)',
    4: 'অনেক ভালো (৪ স্টার)',
    5: 'অসাধারণ ও প্রশংসনীয়! (৫ স্টার)',
  };

  return (
    <section id="reviews" className="py-20 bg-[#080d1a] border-b border-[#162344] relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#1d4ed8]/10 via-[#38bdf8]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162345] border border-[#38bdf8]/30 text-xs font-bold tracking-[0.2em] text-[#38bdf8] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#60a5fa]" />
            <span>CLIENT REVIEWS & FEEDBACK</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#f1f5f9] tracking-tight">
            ক্লায়েন্টদের প্রতিক্রিয়া ও রিভিউ
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] mt-2 leading-relaxed">
            দেশ-বিদেশের উদ্যোক্তা, প্রতিষ্ঠান ও কনটেন্ট ক্রিয়েটরদের সাথে কাজের বাস্তব অভিজ্ঞতা
          </p>
        </div>

        {/* Rating Summary Bar */}
        <div className="max-w-4xl mx-auto mb-12 p-6 rounded-2xl bg-gradient-to-r from-[#0d152a] via-[#0f1b36] to-[#0d152a] border border-[#1e2f57] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1d4ed8]/20 border border-[#38bdf8]/40 shadow-inner">
              <span className="font-sans text-3xl font-extrabold text-[#38bdf8]">{averageRating}</span>
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1.5 text-xs font-bold text-amber-400">৫.০ রেটিং</span>
              </div>
              <p className="text-xs text-[#94a3b8]">
                সর্বমোট <strong className="text-white">{approvedReviews.length} টি রিভিউ</strong> ও সন্তুষ্ট ক্লায়েন্ট
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="icon-underlight-glow">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#60a5fa] hover:from-[#1d4ed8] hover:to-[#3b82f6] shadow-lg shadow-[#1d4ed8]/40 transition-all cursor-pointer active:scale-95"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>একটি রিভিউ দিন</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid or Empty State */}
        {approvedReviews.length === 0 ? (
          <div className="max-w-lg mx-auto p-8 rounded-2xl bg-[#0e162c] border border-[#1b2a4e] text-center space-y-4 luxury-card-glow">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#1d4ed8]/15 border border-[#38bdf8]/30 flex items-center justify-center">
              <Star className="w-7 h-7 text-[#38bdf8]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white">এখনো কোনো রিভিউ জমা হয়নি</h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed max-w-sm mx-auto">
                আপনি কি ডিজাইন মহলের মাধ্যমে কোনো ডিজাইন তৈরি করিয়েছেন? আপনার অভিজ্ঞতা শেয়ার করে প্রথম রিভিউটি দিন!
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] transition-all cursor-pointer shadow-md shadow-[#2563eb]/20"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>প্রথম রিভিউটি লিখুন</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-[#0e162c] border border-[#1b2a4e] hover:border-[#38bdf8]/40 transition-all flex flex-col justify-between group luxury-card-glow relative"
              >
                <div className="space-y-3">
                  {/* Header: Stars & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= rev.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-[#334155]'
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-[#1e2f57] group-hover:text-[#38bdf8]/30 transition-colors" />
                  </div>

                  {/* Service Tag */}
                  <div className="inline-block">
                    <span className="px-2.5 py-1 text-[11px] font-semibold text-[#38bdf8] bg-[#121c38] border border-[#1e2f57] rounded-md">
                      {rev.serviceName}
                    </span>
                  </div>

                  {/* Comment Text */}
                  <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed line-clamp-4 group-hover:text-white transition-colors">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="pt-4 mt-4 border-t border-[#162344] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {rev.avatarUrl ? (
                      <img
                        src={rev.avatarUrl}
                        alt={rev.clientName}
                        className="w-10 h-10 rounded-full object-cover border border-[#1e2f57]"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-[#334155] flex items-center justify-center font-bold text-sm text-[#38bdf8]">
                        {rev.clientName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#60a5fa] transition-colors">
                        {rev.clientName}
                      </h4>
                      {rev.companyOrRole && (
                        <p className="text-[11px] text-[#64748b] leading-tight">
                          {rev.companyOrRole}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>ভেরিফাইড</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0e162c] border border-[#1e2f57] rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#94a3b8] hover:text-white rounded-lg hover:bg-[#162345] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-white">ধন্যবাদ! রিভিউটি জমা হয়েছে</h3>
                  <p className="text-xs sm:text-sm text-[#94a3b8] max-w-sm mx-auto leading-relaxed">
                    আপনার রিভিউটি অ্যাডমিন পর্যালোচনার জন্য জমা রাখা হয়েছে। অ্যাডমিন অনুমোদন করার পর এটি ওয়েবসাইটে প্রকাশিত হবে।
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold text-[#38bdf8] uppercase tracking-wider">
                    আপনার অভিজ্ঞতা শেয়ার করুন
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    একটি ক্লায়েন্ট রিভিউ দিন
                  </h3>
                  <p className="text-xs text-[#94a3b8] mt-1">
                    ডিজাইন মহলের সাথে কাজের অভিজ্ঞতা কেমন ছিল তা জানান।
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-200 text-xs">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-2">
                      আপনার রেটিং নির্বাচন করুন *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= (hoverRating || rating)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-[#334155]'
                            } transition-colors`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-amber-400 font-medium ml-2">
                        {ratingDescriptions[hoverRating || rating]}
                      </span>
                    </div>
                  </div>

                  {/* Client Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5">
                      আপনার নাম *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="যেমন: তানভীর আহমেদ"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 bg-[#0a1020] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none"
                      />
                    </div>
                  </div>

                  {/* Company or Role */}
                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5">
                      প্রতিষ্ঠান বা পদবি (ঐচ্ছিক)
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="যেমন: সিইও, নক্ষত্র ফ্যাশন বা ইউটিউবার"
                        value={companyOrRole}
                        onChange={(e) => setCompanyOrRole(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 bg-[#0a1020] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none"
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5">
                      কোন সার্ভিসের কাজ করিয়েছেন? *
                    </label>
                    <div className="relative">
                      <Layers className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 bg-[#0a1020] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none cursor-pointer"
                      >
                        {services.map((srv) => (
                          <option key={srv.id} value={srv.nameBn}>
                            {srv.nameBn}
                          </option>
                        ))}
                        <option value="অন্যান্য গ্রাফিক ডিজাইন">অন্যান্য গ্রাফিক ডিজাইন</option>
                      </select>
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5">
                      আপনার বাস্তব মতামত ও অনুভূতি *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="কাজের মান, সময়মতো ডেলিভারি ও ব্যবহার সম্পর্কে আপনার স্পষ্ট মতামত লিখুন..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0a1020] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#60a5fa] hover:from-[#1d4ed8] hover:to-[#3b82f6] rounded-xl shadow-lg shadow-[#1d4ed8]/40 transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>রিভিউ সাবমিট করুন</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
