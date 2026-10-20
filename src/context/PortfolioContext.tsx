import React, { createContext, useContext, useState, useEffect } from 'react';
import { DesignItem, ServiceItem, OrderRequest, SiteSettings } from '../types';
import { INITIAL_DESIGNS, INITIAL_SERVICES, INITIAL_SETTINGS } from '../data/initialData';

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
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
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

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('design_mahal_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const adminLogin = (password: string): boolean => {
    if (password === settings.adminPasswordHash || password === 'mahal2026') {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem('design_mahal_admin_auth', 'true');
      } catch (e) {
        console.warn('Failed to save admin auth to localStorage:', e);
      }
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('design_mahal_admin_auth');
    } catch (e) {
      console.warn('Failed to remove admin auth from localStorage:', e);
    }
  };

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
        adminLogin,
        adminLogout,
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
