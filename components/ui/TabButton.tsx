
import React from 'react';
import type { LucideProps } from 'lucide-react';

interface TabButtonProps {
  Icon: React.ComponentType<LucideProps>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ Icon, label, isActive, onClick }) => {
  const activeClasses = 'border-blue-500 text-blue-600';
  const inactiveClasses = 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300';
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-semibold transition-colors duration-200 focus:outline-none ${isActive ? activeClasses : inactiveClasses}`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
};

export default TabButton;
