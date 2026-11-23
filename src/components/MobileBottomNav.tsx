import React from 'react';
import { LayoutGrid, ListTodo, Calendar, Settings } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onTabChange,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'tasks', label: 'Tasks', icon: ListTodo },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-2 z-30 flex items-center justify-around shadow-lg"
      aria-label="Mobile Bottom Navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className="flex flex-col items-center justify-center py-1 px-3 relative group"
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon
              className={`w-5 h-5 transition-colors ${
                isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'
              }`}
            />
            <span
              className={`text-[10px] mt-1 transition-colors ${
                isActive ? 'text-brand-600 font-bold' : 'text-slate-400'
              }`}
            >
              {item.label}
            </span>
            {isActive && (
              <span className="absolute -bottom-1 w-8 h-0.5 bg-brand-600 rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
