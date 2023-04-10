import { Configuration, OpenAIApi } from "openai";
import { Embedding } from 'openai';
import fs from 'fs';
import { createReadStream } from 'fs';
import path from 'path';
import csv from 'csv-parser';
import pdfkit from 'pdfkit';

// const embeddingClass = new Embedding({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const dotProduct = (a, b) => a.map((x, i) => x * b[i]).reduce((m, n) => m + n);

const magnitude = (vector) => Math.sqrt(dotProduct(vector, vector));

const cosineSimilarity = (a, b) => dotProduct(a, b) / (magnitude(a) * magnitude(b));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function embedding(file) {
  const embeddings = {};
  await fs.createReadStream(path.join(process.cwd(), `./public/subjects/csv/${file}.csv`))
  .pipe(csv())
  .on('data', async (row) => {
    // csv 파일의 첫번째 행은 header 정보를 기반으로 하고, 각 행의 객체에 "text"라는 키가 포함되도록 파싱을 진행한다.
    embeddings[row.context] = [];
  })
  .on('end', async () => {
    console.log('Embeddings loaded');
  }, openai)
  .on('close',
    async () => {
      console.log('🎆🎈               Embeddings closed');
      console.log('file name : ', file);
      for (const [key, value] of Object.entries(embeddings)) {
        const csvEmbedding = await openai.createEmbedding({
          model: "text-embedding-ada-002",
          input: key,
          user: "curious-ai-hy",
        })
        const vector = csvEmbedding.data.data[0].embedding;
        embeddings[key] = vector;
      }
      fs.writeFileSync(`./public/subjects/embeddings/${file}_result.json`, JSON.stringify(embeddings));
    }
  );
}

export default async function (req, res) {

  // const embeddingJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'shy_test.json'), 'utf8'));
  // if (embeddingJSON) {
  //   res.status(200).json({ result: 'exist' });
  //   return;
  // }
  //public/subjects안의 csv 파일들을 읽어서 각각의 csv 파일에 대한 embedding을 생성한다.
  const jsonFiles = fs.readdirSync(path.join(process.cwd(), 'public', 'subjects', 'embeddings'));
  const subjectFiles = fs.readdirSync(path.join(process.cwd(), 'public', 'subjects', 'csv'));
  const existFiles = jsonFiles.filter((file) => file.includes('.json'));
  const csvFiles = subjectFiles.filter((file) => file.includes('.csv'));
  try {
    for (const file of csvFiles) {
      // 만약에 이미 embedding이 완료된 파일이라면, 다음 파일로 넘어간다.
      const fileName = file.split('.')[0];
      if (existFiles.includes(`${fileName}_result.json`)) {
        continue;
      }
      await embedding(fileName);
    }
    res.status(200).json({ result: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: 'fail' });
  }
}