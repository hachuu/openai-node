import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default async function (req, res) {
  const sentence = req.body.text || '';
  try {

    const prompt = `
      sentence : ${sentence}\n\n
      이 문장에서 질문이 송하영과 관련한 것인가? 맞으면 1, 아니면 0을 입력하세요.\n\n
    `
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    //공백제거
    console.log('response.data.choices[0].text : ', response.data.choices[0].text)
    const obj = response.data.choices[0].text.replace(/\s/g, '');
    const result = obj ? JSON.parse(obj) : null;
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