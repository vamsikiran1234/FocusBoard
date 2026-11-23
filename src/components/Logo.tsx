import React from 'react';

interface LogoProps {
  size?: number | string;
  className?: string;
  showText?: boolean;
  textClassName?: string;
  textOffsetClassName?: string;
}

export const LogoIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Outer rounded squircle container */}
      <rect
        width="40"
        height="40"
        rx="11.5"
        fill="#5548EB"
      />
      {/* Top-Left: Solid White Squircle */}
      <rect
        x="10.5"
        y="10.5"
        width="8"
        height="8"
        rx="2.5"
        fill="#FFFFFF"
      />
      {/* Top-Right: Solid White Squircle */}
      <rect
        x="21.5"
        y="10.5"
        width="8"
        height="8"
        rx="2.5"
        fill="#FFFFFF"
      />
      {/* Bottom-Left: Solid White Squircle */}
      <rect
        x="10.5"
        y="21.5"
        width="8"
        height="8"
        rx="2.5"
        fill="#FFFFFF"
      />
      {/* Bottom-Right: Lavender / Translucent Squircle (Focus Indicator) */}
      <rect
        x="21.5"
        y="21.5"
        width="8"
        height="8"
        rx="2.5"
        fill="#B8B0FF"
        fillOpacity="0.85"
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  size = 40,
  className = '',
  showText = true,
  textClassName = 'text-xl font-bold tracking-tight text-slate-900 font-sans',
  textOffsetClassName = '-translate-y-1',
}) => {
  const numericSize = typeof size === 'number' ? size : 40;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon size={numericSize} />
      {showText && (
        <span
          className={`inline-block leading-none ${textOffsetClassName} select-none transition-transform ${textClassName}`}
        >
          FocusBoard
        </span>
      )}
    </div>
  );
};
