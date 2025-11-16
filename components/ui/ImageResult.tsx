
import React from 'react';
import { Download } from 'lucide-react';

interface ImageResultProps {
  imageData: string;
}

const ImageResult: React.FC<ImageResultProps> = ({ imageData }) => {
  return (
    <div className="mt-6 border-t pt-6 space-y-4">
        <h3 className="text-xl font-bold text-center text-slate-700">Hasil Foto Anda</h3>
        <div className="relative group w-full max-w-lg mx-auto bg-slate-200 rounded-lg shadow-inner overflow-hidden">
            <img src={imageData} alt="Generated" className="w-full h-auto object-contain" />
        </div>
        <div className="flex justify-center">
            <a
                href={imageData}
                download="foto_hasil_ai.png"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
                <Download className="h-5 w-5 mr-2" />
                Unduh Foto
            </a>
        </div>
    </div>
  );
};

export default ImageResult;
