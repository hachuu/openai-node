export default function useAPICall() {

  const fineTune = async () => {
    // file to newFormData
    const newFormData = new FormData();
    newFormData.append("file", "");
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

  const findIntent = async () => {
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

  const findSubjectFromQuestion = async (text) => {
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

  const generatePrompt = async () => {
    const response = await fetch("/api/embeddingQuestions/generateprompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ test: '' }),
    });
  }

  const extractTextFromPDF = async () => {
    const response = await fetch("/api/embeddingQuestions/extractTextFromPdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ test: '' }),
    });
  }

  const question = async (keyword, text) => {
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

  const titleEmbedding = async () => {
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

  const embedding = async (textInput) => {
    const text = textInput;
    let result;
    const response = await fetch("/api/embeddingQuestions/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }).then(
      (response) => result = response.json()
    );
    return result;
  }

  const setAnswerResult = async (level, category) => {
    let result;
    const answerRes = await fetch("/api/twentyQuestions/setAnswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({level, category}),
    }).then(
      (response) => result = response.json()
    );
    return result;
  }

  const findAnswer = async ({messagesHistory, text, correctAnswer, count, category}) => {
    let result;
    const response = await fetch("/api/twentyQuestions/findAnswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({messagesHistory, text, correctAnswer, count, category}),
    }).then(
      (response) => {
        result = response.json();
      }
    );
    return result;
  }

  return [
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
  ]
}