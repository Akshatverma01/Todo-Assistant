import generateSummary from "../service/summary.client.js";
import postToSlack from "../utils/slack.util.js";

export const summarize = async (req, res) => {

    const apiKey = process.env.OPEN_API_KEY;

    const { incompleteTodo } = req.body;

    try {

        if (!incompleteTodo || incompleteTodo.length === 0) {
            return res.status(400).json({
                message: "Missing in-complete todo items."
            })
        }

        // convert todo object into points for easy processing
        const summaryTodo = incompleteTodo.map(todo => `${todo.title} :${todo.description}`).join("\n")

        // call the llm to generate summary
        const response = await generateSummary(summaryTodo, apiKey);

        console.log(response);
        if (response && response.data) {
            await postToSlack(response.message)
        }

        return res.status(200).json({data:response.choices[0].message.content});

    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
}
