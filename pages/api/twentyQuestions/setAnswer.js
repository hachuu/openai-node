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

    const level = req.body.level;

    const prompt = 
    `
    당신은 스무고개 게임의 AI입니다.
    게임의 주제는 '동물'입니다. '동물' 중에서 하나를 선택하세요.
    선택한 난이도는 ${level}입니다.
    난이도에 맞게 정답을 생각해주세요.

    정답: 
    `

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 1000,
      temperature: 0.9,
      // top_p: 1.0,
      // presence_penalty: -1.0,
      // frequency_penalty: -1.0,
      // best_of: 2,
      // stop: ['\n\n', '\n', 'Answer:'],
      // n: 1,
      // stream: false,
      presence_penalty: 0,
      frequency_penalty: 0,
      best_of: 1,
      // user: "curious-ai-hy",
    });
    console.log('정답은 ', completion.data.choices[0].text, '(이)야')

    const answer = completion.data.choices[0].text.replace(/\s/g, '');
    res.status(200).json({ result: answer });
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
