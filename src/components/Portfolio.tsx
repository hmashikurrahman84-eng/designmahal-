import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { DesignCategory, DesignItem } from '../types';
import { VectorShowcase } from './VectorShowcase';
import { Search, Filter, Plus, ExternalLink, Sparkles } from 'lucide-react';

const CATEGORIES: ('All' | DesignCategory)[] = [
  'All',
  'Logo Design',
  'Poster Design',
  'Banner Design',
  'Book Cover Design',
  'Business Card Design',
  'Social Media Post Design',
  'Thumbnail Design',
  'ID Card Design',
  'Branding',
];

export const Portfolio: React.FC = () => {
  const { designs, setActiveDesignModal, setIsAdminModalOpen } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<'All' | DesignCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered designs based on category & search term
  const filteredDesigns = useMemo(() => {
    return designs.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [designs, selectedCategory, searchQuery]);

  return (
    <section id="portfolio" className="py-20 bg-[#080d1a] border-b border-[#162344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#38bdf8] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#60a5fa]" />
              <span>CURATED WORKS & EXHIBITION</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#f1f5f9] tracking-tight">
              পোর্টফোলিও — আমার সব ডিজাইন
            </h2>
            <p className="text-sm sm:text-base text-[#94a3b8] mt-2 max-w-2xl">
              বিভিন্ন ক্যাটাগরির লোগো, প্রিন্ট, সোশ্যাল মিডিয়া ও পূর্ণাঙ্গ ব্র্যান্ডিং কাজের নির্বাচিত সংগ্রহশালা।
            </p>
          </div>

          {/* Quick Action: Add New Design for Owner with Light Orbit */}
          <div className="icon-underlight-glow">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#38bdf8] bg-[#0e162c] hover:bg-[#162345] border border-[#38bdf8]/30 hover:border-[#38bdf8]/60 rounded-lg transition-colors cursor-pointer"
            >
              <div className="icon-light-sm w-4 h-4">
                <div className="icon-light-sm-inner w-full h-full text-[#38bdf8]">
                  <Plus className="w-2.5 h-2.5 text-[#38bdf8]" />
                </div>
              </div>
              <span>ডিজাইন ম্যানেজ / নতুন যোগ করুন</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 mb-10">
          {/* Search Input Bar */}
          <div className="relative max-w-md">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search className="w-4 h-4 text-[#38bdf8] icon-glow" />
            </div>
            <input
              type="text"
              placeholder="ডিজাইন বা টপিক খুঁজুন (যেমন: লোগো, ভিজিটিং কার্ড, ফেস্টিভ্যাল)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0e162d] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] placeholder-[#64748b] rounded-lg outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94a3b8] hover:text-white"
              >
                মুছুন
              </button>
            )}
          </div>

          {/* Category Filter Tabs (Horizontal Scrolling on Mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#162344]">
            <div className="text-xs text-[#64748b] font-medium mr-2 flex items-center gap-1.5 shrink-0">
              <div className="icon-light-sm w-4 h-4">
                <div className="icon-light-sm-inner w-full h-full text-[#38bdf8]">
                  <Filter className="w-2.5 h-2.5 text-[#38bdf8]" />
                </div>
              </div>
              ক্যাটাগরি:
            </div>
            {CATEGORIES.map((cat) => {
              const count =
                cat === 'All'
                  ? designs.length
                  : designs.filter((d) => d.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2563eb] text-white font-bold shadow-md shadow-[#2563eb]/20'
                      : 'text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#121c38]'
                  }`}
                >
                  {cat === 'All' ? 'সব ডিজাইন' : cat}
                  <span className={`ml-1.5 text-[10px] tabular-nums ${isActive ? 'text-white/80' : 'text-[#64748b]'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredDesigns.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-xl bg-[#0e162c] border border-[#1c2c54]">
            <p className="text-base text-[#94a3b8]">কোনো ডিজাইন খুঁজে পাওয়া যায়নি।</p>
            <p className="text-xs text-[#64748b] mt-1">
              অন্য কোনো ক্যাটাগরি বেছে নিন অথবা নতুন ডিজাইন আপলোড করুন।
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-md transition-colors"
            >
              সব ডিজাইন দেখুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDesigns.map((design) => (
              <div
                key={design.id}
                onClick={() => setActiveDesignModal(design)}
                className="group flex flex-col rounded-xl overflow-hidden bg-[#0e162c] border border-[#1b2a4e] hover:border-[#38bdf8]/60 hover:shadow-xl hover:shadow-[#1e3a8a]/20 transition-all duration-300 cursor-pointer"
              >
                {/* Visual Artwork Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#070b14]">
                  <VectorShowcase design={design} showBadge={true} />
                  
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-[#080d1a]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#2563eb] rounded-md shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <ExternalLink className="w-3.5 h-3.5" />
                      বিস্তারিত দেখুন
                    </span>
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#8292ab] mb-1.5">
                      <span className="text-[#38bdf8] font-bold">{design.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{design.year}</span>
                    </div>

                    <h3 className="font-sans text-base font-bold text-[#f1f5f9] group-hover:text-[#60a5fa] transition-colors line-clamp-1">
                      {design.title}
                    </h3>

                    <p className="text-xs text-[#94a3b8] mt-1.5 line-clamp-2 leading-relaxed">
                      {design.description}
                    </p>
                  </div>

                  {/* Card Footer: Tools & Context */}
                  <div className="pt-3 mt-3 border-t border-[#172343] flex items-center justify-between text-[11px] text-[#64748b]">
                    <span className="truncate max-w-[180px]">
                      {design.toolsUsed.join(' · ')}
                    </span>
                    <span className="text-[#38bdf8] font-semibold group-hover:translate-x-0.5 transition-transform">
                      ভিউ →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
