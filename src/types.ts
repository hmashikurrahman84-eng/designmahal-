export type DesignCategory =
  | 'Logo Design'
  | 'Poster Design'
  | 'Banner Design'
  | 'Book Cover Design'
  | 'Business Card Design'
  | 'Social Media Post Design'
  | 'Thumbnail Design'
  | 'ID Card Design'
  | 'Branding';

export interface DesignItem {
  id: string;
  title: string;
  category: DesignCategory;
  description: string;
  imageUrl?: string;
  isSample: boolean;
  clientOrContext?: string;
  toolsUsed: string[];
  year: string;
  tags: string[];
  featured?: boolean;
  vectorPreset?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface ServiceItem {
  id: string;
  name: string;
  nameBn: string;
  category: DesignCategory;
  description: string;
  deliverables: string[];
  startingPrice?: string;
  deliveryDays: string;
  iconName: string;
  popular?: boolean;
}

export interface OrderRequest {
  id: string;
  createdAt: string;
  clientName: string;
  contactMethod: 'whatsapp' | 'phone' | 'email';
  contactValue: string;
  selectedService: string;
  projectDetails: string;
  preferredDeliveryDate: string;
  referenceFiles?: string[];
  referenceLinks?: string;
  status: 'নতুন (New)' | 'কাজ চলছে (In Progress)' | 'সম্পন্ন (Completed)' | 'বাতিল (Cancelled)';
  notes?: string;
}

export interface SiteSettings {
  brandName: string;
  brandTagline: string;
  brandSubhead: string;
  logoUrl?: string;
  designerPhotoUrl?: string;
  designerName: string;
  designerTitle: string;
  designerBio: string;
  designerExperienceYears: number;
  designerPhilosophy: string;
  whatsappNumber: string; // e.g. "8801700000000" (country code + number without plus for wa.me)
  displayPhone: string;
  email: string;
  facebookUrl: string;
  instagramUrl: string;
  behanceUrl: string;
  location: string;
  adminPasswordHash: string; // Stored securely in client storage
}
