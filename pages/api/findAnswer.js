import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const messagesHistory = [{role: 'assistant', content: `
  스무고개 게임 시작!
  절대 사용자에게 정답을 언급하면 안됩니다.
  사용자가 질문할 때마다, 당신은 그에게 답변을 해주어야 합니다.
  사용자가 정답을 언급하면 '정답입니다!'라고 답변해주세요.
` }];

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
    const answer = req.body.correctAnswer;
    const text = req.body.text;

    
    // `
    //   스무고개 게임 정답은 ${answer}이고, 사용자는 답을 몰라.
    //   너는 ${answer}을 알려주면 안되고 사용자가 입력한 질문에 맞게 답변을 해줘.
    //   질문: ${text}
    //   AI:
    // `
    if (messagesHistory.length === 1) {
      messagesHistory.push({role: "assistant", content: `정답은 ${answer}입니다.`})
    }

    messagesHistory.push({role: "user", content: text})
    
    console.log('findAnswer messagesHistory : ', messagesHistory);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
      temperature: 0.5,
      stop: ['\n\n', '\n', 'AI:'],
      messages: messagesHistory
    });
    console.log('스무고개 질문에 대한 답 : ', completion.data, completion.data.choices[0].message.content);
    
    //answer 여러개 있을 수 있음
    const pattern = new RegExp(answer, 'g');
    const removeAnswer = 'O'.repeat(answer.length);
    const result = completion.data.choices[0].message.content?.replace(pattern, removeAnswer);
    messagesHistory.push({role: "system", content: result})

    const success = result.includes('정답입니다!');

    res.status(200).json({ result, success });
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
// model: "gpt-3.5-turbo",
//       prompt,
//       max_tokens: 1000,
//       temperature: 0.5,
//       // top_p: 1.0,
//       // presence_penalty: -1.0,
//       // frequency_penalty: -1.0,
//       // best_of: 2,
//       stop: ['\n\n', '\n', 'AI:'],
//       // n: 1,
//       // stream: false,
//       presence_penalty: 0,
//       frequency_penalty: 0,
//       best_of: 1,
//       user: "curious-ai-hy",
