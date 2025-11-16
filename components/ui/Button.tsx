
import React from 'react';
import { Sparkles } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, fullWidth = false, ...props }) => {
  return (
    <button
      {...props}
      className={`
        flex items-center justify-center
        px-6 py-3 border border-transparent
        text-base font-medium rounded-md shadow-sm
        text-white bg-blue-600 hover:bg-blue-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:bg-slate-400 disabled:cursor-not-allowed
        transition-all duration-200 ease-in-out
        ${fullWidth ? 'w-full' : ''}
      `}
    >
      <Sparkles className="h-5 w-5 mr-2 -ml-1" />
      {children}
    </button>
  );
};

export default Button;
