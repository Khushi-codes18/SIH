import React from 'react';

interface Props {
  variant?: 'hero' | 'footer';
  className?: string;
}

export const HimalayanHeroSvg: React.FC<Props> = ({ variant = 'hero', className = '' }) => {
  if (variant === 'footer') {
    return (
      <div className={`relative w-full overflow-hidden select-none pointer-events-none ${className}`}>
        <svg
          viewBox="0 0 1440 220"
          className="w-full h-full object-cover opacity-85 dark:opacity-30 transition-opacity duration-300"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="footerSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="footerHills1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="footerHills2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="footerForest" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="footerWater" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Distant Hills */}
          <path
            d="M0,130 Q220,70 480,110 T960,80 T1440,110 L1440,220 L0,220 Z"
            fill="url(#footerHills1)"
          />
          {/* Mid Ridge */}
          <path
            d="M0,150 Q300,100 640,140 T1280,120 T1440,140 L1440,220 L0,220 Z"
            fill="url(#footerHills2)"
            opacity="0.7"
          />
          {/* Pine Trees silhouettes */}
          <g fill="#047857" opacity="0.65">
            <polygon points="760,145 770,120 780,145" />
            <polygon points="775,145 785,115 795,145" />
            <polygon points="790,150 802,110 814,150" />
            <polygon points="808,150 820,118 832,150" />
            <polygon points="980,155 990,130 1000,155" />
            <polygon points="995,155 1005,125 1015,155" />
            <polygon points="1010,160 1022,118 1034,160" />
            <polygon points="1030,160 1042,128 1054,160" />
          </g>
          {/* River shoreline */}
          <path
            d="M0,175 Q400,160 720,178 T1440,170 L1440,220 L0,220 Z"
            fill="url(#footerWater)"
          />
          {/* Village cottage right side */}
          <g transform="translate(1180, 125)">
            <polygon points="40,22 65,0 90,22" fill="#1e293b" />
            <rect x="45" y="22" width="40" height="25" fill="#f8fafc" />
            <rect x="52" y="27" width="10" height="10" fill="#0284c7" />
            <rect x="68" y="30" width="8" height="17" fill="#64748b" />
            {/* Small trees around house */}
            <polygon points="25,47 33,20 41,47" fill="#065f46" />
            <polygon points="92,47 100,18 108,47" fill="#047857" />
            <polygon points="106,47 114,24 122,47" fill="#065f46" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1440 450"
        className="w-full h-full object-cover opacity-90 dark:opacity-35 transition-opacity duration-300"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f0f9ff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="distantMtn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="midMtn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#60a5fa" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="foreHills" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="riverStream" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.85" />
          </linearGradient>
          <filter id="softMist" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Sky */}
        <rect width="1440" height="450" fill="url(#skyGrad)" />

        {/* Far Snow Mountain Peaks */}
        <path
          d="M100,240 L280,100 L380,170 L520,70 L680,210 L840,90 L980,190 L1150,80 L1320,230 L1440,160 L1440,450 L0,450 L0,220 Z"
          fill="url(#distantMtn)"
          opacity="0.6"
        />

        {/* Snow Highlights */}
        <polygon points="280,100 250,135 310,135" fill="#ffffff" opacity="0.8" />
        <polygon points="520,70 480,120 560,115" fill="#ffffff" opacity="0.9" />
        <polygon points="840,90 805,135 875,130" fill="#ffffff" opacity="0.85" />
        <polygon points="1150,80 1115,130 1185,125" fill="#ffffff" opacity="0.85" />

        {/* Mid Mountain Ranges */}
        <path
          d="M0,280 Q200,160 420,240 T840,200 T1260,220 T1440,190 L1440,450 L0,450 Z"
          fill="url(#midMtn)"
          opacity="0.65"
          filter="url(#softMist)"
        />

        {/* Closer Himalayan Ridges */}
        <path
          d="M0,320 Q240,210 500,280 T1020,260 T1440,240 L1440,450 L0,450 Z"
          fill="#38bdf8"
          opacity="0.35"
        />

        {/* Valley River Bhagirathi */}
        <path
          d="M480,280 Q560,310 680,340 T920,380 T1100,450 L750,450 Q660,390 540,350 Z"
          fill="url(#riverStream)"
        />

        {/* Arched Stone Bridge across River */}
        <g transform="translate(680, 335)">
          <path
            d="M-40,10 Q30,-5 100,10 L100,22 Q30,8 -40,22 Z"
            fill="#cbd5e1"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          <path d="M-10,22 Q30,12 70,22" fill="none" stroke="#475569" strokeWidth="3" />
        </g>

        {/* Pine Tree Clusters on slopes */}
        <g fill="#0f766e" opacity="0.75">
          <polygon points="180,330 190,300 200,330" />
          <polygon points="195,335 207,295 219,335" />
          <polygon points="212,340 226,290 240,340" />
          <polygon points="235,342 247,305 259,342" />

          <polygon points="980,350 992,310 1004,350" />
          <polygon points="1000,355 1014,305 1028,355" />
          <polygon points="1022,358 1038,300 1054,358" />
          <polygon points="1048,360 1062,315 1076,360" />
        </g>

        {/* Traditional Himalayan Cottages */}
        <g transform="translate(1080, 315)">
          {/* Cottage 1 */}
          <polygon points="30,15 50,0 70,15" fill="#991b1b" />
          <rect x="34" y="15" width="32" height="20" fill="#f8fafc" stroke="#cbd5e1" />
          <rect x="40" y="18" width="8" height="8" fill="#0284c7" />
          <rect x="54" y="21" width="6" height="14" fill="#78350f" />

          {/* Cottage 2 */}
          <polygon points="75,22 92,8 109,22" fill="#1e3a8a" />
          <rect x="78" y="22" width="28" height="18" fill="#f1f5f9" stroke="#cbd5e1" />
          <rect x="83" y="25" width="7" height="7" fill="#0284c7" />
          <rect x="94" y="27" width="6" height="13" fill="#78350f" />
        </g>
      </svg>
    </div>
  );
};
