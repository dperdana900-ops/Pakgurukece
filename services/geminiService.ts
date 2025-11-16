
import { GoogleGenAI, Modality } from "@google/genai";

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const getGeminiResponse = async (imagePart: any, prompt: string): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [imagePart, { text: prompt }],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    const firstPart = response.candidates?.[0]?.content?.parts?.[0];
    if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
        return firstPart.inlineData.data;
    }
    throw new Error("Could not extract image data from Gemini response.");
};


export const generateFormalPhoto = async (
    facePhoto: File,
    backgroundColor: string,
    clothingMode: string,
    customClothing?: string,
    referencePhoto?: File
) => {
    let clothingDescription = clothingMode;
    if (clothingMode.toLowerCase() === 'lainnya' && customClothing) {
        clothingDescription = customClothing;
    }
    
    let prompt = `Given the person in this photo, please edit it according to these instructions. Do not change the person's face or identity. The background should be a solid ${backgroundColor.toLowerCase()} color. The person should be wearing: ${clothingDescription}. Ensure the final image looks professional and realistic, suitable for a formal photo.`;

    const facePhotoPart = await fileToGenerativePart(facePhoto);
    const parts: any[] = [facePhotoPart];

    if (referencePhoto) {
        const refPhotoPart = await fileToGenerativePart(referencePhoto);
        parts.push(refPhotoPart);
        prompt += " Use the second image as a reference for the clothing style."
    }
    parts.push({text: prompt})


     if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: { responseModalities: [Modality.IMAGE] }
    });
    
    const firstPart = response.candidates?.[0]?.content?.parts?.[0];
    if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
        return firstPart.inlineData.data;
    }
    throw new Error("Could not extract image data from Gemini response.");
};

export const generateArtisticPhoto = async (
    facePhoto: File,
    artType: string,
    artStyle: string,
    instructions: string,
    aspectRatio: string
) => {
    const facePhotoPart = await fileToGenerativePart(facePhoto);
    const prompt = `Transform the person in this photo into a work of art. The final image should be a ${artType.toLowerCase()} in a ${artStyle.toLowerCase()} style. ${instructions}. The aspect ratio of the final image must be ${aspectRatio}. Do not change the person's core facial features, but reinterpret them in the requested artistic style.`;
    
    return getGeminiResponse(facePhotoPart, prompt);
};
