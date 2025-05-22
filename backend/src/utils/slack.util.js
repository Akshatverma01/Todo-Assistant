import axios from "axios"
import { text } from "express";

const postToSlack = async(summary)=>{
    try {
        const slackWebhookUrl = process.env.WEBHOOK_URL;

        await axios.post(slackWebhookUrl,{
            text:`*The summarized todo list are :* \n ${summary}`
        });

    } catch (error) {
        
    }
}

export default postToSlack;