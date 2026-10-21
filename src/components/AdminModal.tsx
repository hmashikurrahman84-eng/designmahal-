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
  Mail,
  User,
  Eye,
  EyeOff,
  KeyRound,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  UserPlus,
  LogIn,
  ExternalLink,
  Sparkles,
  Star,
  Check,
  ChevronRight,
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
    reviews,
    deleteReview,
    settings,
    updateSettings,
    exportDatabaseJSON,
    importDatabaseJSON,
    resetAllToDefault,
    setIsGuideModalOpen,
    isAdminAuthenticated,
    currentAdminUser,
    adminUsers,
    loginWithGmail,
    signUpWithGmail,
    googleOneClickLogin,
    resetAdminPasswordWithPin,
    updateAdminProfile,
    adminLogin,
    adminLogout,
    failedLoginAttempts,
    lockoutUntil,
  } = usePortfolio();

  // Authentication mode & input state (Gmail is kept confidential and not pre-exposed)
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Sign up state
  const [signUpName, setSignUpName] = useState(settings.designerName || 'H.M. Ashikur Rahman');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirm, setSignUpConfirm] = useState('');
  const [signUpPin, setSignUpPin] = useState(settings.adminPin || '788553');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  // Forgot password state
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryPin, setRecoveryPin] = useState('');
  const [recoveryNewPass, setRecoveryNewPass] = useState('');
  const [recoveryConfirm, setRecoveryConfirm] = useState('');
  const [showRecoveryPassword, setShowRecoveryPassword] = useState(false);
  const [showWhitelistEmails, setShowWhitelistEmails] = useState(false);
  const [showSettingsEmail, setShowSettingsEmail] = useState(false);

  // Auth feedback & loading
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'designs' | 'services' | 'orders' | 'reviews' | 'settings' | 'backup'>('designs');

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

  // Handle Gmail & Password Login
  const handleGmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setIsAuthLoading(true);

    setTimeout(() => {
      const res = loginWithGmail(loginEmail, loginPassword, rememberMe);
      setIsAuthLoading(false);
      if (res.success) {
        setAuthSuccess(res.message || 'সফলভাবে প্রবেশ করেছেন!');
        setLoginPassword('');
      } else {
        setAuthError(res.error || 'লগইন ব্যর্থ হয়েছে।');
      }
    }, 200);
  };

  // Handle Gmail Sign Up
  const handleGmailSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (signUpPassword !== signUpConfirm) {
      setAuthError('উভয় ঘরে পাসওয়ার্ড একই হতে হবে!');
      return;
    }

    setIsAuthLoading(true);
    setTimeout(() => {
      const res = signUpWithGmail(signUpName, signUpEmail, signUpPassword, signUpPin);
      setIsAuthLoading(false);
      if (res.success) {
        setAuthSuccess(res.message || 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!');
        setSignUpPassword('');
        setSignUpConfirm('');
      } else {
        setAuthError(res.error || 'সাইনআপ ব্যর্থ হয়েছে।');
      }
    }, 250);
  };

  // Handle Google / Gmail One-Click Quick Login
  const handleGoogleQuickLogin = () => {
    setAuthError(null);
    setAuthSuccess(null);
    setIsAuthLoading(true);

    setTimeout(() => {
      const res = googleOneClickLogin(settings.email || 'hmashikurrahman84@gmail.com');
      setIsAuthLoading(false);
      if (res.success) {
        setAuthSuccess(res.message || 'Google অথেনটিকেশন সফল!');
      } else {
        setAuthError(res.error || 'Google অথেনটিকেশন ব্যর্থ হয়েছে।');
      }
    }, 300);
  };

  // Handle Password Recovery with 6-Digit PIN
  const handlePasswordRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (recoveryNewPass !== recoveryConfirm) {
      setAuthError('নতুন পাসওয়ার্ড নিশ্চিতকরণের সাথে মিলছে না!');
      return;
    }

    setIsAuthLoading(true);
    setTimeout(() => {
      const res = resetAdminPasswordWithPin(recoveryEmail, recoveryPin, recoveryNewPass);
      setIsAuthLoading(false);
      if (res.success) {
        setAuthSuccess(res.message || 'পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!');
        setRecoveryPin('');
        setRecoveryNewPass('');
        setRecoveryConfirm('');
        setTimeout(() => setAuthMode('login'), 1200);
      } else {
        setAuthError(res.error || 'পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে।');
      }
    }, 250);
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
        <div className="px-4 sm:px-6 py-3.5 bg-[#0e162c] border-b border-[#162344] flex flex-wrap items-center justify-between gap-3">
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
              <div className="flex items-center gap-2">
                <h3 className="font-sans text-sm sm:text-base font-bold text-[#f1f5f9]">
                  Design Mahal — অ্যাডমিন কন্ট্রোল প্যানেল
                </h3>
                {isAdminAuthenticated && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                    <ShieldCheck className="w-3 h-3" />
                    <span>সক্রিয় ও সুরক্ষিত</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#94a3b8]">
                {isAdminAuthenticated && currentAdminUser
                  ? `অ্যাডমিন স্ট্যাটাস: ${currentAdminUser.name || 'H.M. Ashikur Rahman'} (${currentAdminUser.role === 'super_admin' ? 'প্রধান কন্ট্রোল সক্রিয়' : 'ম্যানেজার'})`
                  : 'ডিজাইন আপলোড, সার্ভিস সম্পাদনা, অর্ডার ইনবক্স ও সাইট সেটিংস'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && currentAdminUser && (
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#080d1a] border border-[#1e2f57]">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-[#38bdf8]/40 bg-[#162344] shrink-0">
                  <img
                    src={currentAdminUser.avatarUrl || settings.designerPhotoUrl || 'https://res.cloudinary.com/fht84r3o/image/upload/v1792481081/%E0%A7%A7%E0%A7%A7.jpg'}
                    alt="Admin"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="text-left text-[11px]">
                  <p className="font-semibold text-[#f1f5f9] leading-none">{currentAdminUser.name || 'অ্যাডমিন'}</p>
                  <p className="text-[10px] text-emerald-400 leading-none mt-0.5 font-semibold">ভেরিফাইড ও সুরক্ষিত</p>
                </div>
              </div>
            )}

            {isAdminAuthenticated && (
              <button
                onClick={() => adminLogout()}
                className="px-2.5 py-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-950/70 rounded-md border border-rose-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="অ্যাডমিন প্যানেল থেকে লগআউট"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">লগআউট</span>
              </button>
            )}
            <button
              onClick={() => {
                setIsAdminModalOpen(false);
                setIsGuideModalOpen(true);
              }}
              className="px-2.5 py-1.5 text-xs font-semibold text-[#38bdf8] bg-[#121c38] hover:bg-[#1a2850] rounded-md border border-[#38bdf8]/30 flex items-center gap-1.5 cursor-pointer"
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

        {/* If NOT Authenticated, show Gmail Authentication & Signup Suite */}
        {!isAdminAuthenticated ? (
          <div className="flex-1 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-[#070c18]">
            <div className="w-full max-w-md p-6 sm:p-8 bg-[#0e162c] border border-[#1b2a4e] rounded-2xl shadow-2xl space-y-5">
              
              {/* Logo & Header */}
              <div className="text-center space-y-2">
                <div className="icon-underlight-glow inline-block mx-auto">
                  <div className="logo-light-orbit w-14 h-14 shrink-0">
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
                  <h4 className="font-sans text-xl font-bold text-[#f1f5f9]">অ্যাডমিন অ্যাক্সেস পোর্টাল</h4>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    শুধুমাত্র অনুমোদিত জিমেল দিয়ে লগইন বা সাইনআপ করে প্রবেশ করুন
                  </p>
                </div>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="grid grid-cols-3 p-1 bg-[#080d1a] border border-[#1e2f57] rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError(null);
                    setAuthSuccess(null);
                  }}
                  className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMode === 'login'
                      ? 'bg-[#2563eb] text-white shadow-md'
                      : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>লগইন</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthError(null);
                    setAuthSuccess(null);
                  }}
                  className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMode === 'signup'
                      ? 'bg-[#2563eb] text-white shadow-md'
                      : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>সাইনআপ</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('forgot');
                    setAuthError(null);
                    setAuthSuccess(null);
                  }}
                  className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMode === 'forgot'
                      ? 'bg-[#2563eb] text-white shadow-md'
                      : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>রিকভারি</span>
                </button>
              </div>

              {/* Feedback messages */}
              {authError && (
                <div className="p-3 text-xs bg-red-950/50 border border-red-500/40 text-red-200 rounded-xl flex items-start gap-2 animate-shake">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1 leading-relaxed">{authError}</div>
                </div>
              )}

              {authSuccess && (
                <div className="p-3 text-xs bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 rounded-xl flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="flex-1 leading-relaxed">{authSuccess}</div>
                </div>
              )}

              {/* Google One-Click Direct Sign In */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleGoogleQuickLogin}
                  disabled={isAuthLoading}
                  className="w-full py-2.5 px-3 bg-[#080d1a] hover:bg-[#121c38] border border-[#1e2f57] hover:border-[#38bdf8]/50 text-xs font-semibold text-[#f1f5f9] rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer group"
                >
                  {/* Google Icon SVG */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Google একাউন্ট দিয়ে এক ক্লিকে প্রবেশ</span>
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-[#1e2f57]"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-[#64748b] uppercase tracking-wider">
                    অথবা জিমেল দিয়ে {authMode === 'login' ? 'লগইন' : authMode === 'signup' ? 'সাইনআপ' : 'রিকভারি'}
                  </span>
                  <div className="flex-grow border-t border-[#1e2f57]"></div>
                </div>
              </div>

              {/* TAB 1: LOGIN FORM */}
              {authMode === 'login' && (
                <form onSubmit={handleGmailLogin} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                      জিমেল এড্রেস (Gmail Address)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="আপনার জিমেল এড্রেস দিন..."
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        className="w-full pl-9 pr-3.5 py-2.5 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-[#cbd5e1]">
                        পাসওয়ার্ড (Password)
                      </label>
                      <button
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-[10px] text-[#38bdf8] hover:underline cursor-pointer"
                      >
                        পাসওয়ার্ড মনে নেই?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        placeholder="অ্যাডমিন পাসওয়ার্ড লিখুন..."
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        className="w-full pl-9 pr-9 py-2.5 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-xl outline-none tracking-wider"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#cbd5e1] cursor-pointer"
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#94a3b8]">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-[#1e2f57] text-[#2563eb] focus:ring-0"
                      />
                      <span>এই ডিভাইসে সেশন মনে রাখুন</span>
                    </label>
                    <span className="text-[10px] text-emerald-400/80 font-mono">256-bit AES</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#3b82f6] hover:opacity-95 rounded-xl cursor-pointer transition-all shadow-lg shadow-[#2563eb]/25 flex items-center justify-center gap-2"
                  >
                    {isAuthLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>যাচাই করা হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>অ্যাডমিন প্যানেলে প্রবেশ করুন</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* TAB 2: SIGN UP FORM */}
              {authMode === 'signup' && (
                <form onSubmit={handleGmailSignUp} className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-[#111c38]/60 border border-[#1e2f57] text-[11px] text-[#94a3b8] flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#38bdf8] shrink-0" />
                    <span>
                      নিরাপত্তা শিল্ড: শুধুমাত্র সাইট ওনারের অনুমোদিত জিমেল দিয়ে অ্যাকাউন্ট সক্রিয় করা যাবে। অননুমোদিত যে কারো জন্য অ্যাক্সেস সম্পূর্ণ সুরক্ষিত ও ব্লক থাকবে।
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                      আপনার পূর্ণ নাম (Full Name)
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="যেমন: H.M. Ashikur Rahman"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        required
                        className="w-full pl-9 pr-3.5 py-2 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                      জিমেল এড্রেস (Gmail Address)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="আপনার জিমেল এড্রেস লিখুন..."
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        required
                        className="w-full pl-9 pr-3.5 py-2 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-xl outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                        নতুন পাসওয়ার্ড
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showSignUpPassword ? 'text' : 'password'}
                          placeholder="কমপক্ষে ৬ অক্ষর..."
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          required
                          className="w-full pl-9 pr-8 py-2 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-xl outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#cbd5e1] cursor-pointer"
                        >
                          {showSignUpPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                        পাসওয়ার্ড নিশ্চিত করুন
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showSignUpPassword ? 'text' : 'password'}
                          placeholder="পুনরায় লিখুন..."
                          value={signUpConfirm}
                          onChange={(e) => setSignUpConfirm(e.target.value)}
                          required
                          className="w-full pl-9 pr-3.5 py-2 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-xl outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-[#cbd5e1]">
                        সিকিউরিটি রিকভারি পিন (Security Recovery PIN)
                      </label>
                      <span className="text-[10px] text-[#94a3b8]">পাসওয়ার্ড ভুলে গেলে প্রয়োজন হবে</span>
                    </div>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        maxLength={8}
                        placeholder="যেমন: 788553 (৪-৬ ডিজিটের পিন)"
                        value={signUpPin}
                        onChange={(e) => setSignUpPin(e.target.value)}
                        required
                        className="w-full pl-9 pr-3.5 py-2 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-xl outline-none font-mono tracking-widest"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:opacity-95 rounded-xl cursor-pointer transition-all shadow-lg shadow-[#2563eb]/25 flex items-center justify-center gap-2 mt-2"
                  >
                    {isAuthLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>একাউন্ট তৈরি হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>জিমেল দিয়ে অ্যাডমিন একাউন্ট সক্রিয় করুন</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* TAB 3: PASSWORD RECOVERY */}
              {authMode === 'forgot' && (
                <form onSubmit={handlePasswordRecovery} className="space-y-3.5">
                  <div className="p-2.5 rounded-xl bg-[#111c38]/60 border border-[#1e2f57] text-[11px] text-[#94a3b8] flex items-center gap-2">
                    <Key className="w-4 h-4 text-[#38bdf8] shrink-0" />
                    <span>
                      নিবন্ধিত জিমেল ও সাইনআপের সময় ব্যবহৃত সিকিউরিটি পিন দিয়ে নতুন পাসওয়ার্ড সেট করুন।
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                      নিবন্ধিত জিমেল এড্রেস
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="আপনার জিমেল এড্রেস..."
                        value={recoveryEmail}
                        onChange={(e) => setRecoveryEmail(e.target.value)}
                        required
                        className="w-full pl-9 pr-3.5 py-2.5 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                      সিকিউরিটি পিন (Master Security PIN)
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="আপনার ৪-৬ ডিজিটের পিন (ডিফল্ট: 788553)..."
                        value={recoveryPin}
                        onChange={(e) => setRecoveryPin(e.target.value)}
                        required
                        className="w-full pl-9 pr-3.5 py-2.5 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-xl outline-none font-mono tracking-widest"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                        নতুন পাসওয়ার্ড
                      </label>
                      <input
                        type="password"
                        placeholder="কমপক্ষে ৬ অক্ষর..."
                        value={recoveryNewPass}
                        onChange={(e) => setRecoveryNewPass(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-xl outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                        পাসওয়ার্ড নিশ্চিত করুন
                      </label>
                      <input
                        type="password"
                        placeholder="পুনরায় লিখুন..."
                        value={recoveryConfirm}
                        onChange={(e) => setRecoveryConfirm(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 rounded-xl cursor-pointer transition-all shadow-md flex items-center justify-center gap-2 mt-2"
                  >
                    {isAuthLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>আপডেট হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>পাসওয়ার্ড রিসেট ও লগইন করুন</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Security Shield Guarantee Note */}
              <div className="p-3 rounded-xl bg-[#080d1a] border border-[#1b2a4e] text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#cbd5e1]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>মালিকানাধীন সর্বোচ্চ নিরাপত্তা সুরক্ষাবলয়</span>
                </div>
                <p className="text-[10px] text-[#64748b] leading-relaxed">
                  যাকেই পোর্টফোলিওর লিঙ্ক দেওয়া হোক, আপনার অনুমোদিত জিমেল ও পাসওয়ার্ড ছাড়া কেউ কোনো ডিজাইন যোগ, ডিলিট বা এডিট করতে পারবে না।
                </p>
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
                onClick={() => setActiveTab('reviews')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'bg-[#2563eb] text-white shadow-md shadow-[#2563eb]/25'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#121c38]'
                }`}
              >
                <Star className="w-4 h-4" />
                <span>ক্লায়েন্ট রিভিউ ({reviews.length})</span>
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
                  <div className="flex items-center justify-between border-b border-[#1b2a4e] pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-[#f1f5f9]">ক্লায়েন্টদের অর্ডার ইনবক্স</h4>
                      <p className="text-xs text-[#8e95a7] mt-0.5">
                        ওয়েবসাইট থেকে ক্লায়েন্টদের পাঠানো রিকোয়েস্ট ও অর্ডার তালিকা
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#1d4ed8]/30 text-[#38bdf8] border border-[#38bdf8]/30">
                      মোট অর্ডার: {orders.length}
                    </span>
                  </div>

                  {orders.length === 0 ? (
                    <div className="p-8 text-center bg-[#080d1a] border border-[#1e2f57] rounded-xl text-xs text-[#8e95a7]">
                      এখনো কোনো অর্ডার জমা হয়নি।
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((ord) => (
                        <div
                          key={ord.id}
                          className="p-4 rounded-xl bg-[#080d1a] border border-[#1e2f57] space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#162344] pb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#38bdf8]">
                                #{ord.id}
                              </span>
                              <span className="text-[11px] text-[#64748b]">
                                {new Date(ord.createdAt).toLocaleString('bn-BD')}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={ord.status}
                                onChange={(e) =>
                                  updateOrderStatus(ord.id, e.target.value as any)
                                }
                                className={`text-xs px-2.5 py-1 rounded-md font-semibold border outline-none cursor-pointer ${
                                  ord.status === 'নতুন (New)'
                                    ? 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                                    : ord.status === 'কাজ চলছে (In Progress)'
                                    ? 'bg-blue-950/40 text-blue-300 border-blue-500/40'
                                    : ord.status === 'সম্পন্ন (Completed)'
                                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                                    : 'bg-red-950/40 text-red-300 border-red-500/40'
                                }`}
                              >
                                <option value="নতুন (New)">নতুন (New)</option>
                                <option value="কাজ চলছে (In Progress)">কাজ চলছে (In Progress)</option>
                                <option value="সম্পন্ন (Completed)">সম্পন্ন (Completed)</option>
                                <option value="বাতিল (Cancelled)">বাতিল (Cancelled)</option>
                              </select>

                              <button
                                onClick={() => {
                                  if (confirm('আপনি কি এই অর্ডারটি মুছে ফেলতে চান?')) {
                                    deleteOrder(ord.id);
                                  }
                                }}
                                className="p-1 text-[#64748b] hover:text-red-400 rounded transition-colors cursor-pointer"
                                title="অর্ডার মুছুন"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-[#64748b]">ক্লায়েন্টের নাম: </span>
                              <span className="font-bold text-[#f1f5f9]">{ord.clientName}</span>
                            </div>
                            <div>
                              <span className="text-[#64748b]">যোগাযোগ ({ord.contactMethod}): </span>
                              <span className="font-bold text-[#38bdf8]">{ord.contactValue}</span>
                            </div>
                            <div>
                              <span className="text-[#64748b]">সার্ভিস: </span>
                              <span className="text-[#cbd5e1]">{ord.selectedService}</span>
                            </div>
                            <div>
                              <span className="text-[#64748b]">ডেলিভারি সময়: </span>
                              <span className="text-amber-400">{ord.preferredDeliveryDate}</span>
                            </div>
                          </div>

                          {ord.projectDetails && (
                            <div className="p-2.5 rounded bg-[#050812] border border-[#141f3d] text-xs text-[#cbd5e1] leading-relaxed">
                              <span className="text-[#64748b] block mb-1 font-semibold">কাজের বিবরণ:</span>
                              {ord.projectDetails}
                            </div>
                          )}

                          {ord.contactValue && (
                            <div className="flex items-center gap-2 pt-1">
                              <a
                                href={`https://wa.me/${ord.contactValue.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#080d1a] bg-[#25D366] hover:bg-[#20ba5a] rounded-md transition-colors cursor-pointer"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WhatsApp-এ চ্যাট করুন</span>
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: REVIEWS MANAGER */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1b2a4e] pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-[#f1f5f9]">ক্লায়েন্ট রিভিউ ও ফিডব্যাক</h4>
                      <p className="text-xs text-[#8e95a7] mt-0.5">
                        ওয়েবসাইট থেকে ক্লায়েন্টদের দেওয়া রিভিউ ও রেটিং ব্যবস্থাপনা
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#1d4ed8]/30 text-[#38bdf8] border border-[#38bdf8]/30">
                      মোট রিভিউ: {reviews.length}
                    </span>
                  </div>

                  {reviews.length === 0 ? (
                    <div className="p-8 text-center bg-[#080d1a] border border-[#1e2f57] rounded-xl text-xs text-[#8e95a7]">
                      এখনো কোনো রিভিউ জমা হয়নি।
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="p-4 rounded-xl bg-[#080d1a] border border-[#1e2f57] space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#162344] pb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-white">{rev.clientName}</span>
                              {rev.companyOrRole && (
                                <span className="text-xs text-[#64748b]">({rev.companyOrRole})</span>
                              )}
                              <span className="text-[11px] text-[#38bdf8] bg-[#121c38] px-2 py-0.5 rounded border border-[#1e2f57]">
                                {rev.serviceName}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star
                                    key={s}
                                    className={`w-3.5 h-3.5 ${
                                      s <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-[#334155]'
                                    }`}
                                  />
                                ))}
                              </div>
                              <button
                                onClick={() => {
                                  if (confirm('আপনি কি এই রিভিউটি মুছে ফেলতে চান?')) {
                                    deleteReview(rev.id);
                                  }
                                }}
                                className="p-1 text-[#64748b] hover:text-red-400 rounded transition-colors cursor-pointer"
                                title="রিভিউ মুছুন"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <p className="text-xs text-[#cbd5e1] leading-relaxed italic">
                            "{rev.comment}"
                          </p>

                          <div className="text-[10px] text-[#64748b] flex items-center justify-between">
                            <span>তারিখ: {new Date(rev.createdAt).toLocaleDateString('bn-BD')}</span>
                            <span className="text-emerald-400">✓ ওয়েবসাইটে দৃশ্যমান</span>
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
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider">
                            অফিসিয়াল ইমেইল
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowSettingsEmail(!showSettingsEmail)}
                            className="text-[10px] text-[#38bdf8] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            {showSettingsEmail ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            <span>{showSettingsEmail ? 'লুকান' : 'দেখুন'}</span>
                          </button>
                        </div>
                        <input
                          type={showSettingsEmail ? 'email' : 'password'}
                          value={siteSettingsForm.email}
                          onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, email: e.target.value })}
                          className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2f57] text-xs text-[#f1f5f9] rounded outline-none font-mono"
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

                    {/* Advanced Admin Security & Gmail Account Management */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#080d1a] border border-[#1e2f57] space-y-4">
                      <div className="flex items-center justify-between border-b border-[#1b2a4e] pb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-[#2563eb]/20 text-[#38bdf8] border border-[#2563eb]/30">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-[#f1f5f9]">অ্যাডমিন সিকিউরিটি ও জিমেল একাউন্ট সেটিংস</h5>
                            <p className="text-[10px] text-[#94a3b8]">আপনার জিমেল, পাসওয়ার্ড ও একাউন্ট নিয়ন্ত্রণ করুন</p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                          সুরক্ষিত
                        </span>
                      </div>

                      {/* Current Account Card */}
                      {currentAdminUser && (
                        <div className="p-3 rounded-xl bg-[#0e162c] border border-[#162344] flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#38bdf8]/40 bg-[#080d1a] shrink-0">
                              <img
                                src={currentAdminUser.avatarUrl || settings.designerPhotoUrl || 'https://res.cloudinary.com/fht84r3o/image/upload/v1792481081/%E0%A7%A7%E0%A7%A7.jpg'}
                                alt="Admin Profile"
                                className="w-full h-full object-cover object-top"
                              />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#f1f5f9] flex items-center gap-1.5">
                                <span>{currentAdminUser.name}</span>
                                <span className="text-[10px] text-[#38bdf8] font-semibold px-1.5 py-0.2 bg-[#121c38] rounded border border-[#38bdf8]/30">
                                  {currentAdminUser.role === 'super_admin' ? 'সুপার অ্যাডমিন' : 'ম্যানেজার'}
                                </span>
                              </p>
                              <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5 mt-0.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>অ্যাডমিন জিমেল: এনক্রিপ্টেড ও সম্পূর্ণ গোপনীয়</span>
                              </p>
                            </div>
                          </div>
                          <div className="text-right text-[10px] text-[#64748b]">
                            <p>তৈরি: {new Date(currentAdminUser.createdAt).toLocaleDateString('bn-BD')}</p>
                            <p className="text-emerald-400 font-medium">সেশন সক্রিয়</p>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1 flex items-center gap-1">
                            <Key className="w-3 h-3 text-[#38bdf8]" />
                            <span>নতুন অ্যাডমিন পাসওয়ার্ড (ঐচ্ছিক)</span>
                          </label>
                          <input
                            type="password"
                            placeholder="পরিবর্তন না করতে চাইলে খালি রাখুন..."
                            value={newAdminPass}
                            onChange={(e) => setNewAdminPass(e.target.value)}
                            className="w-full px-3 py-2 bg-[#0e162c] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-xl outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1 flex items-center gap-1">
                            <KeyRound className="w-3 h-3 text-[#38bdf8]" />
                            <span>সিকিউরিটি রিকভারি পিন</span>
                          </label>
                          <input
                            type="text"
                            placeholder="যেমন: 788553"
                            value={siteSettingsForm.adminPin || ''}
                            onChange={(e) => setSiteSettingsForm({ ...siteSettingsForm, adminPin: e.target.value })}
                            className="w-full px-3 py-2 bg-[#0e162c] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-xl outline-none font-mono tracking-widest"
                          />
                        </div>
                      </div>

                      {/* Authorized Email Whitelist (Protected with toggle) */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-semibold text-[#cbd5e1] flex items-center gap-1">
                            <Mail className="w-3 h-3 text-[#38bdf8]" />
                            <span>অনুমোদিত অ্যাডমিন জিমেল তালিকা</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowWhitelistEmails(!showWhitelistEmails)}
                            className="text-[10px] text-[#38bdf8] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            {showWhitelistEmails ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            <span>{showWhitelistEmails ? 'লুকান' : 'দেখুন / পরিবর্তন করুন'}</span>
                          </button>
                        </div>
                        <input
                          type={showWhitelistEmails ? 'text' : 'password'}
                          placeholder="অনুমোদিত জিমেলসমূহ এনক্রিপ্ট রাখা আছে..."
                          value={(siteSettingsForm.authorizedAdminEmails || []).join(', ')}
                          onChange={(e) => {
                            const arr = e.target.value.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
                            setSiteSettingsForm({ ...siteSettingsForm, authorizedAdminEmails: arr });
                          }}
                          className="w-full px-3 py-2 bg-[#0e162c] border border-[#1e2f57] focus:border-[#38bdf8] text-xs text-[#f1f5f9] rounded-xl outline-none font-mono tracking-wider"
                        />
                        <p className="text-[10px] text-[#64748b] mt-1 leading-relaxed">
                          🛡️ শুধুমাত্র এই তালিকার জিমেলগুলোই সাইনআপ করে অ্যাডমিন হতে পারবে। প্যানেলের সুরক্ষার স্বার্থে জিমেল সম্পূর্ণ গোপন রাখা হয়েছে।
                        </p>
                      </div>
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
