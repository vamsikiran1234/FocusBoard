import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  currentTabName?: string;
}

export const Header: React.FC<HeaderProps> = ({ currentTabName = 'Overview' }) => {
  return (
    <header className="w-full h-[68px] sm:h-[84px] bg-white/70 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 px-4 sm:px-8 flex items-center justify-between">
      {/* Breadcrumb Navigation on Desktop / Mobile Header Logo */}
      <div className="flex items-center gap-2 text-sm">
        <div className="lg:hidden flex items-center">
          <Logo
            size={34}
            textClassName="font-bold text-slate-900 text-lg"
            textOffsetClassName="translate-y-[1px]"
          />
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <span className="text-slate-400 font-medium">Workspace</span>
          <span className="text-slate-300 font-normal">/</span>
          <span className="text-slate-900 font-semibold">{currentTabName}</span>
        </div>
      </div>

      {/* User Avatar */}
      <div className="flex items-center gap-2">
        <div
          className="w-9 h-9 rounded-full bg-[#EEECFF] flex items-center justify-center text-[#6457F5] text-xs font-bold tracking-tight cursor-pointer hover:bg-[#E2DEFF] transition-colors"
          title="Logged in as John Doe"
          tabIndex={0}
          role="button"
          aria-label="User profile John Doe"
        >
          JD
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
      </div>
    </header>
  );
};
