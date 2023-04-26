import styles from "../index.module.scss";
import { useEffect, useRef } from 'react';

export default function QuestionHistories({questions, resultHistories, result, questionInput, intervalResult}) {
  const curRef = useRef(null);

  useEffect(() => {
    if (curRef.current) {
      curRef.current.scrollIntoView({behavior: 'smooth', block: 'end'});
    }

  }, [curRef]);
  
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
      { questions &&
        questions.map((question, index) => 
        (index !== questions.length - 1) ??
        (
          <div key={index} className={styles.history}>
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
}