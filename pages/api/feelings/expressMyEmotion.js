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
      // res.setHeader('Access-Control-Allow-Origin', process.env.VUE_APP_TB_DOMAIN)
      //   .setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
      //   .setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept, crossDomain, withCredentials, SameSite, Set-Cookie')
      //   .setHeader('Origin', process.env.VUE_APP_TB_DOMAIN)
      //   .setHeader('Access-Control-Allow-Credentials', 'true');
      
      const userMessage = req.body.consolation;
      const messages = [
        {
            "role": "system",
            "content": "당신은 다정한 사람입니다. user의 고민에 대해 다정하게 대답을 해주세요."
        },
        {
            "role": "user",
            "content": userMessage
        },
      ]

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        max_tokens: 500,
        temperature: 0.5,
        stop: ['\n\n', '\n', 'AI:'],
        messages
      });
      
      const resultContent = completion.data.choices[0].message.content;
      console.log(resultContent)
      res.status(200).json({ result: resultContent });
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