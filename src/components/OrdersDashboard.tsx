import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { OrderRequest } from '../types';
import {
  MessageSquare,
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Trash2,
  Search,
  Filter,
  ExternalLink,
  Plus,
  FileText,
  Copy,
  Printer,
  ChevronDown,
  Sparkles,
  Layers,
  X,
  Eye,
  Check,
  Send,
} from 'lucide-react';
import { formatWhatsAppNumber } from '../utils/whatsapp';

interface OrdersDashboardProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const OrdersDashboard: React.FC<OrdersDashboardProps> = ({ isModal = false, onClose }) => {
  const {
    orders,
    updateOrderStatus,
    deleteOrder,
    addTestOrder,
    refreshOrdersFromServer,
    settings,
  } = usePortfolio();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Stats calculation
  const totalOrders = orders.length;
  const newOrders = orders.filter((o) => o.status === 'নতুন (New)').length;
  const inProgressOrders = orders.filter((o) => o.status === 'কাজ চলছে (In Progress)').length;
  const completedOrders = orders.filter((o) => o.status === 'সম্পন্ন (Completed)').length;
  const cancelledOrders = orders.filter((o) => o.status === 'বাতিল (Cancelled)').length;

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === 'all' || order.status === selectedStatus;

    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      order.id.toLowerCase().includes(query) ||
      order.clientName.toLowerCase().includes(query) ||
      order.contactValue.toLowerCase().includes(query) ||
      order.selectedService.toLowerCase().includes(query) ||
      (order.projectDetails && order.projectDetails.toLowerCase().includes(query)) ||
      (order.notes && order.notes.toLowerCase().includes(query));

    return matchesStatus && matchesQuery;
  });

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshOrdersFromServer();
    setTimeout(() => {
      setIsRefreshing(false);
      setSuccessNotice('সার্ভার থেকে সমস্ত অর্ডার রিয়েলটাইমে আপডেট হয়েছে!');
      setTimeout(() => setSuccessNotice(null), 3000);
    }, 600);
  };

  const handleAddSampleOrder = () => {
    const newOrd = addTestOrder();
    setSuccessNotice(`টেস্ট অর্ডার #${newOrd.id} সফলভাবে ড্যাশবোর্ডে যুক্ত হয়েছে!`);
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  const handleSaveNotes = (id: string, currentStatus: OrderRequest['status']) => {
    updateOrderStatus(id, currentStatus, tempNotes);
    setEditingNotesId(null);
    setSuccessNotice('অর্ডারের অভ্যন্তরীণ নোট সেভ করা হয়েছে।');
    setTimeout(() => setSuccessNotice(null), 2500);
  };

  const handleCopyOrderSummary = (order: OrderRequest) => {
    const text = `=============================
DESIGN MAHAL - অর্ডার স্লিপ
=============================
অর্ডার নং: #${order.id}
তারিখ: ${new Date(order.createdAt).toLocaleString('bn-BD')}
ক্লায়েন্টের নাম: ${order.clientName}
যোগাযোগ (${order.contactMethod}): ${order.contactValue}
সার্ভিস: ${order.selectedService}
কাঙ্ক্ষিত ডেলিভারি: ${order.preferredDeliveryDate}
অবস্থা: ${order.status}

কাজের বিবরণ:
${order.projectDetails}
${order.notes ? `\nঅভ্যন্তরীণ নোট: ${order.notes}` : ''}
=============================`;

    navigator.clipboard.writeText(text);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getStatusBadgeClass = (status: OrderRequest['status']) => {
    switch (status) {
      case 'নতুন (New)':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/40 animate-pulse';
      case 'কাজ চলছে (In Progress)':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/40';
      case 'সম্পন্ন (Completed)':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40';
      case 'বাতিল (Cancelled)':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/40';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/40';
    }
  };

  const content = (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1b2a4e]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>লাইভ সার্ভার সিঙ্ক সক্রিয়</span>
            </span>
            <span className="text-xs text-[#64748b] hidden sm:inline">
              (প্রতি ৫ সেকেন্ডে অটো-আপডেট হয়)
            </span>
          </div>
          <h2 className="font-sans text-xl sm:text-2xl font-black text-[#f1f5f9] tracking-tight flex items-center gap-2">
            <span>ক্লায়েন্ট অর্ডার ড্যাশবোর্ড</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#1e2f57] text-[#38bdf8]">
              {orders.length} টি
            </span>
          </h2>
          <p className="text-xs text-[#94a3b8] mt-1">
            ওয়েবসাইট থেকে ক্লায়েন্টদের প্রেরিত সমস্ত অর্ডার রিয়েলটাইমে এখানে সংরক্ষিত ও প্রদর্শিত হয়।
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#cbd5e1] hover:text-white bg-[#0e162c] hover:bg-[#162345] border border-[#1e2f57] rounded-lg transition-all cursor-pointer shadow-sm disabled:opacity-50"
            title="সার্ভার থেকে রিয়েলটাইমে রিফ্রেশ করুন"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#38bdf8] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'লোড হচ্ছে...' : 'রিয়েলটাইম রিফ্রেশ'}</span>
          </button>

          <button
            type="button"
            onClick={handleAddSampleOrder}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] rounded-lg shadow-md transition-all cursor-pointer"
            title="একটি টেস্ট অর্ডার যোগ করে দেখুন"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
            <span>টেস্ট অর্ডার যুক্ত করুন</span>
          </button>
        </div>
      </div>

      {/* Real-time Notice Banner */}
      {successNotice && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs font-medium rounded-xl flex items-center justify-between gap-2 shadow-md animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successNotice}</span>
          </div>
          <button
            onClick={() => setSuccessNotice(null)}
            className="text-emerald-400 hover:text-emerald-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 4 Metric Statistic Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Orders Card */}
        <div className="p-4 rounded-xl bg-[#0b1224] border border-[#1a274c] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#94a3b8]">
            <span>মোট অর্ডার</span>
            <FileText className="w-4 h-4 text-[#60a5fa]" />
          </div>
          <div className="font-mono text-2xl font-black text-[#f1f5f9] mt-2">
            {totalOrders}
          </div>
          <p className="text-[10px] text-[#64748b] mt-1">ওয়েবসাইটে সংগৃহীত সমস্ত অর্ডার</p>
        </div>

        {/* New Orders Card (High Attention) */}
        <div className={`p-4 rounded-xl border transition-all ${
          newOrders > 0
            ? 'bg-blue-950/30 border-blue-500/60 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/30'
            : 'bg-[#0b1224] border-[#1a274c]'
        }`}>
          <div className="flex items-center justify-between text-xs text-[#94a3b8]">
            <span className="font-bold text-blue-400">নতুন অর্ডার (New)</span>
            <span className="relative flex h-2.5 w-2.5">
              {newOrders > 0 && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${newOrders > 0 ? 'bg-blue-500' : 'bg-slate-600'}`}></span>
            </span>
          </div>
          <div className={`font-mono text-2xl font-black mt-2 ${newOrders > 0 ? 'text-blue-300' : 'text-[#f1f5f9]'}`}>
            {newOrders}
          </div>
          <p className="text-[10px] text-blue-400/80 mt-1 font-medium">
            {newOrders > 0 ? '⚡ অবিলম্বে ক্লায়েন্টের সাথে যোগাযোগ করুন' : 'কোনো পেন্ডিং অর্ডার নেই'}
          </p>
        </div>

        {/* In Progress Card */}
        <div className="p-4 rounded-xl bg-[#0b1224] border border-[#1a274c] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#94a3b8]">
            <span className="text-amber-400 font-semibold">কাজ চলছে</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-mono text-2xl font-black text-amber-300 mt-2">
            {inProgressOrders}
          </div>
          <p className="text-[10px] text-[#64748b] mt-1">বর্তমানে প্রক্রিয়াধীন ডিজাইন</p>
        </div>

        {/* Completed Card */}
        <div className="p-4 rounded-xl bg-[#0b1224] border border-[#1a274c] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#94a3b8]">
            <span className="text-emerald-400 font-semibold">সম্পন্ন অর্ডার</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-mono text-2xl font-black text-emerald-300 mt-2">
            {completedOrders}
          </div>
          <p className="text-[10px] text-[#64748b] mt-1">সফলভাবে ডেলিভারি সম্পন্ন</p>
        </div>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="p-3 bg-[#0b1224] border border-[#1a274c] rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'সকল অর্ডার', count: totalOrders },
            { id: 'নতুন (New)', label: 'নতুন', count: newOrders, color: 'text-blue-400' },
            { id: 'কাজ চলছে (In Progress)', label: 'কাজ চলছে', count: inProgressOrders, color: 'text-amber-400' },
            { id: 'সম্পন্ন (Completed)', label: 'সম্পন্ন', count: completedOrders, color: 'text-emerald-400' },
            { id: 'বাতিল (Cancelled)', label: 'বাতিল', count: cancelledOrders, color: 'text-rose-400' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedStatus === tab.id
                  ? 'bg-[#2563eb] text-white shadow-sm'
                  : 'text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#121c38]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedStatus === tab.id ? 'bg-white/20 text-white' : 'bg-[#162344] text-[#cbd5e1]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="নাম, ফোন, সার্ভিস বা আইডি খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-lg outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#f1f5f9]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Orders List / Cards */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl bg-[#0b1224] border border-[#1a274c] space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#121c38] border border-[#1e2f57] flex items-center justify-center">
            <FileText className="w-8 h-8 text-[#64748b]" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-[#f1f5f9]">
              {searchQuery || selectedStatus !== 'all'
                ? 'এই ফিল্টারে কোনো অর্ডার পাওয়া যায়নি'
                : 'এখনো কোনো অর্ডার জমা পড়েনি'}
            </h4>
            <p className="text-xs text-[#94a3b8] mt-1 max-w-md mx-auto leading-relaxed">
              {searchQuery || selectedStatus !== 'all'
                ? 'দয়া করে ফিল্টার পরিবর্তন করুন বা সার্চ কোয়েরি ক্লিয়ার করুন।'
                : 'ওয়েবসাইট থেকে যখনই কোনো ক্লায়েন্ট অর্ডার ফর্ম পূরণ করবে, তা লাইভ ডাটাবেজ হয়ে এখানে মুহূর্তেই প্রদর্শিত হবে।'}
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={handleAddSampleOrder}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#38bdf8] bg-[#121c38] hover:bg-[#162345] border border-[#38bdf8]/40 rounded-lg cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>একটি টেস্ট অর্ডার যোগ করে সিস্টেম পরীক্ষা করুন</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const formattedDate = new Date(order.createdAt).toLocaleString('bn-BD', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            const cleanPhone = formatWhatsAppNumber(order.contactValue);
            const waGreeting = `আসসালামু আলাইকুম ${order.clientName}! Design Mahal থেকে যোগাযোগ করছি আপনার #${order.id} নম্বর ${order.selectedService} ডিজাইনের ব্যাপারে। আমরা আপনার রিকোয়েস্ট পেয়েছি।`;
            const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waGreeting)}`;

            return (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-[#0b1224] border border-[#1a274c] hover:border-[#2563eb]/50 transition-all space-y-4 shadow-sm"
              >
                {/* Header Row: ID, Time, Status Selector */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#162344]">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-sm font-black text-[#38bdf8] bg-[#080d1a] px-2.5 py-1 rounded-md border border-[#1e2f57]">
                      #{order.id}
                    </span>
                    <span className="text-xs text-[#94a3b8] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#64748b]" />
                      <span>{formattedDate}</span>
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#64748b] hidden sm:inline">অবস্থা:</span>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value as OrderRequest['status'], order.notes)
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border outline-none cursor-pointer transition-all ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      <option value="নতুন (New)" className="bg-[#0b1224] text-blue-400">
                        নতুন (New)
                      </option>
                      <option value="কাজ চলছে (In Progress)" className="bg-[#0b1224] text-amber-400">
                        কাজ চলছে (In Progress)
                      </option>
                      <option value="সম্পন্ন (Completed)" className="bg-[#0b1224] text-emerald-400">
                        সম্পন্ন (Completed)
                      </option>
                      <option value="বাতিল (Cancelled)" className="bg-[#0b1224] text-rose-400">
                        বাতিল (Cancelled)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Client & Service Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  {/* Client Info */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                      ক্লায়েন্টের নাম
                    </span>
                    <div className="font-bold text-sm text-[#f1f5f9] flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-[#1e2f57] text-[#38bdf8] flex items-center justify-center text-[10px] font-bold">
                        {order.clientName.charAt(0)}
                      </div>
                      <span>{order.clientName}</span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                      যোগাযোগ ({order.contactMethod})
                    </span>
                    <div className="font-mono text-xs font-bold text-[#38bdf8] flex items-center gap-1.5">
                      {order.contactMethod === 'whatsapp' ? (
                        <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                      ) : (
                        <Phone className="w-3.5 h-3.5 text-[#38bdf8]" />
                      )}
                      <span>{order.contactValue}</span>
                    </div>
                  </div>

                  {/* Service */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                      অনুরোধকৃত সার্ভিস
                    </span>
                    <div className="font-bold text-xs text-[#cbd5e1] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#60a5fa]" />
                      <span>{order.selectedService}</span>
                    </div>
                  </div>

                  {/* Delivery Timeline */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                      কাঙ্ক্ষিত ডেলিভারি
                    </span>
                    <div className="text-xs text-[#e2e8f0] flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#fbbf24]" />
                      <span>{order.preferredDeliveryDate || 'আলোচনা সাপেক্ষে'}</span>
                    </div>
                  </div>
                </div>

                {/* Project Details Box */}
                <div className="p-3.5 rounded-xl bg-[#070c18] border border-[#162344] space-y-1.5">
                  <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1">
                    <FileText className="w-3 h-3 text-[#38bdf8]" />
                    <span>ক্লায়েন্টের কাজের বিবরণ ও চাহিদা:</span>
                  </span>
                  <p className="text-xs text-[#cbd5e1] leading-relaxed whitespace-pre-wrap font-sans">
                    {order.projectDetails}
                  </p>
                </div>

                {/* Reference Images Gallery */}
                {order.referenceFiles && order.referenceFiles.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#38bdf8]" />
                      <span>সংযুক্ত রেফারেন্স ইমেজ ({order.referenceFiles.length}):</span>
                    </span>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {order.referenceFiles.map((img, i) => (
                        <div
                          key={i}
                          onClick={() => setPreviewImage(img)}
                          className="w-14 h-14 rounded-lg overflow-hidden border border-[#1e2f57] hover:border-[#38bdf8] cursor-pointer group relative transition-all"
                          title="বড় করে দেখতে ক্লিক করুন"
                        >
                          <img
                            src={img}
                            alt={`Ref ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Eye className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Internal Admin Notes */}
                <div className="p-3 rounded-xl bg-[#090f20] border border-[#1b2a4e]/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                      অ্যাডমিন অভ্যন্তরীণ নোট (Private Notes):
                    </span>
                    {editingNotesId !== order.id && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNotesId(order.id);
                          setTempNotes(order.notes || '');
                        }}
                        className="text-[11px] text-[#38bdf8] hover:underline cursor-pointer"
                      >
                        {order.notes ? 'নোট সম্পাদনা করুন' : '+ নোট যুক্ত করুন'}
                      </button>
                    )}
                  </div>

                  {editingNotesId === order.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        placeholder="পেমেন্ট স্ট্যাটাস, ড্রাফট পাঠানোর তারিখ বা কোনো বিশেষ তথ্য লিখে রাখুন..."
                        rows={2}
                        className="w-full p-2.5 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-lg outline-none"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSaveNotes(order.id, order.status)}
                          className="px-3 py-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold rounded cursor-pointer"
                        >
                          সেভ করুন
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingNotesId(null)}
                          className="px-3 py-1 bg-[#121c38] text-[#94a3b8] text-xs rounded cursor-pointer"
                        >
                          বাতিল
                        </button>
                      </div>
                    </div>
                  ) : order.notes ? (
                    <p className="text-xs text-[#cbd5e1] italic font-sans bg-[#080d1a]/60 p-2 rounded border border-[#1e2f57]/50">
                      "{order.notes}"
                    </p>
                  ) : (
                    <p className="text-[11px] text-[#64748b]">কোনো অভ্যন্তরীণ নোট লেখা নেই।</p>
                  )}
                </div>

                {/* Action Buttons Row */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#162344]">
                  {/* Communication CTAs */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* WhatsApp CTA */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#080d1a] bg-[#25D366] hover:bg-[#20ba5a] rounded-lg transition-colors shadow-sm"
                      title="সরাসরি WhatsApp-এ রেডি মেসেজ পাঠান"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-[#080d1a]" />
                      <span>WhatsApp-এ চ্যাট করুন</span>
                    </a>

                    {/* Direct Call CTA */}
                    {order.contactValue.replace(/[^0-9]/g, '').length >= 10 && (
                      <a
                        href={`tel:${order.contactValue.replace(/[^0-9+]/g, '')}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#cbd5e1] hover:text-white bg-[#101932] hover:bg-[#162345] border border-[#1e2f57] rounded-lg transition-colors"
                        title="ফোনে কল করুন"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#38bdf8]" />
                        <span>কল দিন</span>
                      </a>
                    )}

                    {/* Copy Order Details */}
                    <button
                      type="button"
                      onClick={() => handleCopyOrderSummary(order)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#cbd5e1] hover:text-white bg-[#101932] hover:bg-[#162345] border border-[#1e2f57] rounded-lg transition-colors cursor-pointer"
                      title="অর্ডারের সংক্ষিপ্ত বিবরণ কপি করুন"
                    >
                      {copiedId === order.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">কপি হয়েছে!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#94a3b8]" />
                          <span>কপি স্লিপ</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`আপনি কি নিশ্চিত যে #${order.id} অর্ডারটি স্থায়ীভাবে মুছে ফেলতে চান?`)) {
                        deleteOrder(order.id);
                        setSuccessNotice(`অর্ডার #${order.id} মুছে ফেলা হয়েছে।`);
                        setTimeout(() => setSuccessNotice(null), 2500);
                      }
                    }}
                    className="inline-flex items-center gap-1 text-xs text-[#64748b] hover:text-rose-400 px-2 py-1 rounded transition-colors cursor-pointer"
                    title="অর্ডারটি মুছে ফেলুন"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>মুছুন</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="max-w-3xl max-h-[90vh] bg-[#0b1224] p-2 rounded-2xl border border-[#1e2f57] relative shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewImage}
              alt="Reference Preview"
              className="max-w-full max-h-[80vh] object-contain rounded-xl mx-auto"
            />
            <div className="p-3 text-center text-xs text-[#94a3b8]">
              ক্লায়েন্টের প্রেরিত রেফারেন্স ছবি
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#080d1a] border border-[#1b2a4e] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Modal Header */}
          <div className="px-5 py-4 bg-[#0e162c] border-b border-[#162344] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1d4ed8]/20 border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sans text-base sm:text-lg font-bold text-[#f1f5f9]">
                  {settings.brandName} — অর্ডার ড্যাশবোর্ড
                </h3>
                <p className="text-[11px] text-[#94a3b8]">
                  ওয়েবসাইটের সমস্ত লাইভ অর্ডার পর্যবেক্ষণ ও পরিচালনা করুন
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#162344] transition-colors cursor-pointer"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return content;
};
