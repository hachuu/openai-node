import styles from "../index.module.scss";
import React, { useEffect, useRef, useState } from 'react';

const QuestionHistories = React.memo(({questions, version, resultHistories, result, questionInput, intervalResult}) => {
  const curRef = useRef(null);
  const [pastQuestions, setPastQuestions] = useState([]);

  useEffect(() => {
    console.log('version', version);
    console.log('questions', questions);
    // 마지막 data제외한 questions만 setPastQuestions에 저장
    if (version > 0) {
      const copyQuestions = [...questions];
      const lastThreeQuestions = [...copyQuestions.splice(0, version-1)];
      console.log(lastThreeQuestions)
      console.log(lastThreeQuestions.length)
      setPastQuestions(lastThreeQuestions);
      if (curRef.current) {
        setTimeout(() => {
          curRef.current.scrollIntoView({behavior: 'smooth', block: 'end'});
        }, 300);
      }
    } else {
      setPastQuestions([]);
      console.log('result가 사라져야함 ' + result)
    }
  }, [version])

  // useEffect(() => {
    

  // }, [curRef]);
  
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
  
  // result의 글자를 ,나 .로 배열로 나눠서 문장별로 나누는 함수
  function splitResult(result) {
    const resultArr = result.split(/[,|.]/);
    const resultArr2 = resultArr.filter((item) => item !== '');
    return resultArr2;
  }

  return (
    <div className={styles.historyBox}>
      { pastQuestions &&
        pastQuestions.map((question, index) => 
        (
          <div key={version+index} className={styles.history}>
            <div className={styles.question}>질문 {index+1}. {question}</div>
            <div className={styles.lastAnswer}>{resultHistories[index]}</div>
          </div>
        ))
      }
      { result ? 
        (
          <div className={styles.current} ref={curRef}>
            <div className={styles.question}>질문 {questions.length > 0 ? questions.length : ''}: {questionInput}</div>
            <div className={styles.answer}>{intervalResult}</div>
          </div>
        ) : null
      }
    </div>
  )
});

export default QuestionHistories;