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

    if (req.method === 'OPTIONS') {
      // OPTIONS 요청에 대한 헤더 처리
      res.status(200)
        .setHeader('Access-Control-Allow-Origin', process.env.VUE_APP_TB_DOMAIN)
        .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        .setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept, crossDomain, withCredentials, SameSite, Set-Cookie')
        .setHeader('Origin', process.env.VUE_APP_TB_DOMAIN)
        .setHeader('Access-Control-Allow-Credentials', 'true');
      res.end();
    } else {
      const lang = req.body.targetLanguage || JSON.parse(req.body).targetLanguage ;
      const text = req.body.text || JSON.parse(req.body).text ;

      const prompt = 
      `
      제 말을 ${lang}언어로 번역해 주세요.
      번역할 문장: ${text}
      번역:
      `

      console.log(prompt);
      console.log(req.body)

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
      const answer = completion.data.choices[0].text;
      res.status(200).json({ result: answer });
    }
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