export default function useImportTextandSummarize() {

  const importTextandSummarize = async (text) => {
    let result;
    const response = await fetch("/api/embeddingQuestions/importTextandSummarize", {
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

  return [
    importTextandSummarize,
  ];
}