import Head from "next/head";
import {useEffect, useState} from "react";
import styles from "./index.module.css";
import cosine from 'calculate-cosine-similarity';

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [file, setFile] = useState();
  const inputs = [];
  const [inputName, setInputName] = useState(makeRandomNumber());
  const [questions, setQuestions] = useState([]);
  const [resultHistories, setResultHistories] = useState([]);

  const [pending, setPending] = useState(false);
  const [imgHover, setImgHover] = useState(false);


  const [result, setResult] = useState();
  const [intervalResult, setIntervalResult] = useState();
  const [splitResultArr, setSplitResultArr] = useState([]);

  function makeRandomNumber() {
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    return random(1, 1000);
  }

  function goMySource() {
    window.open('https://hachuu.github.io/hachu/');
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

  async function onSubmit(event) {
    event.preventDefault();
    if (!textInput || pending) return;
    setInputName(makeRandomNumber());
    try {

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
    }
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

  async function question(keyword) {
    let result;
    setPending(true);
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

  useEffect(() => {
    // url로 체크하여 local 환경인 경우에만 embedding 실행
    if (window.location.href.includes('localhost')) {
      // titleEmbedding();
      // embedding();
    }
  }, [])

  return (
    <div>
      <Head>
        <title>OpenAI Embedding + Completion Model</title>
        <link rel="icon" href="/quokka.svg" />
      </Head>

      <main className={styles.main}>
        {/* img에 말풍선 template */}
        { imgHover ? (
          <div className={styles.balloon}>
            <div className={styles.balloon__text}>
              {/* 하트표시 */}
              quokka ❤️
              {/* <span role="img" aria-label="heart"></span> */}
            </div>
          </div>
        ) : null }
        {/* img hover event 추가 */}
        <img src="/quokka.svg" className={styles.icon} onMouseEnter={() => setImgHover(true)} onMouseLeave={() => setImgHover(false)} onClick={()=>goMySource()}/>
        <h3>내가 학습한 하영이란?</h3>
        <div className={styles.history}>
          {questions.map((question, index) => 
            (index !== questions.length - 1) &&
          (
            <div key={index}>
              <div className={styles.question}>질문 {index+1}. {question}</div>
              <div className={styles.lastAnser}>{resultHistories[index]}</div>
            </div>
          ))}
          { result ? 
            (
              <>
                <div className={styles.question}>질문 {questions.length > 0 ? questions.length : ''}: {questionInput}</div>
                <div className={styles.answer}>{intervalResult}</div>
              </>
            ) : null
          }
        </div>
        {/* 오른쪽에 notice div 생성 */}
        <div className={styles.notice}>
          <div className={styles.notice__text}>
            <div className={styles.notice__title}>Notice</div>
            <div className={styles.notice__content}>
              <div className={styles.warning}>*해당 질의에 대한 답변은 OpenAI API를 사용하여 생성되는 것으로 모델에 쓰인 화자가 얘기한 것이 아님을 알려드립니다.*</div>
              <div>1. 질문은 1개만 입력 가능합니다.</div>
              <div>2. 질문은 1~2문장으로 작성해주세요.</div>
            </div>
          </div>
        </div>
        <div className={styles.form}>
          <form onSubmit={onSubmit}>
            {/* <input type="file"
                      name="file"
                      onChange={(e) => fileChange(e)}
                      multiple={false}
              /> JSONL 파일 업로드 */}
            <div className={styles.input}>
              <input
                type="text"
                // name={'text'+inputName}
                placeholder="ex) 송하영은 나이가 어떻게 되나요?"
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
        </div>
      </main>
    </div>
  );
}
