export default function useAPICall() {

  async function fineTune() {
    // file to newFormData
    const newFormData = new FormData();
    newFormData.append("file", file);
    const uploadResponse = await fetch("/api/embeddingQuestions/uploadFile", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: newFormData,
    });
    const { filename } = await uploadResponse.json();
    const fineTuneResponse = await fetch("/api/embeddingQuestions/finetune", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: filename
        // file: './public/dataset.jsonl'
      })
    });
  }

  async function findIntent(text) {
    let result;
    const response = await fetch("/api/embeddingQuestions/findIntent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }).then(
      (response) => {
        result = response.json();
      }
    );
    return result;
  }

  async function findSubjectFromQuestion(text) {
    let result;
    const response = await fetch("/api/embeddingQuestions/findSubjectFromQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }).then(
      (response) => {
        result = response.json();
      }
    );
    return result;
  }

  async function generatePrompt() {
    const response = await fetch("/api/embeddingQuestions/generateprompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ test: '' }),
    });
  }

  async function extractTextFromPDF() {
    const response = await fetch("/api/embeddingQuestions/extractTextFromPdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ test: '' }),
    });
  }
  async function question(keyword, text) {
    let result;
    // const lastHistory = filterLastHistory();
    const response = await fetch("/api/embeddingQuestions/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, keyword: keyword?.result }),
    }).then(
      (response) => {
        result = response.json();
      }
    );
    return result;
  }

  async function titleEmbedding() {
    let result;
    const response = await fetch("/api/embeddingQuestions/titleEmbedding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  }),
    }).then(
      (response) => result = response.json()
    );
    return result;
  }

  async function embedding() {
    let result;
    const response = await fetch("/api/embeddingQuestions/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: textInput }),
    }).then(
      (response) => result = response.json()
    );
    return result;
  }

  async function setAnswerResult(level) {
    let result;
    const answerRes = await fetch("/api/twentyQuestions/setAnswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({level}),
    }).then(
      (response) => result = response.json()
    );
    return result;
  }

  async function findAnswer({text, correctAnswer, count}) {
    let result;
    const response = await fetch("/api/twentyQuestions/findAnswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, correctAnswer, count}),
    }).then(
      (response) => {
        result = response.json();
      }
    );
    return result;
  }

  return {
    fineTune,
    findIntent,
    findSubjectFromQuestion,
    generatePrompt,
    extractTextFromPDF,
    question,
    titleEmbedding,
    embedding,
    setAnswerResult,
    findAnswer
  }
}