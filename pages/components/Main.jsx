import { useEffect, useState } from "react";
import useAPICall from "../hooks/useAPICall";
import useCommon from "../hooks/useCommon";
import styles from "../index.module.scss";
import QuestionHistories from "./Histories";
import { useRouter } from 'next/router';

export default function Main () {
  const router = useRouter();
  useEffect(() => {
    // 클라이언트 측에서만 실행되는 코드
    // document 객체를 사용할 수 있음
    console.log(document.title);
  }, [router]);

  const [selectedConcept, setSelectedConcept] = useState('');
  const [category, setCategory] = useState('');

  const [h3Title, setH3Title] = useState('');
  const [textInput, setTextInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [file, setFile] = useState();
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [resultHistories, setResultHistories] = useState([]);

  const [pending, setPending] = useState(false);
  const [result, setResult] = useState();
  const [intervalResult, setIntervalResult] = useState();

  const [restart, setRestart] = useState(false);

  const TWENTY_CNT = 20;

  const {
    findIntent,
    findSubjectFromQuestion,
    question,
    setAnswerResult,
    findAnswer
  } = useAPICall();
  const {
    getH3Title,
  } = useCommon();

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
        result = await getAboutMeResult();
      } else {
        result = await getTwentyQuestionResult();
      }
      setResult(result);
      setQuestionInput(textInput);
      spreadQuestion(result);
      setResultHistories([...resultHistories, result]);
      setQuestions([...questions, textInput]);
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
    const response = await findAnswer({text: textInput, correctAnswer, count, category});
    if (response.success) {
      setRestart(true);
    }
    const result = response?.result.replace(/\\n/g, '') || '모르겠어';
    return result;
  }

  async function getAboutMeResult() {
    // 의도 중 아이와 관련된 질문인지 확인
    const existIntent = await findIntent(textInput);
    if (existIntent && existIntent.result) {
      console.log('existIntent : ', existIntent);
      // keyword 추출
      const keyword = await findSubjectFromQuestion(textInput);
      // 질문에 대한 답변 추출
      const response = await question(keyword, textInput);
      const result = response?.result;
      if (!result) {
        return;
      }
      return result;
    } else {
      setTextInput("");
      throw new Error('송하영과 관련된 질문이 아닙니다.');
    }
  }

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
    const level = prompt('스무고개 난이도를 선택해주세요 1~3(숫자만 입력해주세요)');
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
    setQuestions([]);
    setResultHistories([]);
  }

  useEffect(() => {
    selectConcept();
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
          <QuestionHistories questions={questions} resultHistories={resultHistories} result={result} questionInput={questionInput} intervalResult={intervalResult} />
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