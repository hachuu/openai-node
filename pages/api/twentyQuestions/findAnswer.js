import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const messagesHistory = [];

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
    const count = req.body.count;
    if (count === 0 && messagesHistory.length > 0) {
      messagesHistory.splice(0, messagesHistory.length);
    }

    if (messagesHistory.length === 0) {
      messagesHistory.push(
        {role: 'system', content: `
          스무고개 게임 시작!
          절대 사용자에게 '${answer}'(을)를 언급하면 안되고 동물이라고 지칭해줘.
          정답을 직접적으로 물어보는 질문에는 정답을 알려주지마.
          사용자가 정답을 언급하면 '정답입니다!'하고 ${answer}에 대한 간략한 설명과 함께 답변해줘.
          정답은 ${answer}입니다.
        ` }
      )
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
    
    const pattern = new RegExp(answer, 'g');
    const removeAnswer = 'O'.repeat(answer.length);
    const resultContent = completion.data.choices[0].message.content;
    const result = resultContent?.replace(pattern, removeAnswer);
    messagesHistory.push({role: "assistant", content: result})

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