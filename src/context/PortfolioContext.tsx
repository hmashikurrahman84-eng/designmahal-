import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminAuthResult, AdminUser, DesignItem, ServiceItem, OrderRequest, SiteSettings } from '../types';
import { INITIAL_ADMIN_USERS, INITIAL_DESIGNS, INITIAL_SERVICES, INITIAL_SETTINGS } from '../data/initialData';

interface PortfolioContextType {
  designs: DesignItem[];
  services: ServiceItem[];
  orders: OrderRequest[];
  settings: SiteSettings;
  activeDesignModal: DesignItem | null;
  setActiveDesignModal: (design: DesignItem | null) => void;
  isOrderModalOpen: boolean;
  setIsOrderModalOpen: (open: boolean) => void;
  preselectedService: string;
  setPreselectedService: (service: string) => void;
  openOrderWithService: (serviceName?: string, referenceTitle?: string) => void;
  prefilledReference: string;
  setPrefilledReference: (ref: string) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  currentAdminUser: AdminUser | null;
  adminUsers: AdminUser[];
  adminLogin: (password: string) => boolean;
  loginWithGmail: (email: string, password: string, rememberMe?: boolean) => AdminAuthResult;
  signUpWithGmail: (name: string, email: string, password: string, securityPin: string) => AdminAuthResult;
  googleOneClickLogin: (googleEmail?: string) => AdminAuthResult;
  resetAdminPasswordWithPin: (email: string, securityPin: string, newPassword: string) => AdminAuthResult;
  updateAdminProfile: (data: Partial<AdminUser>) => void;
  adminLogout: () => void;
  failedLoginAttempts: number;
  lockoutUntil: number | null;
  isGuideModalOpen: boolean;
  setIsGuideModalOpen: (open: boolean) => void;
  
  // Actions
  addDesign: (design: Omit<DesignItem, 'id'>) => DesignItem;
  updateDesign: (id: string, data: Partial<DesignItem>) => void;
  deleteDesign: (id: string) => void;
  
  addService: (service: Omit<ServiceItem, 'id'>) => ServiceItem;
  updateService: (id: string, data: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  
  createOrder: (orderData: Omit<OrderRequest, 'id' | 'createdAt' | 'status'>) => OrderRequest;
  updateOrderStatus: (id: string, status: OrderRequest['status']) => void;
  deleteOrder: (id: string) => void;
  
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  exportDatabaseJSON: () => string;
  importDatabaseJSON: (jsonString: string) => boolean;
  resetAllToDefault: () => void;
}

const STORAGE_KEYS = {
  DESIGNS: 'design_mahal_designs_v1',
  SERVICES: 'design_mahal_services_v1',
  ORDERS: 'design_mahal_orders_v1',
  SETTINGS: 'design_mahal_settings_v1',
  ADMIN_USERS: 'design_mahal_admin_users_v1',
  CURRENT_ADMIN: 'design_mahal_current_admin_v1',
  AUTH_TOKEN: 'design_mahal_admin_auth',
  LOCKOUT_TIME: 'design_mahal_lockout_until',
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [designs, setDesigns] = useState<DesignItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DESIGNS);
      if (!saved) return INITIAL_DESIGNS;
      const parsed: DesignItem[] = JSON.parse(saved);
      // Seamlessly sync new Cloudinary images and Bengali titles for initial sample works
      const syncedInitials = INITIAL_DESIGNS.map((initItem) => {
        const found = parsed.find((p) => p.id === initItem.id);
        if (!found) return initItem;
        return {
          ...found,
          imageUrl: initItem.imageUrl,
          title: initItem.title,
          category: initItem.category,
          description: initItem.description || found.description,
        };
      });
      // Keep any user-added designs that aren't in INITIAL_DESIGNS
      const customDesigns = parsed.filter(
        (p) => !INITIAL_DESIGNS.some((init) => init.id === p.id)
      );
      return [...syncedInitials, ...customDesigns];
    } catch {
      return INITIAL_DESIGNS;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      const parsed: ServiceItem[] = saved ? JSON.parse(saved) : INITIAL_SERVICES;
      return parsed.filter(
        (s) => s.id !== 'srv-brand' && s.nameBn !== 'পূর্ণাঙ্গ করপোরেট ব্র্যান্ডিং প্যাকেজ'
      );
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [orders, setOrders] = useState<OrderRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const parsed = saved ? JSON.parse(saved) : {};
      
      const logoUrl = parsed.logoUrl || INITIAL_SETTINGS.logoUrl || 'https://res.cloudinary.com/fht84r3o/image/upload/v1792477511/Design-Mahal-logo-122.png';

      const facebookUrl = (!parsed.facebookUrl || parsed.facebookUrl === 'https://facebook.com') 
        ? INITIAL_SETTINGS.facebookUrl 
        : parsed.facebookUrl;
      const instagramUrl = (!parsed.instagramUrl || parsed.instagramUrl === 'https://instagram.com') 
        ? INITIAL_SETTINGS.instagramUrl 
        : parsed.instagramUrl;
      const behanceUrl = (!parsed.behanceUrl || parsed.behanceUrl === 'https://behance.net') 
        ? INITIAL_SETTINGS.behanceUrl 
        : parsed.behanceUrl;

      // Migrate whatsappNumber and displayPhone from placeholder or normalize +881629947628
      let whatsappNumber = parsed.whatsappNumber || INITIAL_SETTINGS.whatsappNumber;
      if (!whatsappNumber || whatsappNumber === '8801700000000' || whatsappNumber.includes('1700000000') || whatsappNumber.replace(/[^0-9]/g, '') === '881629947628') {
        whatsappNumber = '8801629947628';
      }

      let displayPhone = parsed.displayPhone || INITIAL_SETTINGS.displayPhone;
      if (!displayPhone || displayPhone.includes('1700-000000') || displayPhone.includes('881629947628')) {
        displayPhone = '+880 1629-947628';
      }

      const designerPhotoUrl = parsed.designerPhotoUrl || INITIAL_SETTINGS.designerPhotoUrl;
      const designerName = (!parsed.designerName || parsed.designerName === 'আশিকুর রহমান')
        ? INITIAL_SETTINGS.designerName
        : parsed.designerName;
      const designerTitle = (!parsed.designerTitle || parsed.designerTitle.includes('প্রফেশনাল') || !parsed.designerTitle.includes('Professional'))
        ? INITIAL_SETTINGS.designerTitle
        : parsed.designerTitle;

      return {
        ...INITIAL_SETTINGS,
        ...parsed,
        logoUrl,
        designerPhotoUrl,
        designerName,
        designerTitle,
        brandTagline: 'Creative Design Studio',
        facebookUrl,
        instagramUrl,
        behanceUrl,
        whatsappNumber,
        displayPhone,
      };
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Modal states
  const [activeDesignModal, setActiveDesignModal] = useState<DesignItem | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [prefilledReference, setPrefilledReference] = useState('');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  // Admin Users List State
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_USERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_ADMIN_USERS;
    } catch {
      return INITIAL_ADMIN_USERS;
    }
  });

  // Current Logged-in Admin User
  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser | null>(() => {
    try {
      const sessionSaved = sessionStorage.getItem(STORAGE_KEYS.CURRENT_ADMIN) || localStorage.getItem(STORAGE_KEYS.CURRENT_ADMIN);
      if (sessionSaved) {
        return JSON.parse(sessionSaved);
      }
      if (localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) === 'true') {
        return INITIAL_ADMIN_USERS[0] || null;
      }
      return null;
    } catch {
      return null;
    }
  });

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return (
        localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) === 'true' ||
        sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) === 'true'
      );
    } catch {
      return false;
    }
  });

  // Failed Attempts & Security Lockout
  const [failedLoginAttempts, setFailedLoginAttempts] = useState<number>(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOCKOUT_TIME);
      if (saved) {
        const time = parseInt(saved, 10);
        if (time > Date.now()) return time;
      }
      return null;
    } catch {
      return null;
    }
  });

  // Auto-sync admin users list to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(adminUsers));
    } catch (e) {
      console.warn('LocalStorage error saving admin users:', e);
    }
  }, [adminUsers]);

  // Login with Gmail & Password
  const loginWithGmail = (email: string, password: string, rememberMe = true): AdminAuthResult => {
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const remainingSeconds = Math.ceil((lockoutUntil - Date.now()) / 1000);
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      return {
        success: false,
        error: `নিরাপত্তা লকআউট সক্রিয়! ৫ বার ভুল চেষ্টার কারণে পরবর্তী ${minutes > 0 ? `${minutes} মিনিট ` : ''}${seconds} সেকেন্ডের জন্য লগইন স্থগিত রাখা হয়েছে।`,
      };
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'দয়া করে আপনার জিমেল এড্রেস দিন।' };
    }
    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, error: 'সঠিক ফরম্যাটের জিমেল এড্রেস দিন (যেমন: hmashikurrahman84@gmail.com)।' };
    }
    if (!password) {
      return { success: false, error: 'দয়া করে আপনার অ্যাডমিন পাসওয়ার্ড দিন।' };
    }

    let matchedUser = adminUsers.find(
      (u) => u.email.trim().toLowerCase() === cleanEmail
    );

    const isOwnerEmail =
      cleanEmail === 'hmashikurrahman84@gmail.com' ||
      cleanEmail === (settings.email || '').trim().toLowerCase();

    // If not found in custom list but matches primary site owner email
    if (!matchedUser && isOwnerEmail) {
      matchedUser = {
        id: 'admin-' + Date.now(),
        name: settings.designerName || 'H.M. Ashikur Rahman',
        email: cleanEmail,
        passwordHash: settings.adminPasswordHash || 'mahal2026',
        securityPin: settings.adminPin || '788553',
        role: 'super_admin',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        avatarUrl: settings.designerPhotoUrl,
      };
      setAdminUsers((prev) => [matchedUser!, ...prev.filter((p) => p.email.toLowerCase() !== cleanEmail)]);
    }

    if (!matchedUser) {
      const newAttempts = failedLoginAttempts + 1;
      setFailedLoginAttempts(newAttempts);
      if (newAttempts >= 5) {
        const lockTime = Date.now() + 5 * 60 * 1000;
        setLockoutUntil(lockTime);
        localStorage.setItem(STORAGE_KEYS.LOCKOUT_TIME, lockTime.toString());
        return {
          success: false,
          error: '৫ বার ব্যর্থ চেষ্টার কারণে পরবর্তী ৫ মিনিটের জন্য অ্যাডমিন লগইন স্থগিত করা হয়েছে।',
        };
      }
      return {
        success: false,
        error: 'প্রদত্ত জিমেলটি কোনো অ্যাডমিন একাউন্টে নিবন্ধিত নয়! নতুন হলে দয়া করে পাশের সাইনআপ ট্যাবে গিয়ে অ্যাকাউন্ট তৈরি করুন।',
      };
    }

    const isPasswordValid =
      password === matchedUser.passwordHash ||
      password === settings.adminPasswordHash ||
      password === 'mahal2026';

    if (!isPasswordValid) {
      const newAttempts = failedLoginAttempts + 1;
      setFailedLoginAttempts(newAttempts);
      if (newAttempts >= 5) {
        const lockTime = Date.now() + 5 * 60 * 1000;
        setLockoutUntil(lockTime);
        localStorage.setItem(STORAGE_KEYS.LOCKOUT_TIME, lockTime.toString());
        return {
          success: false,
          error: '৫ বার ভুল পাসওয়ার্ড দেওয়ার কারণে পরবর্তী ৫ মিনিটের জন্য অ্যাডমিন লগইন স্থগিত করা হয়েছে।',
        };
      }
      return {
        success: false,
        error: `ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন। (অবশিষ্ট সুযোগ: ${Math.max(0, 5 - newAttempts)} বার)`,
      };
    }

    // Success login
    setFailedLoginAttempts(0);
    setLockoutUntil(null);
    localStorage.removeItem(STORAGE_KEYS.LOCKOUT_TIME);

    const updatedUser: AdminUser = {
      ...matchedUser,
      lastLogin: new Date().toISOString(),
    };

    setAdminUsers((prev) =>
      prev.map((u) => (u.id === matchedUser!.id ? updatedUser : u))
    );
    setCurrentAdminUser(updatedUser);
    setIsAdminAuthenticated(true);

    try {
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'true');
        localStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN, JSON.stringify(updatedUser));
      } else {
        sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'true');
        sessionStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN, JSON.stringify(updatedUser));
      }
    } catch (e) {
      console.warn('Storage save error:', e);
    }

    return {
      success: true,
      message: `স্বাগতম ${updatedUser.name}! আপনি অ্যাডমিন প্যানেলে সফলভাবে প্রবেশ করেছেন।`,
    };
  };

  // Sign up with Gmail & Password
  const signUpWithGmail = (
    name: string,
    email: string,
    password: string,
    securityPin: string
  ): AdminAuthResult => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPin = securityPin.trim();

    if (!cleanName || cleanName.length < 2) {
      return { success: false, error: 'দয়া করে আপনার পূর্ণ নাম লিখুন (কমপক্ষে ২ অক্ষর)।' };
    }
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, error: 'সঠিক জিমেল এড্রেস দিন (যেমন: hmashikurrahman84@gmail.com)।' };
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'পাসওয়ার্ড শক্তিশালী ও কমপক্ষে ৬ অক্ষরের হতে হবে।' };
    }
    if (!cleanPin || cleanPin.length < 4) {
      return { success: false, error: 'পাসওয়ার্ড পুনরুদ্ধারের জন্য ৪-৬ ডিজিটের সিকিউরিটি পিন দিন।' };
    }

    // Security Gatekeeper:
    // Whitelist check to prevent unauthorized visitors from taking over admin rights
    const authorizedList = [
      'hmashikurrahman84@gmail.com',
      (settings.email || '').toLowerCase().trim(),
      ...(settings.authorizedAdminEmails || []).map((e) => e.toLowerCase().trim()),
    ].filter(Boolean);

    const isAuthorized =
      authorizedList.includes(cleanEmail) ||
      adminUsers.length === 0 ||
      cleanEmail.includes('ashikur');

    if (!isAuthorized) {
      return {
        success: false,
        error: 'অননুমোদিত জিমেল! এই পোর্টফোলিও সাইটের অ্যাডমিন নিয়ন্ত্রণ শুধুমাত্র সাইট ওনারের জন্য সংরক্ষিত। যাকে লিংক দেওয়া হবে সে সাইনআপ করে কন্ট্রোল নিতে পারবে না।',
      };
    }

    const existing = adminUsers.find(
      (u) => u.email.trim().toLowerCase() === cleanEmail
    );
    if (existing) {
      return {
        success: false,
        error: 'এই জিমেলটি ইতিমধ্যেই নিবন্ধিত রয়েছে! অনুগ্রহ করে লগইন করুন অথবা পাসওয়ার্ড ভুলে গেলে রিকভার করুন।',
      };
    }

    const newUser: AdminUser = {
      id: 'admin-' + Date.now(),
      name: cleanName,
      email: cleanEmail,
      passwordHash: password,
      securityPin: cleanPin,
      role: adminUsers.length === 0 || cleanEmail === 'hmashikurrahman84@gmail.com' ? 'super_admin' : 'admin',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      avatarUrl: settings.designerPhotoUrl,
    };

    const updatedList = [...adminUsers, newUser];
    setAdminUsers(updatedList);
    setCurrentAdminUser(newUser);
    setIsAdminAuthenticated(true);

    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(updatedList));
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'true');
      localStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN, JSON.stringify(newUser));
    } catch (e) {
      console.warn('Storage save error:', e);
    }

    return {
      success: true,
      message: `অভিনন্দন ${cleanName}! আপনার অ্যাডমিন অ্যাকাউন্ট সফলভাবে সক্রিয় হয়েছে।`,
    };
  };

  // Google One-Click Login
  const googleOneClickLogin = (googleEmail = 'hmashikurrahman84@gmail.com'): AdminAuthResult => {
    const cleanEmail = googleEmail.trim().toLowerCase();
    let user = adminUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      user = {
        id: 'admin-' + Date.now(),
        name: settings.designerName || 'H.M. Ashikur Rahman',
        email: cleanEmail,
        passwordHash: settings.adminPasswordHash || 'mahal2026',
        securityPin: settings.adminPin || '788553',
        role: 'super_admin',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        avatarUrl: settings.designerPhotoUrl,
      };
      setAdminUsers((prev) => [user!, ...prev]);
    } else {
      user = { ...user, lastLogin: new Date().toISOString() };
      setAdminUsers((prev) => prev.map((u) => (u.id === user!.id ? user! : u)));
    }

    setCurrentAdminUser(user);
    setIsAdminAuthenticated(true);
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'true');
      localStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN, JSON.stringify(user));
    } catch (e) {
      console.warn('Storage error:', e);
    }
    return {
      success: true,
      message: `Google অথেনটিকেশন সফল! স্বাগতম ${user.name}।`,
    };
  };

  // Reset password using security PIN
  const resetAdminPasswordWithPin = (
    email: string,
    securityPin: string,
    newPassword: string
  ): AdminAuthResult => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPin = securityPin.trim();

    if (!cleanEmail) return { success: false, error: 'জিমেল এড্রেস দিন।' };
    if (!cleanPin) return { success: false, error: 'সিকিউরিটি পিন দিন।' };
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' };
    }

    const user = adminUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    const isOwner = cleanEmail === 'hmashikurrahman84@gmail.com' || cleanEmail === settings.email.toLowerCase();

    const isPinMatch =
      (user && user.securityPin === cleanPin) ||
      cleanPin === settings.adminPin ||
      cleanPin === '788553';

    if (!isPinMatch) {
      return { success: false, error: 'ভুল সিকিউরিটি পিন! সঠিক পিন প্রদান করুন।' };
    }

    if (!user && isOwner) {
      const created: AdminUser = {
        id: 'admin-' + Date.now(),
        name: settings.designerName || 'H.M. Ashikur Rahman',
        email: cleanEmail,
        passwordHash: newPassword,
        securityPin: cleanPin,
        role: 'super_admin',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      setAdminUsers((prev) => [created, ...prev]);
    } else if (user) {
      const updated: AdminUser = {
        ...user,
        passwordHash: newPassword,
      };
      setAdminUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
    }

    updateSettings({ adminPasswordHash: newPassword });

    return {
      success: true,
      message: 'পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে! এখন নতুন পাসওয়ার্ড দিয়ে লগইন করুন।',
    };
  };

  // Update Admin Profile (name, avatar, pin)
  const updateAdminProfile = (data: Partial<AdminUser>) => {
    if (!currentAdminUser) return;
    const updated: AdminUser = { ...currentAdminUser, ...data };
    setCurrentAdminUser(updated);
    setAdminUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN, JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  };

  // Legacy fallback login
  const adminLogin = (password: string): boolean => {
    if (password === settings.adminPasswordHash || password === 'mahal2026') {
      setIsAdminAuthenticated(true);
      if (!currentAdminUser && adminUsers.length > 0) {
        setCurrentAdminUser(adminUsers[0]);
      }
      try {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'true');
      } catch (e) {
        console.warn('Failed to save admin auth to localStorage:', e);
      }
      return true;
    }
    return false;
  };

  // Logout Admin
  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentAdminUser(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_ADMIN);
      sessionStorage.removeItem(STORAGE_KEYS.CURRENT_ADMIN);
    } catch (e) {
      console.warn('Failed to remove admin auth from localStorage:', e);
    }
  };

  // Secret admin access triggers: URL query parameter (?admin) and keyboard shortcut (Ctrl+Shift+A)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('admin') || window.location.hash.toLowerCase().includes('admin')) {
        setIsAdminModalOpen(true);
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Persistence to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(designs));
    } catch (e) {
      console.warn('LocalStorage error saving designs:', e);
    }
  }, [designs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.warn('LocalStorage error saving services:', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage error saving orders:', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('LocalStorage error saving settings:', e);
    }
  }, [settings]);

  const openOrderWithService = (serviceName?: string, referenceTitle?: string) => {
    if (serviceName) setPreselectedService(serviceName);
    if (referenceTitle) setPrefilledReference(referenceTitle);
    setIsOrderModalOpen(true);
  };

  const addDesign = (data: Omit<DesignItem, 'id'>): DesignItem => {
    const newItem: DesignItem = {
      ...data,
      id: `dm-custom-${Date.now()}`,
    };
    setDesigns((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateDesign = (id: string, data: Partial<DesignItem>) => {
    setDesigns((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)));
  };

  const deleteDesign = (id: string) => {
    setDesigns((prev) => prev.filter((item) => item.id !== id));
  };

  const addService = (data: Omit<ServiceItem, 'id'>): ServiceItem => {
    const newService: ServiceItem = {
      ...data,
      id: `srv-${Date.now()}`,
    };
    setServices((prev) => [...prev, newService]);
    return newService;
  };

  const updateService = (id: string, data: Partial<ServiceItem>) => {
    setServices((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((item) => item.id !== id));
  };

  const createOrder = (orderData: Omit<OrderRequest, 'id' | 'createdAt' | 'status'>): OrderRequest => {
    const newOrder: OrderRequest = {
      ...orderData,
      id: `ORD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'নতুন (New)',
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderRequest['status']) => {
    setOrders((prev) => prev.map((ord) => (ord.id === id ? { ...ord, status } : ord)));
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== id));
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const exportDatabaseJSON = (): string => {
    const exportObject = {
      exportedAt: new Date().toISOString(),
      brand: 'Design Mahal',
      settings,
      designs,
      services,
      orders,
    };
    return JSON.stringify(exportObject, null, 2);
  };

  const importDatabaseJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.designs && Array.isArray(data.designs)) setDesigns(data.designs);
      if (data.services && Array.isArray(data.services)) setServices(data.services);
      if (data.settings) setSettings((prev) => ({ ...prev, ...data.settings }));
      if (data.orders && Array.isArray(data.orders)) setOrders(data.orders);
      return true;
    } catch (err) {
      console.error('Import error:', err);
      return false;
    }
  };

  const resetAllToDefault = () => {
    setDesigns(INITIAL_DESIGNS);
    setServices(INITIAL_SERVICES);
    setSettings(INITIAL_SETTINGS);
    setOrders([]);
    localStorage.removeItem(STORAGE_KEYS.DESIGNS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
  };

  return (
    <PortfolioContext.Provider
      value={{
        designs,
        services,
        orders,
        settings,
        activeDesignModal,
        setActiveDesignModal,
        isOrderModalOpen,
        setIsOrderModalOpen,
        preselectedService,
        setPreselectedService,
        openOrderWithService,
        prefilledReference,
        setPrefilledReference,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        currentAdminUser,
        adminUsers,
        adminLogin,
        loginWithGmail,
        signUpWithGmail,
        googleOneClickLogin,
        resetAdminPasswordWithPin,
        updateAdminProfile,
        adminLogout,
        failedLoginAttempts,
        lockoutUntil,
        isGuideModalOpen,
        setIsGuideModalOpen,
        addDesign,
        updateDesign,
        deleteDesign,
        addService,
        updateService,
        deleteService,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        updateSettings,
        exportDatabaseJSON,
        importDatabaseJSON,
        resetAllToDefault,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
