
import React, { useState, useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface FileInputProps {
  label: string;
  id: string;
  onFileChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ label, id, onFileChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    onFileChange(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };
  
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    onFileChange(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <div 
        onClick={handleContainerClick}
        className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-blue-500 transition-colors duration-200 relative h-48"
      >
        {preview ? (
            <>
                <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-md" />
                <button onClick={handleRemoveFile} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100 text-red-500 transition-all">
                    <X size={20}/>
                </button>
            </>
        ) : (
          <div className="space-y-1 text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
            <div className="flex text-sm text-slate-600">
              <span className="font-semibold text-blue-600">Unggah file</span>
              <p className="pl-1">atau seret dan lepas</p>
            </div>
            <p className="text-xs text-slate-500">PNG, JPG, WEBP hingga 10MB</p>
          </div>
        )}
        <input id={id} name={id} type="file" ref={fileInputRef} className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
      </div>
    </div>
  );
};

export default FileInput;
