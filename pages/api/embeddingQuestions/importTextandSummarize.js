// text 추출 후 요약하는 api
export default async function (req, res) {
  const { text } = req.body;
  const result = await importTextandSummarize(text);
  res.status(200).json(result);
}

async function importTextandSummarize(text) {
  // text 추출
  const textArray = text.split("\n");
  const textArrayLength = textArray.length;
  const textArrayLengthHalf = Math.floor(textArrayLength / 2);
  const textArrayFirstHalf = textArray.slice(0, textArrayLengthHalf);
  const textArraySecondHalf = textArray.slice(textArrayLengthHalf, textArrayLength);
  const textArrayFirstHalfString = textArrayFirstHalf.join("\n");
  const textArraySecondHalfString = textArraySecondHalf.join("\n");
  // 요약
  const firstHalfSummary = await summarize(textArrayFirstHalfString);
  const secondHalfSummary = await summarize(textArraySecondHalfString);
  const summary = firstHalfSummary + "\n" + secondHalfSummary;
  return summary;
}

async function summarize(text) {
  const url = "https://api.smrzr.io/v1/summarize";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  };
  const response = await fetch(url, options);
  const result = await response.json();
  return result.summary;
}
