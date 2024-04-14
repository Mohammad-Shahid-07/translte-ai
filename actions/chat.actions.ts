"use server";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
  HarmProbability,
} from "@google/generative-ai";
export async function sendMessage(
  message: string,
  tone: string,
  language: string,
) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMNI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `you have to translate whatever I say to ${language} in tone ${tone}. Please ensure that you only translate my words and do not add anything else to the translation.`,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: `I will translate whatever you say to ${language} in tone ${tone}. I'll make sure to only translate your words and not add anything extra.`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 200,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        // {
        //   category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        //   threshold: HarmBlockThreshold.BLOCK_NONE,
        // },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });


    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.log(error);
  }
}
