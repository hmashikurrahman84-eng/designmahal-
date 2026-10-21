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
  const {
    reviews,
    addReview,
    approveReview,
    deleteReview,
    services,
    settings,
    isAdminAuthenticated,
    setIsAdminModalOpen,
  } = usePortfolio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [companyOrRole, setCompanyOrRole] = useState('');
  const [serviceName, setServiceName] = useState('প্রফেশনাল লোগো ডিজাইন');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<{
    name: string;
    role: string;
    service: string;
    rating: number;
    comment: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filter only approved reviews for public view
  const approvedReviews = reviews.filter((r) => r.status === 'approved' || !r.status);
  const pendingReviews = reviews.filter((r) => r.status === 'pending');

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

    const cleanData = {
      name: clientName.trim().slice(0, 120),
      role: companyOrRole.trim().slice(0, 150),
      service: (serviceName || 'গ্রাফিক ডিজাইন সার্ভিস').slice(0, 150),
      rating,
      comment: comment.trim().slice(0, 2000),
    };

    addReview({
      clientName: cleanData.name,
      companyOrRole: cleanData.role || undefined,
      serviceName: cleanData.service,
      rating: cleanData.rating,
      comment: cleanData.comment,
    });

    setLastSubmittedData(cleanData);
    setIsSubmitted(true);
    setClientName('');
    setCompanyOrRole('');
    setComment('');
    setRating(5);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  const getWhatsAppNotifyUrl = () => {
    if (!lastSubmittedData) return '#';
    const rawPhone = (settings.whatsappNumber || '8801629947628').replace(/[^0-9]/g, '');
    const text = `আসসালামু আলাইকুম! আমি ডিজাইন মহল ওয়েবসাইটে একটি নতুন রিভিউ জমা দিয়েছি।\n\nনাম: ${lastSubmittedData.name}${
      lastSubmittedData.role ? `\nপরিচয়: ${lastSubmittedData.role}` : ''
    }\nসার্ভিস/কোর্স: ${lastSubmittedData.service}\nরেটিং: ${lastSubmittedData.rating} স্টার ⭐\nমতামত: "${lastSubmittedData.comment}"`;
    return `https://wa.me/${rawPhone}?text=${encodeURIComponent(text)}`;
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
            <span>CLIENT & STUDENT REVIEWS</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#f1f5f9] tracking-tight">
            ক্লায়েন্ট ও স্টুডেন্টদের প্রতিক্রিয়া ও রিভিউ
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] mt-2 leading-relaxed">
            দেশ-বিদেশের ক্লায়েন্ট, উদ্যোক্তা ও আমাদের স্টুডেন্টদের বাস্তব অভিজ্ঞতা ও মতামত
          </p>
        </div>

        {/* Admin-Only Live Pending Review Inbox Alert (Strictly hidden for normal visitors) */}
        {isAdminAuthenticated && pendingReviews.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8 p-5 rounded-2xl bg-amber-950/30 border-2 border-amber-500/50 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-amber-300">
                  অ্যাডমিন নোটিফিকেশন: {pendingReviews.length} টি নতুন রিভিউ আপনার অনুমোদনের অপেক্ষায় এসেছে!
                </h3>
              </div>
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                অ্যাডমিন প্যানেলে দেখুন
              </button>
            </div>

            <div className="space-y-2.5">
              {pendingReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3.5 rounded-xl bg-[#090f1f] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white">{rev.clientName}</span>
                      {rev.companyOrRole && (
                        <span className="text-xs text-[#94a3b8]">({rev.companyOrRole})</span>
                      )}
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#121c38] text-[#38bdf8] rounded border border-[#1e2f57]">
                        {rev.serviceName}
                      </span>
                      <span className="text-xs text-amber-400 font-bold">★ {rev.rating}.0</span>
                    </div>
                    <p className="text-xs text-[#cbd5e1] italic">"{rev.comment}"</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => approveReview(rev.id)}
                      className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      ✓ সাবমিট ও প্রকাশ করুন
                    </button>
                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="px-2.5 py-2 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/30 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      মুছুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                সর্বমোট <strong className="text-white">{approvedReviews.length} টি রিভিউ</strong> (ক্লায়েন্ট ও স্টুডেন্ট)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="icon-underlight-glow">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setIsModalOpen(true);
                }}
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
              <h3 className="text-lg font-bold text-white">এখনো কোনো রিভিউ প্রকাশিত হয়নি</h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed max-w-sm mx-auto">
                আপনি কি ডিজাইন মহলের সম্মানিত ক্লায়েন্ট অথবা স্টুডেন্ট? আপনার অভিজ্ঞতা শেয়ার করে প্রথম রিভিউটি দিন!
              </p>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setIsModalOpen(true);
              }}
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
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 text-[#94a3b8] hover:text-white rounded-lg hover:bg-[#162345] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-6 text-center space-y-5">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">ধন্যবাদ! রিভিউটি অ্যাডমিনের কাছে পাঠানো হয়েছে</h3>
                  <p className="text-xs sm:text-sm text-[#94a3b8] max-w-sm mx-auto leading-relaxed">
                    আপনার রিভিউটি সফলভাবে জমা হয়েছে এবং অ্যাডমিনের ড্যাশবোর্ডে নোটিফিকেশন চলে গেছে। অ্যাডমিন অনুমোদন করার সাথে সাথেই এটি ওয়েবসাইটে প্রকাশিত হবে।
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 max-w-xs mx-auto pt-2">
                  {isAdminAuthenticated && (
                    <button
                      type="button"
                      onClick={() => {
                        handleCloseModal();
                        setIsAdminModalOpen(true);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-colors cursor-pointer shadow-lg"
                    >
                      অ্যাডমিন প্যানেল থেকে এখনই অনুমোদন করুন
                    </button>
                  )}

                  <a
                    href={getWhatsAppNotifyUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#4ade80] font-bold text-xs transition-colors cursor-pointer"
                  >
                    <span>চাইলে WhatsApp-এও অ্যাডমিনকে জানান (ঐচ্ছিক)</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#162345] hover:bg-[#1e2f57] text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    ঠিক আছে, বন্ধ করুন
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold text-[#38bdf8] uppercase tracking-wider">
                    আপনার অভিজ্ঞতা শেয়ার করুন
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    ক্লায়েন্ট ও স্টুডেন্ট রিভিউ দিন
                  </h3>
                  <p className="text-xs text-[#94a3b8] mt-1">
                    ডিজাইন মহলের সাথে আপনার কাজ অথবা শেখার অভিজ্ঞতা কেমন ছিল তা জানান।
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

                  {/* Client / Student Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5">
                      আপনার নাম *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 bg-[#0a1020] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none"
                      />
                    </div>
                  </div>

                  {/* Company or Role or Student Batch */}
                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5">
                      আপনার পরিচয় / প্রতিষ্ঠান / স্টুডেন্ট ব্যাচ (ঐচ্ছিক)
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="যেমন: ক্লায়েন্ট / গ্রাফিক ডিজাইন স্টুডেন্ট / প্রতিষ্ঠানের নাম"
                        value={companyOrRole}
                        onChange={(e) => setCompanyOrRole(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 bg-[#0a1020] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none"
                      />
                    </div>
                  </div>

                  {/* Service or Course */}
                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5">
                      কোন সার্ভিস বা কোর্সের জন্য রিভিউ দিচ্ছেন? *
                    </label>
                    <div className="relative">
                      <Layers className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 bg-[#0a1020] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none cursor-pointer"
                      >
                        <optgroup label="ক্লায়েন্ট ডিজাইন সার্ভিসেস">
                          {services.map((srv) => (
                            <option key={srv.id} value={srv.nameBn}>
                              {srv.nameBn}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="স্টুডেন্ট কোর্স ও প্রশিক্ষণ">
                          <option value="প্রফেশনাল গ্রাফিক ডিজাইন কোর্স (স্টুডেন্ট)">
                            প্রফেশনাল গ্রাফিক ডিজাইন কোর্স (স্টুডেন্ট)
                          </option>
                          <option value="লোগো ও ব্র্যান্ডিং স্পেশাল কোর্স (স্টুডেন্ট)">
                            লোগো ও ব্র্যান্ডিং স্পেশাল কোর্স (স্টুডেন্ট)
                          </option>
                          <option value="পোস্টার ও টাইপোগ্রাফি ডিজাইন প্রশিক্ষণ (স্টুডেন্ট)">
                            পোস্টার ও টাইপোগ্রাফি ডিজাইন প্রশিক্ষণ (স্টুডেন্ট)
                          </option>
                        </optgroup>
                        <option value="অন্যান্য গ্রাফিক ডিজাইন বা প্রশিক্ষণ">অন্যান্য গ্রাফিক ডিজাইন বা প্রশিক্ষণ</option>
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
