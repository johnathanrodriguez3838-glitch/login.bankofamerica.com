import React from 'react';

interface BofALogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  monochrome?: boolean;
}

export const BofALogo: React.FC<BofALogoProps> = ({ className = '', size = 'md', monochrome = false }) => {
  const heights = {
    sm: 'h-5',
    md: 'h-6',
    lg: 'h-8',
  };

  const textSizes = {
    sm: 'text-sm tracking-wider',
    md: 'text-base tracking-wider',
    lg: 'text-xl tracking-widest',
  };

  const flagWidth = size === 'sm' ? 'w-6 h-4' : size === 'lg' ? 'w-9 h-6' : 'w-7 h-5';

  return (
    <div className={`flex items-center gap-2.5 select-none font-bold ${className}`}>
      <span
        className={`font-sans font-extrabold ${textSizes[size]} ${
          monochrome ? 'text-white' : 'text-[#012169]'
        }`}
        style={{ letterSpacing: '0.08em' }}
      >
        BANK OF AMERICA
      </span>

      {/* Iconic Bank of America 6-stripe flag mark */}
      <svg
        viewBox="0 0 32 22"
        className={`${flagWidth} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Bank of America Emblem"
      >
        {/* Left red stripes angled */}
        <path d="M4 1L0 7H9L13 1H4Z" fill={monochrome ? '#ffffff' : '#d02b33'} />
        <path d="M3 8.5L0 13H9L12 8.5H3Z" fill={monochrome ? '#ffffff' : '#d02b33'} />
        <path d="M2 15L0 18H9L11 15H2Z" fill={monochrome ? '#ffffff' : '#d02b33'} />
        <path d="M1 19.5L0 21H9L10 19.5H1Z" fill={monochrome ? '#ffffff' : '#d02b33'} />

        {/* Right blue stripes angled */}
        <path d="M16 1L12 7H21L25 1H16Z" fill={monochrome ? '#ffffff' : '#012169'} />
        <path d="M15 8.5L12 13H21L24 8.5H15Z" fill={monochrome ? '#ffffff' : '#012169'} />
        <path d="M14 15L12 18H21L23 15H14Z" fill={monochrome ? '#ffffff' : '#012169'} />
        <path d="M13 19.5L12 21H21L22 19.5H13Z" fill={monochrome ? '#ffffff' : '#012169'} />

        {/* Far right accents */}
        <path d="M28 1L24 7H31L32 5.5V1H28Z" fill={monochrome ? '#ffffff' : '#d02b33'} />
        <path d="M27 8.5L24 13H32V8.5H27Z" fill={monochrome ? '#ffffff' : '#012169'} />
        <path d="M26 15L24 18H32V15H26Z" fill={monochrome ? '#ffffff' : '#d02b33'} />
      </svg>
    </div>
  );
};
