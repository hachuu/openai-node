

export default async function (req, res) {
  const fs = require('fs');

  const ORGANIZATION_IDS = ["org1", "org2", "org3", "org4", "org5"];
  const TOPICS = ["sports", "technology", "politics", "entertainment", "business"];
  const PROMPTS = ["What is your opinion on", "What do you think about", "How do you feel about"];
  const SENTENCES = ["this topic?", "this subject?", "this issue?", "this matter?"];

  function generateSample() {
    const orgId = ORGANIZATION_IDS[Math.floor(Math.random() * ORGANIZATION_IDS.length)];
    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const prompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    const sentence = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
    const text = `${prompt} ${topic} in relation to ${orgId}: What is your opinion on ${sentence}`;
    const label = { organization_id: orgId };
    return { text, label };
  }

  const data = [];
  for (let i = 0; i < 500; i++) {
    const sample = generateSample();
    data.push(sample);
  }

  fs.writeFileSync('examples.jsonl', '');
  data.forEach(sample => {
    fs.appendFileSync('examples.jsonl', JSON.stringify(sample) + '\n');
  });
}
