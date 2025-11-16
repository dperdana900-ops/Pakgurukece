
import React, { useState, useCallback } from 'react';
import { BACKGROUND_COLORS, CLOTHING_MODES } from '../constants';
import { generateFormalPhoto } from '../services/geminiService';
import FileInput from './ui/FileInput';
import SelectInput from './ui/SelectInput';
import TextInput from './ui/TextInput';
import Button from './ui/Button';
import LoadingSpinner from './ui/LoadingSpinner';
import ImageResult from './ui/ImageResult';

const PhotographerFeature: React.FC = () => {
    const [facePhoto, setFacePhoto] = useState<File | null>(null);
    const [refPhoto, setRefPhoto] = useState<File | null>(null);
    const [backgroundColor, setBackgroundColor] = useState(BACKGROUND_COLORS[0]);
    const [clothingMode, setClothingMode] = useState(CLOTHING_MODES[0]);
    const [customClothing, setCustomClothing] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!facePhoto) {
            setError('Silakan unggah foto wajah terlebih dahulu.');
            return;
        }
        if (clothingMode === 'Lainnya' && !customClothing) {
            setError('Silakan isi deskripsi pakaian custom.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const imageB64 = await generateFormalPhoto(
                facePhoto,
                backgroundColor,
                clothingMode,
                customClothing,
                refPhoto || undefined
            );
            setGeneratedImage(`data:image/png;base64,${imageB64}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat membuat foto.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [facePhoto, backgroundColor, clothingMode, customClothing, refPhoto]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-slate-700">Sewa Fotografer AI</h2>
            <p className="text-center text-slate-500">Unggah foto wajah Anda dan kami akan siapkan foto formal sesuai kebutuhan.</p>
            
            <FileInput label="Unggah Foto Wajah" onFileChange={setFacePhoto} id="face-photo-photographer" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectInput
                    label="Pilih Warna Background"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    options={BACKGROUND_COLORS}
                    id="bg-color"
                />
                <SelectInput
                    label="Mode Pakaian Otomatis"
                    value={clothingMode}
                    onChange={(e) => setClothingMode(e.target.value)}
                    options={CLOTHING_MODES}
                    id="clothing-mode"
                />
            </div>

            {clothingMode === 'Lainnya' && (
                <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <TextInput
                        label="Pengaturan Pakaian Custom"
                        value={customClothing}
                        onChange={(e) => setCustomClothing(e.target.value)}
                        placeholder="Contoh: Kemeja batik lengan panjang warna biru"
                        id="custom-clothing"
                    />
                    <FileInput label="Unggah Foto Referensi (Opsional)" onFileChange={setRefPhoto} id="ref-photo" />
                </div>
            )}

            <Button onClick={handleGenerate} disabled={isLoading || !facePhoto} fullWidth>
                {isLoading ? 'Memproses...' : 'Generate Foto'}
            </Button>
            
            {error && <p className="text-red-500 text-center">{error}</p>}
            
            {isLoading && <LoadingSpinner />}
            
            {generatedImage && <ImageResult imageData={generatedImage} />}
        </div>
    );
};

export default PhotographerFeature;
