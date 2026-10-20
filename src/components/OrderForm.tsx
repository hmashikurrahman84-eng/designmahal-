import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Send, MessageSquare, AlertCircle, CheckCircle, Upload, X, Calendar, Phone, Mail, User, Layers } from 'lucide-react';
import { formatWhatsAppNumber } from '../utils/whatsapp';

interface OrderFormProps {
  onSuccess?: () => void;
  defaultService?: string;
  defaultReference?: string;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  onSuccess,
  defaultService = '',
  defaultReference = '',
}) => {
  const { services, settings, createOrder } = usePortfolio();

  const [clientName, setClientName] = useState('');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'phone' | 'email'>('whatsapp');
  const [contactValue, setContactValue] = useState('');
  const [selectedService, setSelectedService] = useState(defaultService || (services[0]?.nameBn ?? 'লোগো ও ব্র্যান্ডমার্ক ডিজাইন'));
  const [projectDetails, setProjectDetails] = useState(defaultReference ? `রেফারেন্স ডিজাইন: ${defaultReference}\n\nআমার চাহিদা:` : '');
  const [preferredDeliveryDate, setPreferredDeliveryDate] = useState('');
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [errorWarning, setErrorWarning] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedOrderNo, setGeneratedOrderNo] = useState<string | null>(null);

  // Sync if props change
  useEffect(() => {
    if (defaultService) setSelectedService(defaultService);
    if (defaultReference) {
      setProjectDetails((prev) =>
        prev.includes(defaultReference)
          ? prev
          : `রেফারেন্স ডিজাইন: ${defaultReference}\n\n${prev}`
      );
    }
  }, [defaultService, defaultReference]);

  // Handle client file upload (images for design inspiration/brief)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      // Limit file size to 2MB for storage performance
      if (file.size > 2 * 1024 * 1024) {
        setErrorWarning('ছবিটির আকার ২MB-এর বেশি। অনুগ্রহ করে ২MB-এর কম ফাইল দিন।');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setReferenceImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeReferenceImage = (idx: number) => {
    setReferenceImages((prev) => prev.filter((_, i) => i !== idx));
  };

  // Generate WhatsApp message and redirect URL
  const buildWhatsAppUrl = (orderNumber: string) => {
    const cleanPhone = formatWhatsAppNumber(settings.whatsappNumber);

    const message = `*Design Mahal - নতুন গ্রাফিক ডিজাইন অর্ডার* 🎨
────────────────────────────
*অর্ডার নং:* #${orderNumber}
👤 *ক্লায়েন্টের নাম:* ${clientName}
📞 *যোগাযোগ (${contactMethod}):* ${contactValue}
🛠 *সার্ভিস:* ${selectedService}
📅 *কাঙ্ক্ষিত ডেলিভারি:* ${preferredDeliveryDate || 'আলোচনা সাপেক্ষে'}

📝 *কাজের বিবরণ:*
${projectDetails}
────────────────────────────
(Design Mahal ওয়েবসাইট থেকে প্রেরিত)`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e: React.FormEvent, viaWhatsAppOnly = false) => {
    e.preventDefault();
    setErrorWarning(null);

    // Validation
    if (!clientName.trim()) {
      setErrorWarning('দয়া করে আপনার নাম লিখুন।');
      return;
    }
    if (!contactValue.trim()) {
      setErrorWarning('দয়া করে যোগাযোগের জন্য আপনার হোয়াটসঅ্যাপ নম্বর, ফোন বা ইমেইল লিখুন।');
      return;
    }
    if (!projectDetails.trim()) {
      setErrorWarning('কাজের বিস্তারিত বিবরণ ও চাহিদা লিখুন যাতে সঠিক ডিজাইন তৈরি করা যায়।');
      return;
    }

    try {
      // Save order into persistent database state
      const newOrder = createOrder({
        clientName: clientName.trim(),
        contactMethod,
        contactValue: contactValue.trim(),
        selectedService,
        projectDetails: projectDetails.trim(),
        preferredDeliveryDate: preferredDeliveryDate.trim() || 'আলোচনা সাপেক্ষে',
        referenceFiles: referenceImages,
      });

      setGeneratedOrderNo(newOrder.id);
      setIsSubmitted(true);

      // If user chose WhatsApp or clicks direct WhatsApp action, open WhatsApp
      const waUrl = buildWhatsAppUrl(newOrder.id);
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      if (onSuccess) {
        // give user a moment to see success confirmation
        setTimeout(() => {
          onSuccess();
        }, 3500);
      }
    } catch (err) {
      setErrorWarning('অর্ডার জমা দিতে সমস্যা হয়েছে। দয়া করে পুনরায় চেষ্টা করুন।');
    }
  };

  if (isSubmitted && generatedOrderNo) {
    return (
      <div className="p-6 sm:p-8 text-center space-y-4 bg-[#0e162c] rounded-xl border border-[#1b2a4e]">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#1d4ed8]/20 border border-[#38bdf8] flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-[#38bdf8]" />
        </div>
        <h3 className="font-sans text-2xl font-bold text-[#f1f5f9]">
          ধন্যবাদ! অর্ডার সফলভাবে জমা হয়েছে
        </h3>
        <p className="text-sm text-[#cbd5e1]">
          অর্ডার রেফারেন্স নম্বর: <strong className="text-[#38bdf8]">#{generatedOrderNo}</strong>
        </p>
        <p className="text-xs sm:text-sm text-[#94a3b8] max-w-md mx-auto leading-relaxed">
          আপনার অর্ডারটি আমাদের সিস্টেমে সংরক্ষিত হয়েছে এবং আপনার WhatsApp উইন্ডো খোলা হয়েছে। অতি দ্রুত ডিজাইনার আপনার সাথে যোগাযোগ করবেন।
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={buildWhatsAppUrl(generatedOrderNo)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-[#080d1a] bg-[#25D366] hover:bg-[#20ba5a] rounded-lg transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp-এ মেসেজ পাঠান
          </a>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setClientName('');
              setContactValue('');
              setProjectDetails('');
              setReferenceImages([]);
            }}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#cbd5e1] hover:text-white bg-[#121c38] rounded-lg border border-[#1e2f57]"
          >
            আরেকটি অর্ডার করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-5">
      {/* Warning notice if validation fails */}
      {errorWarning && (
        <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{errorWarning}</span>
        </div>
      )}

      {/* Row 1: Client Name & Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1.5">
            আপনার নাম *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="যেমন: তানভীর আহমেদ"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0a1020] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider">
              যোগাযোগের মাধ্যম *
            </label>
            <div className="flex items-center gap-2 text-[11px] text-[#94a3b8]">
              <button
                type="button"
                onClick={() => setContactMethod('whatsapp')}
                className={`cursor-pointer ${contactMethod === 'whatsapp' ? 'text-[#38bdf8] font-bold underline' : ''}`}
              >
                WhatsApp
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setContactMethod('phone')}
                className={`cursor-pointer ${contactMethod === 'phone' ? 'text-[#38bdf8] font-bold underline' : ''}`}
              >
                ফোন
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setContactMethod('email')}
                className={`cursor-pointer ${contactMethod === 'email' ? 'text-[#38bdf8] font-bold underline' : ''}`}
              >
                ইমেইল
              </button>
            </div>
          </div>
          <div className="relative">
            {contactMethod === 'email' ? (
              <Mail className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
            ) : (
              <Phone className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
            )}
            <input
              type="text"
              required
              placeholder={
                contactMethod === 'email'
                  ? 'example@gmail.com'
                  : '017XXXXXXXX বা WhatsApp নম্বর'
              }
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0a1020] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Service Selection & Preferred Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1.5">
            কোন সার্ভিস নিতে চান? *
          </label>
          <div className="relative">
            <Layers className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0a1020] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none transition-colors appearance-none cursor-pointer"
            >
              {services.map((srv) => (
                <option key={srv.id} value={srv.nameBn} className="bg-[#0a1020] text-[#f1f5f9]">
                  {srv.nameBn} ({srv.category})
                </option>
              ))}
              <option value="অন্যান্য কাস্টম ডিজাইন" className="bg-[#0a1020] text-[#f1f5f9]">
                অন্যান্য কাস্টম ডিজাইন
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1.5">
            পছন্দের ডেলিভারির তারিখ
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="date"
              value={preferredDeliveryDate}
              onChange={(e) => setPreferredDeliveryDate(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0a1020] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Row 3: Project Details */}
      <div>
        <label className="block text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider mb-1.5">
          কাজের বিস্তারিত বিবরণ ও চাহিদা *
        </label>
        <textarea
          rows={3}
          required
          placeholder="আপনার ব্র্যান্ডের নাম, স্লোগান, পছন্দের কালার বা পোস্টারের কনসেপ্ট সম্পর্কে বিস্তারিত লিখুন..."
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
          className="w-full p-3 bg-[#0a1020] border border-[#1e2f57] focus:border-[#38bdf8] text-sm text-[#f1f5f9] rounded-lg outline-none transition-colors resize-y"
        />
      </div>

      {/* Row 4: Reference Images Upload */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-[#cbd5e1] uppercase tracking-wider">
            রেফারেন্স ছবি বা স্কেচ (ঐচ্ছিক)
          </label>
          <span className="text-[11px] text-[#64748b]">ম্যাক্স ২MB</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#101932] hover:bg-[#162345] border border-dashed border-[#223561] hover:border-[#38bdf8] rounded-lg text-xs font-medium text-[#cbd5e1] cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>ছবি আপলোড করুন</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {referenceImages.map((img, idx) => (
            <div key={idx} className="relative w-12 h-12 rounded-md overflow-hidden border border-[#243764] group">
              <img src={img} alt="Ref" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeReferenceImage(idx)}
                className="absolute inset-0 bg-red-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons: Dual direct Submit & Direct WhatsApp */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="submit"
          className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-bold text-white bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#60a5fa] hover:from-[#1d4ed8] hover:to-[#3b82f6] rounded-lg shadow-md cursor-pointer transition-all active:scale-[0.98]"
        >
          <Send className="w-4 h-4" />
          <span>অর্ডার জমা দিন ও WhatsApp-এ পাঠান</span>
        </button>

        <a
          href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '') || '8801700000000'}?text=${encodeURIComponent(
            `আসসালামু আলাইকুম, আমি Design Mahal থেকে ${selectedService || 'গ্রাফিক ডিজাইন'} সম্পর্কে সরাসরি আলোচনা করতে চাই।`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-[#25D366] bg-[#0c1f18] hover:bg-[#122e23] border border-[#25D366]/30 rounded-lg transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>সরাসরি WhatsApp চ্যাট</span>
        </a>
      </div>

      <div className="text-[11px] text-[#64748b] text-center">
        * আপনার দেওয়া তথ্য নিরাপদে সংরক্ষিত থাকবে এবং কখনোই তৃতীয় পক্ষের সাথে শেয়ার করা হবে না।
      </div>
    </form>
  );
};
