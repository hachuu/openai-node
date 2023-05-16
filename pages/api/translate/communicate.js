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

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
      temperature: 0.5,
      stop: ['\n\n', '\n', 'AI:'],
      messages: messagesHistory
    });
    
    const resultContent = completion.data.choices[0].message.content;
    res.status(200).json({ result: resultContent });
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

// {
//   "messagesHistory": [
//       {
//           "role": "system",
//           "content": "영어 회화연습을 하고 싶습니다. 커피숍에서 대화를 이어나가고 싶은데 먼저 대화를 시작해 주세요"
//       },
//       {
//           "role": "user",
//           "content": "I'm so happy to meet you. what's going on?"
//       },
//       {
//           "role": "assistant",
//           "content": "Hi there! I'm doing pretty well, thanks for asking. How about you? Would you like to grab a cup of coffee and chat for a bit?"
//       },
//       {
//           "role": "user",
//           "content": "Sure! why not. Let's order some coffee and chips."
//       },
//       {
//           "role": "assistant",
//           "content": "Great idea! What kind of coffee do you like? We have a variety of options such as drip coffee, lattes, cappuccinos, and more. And for the chips, do you prefer something salty or sweet?"
//       },
//       {
//           "role": "user",
//           "content": "I like to want to order an ice drip coffee. Also I like salty chips."
//       }
//   ]
// }