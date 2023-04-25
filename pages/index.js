import Head from "next/head";
import {useEffect, useState} from "react";
import styles from "./index.module.scss";
import cosine from 'calculate-cosine-similarity';
import useAPICall from "./hooks/useAPICall";

export default function Home() {
  const [h3Title, setH3Title] = useState('');
  const [textInput, setTextInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [file, setFile] = useState();
  const inputs = [];
  const [inputName, setInputName] = useState(makeRandomNumber());
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [resultHistories, setResultHistories] = useState([]);

  const [pending, setPending] = useState(false);
  const [imgHover, setImgHover] = useState(false);

  const [result, setResult] = useState();
  const [intervalResult, setIntervalResult] = useState();
  const [splitResultArr, setSplitResultArr] = useState([]);

  const [restart, setRestart] = useState(false);

  const TWENTY_CNT = 20;

  const {
    setAnswerResult,
    findAnswer
  } = useAPICall();

  function makeRandomNumber() {
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    return random(1, 1000);
  }

  useEffect(() => {
  // 스크롤을 맨 아래로 내리는 함수
  window.scrollTo(0, document.body.scrollHeight);
  }, [questions]);


  // finetune 실행
  async function fileChange(e) {
    setFile(e.target.files[0]);
    await fineTune();
  }

  // result의 글자를 ,나 .로 배열로 나눠서 문장별로 나누는 함수
  function splitResult(result) {
    const resultArr = result.split(/[,|.]/);
    const resultArr2 = resultArr.filter((item) => item !== '');
    return resultArr2;
  }
  
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
  async function onQuestionTwenty(event) {
    event.preventDefault();
        if (!textInput || pending) return;
    try {
      setPending(true);
      // 질문에 대한 답변 추출
      const response = await findAnswer(textInput, correctAnswer);
      if (response.success) {
        setRestart(true);
      }
      const result = response?.result.replace(/\\n/g, '') || '모르겠어';
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

  // 기존 나에 관한 질문을 하는 경우
  async function onSubmit(event) {
    event.preventDefault();
    if (!textInput || pending) return;
    setInputName(makeRandomNumber());
    try {
      setPending(true);
      // 의도 중 아이와 관련된 질문인지 확인
      const existIntent = await findIntent();
      if (existIntent && existIntent.result) {
        console.log('existIntent : ', existIntent);
        // keyword 추출
        const keyword = await findSubjectFromQuestion();
  
        // 질문에 대한 답변 추출
        const response = await question(keyword);
  
        const result = response?.result;
        if (!result) {
          return;
        }
        setResult(result);
        setQuestionInput(textInput);
        spreadQuestion(result);
        setResultHistories([...resultHistories, result]);
        setQuestions([...questions, textInput]);
        setTextInput("");
      } else {
        setTextInput("");
        throw new Error('송하영과 관련된 질문이 아닙니다.');
      }
    } catch(error) {
      console.error(error);
      alert(error.message);
      setPending(false);
    }
  }

  function filterLastHistory() {
    // 현재 질문한 내용과 이전 질문들의 유사도가 높은 경우 이전 질문들과 연계해서 history를 만들어주고, 유사도가 없는 경우 새로운 데이터로 인지 한다.
    let lastHistory = [];
    if (questions.length > 0) {
      const sliceIdx = questions.length > 3 ? -3 : -questions.length;
      const lastThreeQuestions = questions.slice(sliceIdx);
      const lastThreeHistories = resultHistories.slice(sliceIdx);
      lastHistory = lastThreeQuestions.map((question, index) => (index+1+". ").concat(question.concat(' => ' + lastThreeHistories[index])));
    }
    return lastHistory.join(', ');
  }

  async function setH3TitleResult() {
    // interval
    const text = 'Twenty Qustions';
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
    const result = await setAnswerResult(level);
    console.log(result?.result)
    setCorrectAnswer(result?.result);
  }

  async function restartGame() {
    setRestart(false);
    setAnswer();
    setCount(0);
    setQuestions([]);
    setResultHistories([]);
  }

  useEffect(() => {
    // url로 체크하여 local 환경인 경우에만 embedding 실행
    if (window.location.href.includes('localhost')) {
      // titleEmbedding();
      // embedding();
    }
    console.log('count ', count)
    setH3TitleResult();
    setAnswer();
  }, [])

  useEffect(() => {
    if (questions.length <= TWENTY_CNT) {
      setCount(questions.length);
    } else {
      const answer = prompt('스무고개 정답을 입력해주세요.');
      if (answer === correctAnswer) {
        alert('정답입니다!');
      } else {
        alert('틀렸습니다! 정답은 ' + correctAnswer + '입니다.');
      }
      setCount(0);
      setQuestions([]);
    }
  }, [questions])

  return (
    <div>
      <Head>
        <title>OpenAI Embedding + Completion Model</title>
        <link rel="icon" href="/quokka.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Cute+Font&family=Dongle:wght@300&family=Rubik+Pixels&display=swap" rel="stylesheet"/>
      </Head>

      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.leftBox}>
            { h3Title !== 'Twenty Qustions' ?
              <h3>{h3Title}</h3>
              :
              <h3>{h3Title}</h3>
            }
            {/* history에 questions있을 경우에만 표시  */}
            {questions.length > 0 && 

            <div>
              {questions.map((question, index) => 
                (index !== questions.length - 1) &&
              (
                <div key={index} className={styles.history}>
                  <div className={styles.question}>질문 {index+1}. {question}</div>
                  <div className={styles.lastAnswer}>{resultHistories[index]}</div>
                </div>
              ))}
              { result ? 
                (
                  <div className={styles.current}>
                    <div className={styles.question}>질문 {questions.length > 0 ? questions.length : ''}: {questionInput}</div>
                    <div className={styles.answer}>{intervalResult}</div>
                  </div>
                ) : null
              }
            </div>
            }
          </div>
        </div>
        <div className={styles.right}>
          {/* 오른쪽에 notice div 생성 */}
          <div className={styles.fixed}>
            <div className={styles.notice}>
              <div className={styles.notice__text}>
                <div className={styles.notice__title}>Notice</div>
                <div className={styles.notice__content}>
                  <div className={styles.warning}>*해당 질의에 대한 답변은 OpenAI API를 사용하여 생성되는 것으로 정확하지 않을 수 있습니다.*</div>
                  <div>1. 카테고리는 '동물'입니다.</div>
                  <div>2. 질문은 1개만 입력 가능합니다.</div>
                </div>
              </div>
            </div>
            <div className={styles.form}>
            {!restart && (
              <form onSubmit={onQuestionTwenty}>
              {/* <form onSubmit={onSubmit}> */}
                {/* <input type="file"
                          name="file"
                          onChange={(e) => fileChange(e)}
                          multiple={false}
                  /> JSONL 파일 업로드 */}
                  <div className={styles.input}>
                    <input
                      type="text"
                      // name={'text'+inputName}
                      placeholder="ex) AI가 생각한 정답에 가까운 질문을 하세요!"
                      value={textInput}
                      // disabled pending true인경우
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
                    {/* <button className={`${styles.btn} ${styles.square}`}>
                      <span>Click!</span><span>Read More</span>
                    </button> */}
                  </div>
                
              </form>
            )}
            {restart && (
              <>
                <div className={styles.button}>
                  <button className={`${styles.btn} ${styles.custom}`} disabled={pending} onClick={restartGame}>
                    <span>
                      다시 시작하기
                    </span>
                  </button>
                </div>
              </>
            )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
