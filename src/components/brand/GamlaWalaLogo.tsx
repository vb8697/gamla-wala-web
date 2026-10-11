import React from 'react';

export type LogoVariant =
  | 'horizontal'
  | 'stacked'
  | 'icon-only'
  | 'badge'
  | 'app-icon'
  | 'inverted'
  | 'monochrome';

interface GamlaWalaLogoProps {
  variant?: LogoVariant;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

/**
 * Plant in Pot Logo Mark (Terracotta Pot + 3 Forest Green Leaves)
 */
export function GamlaWalaMark({
  className = 'w-10 h-10',
  potColor = '#D98B5A',
  leafColor = '#1B5E3B',
}: {
  className?: string;
  potColor?: string;
  leafColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="GamlaWala Plant and Pot Emblem"
    >
      {/* Central taller leaf */}
      <path
        d="M50 56 C46 42 42 22 55 9 C67 20 68 39 52 56 Z"
        fill={leafColor}
      />
      {/* Left arched leaf */}
      <path
        d="M48 57 C38 48 20 38 18 25 C25 21 39 23 48 42 Z"
        fill={leafColor}
      />
      {/* Right arched leaf */}
      <path
        d="M52 57 C58 48 74 38 82 27 C84 35 77 47 54 57 Z"
        fill={leafColor}
      />

      {/* Terracotta Pot Rim */}
      <rect
        x="22"
        y="58"
        width="56"
        height="10"
        rx="5"
        fill={potColor}
      />

      {/* Terracotta Pot Body */}
      <path
        d="M27 68 L32 86 C33 90 36 93 40 93 L60 93 C64 93 67 90 68 86 L73 68 Z"
        fill={potColor}
      />
    </svg>
  );
}

/**
 * GamlaWala Circular Stamp / Seal Badge
 * Dark Green circle with "GamlaWala" top arc, "Har Ghar Hariyali" bottom arc, and central white plant
 */
export function GamlaWalaSeal({
  className = 'w-24 h-24',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="GamlaWala Official Seal"
    >
      {/* Outer Circle Ring */}
      <circle cx="100" cy="100" r="96" fill="#0F3D28" stroke="#1B5E3B" strokeWidth="2" />
      <circle cx="100" cy="100" r="88" stroke="#F8F6EE" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
      <circle cx="100" cy="100" r="82" stroke="#F8F6EE" strokeWidth="1.5" />

      {/* Center Plant Mark (White) */}
      <g transform="translate(50, 50) scale(1)">
        {/* Central taller leaf */}
        <path
          d="M50 56 C46 42 42 22 55 9 C67 20 68 39 52 56 Z"
          fill="#FFFFFF"
        />
        {/* Left arched leaf */}
        <path
          d="M48 57 C38 48 20 38 18 25 C25 21 39 23 48 42 Z"
          fill="#FFFFFF"
        />
        {/* Right arched leaf */}
        <path
          d="M52 57 C58 48 74 38 82 27 C84 35 77 47 54 57 Z"
          fill="#FFFFFF"
        />
        {/* Pot Rim */}
        <rect x="22" y="58" width="56" height="10" rx="5" fill="#FFFFFF" />
        {/* Pot Body */}
        <path
          d="M27 68 L32 86 C33 90 36 93 40 93 L60 93 C64 93 67 90 68 86 L73 68 Z"
          fill="#FFFFFF"
        />
      </g>

      {/* Decorative leaf dots on left and right */}
      <path
        d="M26 100 C24 96 28 92 30 96 C30 100 28 102 26 100 Z"
        fill="#6BAF7B"
      />
      <path
        d="M174 100 C172 96 176 92 178 96 C178 100 176 102 174 100 Z"
        fill="#6BAF7B"
      />

      {/* Circular Text Paths */}
      <defs>
        <path
          id="topArc"
          d="M 32 100 A 68 68 0 0 1 168 100"
        />
        <path
          id="bottomArc"
          d="M 168 104 A 68 68 0 0 1 32 104"
        />
      </defs>

      <text
        fill="#F8F6EE"
        fontSize="15"
        fontWeight="800"
        letterSpacing="2"
        fontFamily="var(--font-poppins), system-ui, sans-serif"
      >
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          GamlaWala
        </textPath>
      </text>

      <text
        fill="#6BAF7B"
        fontSize="10"
        fontWeight="700"
        letterSpacing="2.5"
        fontFamily="var(--font-inter), system-ui, sans-serif"
      >
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
          Har Ghar Hariyali
        </textPath>
      </text>
    </svg>
  );
}

/**
 * GamlaWala Mobile App Icon (Squircle with cream background + plant mark)
 */
export function GamlaWalaAppIcon({
  className = 'w-16 h-16',
}: {
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl bg-[#F8F6EE] p-2 flex items-center justify-center shadow-lg border border-[#1B5E3B]/10 ${className}`}
    >
      <GamlaWalaMark className="w-full h-full" potColor="#D98B5A" leafColor="#1B5E3B" />
    </div>
  );
}

/**
 * Main GamlaWala Logo Component
 */
export function GamlaWalaLogo({
  variant = 'horizontal',
  className = '',
  size = 'md',
  showTagline = true,
}: GamlaWalaLogoProps) {
  const sizeMap = {
    sm: { mark: 'w-7 h-7', text: 'text-lg', sub: 'text-[9px]' },
    md: { mark: 'w-10 h-10', text: 'text-2xl', sub: 'text-[11px]' },
    lg: { mark: 'w-14 h-14', text: 'text-3xl', sub: 'text-xs' },
    xl: { mark: 'w-20 h-20', text: 'text-4xl', sub: 'text-sm' },
  }[size];

  // Icon only
  if (variant === 'icon-only') {
    return <GamlaWalaMark className={sizeMap.mark} />;
  }

  // App icon
  if (variant === 'app-icon') {
    return <GamlaWalaAppIcon className={sizeMap.mark} />;
  }

  // Circular Seal
  if (variant === 'badge') {
    return <GamlaWalaSeal className={sizeMap.mark} />;
  }

  // Inverted (White logo on dark background)
  if (variant === 'inverted') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <GamlaWalaMark
          className={sizeMap.mark}
          potColor="#FFFFFF"
          leafColor="#FFFFFF"
        />
        <div className="flex flex-col">
          <div className="flex items-center">
            <span
              className={`font-bold font-heading tracking-tight text-white leading-none ${sizeMap.text}`}
            >
              Gamla<span className="text-white">Wala</span>
            </span>
            {/* Delicate leaf accent on top of wordmark */}
            <svg
              className="w-3.5 h-3.5 -mt-3.5 -ml-0.5 text-white fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M17 8C8 10 5 19 5 19C5 19 14 19 18 13C19.5 10.5 19 9 17 8Z" />
            </svg>
          </div>
          {showTagline && (
            <div className="flex items-center gap-2 mt-1">
              <span className="h-[1px] w-3 bg-white/40" />
              <span
                className={`font-medium tracking-[0.2em] uppercase text-white/90 leading-tight ${sizeMap.sub}`}
              >
                Har Ghar Hariyali
              </span>
              <span className="h-[1px] w-3 bg-white/40" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Monochrome (Forest Green for all elements)
  if (variant === 'monochrome') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <GamlaWalaMark
          className={sizeMap.mark}
          potColor="#1B5E3B"
          leafColor="#1B5E3B"
        />
        <div className="flex flex-col">
          <div className="flex items-center">
            <span
              className={`font-bold font-heading tracking-tight text-[#1B5E3B] leading-none ${sizeMap.text}`}
            >
              GamlaWala
            </span>
            <svg
              className="w-3.5 h-3.5 -mt-3.5 -ml-0.5 text-[#1B5E3B] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M17 8C8 10 5 19 5 19C5 19 14 19 18 13C19.5 10.5 19 9 17 8Z" />
            </svg>
          </div>
          {showTagline && (
            <div className="flex items-center gap-2 mt-1">
              <span className="h-[1px] w-3 bg-[#1B5E3B]/40" />
              <span
                className={`font-semibold tracking-[0.2em] uppercase text-[#1B5E3B] leading-tight ${sizeMap.sub}`}
              >
                Har Ghar Hariyali
              </span>
              <span className="h-[1px] w-3 bg-[#1B5E3B]/40" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Stacked Logo (Centered icon above text)
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
        <GamlaWalaMark
          className={sizeMap.mark}
          potColor="#D98B5A"
          leafColor="#1B5E3B"
        />
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <span
              className={`font-bold font-heading tracking-tight text-[#1B5E3B] leading-none ${sizeMap.text}`}
            >
              Gamla<span className="text-[#0F3D28]">Wala</span>
            </span>
            <svg
              className="w-3.5 h-3.5 -mt-3.5 -ml-0.5 text-[#1B5E3B] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M17 8C8 10 5 19 5 19C5 19 14 19 18 13C19.5 10.5 19 9 17 8Z" />
            </svg>
          </div>
          {showTagline && (
            <div className="flex items-center gap-2 mt-1.5">
              <span className="h-[1px] w-4 bg-[#1B5E3B]/40" />
              <span
                className={`font-semibold tracking-[0.2em] uppercase text-[#1B5E3B] leading-tight ${sizeMap.sub}`}
              >
                Har Ghar Hariyali
              </span>
              <span className="h-[1px] w-4 bg-[#1B5E3B]/40" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: Primary Horizontal Lockup
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <GamlaWalaMark
        className={sizeMap.mark}
        potColor="#D98B5A"
        leafColor="#1B5E3B"
      />
      <div className="flex flex-col">
        <div className="flex items-center">
          <span
            className={`font-extrabold font-heading tracking-tight text-[#1B5E3B] leading-none ${sizeMap.text}`}
          >
            Gamla<span className="text-[#0F3D28]">Wala</span>
          </span>
          <svg
            className="w-3.5 h-3.5 -mt-3.5 -ml-0.5 text-[#1B5E3B] fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M17 8C8 10 5 19 5 19C5 19 14 19 18 13C19.5 10.5 19 9 17 8Z" />
          </svg>
        </div>
        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="h-[1px] w-3 bg-[#1B5E3B]/40" />
            <span
              className={`font-semibold tracking-[0.22em] uppercase text-[#1B5E3B] leading-tight ${sizeMap.sub}`}
            >
              Har Ghar Hariyali
            </span>
            <span className="h-[1px] w-3 bg-[#1B5E3B]/40" />
          </div>
        )}
      </div>
    </div>
  );
}
