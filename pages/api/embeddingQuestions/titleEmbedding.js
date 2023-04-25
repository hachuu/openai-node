import { Configuration, OpenAIApi } from "openai";
import { Embedding } from 'openai';
import fs from 'fs';
import { createReadStream } from 'fs';
import path from 'path';
import csv from 'csv-parser';


const dotProduct = (a, b) => a.map((x, i) => x * b[i]).reduce((m, n) => m + n);
const magnitude = (vector) => Math.sqrt(dotProduct(vector, vector));

const cosineSimilarity = (a, b) => dotProduct(a, b) / (magnitude(a) * magnitude(b));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {

  const files = fs.readdirSync(path.join(process.cwd(), 'public', 'subjects', 'title'));
  const jonFiles = files.filter((file) => file.includes('.json'));
  console.log('jonFiles' , jonFiles)
  // if (jonFiles && jonFiles.length) {
  //   res.status(200).json({ result: 'exist' });
  //   return;
  // }

  const embeddings = {};
  try {
    await fs.createReadStream(path.join(process.cwd(), './public/subjects/title/embeddings_title.csv'))
    .pipe(csv())
    .on('data', async (row) => {
      embeddings[row.title] = [];
    })
    .on('end', async () => {
      console.log('Embeddings loaded');
    }, openai)
    .on('close',
      async () => {
        console.log('embeddings', embeddings);
        try {
          for (const [key, value] of Object.entries(embeddings)) {
            
              const csvEmbedding = await openai.createEmbedding({
                model: "text-embedding-ada-002",
                input: key,
                user: "curious-ai-hy",
              })
              const vector = csvEmbedding.data.data[0].embedding;
              embeddings[key] = vector;
            
              // console.log('error for문', error);
              // res.status(500).json({ result: 'error' });
            }
            fs.writeFileSync(`./public/subjects/title/embeddings_title_result.json`, JSON.stringify(embeddings));
            res.status(200).json({ result: 'success' });
        } catch (error) {
          console.log(Object.keys(error));
          console.log('error for문', error);
          res.status(500).json({ result: 'error' });
        }
      }
    )
    .on('error', (error) => {
      console.log('error fs', error);
      res.status(500).json({ result: 'error' });
    });
  } catch (error) {
    console.log('error fs createReadStream', error);
    res.status(500).json({ result: 'error' });
  }
  
}