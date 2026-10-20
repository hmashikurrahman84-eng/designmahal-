import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { DesignCategory, DesignItem } from '../types';
import { VectorShowcase } from './VectorShowcase';
import {
  Shield,
  X,
  Plus,
  Trash2,
  Edit2,
  Lock,
  Unlock,
  Layers,
  ShoppingBag,
  Settings,
  Database,
  Upload,
  CheckCircle2,
  MessageSquare,
  Key,
  BookOpen,
} from 'lucide-react';

const CATEGORIES: DesignCategory[] = [
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

export const AdminModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    designs,
    addDesign,
    updateDesign,
    deleteDesign,
    services,
    addService,
    updateService,
    deleteService,
    orders,
    updateOrderStatus,
    deleteOrder,
    settings,
    updateSettings,
    exportDatabaseJSON,
    importDatabaseJSON,
    resetAllToDefault,
    setIsGuideModalOpen,
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
  } = usePortfolio();

  // Authentication input & error state
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'designs' | 'services' | 'orders' | 'settings' | 'backup'>('designs');

  // Design Form State (for Add / Edit)
  const [isEditingDesign, setIsEditingDesign] = useState<string | null>(null);
  const [designTitle, setDesignTitle] = useState('');
  const [designCategory, setDesignCategory] = useState<DesignCategory>('Logo Design');
  const [designDescription, setDesignDescription] = useState('');
  const [designImageUrl, setDesignImageUrl] = useState('');
  const [designIsSample, setDesignIsSample] = useState(false);
  const [designTools, setDesignTools] = useState('Adobe Illustrator, Photoshop');
  const [designTags, setDesignTags] = useState('Vector, Premium, Creative');
  const [designYear, setDesignYear] = useState('2026');
  const [designMessage, setDesignMessage] = useState<string | null>(null);

  // Service Form State (for Add / Edit)
  const [isEditingService, setIsEditingService] = useState<string | null>(null);
  const [srvName, setSrvName] = useState('');
  const [srvNameBn, setSrvNameBn] = useState('');
  const [srvCategory, setSrvCategory] = useState<DesignCategory>('Logo Design');
  const [srvDescription, setSrvDescription] = useState('');
  const [srvDeliverables, setSrvDeliverables] = useState('ভেক্টর ফাইল, হাই-রেজ PNG, প্রিন্ট PDF');
  const [srvPrice, setSrvPrice] = useState('৳১,২০০ থেকে শুরু');
  const [srvDays, setSrvDays] = useState('২-৩ দিন');
  const [srvIcon, setSrvIcon] = useState('Sparkles');

  // Settings Form State
  const [siteSettingsForm, setSiteSettingsForm] = useState(settings);
  const [newAdminPass, setNewAdminPass] = useState('');
  const [settingsNotice, setSettingsNotice] = useState<string | null>(null);

  // Backup Import State
  const [importJsonText, setImportJsonText] = useState('');
  const [backupNotice, setBackupNotice] = useState<string | null>(null);

  if (!isAdminModalOpen) return null;

  // Handle Login Check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(passwordInput)) {
      setAuthError(null);
      setPasswordInput('');
    } else {
      setAuthError('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন।');
    }
  };

  // Handle Design Image Upload
  const handleAdminImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2.5 * 1024 * 1024) {
        alert('ছবির সাইজ ২.৫MB এর কম রাখুন।');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setDesignImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add or Edit Design
  const handleSaveDesign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!designTitle.trim() || !designDescription.trim()) {
      alert('ডিজাইনের নাম ও বিবরণ আবশ্যক।');
      return;
    }

    const toolsArr = designTools.split(',').map((t) => t.trim()).filter(Boolean);
    const tagsArr = designTags.split(',').map((t) => t.trim()).filter(Boolean);

    if (isEditingDesign) {
      updateDesign(isEditingDesign, {
        title: designTitle.trim(),
        category: designCategory,
        description: designDescription.trim(),
        imageUrl: designImageUrl || undefined,
        isSample: designIsSample,
        toolsUsed: toolsArr.length > 0 ? toolsArr : ['Adobe Illustrator'],
        tags: tagsArr.length > 0 ? tagsArr : ['Design'],
        year: designYear.trim() || '2026',
      });
      setDesignMessage('ডিজাইন সফলভাবে আপডেট হয়েছে!');
      setIsEditingDesign(null);
    } else {
      addDesign({
        title: designTitle.trim(),
        category: designCategory,
        description: designDescription.trim(),
        imageUrl: designImageUrl || undefined,
        isSample: designIsSample,
        toolsUsed: toolsArr.length > 0 ? toolsArr : ['Adobe Illustrator'],
        tags: tagsArr.length > 0 ? tagsArr : ['Design'],
        year: designYear.trim() || '2026',
      });
      setDesignMessage('নতুন ডিজাইন সফলভাবে যোগ হয়েছে!');
    }

    // Reset fields
    setDesignTitle('');
    setDesignDescription('');
    setDesignImageUrl('');
    setDesignIsSample(false);

    setTimeout(() => setDesignMessage(null), 3000);
  };

  const startEditDesign = (item: DesignItem) => {
    setIsEditingDesign(item.id);
    setDesignTitle(item.title);
    setDesignCategory(item.category);
    setDesignDescription(item.description);
    setDesignImageUrl(item.imageUrl || '');
    setDesignIsSample(item.isSample);
    setDesignTools(item.toolsUsed.join(', '));
    setDesignTags(item.tags.join(', '));
    setDesignYear(item.year);
  };

  // Save Service
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvNameBn.trim()) {
      alert('সার্ভিসের নাম আবশ্যক।');
      return;
    }

    const deliverablesArr = srvDeliverables.split(',').map((d) => d.trim()).filter(Boolean);

    if (isEditingService) {
      updateService(isEditingService, {
        name: srvName.trim() || srvNameBn.trim(),
        nameBn: srvNameBn.trim(),
        category: srvCategory,
        description: srvDescription.trim(),
        deliverables: deliverablesArr,
        startingPrice: srvPrice.trim(),
        deliveryDays: srvDays.trim(),
        iconName: srvIcon,
      });
      setIsEditingService(null);
    } else {
      addService({
        name: srvName.trim() || srvNameBn.trim(),
        nameBn: srvNameBn.trim(),
        category: srvCategory,
        description: srvDescription.trim(),
        deliverables: deliverablesArr,
        startingPrice: srvPrice.trim(),
        deliveryDays: srvDays.trim(),
        iconName: srvIcon,
      });
    }

    setSrvName('');
    setSrvNameBn('');
    setSrvDescription('');
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...siteSettingsForm };
    if (newAdminPass.trim()) {
      updated.adminPasswordHash = newAdminPass.trim();
    }
    updateSettings(updated);
    setSettingsNotice('সাইট সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে!');
    setNewAdminPass('');
    setTimeout(() => setSettingsNotice(null), 3000);
  };

  // Download Backup JSON
  const handleDownloadBackup = () => {
    const jsonStr = exportDatabaseJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `design-mahal-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import Backup
  const handleImportBackup = () => {
    if (!importJsonText.trim()) {
      setBackupNotice('দয়া করে JSON ডেটা পেস্ট করুন।');
      return;
    }
    const success = importDatabaseJSON(importJsonText.trim());
    if (success) {
      setBackupNotice('ডেটা সফলভাবে রিস্টোর হয়েছে!');
      setImportJsonText('');
    } else {
      setBackupNotice('ভুল JSON ফরম্যাট! অনুগ্রহ করে সঠিক ব্যাকআপ ফাইল ব্যবহার করুন।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      {/* Background click */}
      <div className="absolute inset-0" onClick={() => setIsAdminModalOpen(false)} />

      {/* Main Admin Card */}
      <div className="relative w-full max-w-5xl h-[92vh] flex flex-col bg-[#0b1224] border border-[#1b2a4e] rounded-2xl shadow-2xl z-10 overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#0e162c] border-b border-[#162344] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="icon-underlight-glow">
              <div className="logo-light-orbit w-9 h-9 shrink-0">
                <div className="logo-light-orbit-inner w-full h-full p-1 bg-[#080d1a]">
                  <img
                    src={settings.logoUrl || 'https://res.cloudinary.com/fht84r3o/image/upload/v1792477511/Design-Mahal-logo-122.png'}
                    alt="Design Mahal"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-sans text-base sm:text-lg font-bold text-[#f1f5f9] flex items-center gap-2">
                Design Mahal — অ্যাডমিন কন্ট্রোল প্যানেল
              </h3>
              <p className="text-[11px] text-[#94a3b8]">
                ডিজাইন আপলোড, সার্ভিস সম্পাদনা, অর্ডার ইনবক্স ও সাইট সেটিংস
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={() => adminLogout()}
                className="px-2.5 py-1 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-950/70 rounded-md border border-rose-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="অ্যাডমিন প্যানেল থেকে লগআউট"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>লগআউট</span>
              </button>
            )}
            <button
              onClick={() => {
                setIsAdminModalOpen(false);
                setIsGuideModalOpen(true);
              }}
              className="px-2.5 py-1 text-xs font-semibold text-[#38bdf8] bg-[#121c38] hover:bg-[#1a2850] rounded-md border border-[#38bdf8]/30 flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>গাইড</span>
            </button>
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-1.5 text-[#94a3b8] hover:text-white bg-[#121c38] rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* If NOT Authenticated, show Login Dialog */}
        {!isAdminAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-[#070c18]">
            <div className="w-full max-w-sm p-8 bg-[#0e162c] border border-[#1b2a4e] rounded-2xl text-center space-y-5">
              <div className="icon-underlight-glow inline-block mx-auto">
                <div className="logo-light-orbit w-16 h-16 shrink-0">
                  <div className="logo-light-orbit-inner w-full h-full p-2 bg-[#080d1a]">
                    <img
                      src={settings.logoUrl || 'https://res.cloudinary.com/fht84r3o/image/upload/v1792477511/Design-Mahal-logo-122.png'}
                      alt="Design Mahal"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-sans text-xl font-bold text-[#f1f5f9]">অ্যাডমিন লগইন</h4>
                <p className="text-xs text-[#94a3b8] mt-1">
                  পোর্টফোলিও ও অর্ডার পরিচালনা করতে আপনার পাসওয়ার্ড দিন।
                </p>
              </div>

              {authError && (
                <div className="p-3 text-xs bg-red-950/40 border border-red-500/30 text-red-300 rounded-lg">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  placeholder="অ্যাডমিন পাসওয়ার্ড লিখুন..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none text-center tracking-widest"
                  autoFocus
                />

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] rounded-lg cursor-pointer transition-all shadow-md"
                >
                  লগইন করুন
                </button>
              </form>

              <div className="p-2.5 rounded bg-[#101932] border border-[#1e2f57] text-[11px] text-[#94a3b8] text-left">
                ℹ️ <strong>ডিফল্ট পাসওয়ার্ড:</strong> <code className="text-[#38bdf8] font-mono">mahal2026</code> (লগইন করে 'সেটিংস' থেকে পরিবর্তন করতে পারবেন)।
              </div>
            </div>
          </div>
        ) : (
          /* If Authenticated: Show Full Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-56 bg-[#090f1e] border-b md:border-b-0 md:border-r border-[#162344] p-3 flex md:flex-col gap-1.5 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('designs')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'designs'
                    ? 'bg-[#2563eb] text-white shadow-md shadow-[#2563eb]/25'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#121c38]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>ডিজাইনসমূহ ({designs.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'services'
                    ? 'bg-[#2563eb] text-white shadow-md shadow-[#2563eb]/25'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#121c38]'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>সার্ভিসেস ({services.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'orders'
                    ? 'bg-[#2563eb] text-white shadow-md shadow-[#2563eb]/25'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#121c38]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>অর্ডার ইনবক্স ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'bg-[#2563eb] text-white shadow-md shadow-[#2563eb]/25'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#121c38]'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>সাইট সেটিংস</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'backup'
                    ? 'bg-[#2563eb] text-white shadow-md shadow-[#2563eb]/25'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#121c38]'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>ব্যাকআপ / রিস্টোর</span>
              </button>

              <div className="mt-auto hidden md:block pt-4 border-t border-[#162344]">
                <button
                  onClick={() => adminLogout()}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-[#64748b] hover:text-red-400 hover:bg-[#121c38] rounded-lg transition-colors cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>লগআউট</span>
                </button>
              </div>
            </div>

            {/* Main Tab Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#070c18]">
              
              {/* TAB 1: DESIGNS MANAGER */}
              {activeTab === 'designs' && (
                <div className="space-y-8">
                  {/* Form to Add or Edit */}
                  <div className="p-5 rounded-xl bg-[#0e162c] border border-[#1b2a4e]">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-[#f1f5f9] flex items-center gap-2">
                        {isEditingDesign ? <Edit2 className="w-4 h-4 text-[#38bdf8]" /> : <Plus className="w-4 h-4 text-[#38bdf8]" />}
                        {isEditingDesign ? 'ডিজাইন সম্পাদনা করুন' : 'নতুন ডিজাইন যোগ করুন'}
                      </h4>
                      {isEditingDesign && (
                        <button
                          onClick={() => {
                            setIsEditingDesign(null);
                            setDesignTitle('');
                            setDesignDescription('');
                            setDesignImageUrl('');
                          }}
                          className="text-xs text-[#8f96a8] hover:text-white"
                        >
                          বাতিল করুন
                        </button>
                      )}
                    </div>

                    {designMessage && (
                      <div className="mb-4 p-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs rounded-lg flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{designMessage}</span>
                      </div>
                    )}

                    <form onSubmit={handleSaveDesign} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                            ডিজাইনের নাম *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="যেমন: The Grand Monogram Logo"
                            value={designTitle}
                            onChange={(e) => setDesignTitle(e.target.value)}
                            className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                            ক্যাটাগরি *
                          </label>
                          <select
                            value={designCategory}
                            onChange={(e) => setDesignCategory(e.target.value as DesignCategory)}
                            className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-lg outline-none"
                          >
                            {CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                          ডিজাইন বিবরণ *
                        </label>
                        <textarea
                          rows={2}
                          required
                          placeholder="ডিজাইনের উদ্দেশ্য, কালার থিম ও কনসেপ্ট লিখুন..."
                          value={designDescription}
                          onChange={(e) => setDesignDescription(e.target.value)}
                          className="w-full p-2.5 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-lg outline-none resize-y"
                        />
                      </div>

                      {/* Image Upload or URL */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        <div>
                          <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                            ডিজাইনের ছবি আপলোড বা লিংক
                          </label>
                          <div className="flex items-center gap-2">
                            <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#121c38] hover:bg-[#1a2850] border border-[#233560] rounded-lg text-xs text-[#cbd5e1] cursor-pointer">
                              <Upload className="w-3.5 h-3.5 text-[#38bdf8]" />
                              <span>ছবি আপলোড</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleAdminImageUpload}
                                className="hidden"
                              />
                            </label>
                            <input
                              type="text"
                              placeholder="বা ইমেজ URL পেস্ট করুন..."
                              value={designImageUrl}
                              onChange={(e) => setDesignImageUrl(e.target.value)}
                              className="flex-1 px-3 py-2 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-lg outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-6 pt-5">
                          <label className="flex items-center gap-2 text-xs text-[#cbd5e1] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={designIsSample}
                              onChange={(e) => setDesignIsSample(e.target.checked)}
                              className="rounded border-[#1e2f57] text-[#2563eb] focus:ring-0"
                            />
                            <span>এটি একটি নমুনা ডিজাইন (Showcase Sample) হিসেবে দেখাবে</span>
                          </label>
                        </div>
                      </div>

                      {/* Tools & Tags */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] text-[#8e95a7] uppercase mb-1">
                            ব্যবহৃত টুলস (কমা দিয়ে আলাদা করুন)
                          </label>
                          <input
                            type="text"
                            placeholder="Adobe Illustrator, Photoshop"
                            value={designTools}
                            onChange={(e) => setDesignTools(e.target.value)}
                            className="w-full px-3 py-1.5 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#8e95a7] uppercase mb-1">
                            ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)
                          </label>
                          <input
                            type="text"
                            placeholder="Vector, Modern, Creative"
                            value={designTags}
                            onChange={(e) => setDesignTags(e.target.value)}
                            className="w-full px-3 py-1.5 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#8e95a7] uppercase mb-1">
                            সাল / বছর
                          </label>
                          <input
                            type="text"
                            value={designYear}
                            onChange={(e) => setDesignYear(e.target.value)}
                            className="w-full px-3 py-1.5 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] rounded-lg cursor-pointer shadow-md"
                      >
                        {isEditingDesign ? 'আপডেট সংরক্ষণ করুন' : 'ডিজাইন প্রকাশ করুন'}
                      </button>
                    </form>
                  </div>

                  {/* Existing Designs List */}
                  <div>
                    <h4 className="text-sm font-bold text-[#f1f5f9] mb-3">
                      সকল বর্তমান ডিজাইনসমূহ ({designs.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {designs.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-[#0e162c] border border-[#1b2a4e]"
                        >
                          <div className="w-16 h-16 rounded overflow-hidden bg-[#070b14] shrink-0">
                            <VectorShowcase design={item} showBadge={false} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-[#38bdf8] font-semibold">{item.category}</span>
                              {item.isSample && (
                                <span className="text-[9px] text-[#8e96a8] bg-[#121c38] px-1 rounded">নমুনা</span>
                              )}
                            </div>
                            <h5 className="text-xs font-bold text-[#f1f5f9] truncate">{item.title}</h5>
                            <p className="text-[11px] text-[#7d8597] truncate">{item.description}</p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => startEditDesign(item)}
                              className="p-1.5 text-[#9fa6b8] hover:text-[#38bdf8] hover:bg-[#121c38] rounded"
                              title="সম্পাদনা"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`'${item.title}' ডিজাইনটি মুছে ফেলতে চান?`)) {
                                  deleteDesign(item.id);
                                }
                              }}
                              className="p-1.5 text-[#9fa6b8] hover:text-red-400 hover:bg-[#121c38] rounded"
                              title="মুছুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SERVICES MANAGER */}
              {activeTab === 'services' && (
                <div className="space-y-8">
                  {/* Add / Edit Service */}
                  <div className="p-5 rounded-xl bg-[#0e162c] border border-[#1b2a4e]">
                    <h4 className="text-sm font-bold text-[#f1f5f9] mb-3">
                      {isEditingService ? 'সার্ভিস সম্পাদনা করুন' : 'নতুন সার্ভিস যোগ করুন'}
                    </h4>

                    <form onSubmit={handleSaveService} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                            সার্ভিসের নাম (বাংলায়) *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="যেমন: লোগো ও ব্র্যান্ড আইডেন্টিটি"
                            value={srvNameBn}
                            onChange={(e) => setSrvNameBn(e.target.value)}
                            className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                            সার্ভিসের নাম (ইংরেজিতে)
                          </label>
                          <input
                            type="text"
                            placeholder="Logo & Brand Identity"
                            value={srvName}
                            onChange={(e) => setSrvName(e.target.value)}
                            className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                          বিবরণ *
                        </label>
                        <textarea
                          rows={2}
                          required
                          placeholder="সার্ভিসের বর্ণনা লিখুন..."
                          value={srvDescription}
                          onChange={(e) => setSrvDescription(e.target.value)}
                          className="w-full p-2.5 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] text-[#8e95a7] uppercase mb-1">
                            যা যা অন্তর্ভুক্ত (কমা দিয়ে)
                          </label>
                          <input
                            type="text"
                            value={srvDeliverables}
                            onChange={(e) => setSrvDeliverables(e.target.value)}
                            className="w-full px-3 py-1.5 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#8e95a7] uppercase mb-1">
                            মূল্য বা ফি
                          </label>
                          <input
                            type="text"
                            value={srvPrice}
                            onChange={(e) => setSrvPrice(e.target.value)}
                            className="w-full px-3 py-1.5 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#8e95a7] uppercase mb-1">
                            ডেলিভারি সময়
                          </label>
                          <input
                            type="text"
                            value={srvDays}
                            onChange={(e) => setSrvDays(e.target.value)}
                            className="w-full px-3 py-1.5 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] rounded-lg cursor-pointer"
                      >
                        {isEditingService ? 'আপডেট করুন' : 'সার্ভিস যোগ করুন'}
                      </button>
                    </form>
                  </div>

                  {/* List of Services */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#f1f5f9]">বর্তমান সার্ভিস তালিকা ({services.length})</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {services.map((srv) => (
                        <div key={srv.id} className="p-3.5 rounded-lg bg-[#0e162c] border border-[#1b2a4e] flex items-start justify-between gap-3">
                          <div>
                            <div className="text-xs font-bold text-[#f1f5f9]">{srv.nameBn}</div>
                            <div className="text-[11px] text-[#38bdf8]">{srv.startingPrice} · {srv.deliveryDays}</div>
                            <p className="text-[11px] text-[#8c94a5] line-clamp-2 mt-1">{srv.description}</p>
                          </div>
                          <button
                            onClick={() => {
                              if (confirm(`'${srv.nameBn}' মুছে ফেলতে চান?`)) deleteService(srv.id);
                            }}
                            className="p-1.5 text-[#8890a2] hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ORDERS INBOX */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#f1f5f9]">
                      প্রাপ্ত ক্লায়েন্ট অর্ডার ইনবক্স ({orders.length})
                    </h4>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-12 rounded-xl bg-[#0e162c] border border-[#1b2a4e] text-xs text-[#8f96a8]">
                      এখনো কোনো অর্ডার আসেনি। ক্লায়েন্টরা অর্ডার ফর্ম পূরণ করলে এখানে সংরক্ষিত হবে।
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((ord) => (
                        <div key={ord.id} className="p-4 rounded-xl bg-[#0e162c] border border-[#1b2a4e] space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#172343] pb-2.5">
                            <div>
                              <span className="font-mono text-xs font-bold text-[#38bdf8]">#{ord.id}</span>
                              <span className="text-xs text-[#a0a8ba] ml-2">({new Date(ord.createdAt).toLocaleDateString('bn-BD')})</span>
                            </div>

                            {/* Status Selector */}
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-[#8e95a7]">অবস্থা:</span>
                              <select
                                value={ord.status}
                                onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                                className="px-2 py-1 bg-[#121c38] border border-[#1e2f57] text-[11px] text-[#f1f5f9] rounded outline-none"
                              >
                                <option value="নতুন (New)">নতুন (New)</option>
                                <option value="কাজ চলছে (In Progress)">কাজ চলছে (In Progress)</option>
                                <option value="সম্পন্ন (Completed)">সম্পন্ন (Completed)</option>
                                <option value="বাতিল (Cancelled)">বাতিল (Cancelled)</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div>
                              <div className="text-[11px] text-[#7b8394] uppercase">ক্লায়েন্টের নাম:</div>
                              <div className="font-bold text-[#f1f5f9]">{ord.clientName}</div>
                            </div>
                            <div>
                              <div className="text-[11px] text-[#7b8394] uppercase">যোগাযোগ ({ord.contactMethod}):</div>
                              <div className="font-mono text-[#38bdf8]">{ord.contactValue}</div>
                            </div>
                            <div>
                              <div className="text-[11px] text-[#7b8394] uppercase">সার্ভিস ও তারিখ:</div>
                              <div className="text-[#f1f5f9]">{ord.selectedService} ({ord.preferredDeliveryDate})</div>
                            </div>
                          </div>

                          <div className="p-2.5 rounded bg-[#080d1a] border border-[#1e2f57] text-xs text-[#cbd5e1] whitespace-pre-wrap">
                            {ord.projectDetails}
                          </div>

                          {/* Reference files */}
                          {ord.referenceFiles && ord.referenceFiles.length > 0 && (
                            <div className="flex items-center gap-2 pt-1">
                              <span className="text-[11px] text-[#7b8394]">রেফারেন্স ছবি:</span>
                              {ord.referenceFiles.map((file, i) => (
                                <img key={i} src={file} alt="Ref" className="w-10 h-10 object-cover rounded border border-[#243764]" />
                              ))}
                            </div>
                          )}

                          {/* Reply on WhatsApp CTA */}
                          <div className="pt-2 flex items-center justify-between">
                            <a
                              href={`https://wa.me/${ord.contactValue.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `আসসালামু আলাইকুম ${ord.clientName}, Design Mahal থেকে যোগাযোগ করছি আপনার #${ord.id} নম্বর গ্রাফিক ডিজাইন অর্ডারের ব্যাপারে।`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#080d1a] bg-[#25D366] hover:bg-[#20ba5a] rounded-md transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>ক্লায়েন্টকে WhatsApp-এ রিপ্লাই দিন</span>
                            </a>

                            <button
                              onClick={() => {
                                if (confirm('অর্ডারটি মুছে ফেলতে চান?')) deleteOrder(ord.id);
                              }}
                              className="text-xs text-[#7d8597] hover:text-red-400"
                            >
                              অর্ডার মুছুন
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-2xl">
                  {settingsNotice && (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{settingsNotice}</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                          স্টুডিও / ব্র্যান্ড নাম
                        </label>
                        <input
                          type="text"
                          value={siteSettingsForm.brandName}
                          onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, brandName: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                          ট্যাগলাইন (Hero Title)
                        </label>
                        <input
                          type="text"
                          value={siteSettingsForm.brandTagline}
                          onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, brandTagline: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none"
                        />
                      </div>
                    </div>

                    {/* Official Brand Logo URL */}
                    <div>
                      <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                        ডিজাইন মহলের অফিশিয়াল লোগো লিঙ্ক (Logo Image URL)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={siteSettingsForm.logoUrl || ''}
                          placeholder="https://res.cloudinary.com/..."
                          onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, logoUrl: e.target.value })}
                          className="flex-1 px-3 py-2 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none font-mono"
                        />
                        {siteSettingsForm.logoUrl && (
                          <div className="w-10 h-10 p-1 rounded-lg bg-[#080d1a] border border-[#1b2a4e] flex items-center justify-center shrink-0">
                            <img
                              src={siteSettingsForm.logoUrl}
                              alt="Logo Preview"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-[#64748b] mt-1">
                        এটি ওয়েবসাইটের নেভবার, ফুটার, মেটা ট্যাগ এবং অ্যাডমিন হেডারে প্রদর্শিত হবে।
                      </p>
                    </div>

                    {/* Designer Profile Info & Photo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                          ডিজাইনারের নাম
                        </label>
                        <input
                          type="text"
                          value={siteSettingsForm.designerName || ''}
                          onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, designerName: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                          পদবি / উপাধি
                        </label>
                        <input
                          type="text"
                          value={siteSettingsForm.designerTitle || ''}
                          onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, designerTitle: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                        ডিজাইনারের গোল প্রোফাইল ছবি (Photo URL)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={siteSettingsForm.designerPhotoUrl || ''}
                          placeholder="https://res.cloudinary.com/..."
                          onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, designerPhotoUrl: e.target.value })}
                          className="flex-1 px-3 py-2 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none font-mono"
                        />
                        {siteSettingsForm.designerPhotoUrl && (
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#38bdf8]/40 shrink-0">
                            <img
                              src={siteSettingsForm.designerPhotoUrl}
                              alt="Profile Preview"
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                          হোয়াটসঅ্যাপ নম্বর (যেমন: 8801629947628 বা +8801629947628)
                        </label>
                        <input
                          type="text"
                          value={siteSettingsForm.whatsappNumber}
                          placeholder="8801629947628"
                          onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, whatsappNumber: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                          ডিসপ্লে ফোন নম্বর (যেমন: +880 1629-947628)
                        </label>
                        <input
                          type="text"
                          value={siteSettingsForm.displayPhone}
                          placeholder="+880 1629-947628"
                          onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, displayPhone: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                          অফিসিয়াল ইমেইল
                        </label>
                        <input
                          type="email"
                          value={siteSettingsForm.email}
                          onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, email: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                          লোকেশন / শহর
                        </label>
                        <input
                          type="text"
                          value={siteSettingsForm.location}
                          onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, location: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none"
                        />
                      </div>
                    </div>

                    {/* Social links */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#8e95a7] uppercase mb-1">Facebook URL</label>
                        <input
                          type="text"
                          value={siteSettingsForm.facebookUrl}
                          onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, facebookUrl: e.target.value })}
                          className="w-full px-3 py-1.5 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#8e95a7] uppercase mb-1">Instagram URL</label>
                        <input
                          type="text"
                          value={siteSettingsForm.instagramUrl}
                          onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, instagramUrl: e.target.value })}
                          className="w-full px-3 py-1.5 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#8e95a7] uppercase mb-1">ইন্টারনেট / Behance URL</label>
                        <input
                          type="text"
                          value={siteSettingsForm.behanceUrl}
                          onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, behanceUrl: e.target.value })}
                          className="w-full px-3 py-1.5 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded"
                        />
                      </div>
                    </div>

                    {/* Subhead */}
                    <div>
                      <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1">
                        সাব-হেডলাইন (Subhead)
                      </label>
                      <textarea
                        rows={2}
                        value={siteSettingsForm.brandSubhead}
                        onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, brandSubhead: e.target.value })}
                        className="w-full p-2.5 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none"
                      />
                    </div>

                    {/* Change Admin Password */}
                    <div className="p-4 rounded-xl bg-[#0e162c] border border-[#1b2a4e] space-y-2">
                      <label className="block text-xs font-bold text-[#38bdf8] flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5" />
                        নতুন অ্যাডমিন পাসওয়ার্ড নির্ধারণ (ঐচ্ছিক)
                      </label>
                      <input
                        type="password"
                        placeholder="পাসওয়ার্ড পরিবর্তন করতে চাইলে এখানে নতুন পাসওয়ার্ড লিখুন..."
                        value={newAdminPass}
                        onChange={(e) => setNewAdminPass(e.target.value)}
                        className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] rounded-lg cursor-pointer shadow-md"
                    >
                      সেটিংস সংরক্ষণ করুন
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 5: BACKUP / RESTORE */}
              {activeTab === 'backup' && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h4 className="text-sm font-bold text-[#f1f5f9]">ডেটা ব্যাকআপ ও রিস্টোর (JSON)</h4>
                    <p className="text-xs text-[#8e95a7] mt-1">
                      কোনো সার্ভার ডেটাবেসের ঝামেলা ছাড়াই আপনার পুরো পোর্টফোলিওর ডিজাইন, সার্ভিস, সেটিংস ও অর্ডার ফাইল আকারে ডাউনলোড বা আপলোড করুন।
                    </p>
                  </div>

                  {backupNotice && (
                    <div className="p-3 bg-[#111c38] border border-[#38bdf8]/40 text-[#38bdf8] text-xs rounded-lg">
                      {backupNotice}
                    </div>
                  )}

                  {/* Export */}
                  <div className="p-5 rounded-xl bg-[#0e162c] border border-[#1b2a4e] space-y-3">
                    <h5 className="text-xs font-bold text-[#f1f5f9] uppercase">ব্যাকআপ ফাইল ডাউনলোড করুন</h5>
                    <p className="text-xs text-[#8d94a6]">
                      একটি ক্লিকে সকল ডিজাইন ও অর্ডারের পূর্ণাঙ্গ ব্যাকআপ .json ফাইল আপনার কম্পিউটারে সেভ করুন।
                    </p>
                    <button
                      onClick={handleDownloadBackup}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-lg cursor-pointer transition-colors shadow-md"
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>ব্যাকআপ ডাউনলোড করুন (Export JSON)</span>
                    </button>
                  </div>

                  {/* Import */}
                  <div className="p-5 rounded-xl bg-[#0e162c] border border-[#1b2a4e] space-y-3">
                    <h5 className="text-xs font-bold text-[#f1f5f9] uppercase">ব্যাকআপ রিস্টোর করুন</h5>
                    <textarea
                      rows={4}
                      placeholder="আপনার পূর্বে ডাউনলোড করা ব্যাকআপ ফাইলের JSON কোড এখানে পেস্ট করুন..."
                      value={importJsonText}
                      onChange={(e) => setImportJsonText(e.target.value)}
                      className="w-full p-2.5 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] font-mono rounded outline-none"
                    />
                    <button
                      onClick={handleImportBackup}
                      className="px-4 py-2 text-xs font-bold text-[#f1f5f9] bg-[#121c38] hover:bg-[#1a2850] border border-[#1e2f57] rounded-lg cursor-pointer transition-colors"
                    >
                      ডেটা রিস্টোর করুন (Import Data)
                    </button>
                  </div>

                  {/* Reset defaults */}
                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-red-300">ডিফল্ট অবস্থায় ফিরিয়ে নিন</h5>
                      <p className="text-[11px] text-red-200/70">সকল তথ্য রিসেট করে প্রাথমিক ডেমো অবস্থায় ফিরিয়ে নেবে।</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('আপনি কি নিশ্চিত যে সকল কাস্টম তথ্য মুছে প্রাথমিক ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?')) {
                          resetAllToDefault();
                          alert('রিসেট সম্পন্ন হয়েছে!');
                        }
                      }}
                      className="px-3 py-1.5 text-xs text-red-300 hover:text-white bg-red-950/60 border border-red-500/40 rounded-lg cursor-pointer"
                    >
                      রিসেট করুন
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
