
import React, { useState, useCallback } from 'react';
import { ART_TYPES, ART_STYLES, ASPECT_RATIOS } from '../constants';
import { generateArtisticPhoto } from '../services/geminiService';
import FileInput from './ui/FileInput';
import SelectInput from './ui/SelectInput';
import TextArea from './ui/TextArea';
import Button from './ui/Button';
import LoadingSpinner from './ui/LoadingSpinner';
import ImageResult from './ui/ImageResult';

const CustomFeature: React.FC = () => {
    const [facePhoto, setFacePhoto] = useState<File | null>(null);
    const [artType, setArtType] = useState(ART_TYPES[0]);
    const [artStyle, setArtStyle] = useState(ART_STYLES[0]);
    const [instructions, setInstructions] = useState('');
    const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[0]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!facePhoto) {
            setError('Silakan unggah foto wajah terlebih dahulu.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const imageB64 = await generateArtisticPhoto(
                facePhoto,
                artType,
                artStyle,
                instructions,
                aspectRatio
            );
            setGeneratedImage(`data:image/png;base64,${imageB64}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat membuat foto.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [facePhoto, artType, artStyle, instructions, aspectRatio]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-slate-700">Custom Foto AI</h2>
            <p className="text-center text-slate-500">Ubah foto Anda menjadi karya seni yang unik dengan berbagai gaya.</p>

            <FileInput label="Unggah Foto Wajah" onFileChange={setFacePhoto} id="face-photo-custom" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectInput
                    label="Pilih Jenis"
                    value={artType}
                    onChange={(e) => setArtType(e.target.value)}
                    options={ART_TYPES}
                    id="art-type"
                />
                <SelectInput
                    label="Pilih Gaya"
                    value={artStyle}
                    onChange={(e) => setArtStyle(e.target.value)}
                    options={ART_STYLES}
                    id="art-style"
                />
            </div>
            
            <TextArea
                label="Instruksi (Opsional)"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Contoh: tambahkan kacamata hitam dan topi koboi"
                id="instructions"
            />
            
            <SelectInput
                label="Pilih Rasio"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                options={ASPECT_RATIOS}
                id="aspect-ratio"
            />
            
            <Button onClick={handleGenerate} disabled={isLoading || !facePhoto} fullWidth>
                {isLoading ? 'Berkreasi...' : 'Generate Foto'}
            </Button>
            
            {error && <p className="text-red-500 text-center">{error}</p>}
            
            {isLoading && <LoadingSpinner />}
            
            {generatedImage && <ImageResult imageData={generatedImage} />}
        </div>
    );
};

export default CustomFeature;
