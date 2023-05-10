import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  try {
    const messagesHistory = req.body.messagesHistory;
    const answer = req.body.correctAnswer;
    // const text = req.body.text;
    const count = req.body.count;
    const category = req.body.category;

    console.log(messagesHistory)

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
      temperature: 0.5,
      stop: ['\n\n', '\n', 'AI:'],
      messages: messagesHistory
    });
    
    const pattern = new RegExp(answer, 'g');
    const removeAnswer = 'O'.repeat(answer.length);
    const resultContent = completion.data.choices[0].message.content;
    const result = resultContent?.replace(pattern, removeAnswer);
    
    const success = result.includes('정답입니다!');
    if (success) {
      // messageHistory비우기
      messagesHistory.splice(0, messagesHistory.length);
      res.status(200).json({ result: resultContent, success });
      return;
    }
    res.status(200).json({ result: result, success });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}