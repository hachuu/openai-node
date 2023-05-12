import { useEffect, useState } from "react";
import useLiarAPICall from "../hooks/useLiarAPICall";

export default function Liar () {
  const [GAME_ANSWER, setGAME_ANSWER] = useState('냉장고');
  const [liarConversation, setLiarConversation] = useState([]);
  const [player1Conversation, setPlayer1Conversation] = useState([]);
  const [player2Conversation, setPlayer2Conversation] = useState([]);
  const [currentPlayerConversation, setCurrentPlayerConversation] = useState({});
  const [totalConversation, setTotalConversation] = useState([]);
  const {
    findLiar
  } = useLiarAPICall();

  useEffect(() => {
    if (currentPlayerConversation && currentPlayerConversation?.player !== undefined) {
      console.log('currentPlayerConversation', currentPlayerConversation)
      setTotalConversation([...totalConversation, currentPlayerConversation]);
      if (currentPlayerConversation.player === 'liar') {
        setLiarConversation([...liarConversation, {role: 'user', content: currentPlayerConversation.content}]);
        setPlayer1Conversation([...player1Conversation, {role: 'assistant', content: currentPlayerConversation.content}]);
        setPlayer2Conversation([...player2Conversation, {role: 'assistant', content: currentPlayerConversation.content}]);
      } else if (currentPlayerConversation.player === 'player1') {
        setLiarConversation([...liarConversation, {role: 'assistant', content: currentPlayerConversation.content}]);
        setPlayer1Conversation([...player1Conversation, {role: 'user', content: currentPlayerConversation.content}]);
        setPlayer2Conversation([...player2Conversation, {role: 'assistant', content: currentPlayerConversation.content}]);
      } else {
        setLiarConversation([...liarConversation, {role: 'assistant', content: currentPlayerConversation.content}]);
        setPlayer1Conversation([...player1Conversation, {role: 'assistant', content: currentPlayerConversation.content}]);
        setPlayer2Conversation([...player2Conversation, {role: 'user', content: currentPlayerConversation.content}]);
      }
    }
  }, [currentPlayerConversation]);

  useEffect(() => {
    if (totalConversation.length > 0) {
      console.log('지금까지 이어진 대화입니다. ', totalConversation);
    }
  }, [totalConversation]);

  useEffect(() => {
    setLiarConversation(
      [
        {
          role: 'system', 
          content: `지금부터 라이어 게임을 시작하겠습니다. player는 3명이고, liar는 그 중 1명입니다.
            당신은 liar입니다. player들은 당신이 liar임을 모릅니다.
            player들은 서로의 질문을 통해 liar를 찾아야 합니다.
            당신은 player들이 liar를 찾지 못하도록 속이세요.
            player들이 liar를 찾지 못하면 당신은 승리합니다.
            player들이 liar를 찾으면 당신은 패배합니다. 그러나 만약 정답을 알고 있는 경우 당신은 승리합니다.
          `
        },
        {
          role: 'system',
          content: `당신이 정답을 모릅니다. 이전 대화들을 통해 정답을 유추해 간접적인 힌트를 주세요.`
        }
      ]
    );
    setPlayer1Conversation(
      [
        {
          role: 'system',
          content: `지금부터 라이어 게임을 시작하겠습니다. player는 3명이고 liar는 당신 제외 1명입니다.
            당신은 player입니다. player들은 서로의 힌트를 통해 liar를 찾아야 합니다.
            당신은 playe가 liar를 찾도록 도와주세요.
            player들이 liar를 찾지 못하면 당신은 패배합니다.
            player들이 liar를 찾으면 당신은 승리합니다. 그러나 만약 liar가 정답을 알고 있는 경우 당신은 패배합니다.
            
          `
        },
        {
          role: 'system',
          content: `당신이 알고 있는 정답은 '${GAME_ANSWER}'입니다.
          이전 대화와 동일하지 않은 답변을 하세요.
          당신은 '${GAME_ANSWER}'라는 단어를 라이어가 눈치 채지 못하게 객관적인 힌트를 주고, liar가 누군지 찾아주세요.`
        }
      ]
    );
    setPlayer2Conversation(
      [
        {
          role: 'system',
          content: `지금부터 라이어 게임을 시작하겠습니다. player는 3명이고 liar는 당신 제외 1명입니다.
            당신은 player입니다. player들은 서로의 힌트를 통해 liar를 찾아야 합니다.
            당신은 player가 liar를 찾도록 도와주세요.
            player들이 liar를 찾지 못하면 당신은 패배합니다.
            player들이 liar를 찾으면 당신은 승리합니다. 그러나 만약 liar가 정답을 알고 있는 경우 당신은 패배합니다.
          `
        },
        {
          role: 'system',
          content: `당신이 알고 있는 정답은 '${GAME_ANSWER}'입니다.
          당신은 '${GAME_ANSWER}'라는 단어를 라이어가 눈치 채지 못하게 객관적인 힌트를 주고, liar가 누군지 찾아주세요.`
        }
      ]
    );
  }, []);
  
  async function doPlayer1() {
    const response = await findLiar({messagesHistory: player1Conversation});
    if (response) {
      console.log(response.result);
      const content = `${response.result}`;
      setCurrentPlayerConversation({player: 'player1', content});
    }
  }

  async function doPlayer2() {
    const response = await findLiar({messagesHistory: player2Conversation});
    if (response) {
      console.log(response.result);
      const content = `${response.result}`;
      setCurrentPlayerConversation({player: 'player2', content});
    }
  }

  async function doLiar() {
    const response = await findLiar({messagesHistory: liarConversation});
    if (response) {
      console.log(response.result);
      const content = `${response.result}`;
      setCurrentPlayerConversation({player: 'player3', content});
    }
  }

  async function findLiarByLastQuesiton(player) {
    if (player === 'player1') {
      setPlayer1Conversation([...player1Conversation, {role: 'system', content: 'liar는 player1~3 중 누구인가요?'}]);
    } else if (player === 'player2') {
      setPlayer2Conversation([...player2Conversation, {role: 'system', content: 'liar는 player1~3 중 누구인가요?'}]);
    } else {
      setLiarConversation([...liarConversation, {role: 'system', content: ''}]);
    }
  }


  return (
    <>
      <button onClick={doPlayer1}>player1</button>
      <button onClick={doPlayer2}>player2</button>
      <button onClick={doLiar}>player3</button>
      <br/>
      <button onClick={() => findLiarByLastQuesiton('player1')}>player1 마지막 질문으로 라이어 찾기</button>
      <button onClick={() => findLiarByLastQuesiton('player2')}>player2 마지막 질문으로 라이어 찾기</button>
      <button onClick={() => findLiarByLastQuesiton('liar')}>player3 마지막 질문으로 라이어 찾기</button>
    </>
  )
}