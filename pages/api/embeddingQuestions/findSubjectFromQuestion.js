import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default async function (req, res) {

  const sentence = req.body.text || '한글 문장에서 주어와 목적어를 추출하는 예제입니다.';
  try {

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Extract keywords from this text:\n\n${sentence}\n\nTl;dr`,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.8,
      presence_penalty: 0.0,
    });

    console.log('28 ', response.data.choices[0].text);
    const result = response.data.choices[0].text.replace(/\n/g, ' ');
    res.status(200).json({ result });
    
  } catch(error) {
    console.log('error ?????????????????' , error);
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