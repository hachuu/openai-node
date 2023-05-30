import { useEffect, useState } from "react";
import useEmotionsCall from "../hooks/useEmotionsCall";
import styled, { keyframes } from 'styled-components';
// 스타일된 컴포넌트 생성

const rotation = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }

`;

const Spinner = styled.div`
	height: 100px;
	width: 100px;
	border: 3px solid #f8049c;
	border-radius: 50%;
	border-top: none;
	border-right: none;
	margin: 50px auto;
	animation: ${rotation} 1s linear infinite;
`;

const Container = styled.div`
  
  margin: 10px 0;
  .fadeIn {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }
  .fadeOut {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  
  .title {
    margin: 100px 200px 0;
    font-font-family: 'Poppins', sans-serif;
  }

  .textArea {
    margin: 50px 200px;
  }

  textarea {
    width: 100%;
    height: 50px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    resize: vertical;box-sizing: border-box; /* 추가된 스타일 */
  }

  .button {
    margin: 0 200px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #0056b3;
    }
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  .result {
    margin: 50px 200px;
  }

  .back {
    // 오른쪽 하단 고정
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: black;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: hotpink;
    }
  }
`;

export default function Consolation () {
  const [fadeIn, setFadeIn] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState('');
  const [consolation, setConsolation] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 1000);
    console.log(consolation)
  }, []);

  async function send(e) {
    e.preventDefault();
    setIsPending(true);
    setIsResult(false);
    // send message to server
    try {
      const response = await expressMyEmotion(consolation);
      if (response) {
        setIsResult(true);
        setResult(response.result);
      }
    } catch (error) {
      console.log(error);
    }
    setIsPending(false);
  };

  const [
    expressMyEmotion
  ] = useEmotionsCall();

  return (
    <Container>
      <div className={fadeIn ? 'fadeIn' : 'fadeOut'}>
        <div className="title">저는 당신의 고민을 들어줄 수 있어요.</div>
        <div className='textArea'>
          <textarea value={consolation} onChange={(e) => setConsolation(e.target.value)} />
        </div>
        <button className='button' disabled={isPending}
          onClick={(e) => send(e)}>💌 {isPending ? 'sending...' : 'send'} 💌</button>
      </div>
      {isPending && <Spinner/>}
      {isResult && (
        <div className="result">
          <div>{result}</div>
        </div>
      )}
      <button className='back' onClick={() => 
        window.location.href = '/'
      }
      >돌아가기</button>
    </Container>
  )
}