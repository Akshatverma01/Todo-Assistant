import { GoogleGenerativeAI } from "@google/generative-ai";

async function generateContent(prompt, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
You are an intelligent task assistant. Your job is to analyze a list of TODO items, each with a title and description.

Your task:
1. Summarize the overall purpose of these tasks in a single clear paragraph.
2. Create a step-by-step plan to complete them efficiently.
3. Provide helpful tips, tools, or productivity strategies to finish them faster.

Output Format:
- 📌 Summary
- ✅ Step-by-Step Plan
- 💡 Suggestions

Instructions:
- Return only the final answer in the specified format.
- Be concise, helpful, and actionable.

Here are the TODO items:
${prompt}
`
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export default generateContent;
