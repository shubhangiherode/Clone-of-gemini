import { GoogleGenerativeAI } from "@google/generative-ai";

/*const apiKey = process.env.GEMINI_API_KEY;*/

const apiKey = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyDgqgWjunWLLlI0hjwfLTWQxtxTysm7zmA");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function runChat(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);

  //const response may remove
  const response = result.response;

  console.log(result.response.text());
  return response.text();
}

export default runChat;
