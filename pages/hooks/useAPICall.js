export default function useAPICall() {

  async function fineTune() {
    // file to newFormData
    const newFormData = new FormData();
    newFormData.append("file", file);
    const uploadResponse = await fetch("/api/uploadFile", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: newFormData,
    });
    const { filename } = await uploadResponse.json();
    const fineTuneResponse = await fetch("/api/finetune", {
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

  async function findIntent() {
    let result;
    const response = await fetch("/api/findIntent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: textInput }),
    }).then(
      (response) => {
        result = response.json();
      }
    );
    return result;
  }

  async function findSubjectFromQuestion() {
    let result;
    const response = await fetch("/api/findSubjectFromQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: textInput }),
    }).then(
      (response) => {
        result = response.json();
      }
    );
    return result;
  }

  async function generatePrompt() {
    const response = await fetch("/api/generateprompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ test: '' }),
    });
  }

  async function extractTextFromPDF() {
    const response = await fetch("/api/extractTextFromPdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ test: '' }),
    });
  }
  async function question(keyword) {
    let result;
    // const lastHistory = filterLastHistory();
    const response = await fetch("/api/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: textInput, keyword: keyword?.result }),
    }).then(
      (response) => {
        result = response.json();
        setPending(false);
      }
    );
    return result;
  }

  async function titleEmbedding() {
    let result;
    const response = await fetch("/api/titleEmbedding", {
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
    const response = await fetch("/api/embeddings", {
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

  async function findAnswer(text, correctAnswer) {
    let result;
    const response = await fetch("/api/twentyQuestions/findAnswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, correctAnswer}),
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