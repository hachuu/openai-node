import { useEffect, useState } from "react";
import useAPICall from "../hooks/useAPICall";
import useCommon from "../hooks/useCommon";
import styles from "../index.module.scss";
import QuestionHistories from "./Histories";

export default function Main () {

  const [selectedConcept, setSelectedConcept] = useState('');
  const [category, setCategory] = useState('');

  const [h3Title, setH3Title] = useState('');
  const [textInput, setTextInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [file, setFile] = useState();
  const [questions, setQuestions] = useState({ questions: [], version: 0});
  const [count, setCount] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [resultHistories, setResultHistories] = useState([]);

  const [pending, setPending] = useState(false);
  const [result, setResult] = useState();
  const [intervalResult, setIntervalResult] = useState();

  const [restart, setRestart] = useState(false);

  const TWENTY_CNT = 20;

  const [messagesHistory, setMessagesHistory] = useState([]);

  const [
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
  ] = useAPICall();
  const [
    makeRandomNumber,
    fileChange,
    getH3Title,
  ] = useCommon();

  function spreadQuestion(result) {
    // setQuestionInput에 0.5초마다 한글자씩 추가하는 함수
    const text = result;
    const resultArr = text.split('');
    let i = 0;
    const interval = setInterval(() => {
      if (i >= resultArr.length) {
        clearInterval(interval);
      }
      setIntervalResult(resultArr.slice(0, i).join(''));
      i++;
    }, 50);
  }

  // 스무고개 답을 찾아가는 함수
  async function onSubmit(event) {
    event.preventDefault();
    if (!textInput || pending) return;
    try {
      setPending(true);
      let result;
      console.log(selectedConcept);
      if (selectedConcept === 'me') {
        // result = await getAboutMeResult();
      } else {
        result = await getTwentyQuestionResult();
      }
      setResult(result);
      setQuestionInput(textInput);
      spreadQuestion(result);
      setResultHistories([...resultHistories, result]);
      setQuestions({questions: [...questions.questions, textInput], version: questions.version + 1});
      setTextInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
      setPending(false);
    } finally {
      setPending(false);
    }
  }

  async function getTwentyQuestionResult() {
    // 질문에 대한 답변 추출
    if (messagesHistory.length === 0) {
      messagesHistory.push(
        {role: 'system', content: `
          스무고개 게임 시작!
          절대 사용자에게 '${correctAnswer}'(을)를 언급하면 안되고 '${category}'이라고 지칭해줘.
          정답을 직접적으로 물어보는 질문에는 정답을 알려주지마.
          몇 글자인지 물어보는 질문에는 '${correctAnswer.length}글자'라고 답해줘.
          사용자가 정답을 언급하면 '정답입니다!'하고 ${correctAnswer}에 대한 간략한 설명과 함께 답변해줘.
        ` }
      )
    }
    messagesHistory.push({role: "user", content: textInput})
    const response = await findAnswer({messagesHistory, text: textInput, correctAnswer, count, category});
    if (response) {
      messagesHistory.push({role: "assistant", content: response.result})
      if (response.success) {
        setRestart(true);
      }
    }

    const result = response?.result.replace(/\\n/g, '') || '모르겠어';
    return result;
  }

  // async function getAboutMeResult() {
  //   // 의도 중 아이와 관련된 질문인지 확인
  //   const existIntent = await findIntent(textInput);
  //   if (existIntent && existIntent.result) {
  //     console.log('existIntent : ', existIntent);
  //     // keyword 추출
  //     const keyword = await findSubjectFromQuestion(textInput);
  //     // 질문에 대한 답변 추출
  //     const response = await question(keyword, textInput);
  //     const result = response?.result;
  //     if (!result) {
  //       return;
  //     }
  //     return result;
  //   } else {
  //     setTextInput("");
  //     throw new Error('송하영과 관련된 질문이 아닙니다.');
  //   }
  // }

  async function setH3TitleResult() {
    const text = getH3Title(selectedConcept);

    const resultArr = text.split('');
    let i = 0;
    const interval = setInterval(() => {
      if (i >= resultArr.length) {
        clearInterval(interval);
      }
      setH3Title(resultArr.slice(0, i).join(''));
      i++;
    }, 200);
  }

  async function setAnswer() {
    const level = 3;//prompt('스무고개 난이도를 선택해주세요 1~3(숫자만 입력해주세요)');
    const result = await setAnswerResult(level, category);
    console.log(result?.result)
    setCorrectAnswer(result?.result);
  }

  async function selectConcept() {
    setSelectedConcept('twenty');
    function randomCategory() {
      const categoryArr = ['동물', '세계 음식', 'k-food', '가전제품'];
      const random = Math.floor(Math.random() * categoryArr.length);
      return categoryArr[random];
    }
    setCategory(randomCategory());
  }

  async function restartGame() {
    setRestart(false);
    setAnswer();
    setCount(0);
    setQuestions({ questions: [], version: 0});
    setResultHistories([]);
    setMessagesHistory([]);
    setResult('');
  }

  useEffect(() => {
    // selectConcept();
  }, [])

  useEffect(() => {
    if (!selectedConcept) return;
    setH3TitleResult();
    if (selectedConcept === 'twenty') setAnswer();
  }, [selectedConcept])

  useEffect(() => {
    if (questions.length <= TWENTY_CNT) {
      setCount(questions.length);
    }
  }, [questions])

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <div className={styles.leftBox}>
          <h3>{h3Title}</h3>
          <QuestionHistories questions={questions.questions} version={questions.version} resultHistories={resultHistories} result={result} questionInput={questionInput} intervalResult={intervalResult} />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.fixed}>
          <div className={styles.notice}>
            <div className={styles.notice__text}>
              <div className={styles.notice__title}>Notice</div>
              <div className={styles.notice__content}>
                <div className={styles.warning}>*해당 질의에 대한 답변은 OpenAI API를 사용하여 생성되는 것으로 정확하지 않을 수 있습니다.*</div>
                <div>1. 카테고리는 '{category}'입니다.</div>
                <div>2. 질문은 1개만 입력 가능합니다.</div>
              </div>
            </div>
          </div>
          <div className={styles.form}>
          {!restart && (
            <form onSubmit={onSubmit}>
                <div className={styles.input}>
                  <input
                    type="text"
                    // name={'text'+inputName}
                    placeholder="ex) AI가 생각한 정답에 가까운 질문을 하세요!"
                    value={textInput}
                    disabled={pending}
                    onChange={(e) => setTextInput(e.target.value)}
                  />
                </div>
                <div className={styles.button}>
                  <button className={`${styles.btn} ${styles.custom}`} disabled={pending}>
                    <span>
                      {pending ? "Loading..." : "Submit"}
                    </span>
                  </button>
                </div>
              
            </form>
          )}
          { restart && (
            <div className={styles.button}>
              <button className={`${styles.btn} ${styles.custom}`} disabled={pending} onClick={restartGame}>
                <span>
                  다시 시작하기
                </span>
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
      
    </div>
  )
}