import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  try {
    // beta version
    // const responseCompletion = await openai.createChatCompletion({
    // });
  } catch (error) {
    
  }
  
  res.status(200).json({ result: '' });
}