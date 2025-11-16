
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="text-slate-600 font-semibold">AI sedang bekerja, mohon tunggu...</p>
    </div>
  );
};

export default LoadingSpinner;
