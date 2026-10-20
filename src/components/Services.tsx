import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Crown,
  Sparkles,
  Image,
  Layout,
  BookOpen,
  CreditCard,
  Share2,
  Tv,
  BadgeCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
} from 'lucide-react';

export const Services: React.FC = () => {
  const { services, openOrderWithService, setIsAdminModalOpen } = usePortfolio();

  // Helper to map icon names to Lucide icons
  const renderServiceIcon = (name: string) => {
    switch (name) {
      case 'Crown':
        return <Crown className="w-5 h-5 text-[#38bdf8]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#38bdf8]" />;
      case 'Image':
        return <Image className="w-5 h-5 text-[#38bdf8]" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-[#38bdf8]" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-[#38bdf8]" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-[#38bdf8]" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-[#38bdf8]" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-[#38bdf8]" />;
      case 'BadgeCheck':
      default:
        return <BadgeCheck className="w-5 h-5 text-[#38bdf8]" />;
    }
  };

  // Filter out any corporate branding package box
  const visibleServices = services.filter(
    (s) => s.id !== 'srv-brand' && s.nameBn !== 'পূর্ণাঙ্গ করপোরেট ব্র্যান্ডিং প্যাকেজ'
  );

  return (
    <section id="services" className="py-20 bg-[#060a14] border-b border-[#162344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#38bdf8] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#60a5fa]" />
              <span>BESPOKE DESIGN SOLUTIONS</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#f1f5f9] tracking-tight">
              সার্ভিসেস — গ্রাফিক ডিজাইন সেবা
            </h2>
            <p className="text-sm sm:text-base text-[#94a3b8] mt-2 max-w-2xl">
              আপনার ব্যবসার ব্রান্ডিং এবং প্রচারণাকে আকর্ষণীয় ও কার্যকর করতে সকল ধরনের প্রফেশনাল গ্রাফিক ডিজাইন সেবা।
            </p>
          </div>

          <div className="icon-underlight-glow self-start md:self-auto">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#38bdf8] bg-[#0e162c] hover:bg-[#162345] border border-[#38bdf8]/30 hover:border-[#38bdf8]/60 rounded-lg transition-colors cursor-pointer"
            >
              <div className="icon-light-sm w-4 h-4">
                <div className="icon-light-sm-inner w-full h-full text-[#38bdf8]">
                  <Plus className="w-2.5 h-2.5" />
                </div>
              </div>
              <span>নতুন সার্ভিস যোগ করুন</span>
            </button>
          </div>
        </div>

        {/* Services Cards Grid with Rotating Light Orbits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleServices.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between rounded-xl p-6 bg-[#0e162c] border border-[#1b2a4e] hover:border-[#38bdf8]/60 hover:shadow-xl hover:shadow-[#1d4ed8]/20 transition-all duration-300 group"
            >
              <div>
                {/* Header Icon with Rotating Light Orbit & Turnaround */}
                <div className="flex items-center justify-between mb-4">
                  <div className="icon-underlight-glow">
                    <div className="icon-light-orbit w-12 h-12 group-hover:scale-105 transition-transform">
                      <div className="icon-light-orbit-inner w-full h-full p-2.5">
                        {renderServiceIcon(service.iconName)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#8292ab] bg-[#101930] px-2.5 py-1 rounded-md border border-[#1a284c]">
                    <Clock className="w-3 h-3 text-[#38bdf8] icon-glow" />
                    <span>{service.deliveryDays}</span>
                  </div>
                </div>

                {/* Service Name */}
                <h3 className="font-sans text-lg font-bold text-[#f1f5f9] group-hover:text-[#60a5fa] transition-colors">
                  {service.nameBn}
                </h3>
                <span className="text-xs text-[#38bdf8] font-semibold block mt-0.5">
                  {service.name}
                </span>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#94a3b8] mt-3 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="mt-4 pt-4 border-t border-[#162242] space-y-2">
                  <div className="text-[11px] font-bold text-[#71829e] uppercase tracking-wider">
                    কী কী অন্তর্ভুক্ত:
                  </div>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#cbd5e1]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0 mt-0.5 icon-glow" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Order CTA Footer */}
              <div className="mt-6 pt-4 border-t border-[#162242] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#64748b] block uppercase tracking-wider font-semibold">আনুমানিক ফি</span>
                  <span className="text-xs sm:text-sm font-bold text-[#60a5fa] tabular-nums">
                    {service.startingPrice || 'আলোচনা সাপেক্ষে'}
                  </span>
                </div>

                <div className="icon-underlight-glow">
                  <button
                    onClick={() => openOrderWithService(service.nameBn)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] rounded-md shadow-md hover:shadow-[#38bdf8]/40 cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <span>Order Now</span>
                    <ArrowRight className="w-3 h-3 text-white icon-glow" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
