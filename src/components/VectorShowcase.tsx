import React from 'react';
import { DesignItem } from '../types';

interface VectorShowcaseProps {
  design: DesignItem;
  className?: string;
  showBadge?: boolean;
}

export const VectorShowcase: React.FC<VectorShowcaseProps> = ({
  design,
  className = '',
  showBadge = true,
}) => {
  // If user provided a real uploaded image (data URL or external URL)
  if (design.imageUrl && design.imageUrl.trim().length > 0) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#0a1124] group ${className}`}>
        <img
          src={design.imageUrl}
          alt={design.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Graceful fallback to styled vector container on broken image
            e.currentTarget.style.display = 'none';
          }}
        />
        {showBadge && design.isSample && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold tracking-wide bg-[#080d1a]/95 text-[#38bdf8] border border-[#38bdf8]/40 backdrop-blur-md rounded-md shadow-lg font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span>
              নমুনা ডিজাইন (Sample)
            </span>
          </div>
        )}
      </div>
    );
  }

  // Bespoke vector presets for samples with Navy & Blue aesthetic and Poppins typography
  const renderVectorArtwork = () => {
    switch (design.vectorPreset) {
      case 'logo-royal-crest':
        return (
          <svg viewBox="0 0 600 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#121f42" />
                <stop offset="60%" stopColor="#0a1228" />
                <stop offset="100%" stopColor="#050a17" />
              </radialGradient>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bfdbfe" />
                <stop offset="35%" stopColor="#60a5fa" />
                <stop offset="70%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <rect width="600" height="600" fill="url(#bgGrad)" />
            {/* Elegant Circular Framing */}
            <circle cx="300" cy="300" r="230" fill="none" stroke="#1b2a52" strokeWidth="1.5" />
            <circle cx="300" cy="300" r="215" fill="none" stroke="url(#goldGrad)" strokeWidth="2" strokeDasharray="6 4" opacity="0.85" />
            <circle cx="300" cy="300" r="195" fill="none" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.5" />
            
            {/* Royal Crown & Monogram M in Electric Blue */}
            <g transform="translate(300, 270)" filter="url(#goldGlow)">
              {/* Crown Motif */}
              <path d="M -50 -90 L -30 -60 L 0 -85 L 30 -60 L 50 -90 L 40 -40 L -40 -40 Z" fill="url(#goldGrad)" />
              <circle cx="-50" cy="-95" r="4" fill="#bfdbfe" />
              <circle cx="0" cy="-90" r="5" fill="#ffffff" />
              <circle cx="50" cy="-95" r="4" fill="#bfdbfe" />

              {/* Calligraphic Royal 'M' Emblem */}
              <path
                d="M -75 40 L -75 -25 C -75 -35, -60 -40, -45 -20 L 0 35 L 45 -20 C 60 -40, 75 -35, 75 -25 L 75 40 M -45 40 L -45 -10 M 45 40 L 45 -10"
                fill="none"
                stroke="url(#goldGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Typography in Poppins */}
            <text x="300" y="380" textAnchor="middle" fill="url(#goldGrad)" fontFamily="Poppins, sans-serif" fontSize="22" letterSpacing="6" fontWeight="800">
              DESIGN MAHAL
            </text>
            <text x="300" y="405" textAnchor="middle" fill="#93a3c8" fontFamily="Poppins, sans-serif" fontSize="11" letterSpacing="4" style={{ textTransform: 'uppercase' }} fontWeight="500">
              CREATIVE DESIGN STUDIO · EST. 2026
            </text>
            <line x1="220" y1="420" x2="380" y2="420" stroke="url(#goldGrad)" strokeWidth="0.8" opacity="0.6" />
          </svg>
        );

      case 'poster-culture-fest':
        return (
          <svg viewBox="0 0 450 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="posterBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#111c3a" />
                <stop offset="60%" stopColor="#091228" />
                <stop offset="100%" stopColor="#050914" />
              </linearGradient>
              <linearGradient id="posterGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <rect width="450" height="600" fill="url(#posterBg)" />
            {/* Abstract Graphic Geometry */}
            <circle cx="225" cy="220" r="130" fill="none" stroke="#1d2e5a" strokeWidth="40" opacity="0.5" />
            <circle cx="225" cy="220" r="90" fill="#132042" />
            <path d="M 135 220 A 90 90 0 0 1 315 220" fill="url(#posterGold)" opacity="0.9" />
            <polygon points="225,120 260,220 190,220" fill="#091228" />
            
            {/* Geometric blue lines */}
            <line x1="60" y1="60" x2="60" y2="540" stroke="#1d2e5a" strokeWidth="1" />
            <line x1="390" y1="60" x2="390" y2="540" stroke="#1d2e5a" strokeWidth="1" />
            
            {/* Bengali & English Festival Poster Typography */}
            <text x="80" y="100" fill="#38bdf8" fontFamily="Hind Siliguri, Poppins, sans-serif" fontSize="13" letterSpacing="2" fontWeight="600">
              বার্ষিক সংস্কৃতি ও শিল্প সম্মেলন
            </text>
            <text x="80" y="380" fill="#f1f5f9" fontFamily="Hind Siliguri, Poppins, sans-serif" fontSize="28" fontWeight="bold">
              আন্তর্জাতিক সাহিত্য ও
            </text>
            <text x="80" y="420" fill="url(#posterGold)" fontFamily="Hind Siliguri, Poppins, sans-serif" fontSize="32" fontWeight="800">
              নাট্যোৎসব ২০২৬
            </text>
            <text x="80" y="460" fill="#93a3c8" fontFamily="Poppins, sans-serif" fontSize="12" letterSpacing="1" fontWeight="500">
              DHAKA NATIONAL THEATRE · 12-16 MARCH
            </text>
            <rect x="80" y="490" width="120" height="28" fill="#2563eb" rx="4" />
            <text x="140" y="508" textAnchor="middle" fill="#ffffff" fontFamily="Poppins, sans-serif" fontSize="11" fontWeight="bold">
              GET PASSES
            </text>
          </svg>
        );

      case 'branding-velvet-noir':
        return (
          <svg viewBox="0 0 700 450" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="deskBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#101c3d" />
                <stop offset="100%" stopColor="#070c1a" />
              </linearGradient>
              <linearGradient id="foilGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bfdbfe" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#000000" floodOpacity="0.7" />
              </filter>
            </defs>
            <rect width="700" height="450" fill="url(#deskBg)" />

            {/* Letterhead Mockup */}
            <g transform="translate(70, 50)" filter="url(#shadow)">
              <rect width="260" height="350" rx="4" fill="#0b1329" stroke="#1d2e5a" strokeWidth="1" />
              {/* Brand Header */}
              <circle cx="45" cy="45" r="16" fill="url(#foilGold)" />
              <text x="45" y="51" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="Poppins, sans-serif">V</text>
              <text x="75" y="45" fill="#f1f5f9" fontSize="13" fontFamily="Poppins, sans-serif" fontWeight="700" letterSpacing="1">VELVET NOIR</text>
              <text x="75" y="58" fill="#7182a4" fontSize="8" letterSpacing="1" fontFamily="Poppins, sans-serif">ATELIER & DESIGN</text>
              <line x1="30" y1="80" x2="230" y2="80" stroke="#1d2e5a" strokeWidth="0.8" />
              {/* Dummy text lines */}
              <line x1="30" y1="110" x2="220" y2="110" stroke="#1d2e5a" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="30" y1="130" x2="200" y2="130" stroke="#1d2e5a" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="30" y1="150" x2="210" y2="150" stroke="#1d2e5a" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="30" y1="170" x2="160" y2="170" stroke="#1d2e5a" strokeWidth="2" strokeDasharray="6 3" />
            </g>

            {/* Business Card Front & Back */}
            <g transform="translate(370, 70)" filter="url(#shadow)">
              {/* Back of card */}
              <rect width="260" height="150" rx="6" fill="#0e1732" stroke="url(#foilGold)" strokeWidth="1" />
              <circle cx="130" cy="75" r="30" fill="none" stroke="url(#foilGold)" strokeWidth="1.5" />
              <text x="130" y="83" textAnchor="middle" fill="url(#foilGold)" fontFamily="Poppins, sans-serif" fontSize="24" fontWeight="800">V</text>
            </g>

            <g transform="translate(390, 240)" filter="url(#shadow)">
              {/* Front of card */}
              <rect width="260" height="150" rx="6" fill="#091024" stroke="#1e3264" strokeWidth="1" />
              <text x="30" y="55" fill="url(#foilGold)" fontFamily="Poppins, sans-serif" fontSize="15" fontWeight="700">ASHIKUR RAHMAN</text>
              <text x="30" y="72" fill="#8d9ebf" fontSize="10" letterSpacing="1.5" fontFamily="Poppins, sans-serif" fontWeight="500">CREATIVE DIRECTOR</text>
              <line x1="30" y1="88" x2="100" y2="88" stroke="url(#foilGold)" strokeWidth="1.5" />
              <text x="30" y="112" fill="#a4b3d1" fontSize="9" fontFamily="Poppins, sans-serif">+880 1700-000000</text>
              <text x="30" y="126" fill="#a4b3d1" fontSize="9" fontFamily="Poppins, sans-serif">hello@designmahal.com</text>
            </g>
          </svg>
        );

      case 'card-executive-gold':
        return (
          <svg viewBox="0 0 600 380" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#121f42" />
                <stop offset="100%" stopColor="#080e1e" />
              </linearGradient>
              <linearGradient id="goldEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#bfdbfe" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <rect width="600" height="380" fill="#050812" />
            {/* Card Body */}
            <g transform="translate(60, 40)">
              <rect width="480" height="300" rx="12" fill="url(#cardGrad)" stroke="#1d2e5a" strokeWidth="1.5" />
              <rect width="480" height="300" rx="12" fill="none" stroke="url(#goldEdge)" strokeWidth="1.5" opacity="0.6" />
              
              {/* Foil Pattern Geometry */}
              <path d="M 0 0 L 120 0 L 0 120 Z" fill="url(#goldEdge)" opacity="0.15" />
              <path d="M 480 300 L 360 300 L 480 180 Z" fill="url(#goldEdge)" opacity="0.15" />
              
              {/* Logo Emblem on Card */}
              <circle cx="240" cy="110" r="38" fill="none" stroke="url(#goldEdge)" strokeWidth="1.5" />
              <polygon points="240,85 260,120 220,120" fill="none" stroke="url(#goldEdge)" strokeWidth="1.5" />
              <text x="240" y="180" textAnchor="middle" fill="url(#goldEdge)" fontFamily="Poppins, sans-serif" fontSize="19" letterSpacing="4" fontWeight="800">
                MAHAL EXECUTIVE
              </text>
              <text x="240" y="202" textAnchor="middle" fill="#93a3c8" fontSize="10" letterSpacing="3" fontFamily="Poppins, sans-serif" fontWeight="500">
                PREMIUM PRINT SOLUTION
              </text>
              <line x1="180" y1="220" x2="300" y2="220" stroke="url(#goldEdge)" strokeWidth="0.8" opacity="0.5" />
              <text x="240" y="245" textAnchor="middle" fill="#7182a4" fontSize="9" letterSpacing="1.5" fontFamily="Poppins, sans-serif">
                DEEP NAVY BLUE · SAPPHIRE FOIL · 450 GSM
              </text>
            </g>
          </svg>
        );

      case 'book-silent-summit':
        return (
          <svg viewBox="0 0 450 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bookBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0e1834" />
                <stop offset="60%" stopColor="#122045" />
                <stop offset="100%" stopColor="#070c1a" />
              </linearGradient>
              <linearGradient id="goldHimalaya" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bfdbfe" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <rect width="450" height="600" fill="url(#bookBg)" />
            {/* Book Spine Shadow Left */}
            <rect x="0" y="0" width="30" height="600" fill="#050812" opacity="0.45" />
            <line x1="30" y1="0" x2="30" y2="600" stroke="#1d2e5a" strokeWidth="1" />

            {/* Author */}
            <text x="225" y="80" textAnchor="middle" fill="#9db0d4" fontFamily="Poppins, sans-serif" fontSize="12" letterSpacing="4" fontWeight="600">
              A NOVEL BY ASHIKUR RAHMAN
            </text>
            <line x1="160" y1="100" x2="290" y2="100" stroke="url(#goldHimalaya)" strokeWidth="1" />

            {/* Mountain Range Illustration in Blue Lines */}
            <g transform="translate(0, 150)">
              {/* Back Mountain */}
              <polygon points="120,200 230,60 340,200" fill="#17264f" stroke="#253a73" strokeWidth="1" />
              {/* Front Mountain with Blue Stroke */}
              <polygon points="60,240 180,80 300,240" fill="#101c3d" stroke="url(#goldHimalaya)" strokeWidth="2" />
              <polygon points="210,240 330,110 410,240" fill="#0c152e" stroke="url(#goldHimalaya)" strokeWidth="1.5" />
              {/* Electric Sun / Moon */}
              <circle cx="230" cy="50" r="28" fill="none" stroke="url(#goldHimalaya)" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>

            {/* Title */}
            <text x="225" y="440" textAnchor="middle" fill="#f1f5f9" fontFamily="Hind Siliguri, Poppins, sans-serif" fontSize="36" fontWeight="bold">
              হিমালয়ের ডাক
            </text>
            <text x="225" y="475" textAnchor="middle" fill="url(#goldHimalaya)" fontFamily="Poppins, sans-serif" fontSize="16" letterSpacing="4" fontWeight="700">
              THE SILENT SUMMIT
            </text>
            <text x="225" y="530" textAnchor="middle" fill="#7182a4" fontSize="11" letterSpacing="2" fontFamily="Poppins, sans-serif">
              BESTSELLER EDITION · 2026
            </text>
          </svg>
        );

      case 'social-eid-festive':
        return (
          <svg viewBox="0 0 600 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="socBg" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#142247" />
                <stop offset="100%" stopColor="#070c1a" />
              </radialGradient>
              <linearGradient id="goldArch" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bfdbfe" />
                <stop offset="50%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <rect width="600" height="600" fill="url(#socBg)" />
            {/* Islamic Geometric Arch */}
            <path
              d="M 150 500 L 150 260 C 150 150, 300 100, 300 100 C 300 100, 450 150, 450 260 L 450 500 Z"
              fill="none"
              stroke="url(#goldArch)"
              strokeWidth="2.5"
            />
            {/* Hanging Lantern */}
            <line x1="300" y1="100" x2="300" y2="190" stroke="url(#goldArch)" strokeWidth="1.5" />
            <polygon points="300,190 315,220 300,240 285,220" fill="url(#goldArch)" />
            <circle cx="300" cy="215" r="4" fill="#ffffff" />

            {/* Crescent Moon */}
            <path
              d="M 330 290 A 40 40 0 1 0 355 350 A 32 32 0 1 1 330 290 Z"
              fill="url(#goldArch)"
            />

            {/* Greeting in Poppins and Hind Siliguri */}
            <text x="300" y="410" textAnchor="middle" fill="#f1f5f9" fontFamily="Poppins, sans-serif" fontSize="32" fontWeight="800" letterSpacing="2">
              EID MUBARAK
            </text>
            <text x="300" y="445" textAnchor="middle" fill="url(#goldArch)" fontFamily="Hind Siliguri, Poppins, sans-serif" fontSize="18" fontWeight="600">
              ঈদ মোবারক — আনন্দ ছড়াক সর্বত্র
            </text>
            <text x="300" y="480" textAnchor="middle" fill="#93a3c8" fontSize="11" letterSpacing="3" fontFamily="Poppins, sans-serif">
              SPECIAL FESTIVE PROMO · DESIGN MAHAL
            </text>
          </svg>
        );

      case 'thumb-masterclass':
        return (
          <svg viewBox="0 0 700 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="thumbBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#15244d" />
                <stop offset="50%" stopColor="#0a1226" />
                <stop offset="100%" stopColor="#050812" />
              </linearGradient>
            </defs>
            <rect width="700" height="400" fill="url(#thumbBg)" />
            {/* Glow burst */}
            <circle cx="560" cy="180" r="140" fill="#3b82f6" opacity="0.25" />
            
            {/* Bold Thumbnail Hook Typography in Poppins */}
            <g transform="translate(60, 90)">
              <rect x="0" y="0" width="160" height="34" fill="#2563eb" rx="4" />
              <text x="80" y="23" textAnchor="middle" fill="#ffffff" fontFamily="Poppins, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1">
                MASTERCLASS
              </text>
              <text x="0" y="95" fill="#f1f5f9" fontFamily="Poppins, sans-serif" fontSize="48" fontWeight="900">
                PRO GRAPHIC
              </text>
              <text x="0" y="155" fill="#38bdf8" fontFamily="Poppins, sans-serif" fontSize="56" fontWeight="900">
                DESIGN 2026
              </text>
              <text x="0" y="210" fill="#a4b3d1" fontFamily="Hind Siliguri, Poppins, sans-serif" fontSize="20" fontWeight="600">
                ১০ মিনিটে প্রফেশনাল ব্র্যান্ডিং কৌশল
              </text>
            </g>

            {/* Graphic Badge */}
            <g transform="translate(520, 120)">
              <circle cx="60" cy="60" r="65" fill="#0e1732" stroke="#38bdf8" strokeWidth="3" />
              <text x="60" y="55" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="bold" fontFamily="Poppins, sans-serif">100%</text>
              <text x="60" y="78" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="Poppins, sans-serif">VECTOR</text>
            </g>
          </svg>
        );

      case 'idcard-smart-badge':
        return (
          <svg viewBox="0 0 450 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="idGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#121d3d" />
                <stop offset="100%" stopColor="#070c18" />
              </linearGradient>
            </defs>
            <rect width="450" height="600" fill="#050812" />
            
            {/* Lanyard Hole Cutout */}
            <g transform="translate(60, 40)">
              <rect width="330" height="520" rx="16" fill="url(#idGrad)" stroke="#1d2e5a" strokeWidth="1.5" />
              <rect x="130" y="15" width="70" height="8" rx="4" fill="#050812" />
              
              {/* Header Bar */}
              <rect x="0" y="45" width="330" height="55" fill="#0d1732" />
              <circle cx="45" cy="72" r="14" fill="#2563eb" />
              <text x="45" y="77" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="Poppins, sans-serif">A</text>
              <text x="70" y="70" fill="#f1f5f9" fontSize="14" fontWeight="bold" fontFamily="Poppins, sans-serif">APEX GLOBAL</text>
              <text x="70" y="85" fill="#93a3c8" fontSize="9" fontFamily="Poppins, sans-serif">INNOVATION CORP</text>

              {/* Photo placeholder frame */}
              <rect x="100" y="130" width="130" height="150" rx="8" fill="#192850" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="165" cy="185" r="30" fill="#2b3e73" />
              <path d="M 125 260 C 125 230, 205 230, 205 260 Z" fill="#2b3e73" />

              {/* Identity Details */}
              <text x="165" y="315" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="Poppins, sans-serif">
                Ashikur Rahman
              </text>
              <text x="165" y="335" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="600" letterSpacing="1" fontFamily="Poppins, sans-serif">
                LEAD DESIGN ARCHITECT
              </text>
              
              <text x="165" y="375" textAnchor="middle" fill="#8d9ebf" fontSize="10" fontFamily="Poppins, sans-serif">
                ID NO: AG-948201
              </text>
              <text x="165" y="392" textAnchor="middle" fill="#8d9ebf" fontSize="10" fontFamily="Poppins, sans-serif">
                DEPT: BRAND & CREATIVE
              </text>

              {/* Barcode Mockup */}
              <g transform="translate(65, 430)">
                <rect x="0" y="0" width="200" height="40" fill="#ffffff" rx="3" />
                {/* Barcode lines */}
                {Array.from({ length: 32 }).map((_, i) => (
                  <rect
                    key={i}
                    x={10 + i * 5.6}
                    y={5}
                    width={(i % 3 === 0 ? 3 : 1.5)}
                    height={30}
                    fill="#080d1a"
                  />
                ))}
              </g>
            </g>
          </svg>
        );

      case 'banner-tech-summit':
      default:
        return (
          <svg viewBox="0 0 700 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="genBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#132042" />
                <stop offset="100%" stopColor="#070c1a" />
              </linearGradient>
              <linearGradient id="genGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <rect width="700" height="400" fill="url(#genBg)" />
            {/* Tech grid linework */}
            <circle cx="350" cy="200" r="160" fill="none" stroke="#1d2e5a" strokeWidth="1" />
            <circle cx="350" cy="200" r="110" fill="none" stroke="url(#genGold)" strokeWidth="1" strokeDasharray="8 6" opacity="0.6" />
            
            {/* Center Monogram / Topic */}
            <circle cx="350" cy="160" r="45" fill="#0e1732" stroke="url(#genGold)" strokeWidth="2" />
            <text x="350" y="170" textAnchor="middle" fill="url(#genGold)" fontFamily="Poppins, sans-serif" fontSize="26" fontWeight="800">
              DM
            </text>
            
            <text x="350" y="255" textAnchor="middle" fill="#ffffff" fontFamily="Poppins, sans-serif" fontSize="22" fontWeight="bold">
              {design.title}
            </text>
            <text x="350" y="285" textAnchor="middle" fill="#38bdf8" fontSize="12" letterSpacing="3" style={{ textTransform: 'uppercase' }} fontFamily="Poppins, sans-serif" fontWeight="600">
              {design.category} · HIGH RESOLUTION
            </text>
            <text x="350" y="320" textAnchor="middle" fill="#8d9ebf" fontSize="11" fontFamily="Poppins, sans-serif">
              {design.toolsUsed.join(' · ')}
            </text>
          </svg>
        );
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#0a1124] group select-none ${className}`}>
      {renderVectorArtwork()}
      {showBadge && design.isSample && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold tracking-wide bg-[#080d1a]/95 text-[#38bdf8] border border-[#38bdf8]/40 backdrop-blur-md rounded-md shadow-lg font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span>
            নমুনা ডিজাইন (Sample)
          </span>
        </div>
      )}
    </div>
  );
};
