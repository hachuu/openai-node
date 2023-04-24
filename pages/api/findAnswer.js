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
    const answer = req.body.correctAnswer;
    const text = req.body.text;

    const prompt = 
    `
      스무고개 게임 시작!
      정답은 ${answer}입니다.
      사용자가 질문할 때마다, 당신은 그에게 답변을 해주어야 합니다.
      사용자가 '${answer}'을 언급하면 '정답입니다!'라고 답변해주세요.
      사용자가 질문하는 내용을 입력해주세요:

      사용자: 이 동물은 포유류인가요?
      AI: (포유류인 경우) 네, 포유류입니다. / (아닌 경우) 아니요, 포유류가 아닙니다.
      사용자: ${text}
      AI: 
    `
    // `
    //   스무고개 게임 정답은 ${answer}이고, 사용자는 답을 몰라.
    //   너는 ${answer}을 알려주면 안되고 사용자가 입력한 질문에 맞게 답변을 해줘.
    //   질문: ${text}
    //   AI:
    // `

    console.log('findAnswer prompt : ', prompt)

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 1000,
      temperature: 0.5,
      // top_p: 1.0,
      // presence_penalty: -1.0,
      // frequency_penalty: -1.0,
      // best_of: 2,
      stop: ['\n\n', '\n', 'AI:'],
      // n: 1,
      // stream: false,
      presence_penalty: 0,
      frequency_penalty: 0,
      best_of: 1,
      user: "curious-ai-hy",
    });
    console.log('스무고개 질문에 대한 답 : ', completion.data);
    
    //answer 여러개 있을 수 있음
    const pattern = new RegExp(answer, 'g');
    const removeAnswer = 'O'.repeat(answer.length);
    const result = completion.data.choices[0].text.replace(pattern, removeAnswer);
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

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}
