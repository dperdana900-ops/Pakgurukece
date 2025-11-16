
import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type="text"
        id={id}
        {...props}
        className="mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default TextInput;
