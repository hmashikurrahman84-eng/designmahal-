import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Facebook,
  Instagram,
  Globe,
  Sparkles,
} from 'lucide-react';
import { formatWhatsAppNumber } from '../utils/whatsapp';

export const Contact: React.FC = () => {
  const { settings, createOrder } = usePortfolio();

  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState<string | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderContact.trim() || !senderMessage.trim()) {
      setFeedbackStatus('দয়া করে সকল তথ্য পূরণ করুন।');
      return;
    }

    // Save inquiry to orders database so it appears in the owner's dashboard
    createOrder({
      clientName: senderName.trim(),
      contactMethod: senderContact.includes('@') ? 'email' : 'phone',
      contactValue: senderContact.trim(),
      selectedService: 'সাধারণ অনুসন্ধান ও বার্তা',
      projectDetails: senderMessage.trim(),
      preferredDeliveryDate: 'যত দ্রুত সম্ভব',
    });

    setFeedbackStatus('success');
  };

  return (
    <section id="contact" className="py-20 bg-[#060a14] border-b border-[#162344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#38bdf8] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#60a5fa]" />
            <span>LET'S BUILD SOMETHING ICONIC</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#f1f5f9] tracking-tight">
            যোগাযোগ করুন
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] mt-2">
            আপনার যেকোনো গ্রাফিক ডিজাইন প্রজেক্ট, পরামর্শ বা কোটেশনের জন্য সরাসরি যোগাযোগ করুন।
          </p>
        </div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct channels & Social Links */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${formatWhatsAppNumber(settings.whatsappNumber)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-[#0e162c] border border-[#1b2a4e] hover:border-[#25D366]/50 hover:bg-[#121c38] transition-all group"
            >
              <div className="relative shrink-0">
                <div className="icon-light-orbit icon-light-orbit-green w-12 h-12">
                  <div className="icon-light-orbit-inner w-full h-full text-[#25D366]">
                    <MessageSquare className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#94a3b8]">WhatsApp (সরাসরি চ্যাট)</div>
                <div className="text-sm sm:text-base font-bold text-[#f1f5f9]">
                  {settings.displayPhone || settings.whatsappNumber}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#64748b] group-hover:text-[#25D366] transition-colors" />
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#0e162c] border border-[#1b2a4e] hover:border-[#38bdf8]/50 hover:bg-[#121c38] transition-all group"
            >
              <div className="relative shrink-0">
                <div className="icon-light-orbit w-12 h-12">
                  <div className="icon-light-orbit-inner w-full h-full text-[#38bdf8]">
                    <Mail className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </div>
                </div>
              </div>
              <div className="flex-1 truncate">
                <div className="text-xs text-[#94a3b8]">ইমেইল ঠিকানা</div>
                <div className="text-sm sm:text-base font-bold text-[#f1f5f9] truncate">
                  {settings.email}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#64748b] group-hover:text-[#38bdf8] transition-colors" />
            </a>

            {/* Location & Office */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0e162c] border border-[#1b2a4e]">
              <div className="relative shrink-0">
                <div className="icon-light-orbit w-12 h-12">
                  <div className="icon-light-orbit-inner w-full h-full text-[#60a5fa]">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-[#94a3b8]">অফিস / লোকেশন</div>
                <div className="text-sm sm:text-base font-bold text-[#f1f5f9]">
                  {settings.location}
                </div>
              </div>
            </div>

            {/* Social Media Links Card with Rotating Light Effect */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0e162c] border border-[#1b2a4e] luxury-card-glow">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold text-[#8292ab] uppercase tracking-wider flex items-center gap-2">
                  <span>সোশ্যাল মিডিয়া প্রোফাইল</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                </h4>
                <span className="text-[10px] text-[#38bdf8] font-medium tracking-wide">সরাসরি কানেক্ট হন</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                {settings.facebookUrl && (
                  <div className="relative group">
                    {/* Rotating light beam underneath and around Facebook icon */}
                    <div className="icon-underlight-glow">
                      <a
                        href={settings.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-light-orbit cursor-pointer"
                        title="Facebook প্রোফাইল"
                      >
                        <div className="icon-light-orbit-inner p-3.5 text-[#cbd5e1] group-hover:text-[#38bdf8]">
                          <Facebook className="w-5 h-5 transition-transform group-hover:scale-110" />
                        </div>
                      </a>
                    </div>
                  </div>
                )}
                {settings.instagramUrl && (
                  <div className="relative group">
                    {/* Rotating light beam underneath and around Instagram icon */}
                    <div className="icon-underlight-glow">
                      <a
                        href={settings.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-light-orbit cursor-pointer"
                        title="Instagram প্রোফাইল"
                      >
                        <div className="icon-light-orbit-inner p-3.5 text-[#cbd5e1] group-hover:text-[#f43f5e]">
                          <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />
                        </div>
                      </a>
                    </div>
                  </div>
                )}
                {settings.behanceUrl && (
                  <div className="relative group">
                    {/* Rotating light beam underneath and around Behance/Internet icon */}
                    <div className="icon-underlight-glow">
                      <a
                        href={settings.behanceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-light-orbit cursor-pointer"
                        title="ইন্টারনেট / Behance পোর্টফোলিও"
                      >
                        <div className="icon-light-orbit-inner p-3.5 text-[#cbd5e1] group-hover:text-[#38bdf8]">
                          <Globe className="w-5 h-5 transition-transform group-hover:scale-110" />
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Instant Message Box */}
          <div className="lg:col-span-7 bg-[#0e162c] p-6 sm:p-8 rounded-2xl border border-[#1b2a4e] luxury-card-glow">
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#f1f5f9] mb-1">
              দ্রুত বার্তা পাঠান
            </h3>
            <p className="text-xs sm:text-sm text-[#94a3b8] mb-6">
              আপনার সাধারণ জিজ্ঞাসা বা মতামত লিখে পাঠান। আমরা যত দ্রুত সম্ভব যোগাযোগ করব।
            </p>

            {feedbackStatus === 'success' ? (
              <div className="p-6 text-center space-y-4 bg-[#0a1020] border border-emerald-500/40 rounded-xl shadow-lg animate-fadeIn">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#f1f5f9]">বার্তা সফলভাবে জমা হয়েছে</h4>
                  <p className="text-xs text-[#94a3b8] max-w-sm mx-auto leading-relaxed">
                    আপনার বার্তাটি সরাসরি ওয়েবসাইটের কন্ট্রোল প্যানেলে সংরক্ষিত হয়েছে। ডিজাইনার অতি দ্রুত আপনার সাথে যোগাযোগ করবেন।
                  </p>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <a
                    href={`https://wa.me/${formatWhatsAppNumber(settings.whatsappNumber)}?text=${encodeURIComponent(
                      `*Design Mahal - বার্তা* 💬\nনাম: ${senderName}\nযোগাযোগ: ${senderContact}\nবার্তা: ${senderMessage}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-[#080d1a] bg-[#25D366] hover:bg-[#20ba5a] rounded-lg transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>হোয়াটসঅ্যাপেও কপি পাঠান (ঐচ্ছিক)</span>
                  </a>
                  <button
                    onClick={() => {
                      setFeedbackStatus(null);
                      setSenderName('');
                      setSenderContact('');
                      setSenderMessage('');
                    }}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#cbd5e1] hover:text-white bg-[#162345] rounded-lg border border-[#1e2f57] cursor-pointer"
                  >
                    আরেকটি বার্তা পাঠান
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                {feedbackStatus && (
                  <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-200 text-xs rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span>{feedbackStatus}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1.5">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="আপনার পূর্ণ নাম"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0a1020] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1.5">
                    ফোন বা ইমেইল *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="01XXXXXXXXX বা yourname@mail.com"
                    value={senderContact}
                    onChange={(e) => setSenderContact(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0a1020] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1.5">
                    বার্তা বা জিজ্ঞাসা *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="আপনার প্রশ্ন বা মতামত বিস্তারিত লিখুন..."
                    value={senderMessage}
                    onChange={(e) => setSenderMessage(e.target.value)}
                    className="w-full p-3 bg-[#0a1020] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none transition-colors resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-bold text-white bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] rounded-lg cursor-pointer transition-all active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>বার্তা পাঠান (Send Message)</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
