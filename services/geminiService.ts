import { GoogleGenAI } from "@google/genai";
import type { Level } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getAiHint = async (challenge: string, table: Level['table']): Promise<string> => {
    const tableString = `Headers: ${table.headers.join(', ')}\nRows:\n${table.rows.map(row => row.join(', ')).join('\n')}`;
    const prompt = `
        You are an expert and friendly Excel tutor for a game called "Excel Saga".
        A user is stuck on a level. Your task is to provide a helpful and encouraging hint.
        DO NOT give the final formula or the direct answer.
        Instead, guide the user's thinking process. Ask them questions, suggest which function to think about, or remind them of a key concept. Keep the hint concise (2-3 sentences).
        The user's interface is in Indonesian, so please provide the hint in INDONESIAN.

        Here is the level information:
        Challenge: "${challenge}"
        Table Data:
        ${tableString}

        Provide a hint for this challenge:
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error getting AI hint:", error);
        return "Maaf, AI sedang sibuk. Coba lagi nanti atau gunakan petunjuk standar.";
    }
}

export const geminiService = {
    getAiHint,
};
