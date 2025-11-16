
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center text-center">
            <Sparkles className="text-blue-500 h-8 w-8 mr-3" />
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                AI Photo Generator
            </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
