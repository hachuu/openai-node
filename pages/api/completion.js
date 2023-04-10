import { Configuration, OpenAIApi } from 'openai';
import { Embedding } from 'openai';
import fs from 'fs';
import { createReadStream } from 'fs';
import path from 'path';
import csv from 'csv-parser';
import {titleObjs} from '../../public/file/exportjson.js';

const dotProduct = (a, b) => a.map((x, i) => x * b[i]).reduce((m, n) => m + n);

const magnitude = (vector) => Math.sqrt(dotProduct(vector, vector));

const cosineSimilarity = (a, b) => dotProduct(a, b) / (magnitude(a) * magnitude(b));
const similarityPastEmbeddings = {};
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration); 

//topResults 중에서 가장 similarity가 높은 것과 유사하게 completion 생성
function contextQuestionOfTopResult (embeddingsData, vector, temptxt, type) {

  if (!Object.keys(embeddingsData).length) return {context: '', question: ''};
  const similarity = Object.entries(embeddingsData).map(([key, value]) => [key, cosineSimilarity(value, vector)]);
  let sortedSimilarity = similarity.sort((a, b) => b[1] - a[1]);
  console.log('context에 대한 sortedSimilarity : ', [...sortedSimilarity].map(([key, value]) => value));
  // sortedSimilarity = [...sortedSimilarity].filter((item) => item[1] > 0.80);
  console.log('context에 대한 sortedSimilarity : ', sortedSimilarity);
  const sliceIdx = sortedSimilarity.length > 10 ? 10 : sortedSimilarity.length;
  const topResults = sortedSimilarity.slice(0, sliceIdx).map(([key, value]) => ({ text: key, similarity: value }));
  const question = temptxt;
  const context = topResults.map((result) => result.text).join('\n');
  return {context, question};
}

function titleOfTopResult (embeddingsData, vector) {
  if (!Object.keys(embeddingsData).length) return {context: '', question: ''};
  const similarity = Object.entries(embeddingsData).map(([key, value]) => [key, cosineSimilarity(value, vector)]);
  let sortedSimilarity = similarity.sort((a, b) => b[1] - a[1]);
  console.log('title에 대한 sortedSimilarity : ', sortedSimilarity);
  // sortedSimilarity = [...sortedSimilarity].filter((item) => item[1] > 0.85);
  const sliceIdx = 1;
  const topResults = sortedSimilarity.slice(0, sliceIdx).map(([key, value]) => ({ text: key, similarity: value }));
  const context = topResults.map((result) => result.text).join('\n');
  return context;
}

export default async function (req, res) {
  const titles = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'subjects', 'title', 'embeddings_title_result.json'), 'utf8'));
  const temptxt = req.body.text || '';
  const keyword = req.body.keyword || '';

  console.log('keyword', keyword)

  const keywordEmbedding = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: keyword,
  })

  const responseEmbedding = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: temptxt,
  })
  const vector = responseEmbedding.data.data[0].embedding;
  const keywordVector = keywordEmbedding.data.data[0].embedding;
  const titleOfEmbeddings = titleObjs;

  // const past = contextQuestionOfTopResult(similarityPastEmbeddings, vector, temptxt, 'past');
  const title = titleOfTopResult(titles, keywordVector);
  const embeddings = titleOfEmbeddings[title] || {};
  const {context, question} = contextQuestionOfTopResult(embeddings, vector, temptxt, 'dataset');
  const prompt = 
  `
    The following is a conversation with AI 송하영.
    The AI is helpful, creative, clever, and very friendly.
    You are going to answer the question by the context. If there is no context, you lead the conversation naturally.
    Human: Hello, who are you?
    AI: 저는 송하영과 오랜 친구, 송하영 AI 입니다. 무엇을 도와드릴까요?
    \n\nContext: ${context}\n\n---\n\n
    Human: ${question || temptxt}.
    AI:
  `
  console.log('#################################################################### title : ', title)
  console.log(prompt);

  const responseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 1000,
    temperature: 0.4,
    // top_p: 1.0,
    // presence_penalty: -1.0,
    // frequency_penalty: -1.0,
    // best_of: 2,
    stop: ['\n\n', '\n', 'Answer:'],
    // n: 1,
    // stream: false,
    presence_penalty: 0,
    frequency_penalty: 0,
    best_of: 1,
    user: "curious-ai-hy",
  });
  // console.log('responseCompletion : ', responseCompletion.data);

  similarityPastEmbeddings[temptxt] = vector;
  console.log('####################################################################')
  console.log('the question is : ', question);
  console.log('the answer is : ', responseCompletion.data.choices[0].text);

  const regex = /{p\d+-p\d+}/g;
  const resultTxt = responseCompletion.data.choices[0].text ? responseCompletion.data.choices[0].text.replace(regex, '') : '저도 그 부분에 대해서는 잘 모르겠어요.';

  res.status(200).json({ result: resultTxt });
}