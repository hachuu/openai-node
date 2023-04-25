
import PDFParser from 'pdf2json';
// import { GPT3 } from 'openai';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  // organization: process.env.OPENAI_ORGANIZATION,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const fs = require('fs');

  const GPT3_API_KEY = process.env.OPENAI_API_KEY; // GPT-3 API 키
  const MODEL_ID = 'davinci-2-4-1'; // GPT-3 모델 ID
   // PDF 파일 경로 titanic-numbered.pdf
  const PDF_FILE = './public/pdf-test.pdf'; // PDF 파일 경로
  // const PDF_FILE = 'sample.pdf'; // PDF 파일 경로
  const OUTPUT_FILE = 'output.jsonl'; // 출력 파일 경로

  // PDF 파일에서 텍스트 추출 함수
  async function extractTextFromPDF() {
    const pdfParser = new PDFParser();
    console.log("PDF_FILE: " + PDF_FILE)
    // pdfParser.loadPDF(PDF_FILE);
    pdfParser.loadPDF(PDF_FILE);
    return new Promise((resolve, reject) => {
      pdfParser.on('pdfParser_dataReady', (pdfData) => {
        console.log('pdfParser_dataReady??? ', pdfData)
        const text = pdfParser.getRawTextContent();
        console.log('resolve success text??? ', text)
        resolve(text);
      });
      pdfParser.on('pdfParser_dataError', (error) => {
        reject(error);
      });
    });
  }

  // GPT-3 API를 사용하여 prompt-completion 쌍 생성 함수
  async function generatePromptCompletion(text) {
    const prompt = 'Q: ';
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}${text}`,
      temperature: 0.5,
      n: 1,
      stop: '\n',
      max_tokens: 50,
    // const completion = await gpt3.complete(MODEL_ID, `${prompt}${text}`, {
    //   max_tokens: 50,
    //   temperature: 0.5,
    //   n: 1,
    //   stop: '\n',
    });
    return completion.choices[0].text.trim();
  }

  // JSONL 파일에 prompt-completion 쌍 쓰기 함수
  function writePromptCompletionToFile(prompt, completion) {
    const sample = { text: prompt, completions: [{ text: completion }] };
    const jsonString = JSON.stringify(sample);
    fs.appendFileSync(OUTPUT_FILE, `${jsonString}\n`);
  }

  // 메인 함수
  async function main() {
    const text = await extractTextFromPDF();
    console.log(text)
    let paragraphs = text.split('\n').filter((p) => p.length > 0);
    if (!paragraphs.length) {
      // 데이터가 없는 경우 다른 값으로 할당
      paragraphs = ['This is a sample text.', 'This is another sample text.'];
    }
    console.log('paragraphs.length '  + paragraphs.length)
    for (let i = 0; i < paragraphs.length; i++) {
      const prompt = `${paragraphs[i]}\n`;
      const completion = await generatePromptCompletion(paragraphs[i + 1] || '');
      writePromptCompletionToFile(prompt, completion);
    }
  }

  // 실행
  main().then(() => console.log('Done')).catch(console.error);
}