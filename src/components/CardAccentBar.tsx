import React from 'react';

interface CardAccentBarProps {
  className?: string;
  height?: string;
}

export const CardAccentBar: React.FC<CardAccentBarProps> = ({ className = '', height = 'h-[5px]' }) => {
  return (
    <div className={`w-full overflow-hidden ${height} flex rounded-t-[inherit] ${className}`} aria-hidden="true">
      {/* Signature Bank of America Red (~58% width) */}
      <div className="w-[58%] h-full bg-[#d02b33]" />
      {/* Signature Bank of America Navy Blue (~42% width) */}
      <div className="w-[42%] h-full bg-[#012169]" />
    </div>
  );
};
