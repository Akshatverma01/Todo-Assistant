import postToSlack from "../utils/slack.util.js";
import generateContent from "../service/ai.service.js"

export const summarize = async (req, res) => {
    const apiKey =process.env.GEMINI_API_KEY

    const { incompleteTodo } = req.body;
    try {

        // convert todo object into points for easy processing
        const summaryTodo = incompleteTodo.map(todo => `${todo.title} :${todo.text}`).join("\n");
      
        const response = await generateContent(summaryTodo,apiKey);
        if (response ) {
            await postToSlack(response)
        }
        return res.status(200).json({ data: response });

    } catch (error) {
        return res.status(500).json({
            error: error.message || "Internal Server Error"
        });
    }
}
