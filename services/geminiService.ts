import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateSpiritualImage = async (prompt: string): Promise<string | null> => {
  try {
    // Using 'gemini-2.5-flash-image' ("Nano Banana") as requested for image generation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `You are a spiritual art generator for a Gen Z church app.
          
          Task: Generate a spiritual, ethereal, and aesthetic background image based on the user's prompt: "${prompt}"
          
          STRICT CONSTRAINTS:
          1. The content MUST be spiritual, biblical, or peaceful nature-themed (e.g., cross, dove, light, mountains, abstract grace, worship atmosphere).
          2. If the user prompt is NOT spiritual (e.g., cars, violence, celebrities, random objects), IGNORE IT completely and generate a "Divine light breaking through cinematic clouds" abstract background instead.
          3. STYLE: 8k resolution, cinematic lighting, hyper-realistic or ethereal digital art, suitable for a website background. Soft, glowing, majestic.
          4. NO TEXT in the image.` }
        ]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export const generatePrayerResponse = async (request: string): Promise<string> => {
  try {
    // Using 'gemini-2.5-flash' for text generation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User's prayer request: "${request}". 
      Write a short, comforting, and encouraging prayer response for a Gen Z individual. 
      Keep it spiritual but relatable, warm, and hopeful. 
      IMPORTANT: You MUST include one specific Bible verse reference (Book Chapter:Verse) that relates to their situation at the end.
      Max 100 words.`,
    });
    return response.text || "May peace be with you. - Philippians 4:7";
  } catch (error) {
    console.error("Error generating prayer:", error);
    throw error;
  }
};

export const generateBibleVerse = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User wants a Bible verse about: "${topic}".
      Task: Provide 1-2 most relevant Bible verses (NIV, NKJV, or ESV).
      Format:
      "[Verse Text]" - Book Chapter:Verse

      Brief 1-sentence explanation or application for a Gen Z audience.
      Do not write a full prayer, just the verses and the brief explanation.`,
    });
    return response.text || "Your word is a lamp for my feet, a light on my path. - Psalm 119:105";
  } catch (error) {
    console.error("Error generating verse:", error);
    throw error;
  }
};
