import OpenAI from "openai";
// const client = new OpenAI();

const generateSummary = async (summaryData, apiKey) => {
    const client = new OpenAI({ apiKey });
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "user",
                    content: `I have list of incomplete todo's as ${summaryData} and I want a meaningful summary of all these todo. Generate me a meaningful summary for all these incomplete todo/tasks.`,
                }
            ]

        });
        return response.choices[0].message.content;

    } catch (error) {
        return new Error(error)
    }

}


export default generateSummary;
