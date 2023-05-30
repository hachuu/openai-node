export default function useEmotionsCall(consolation) {
  const expressMyEmotion = async (consolation) => {
    let result;
    const response = await fetch("/api/feelings/expressMyEmotion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({consolation}),
    }).then(
      (response) => {
        result = response.json();
      }
    );
    return result;
  }

  return [
    expressMyEmotion,
  ]
}