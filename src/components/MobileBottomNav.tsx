import React from 'react';
import {
  OverviewIcon,
  TasksIcon,
  CalendarIcon,
  SettingsIcon,
} from './NavIcons';

interface MobileBottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onTabChange,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: OverviewIcon },
    { id: 'tasks', label: 'Tasks', icon: TasksIcon },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-30 pt-4 pb-3.5 px-4 flex items-center justify-around shadow-sm"
      aria-label="Mobile Bottom Navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className="flex flex-col items-center justify-center min-w-[64px] cursor-pointer group focus:outline-none"
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon
              className={`w-6 h-6 transition-colors ${
                isActive ? 'text-[#6457F5]' : 'text-slate-400 group-hover:text-slate-600'
              }`}
            />
            <span
              className={`text-xs mt-2 transition-colors select-none ${
                isActive ? 'text-[#6457F5] font-semibold' : 'text-slate-400 font-medium'
              }`}
            >
              {item.label}
            </span>

            {/* Active Indicator Bar with generous spacing from label and bottom */}
            <div className="h-[3px] mt-2.5 flex items-center justify-center w-full">
              {isActive ? (
                <span className="w-11 h-[3px] bg-[#6457F5] rounded-full block" />
              ) : (
                <span className="w-11 h-[3px] opacity-0 block" />
              )}
            </div>
          </button>
        );
      })}
    </nav>
  );
};
