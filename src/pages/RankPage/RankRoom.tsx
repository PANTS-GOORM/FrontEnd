import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import ChatLog from "./ChatLog";
import axios from "axios";

interface Chat {
  sender: string;
  message: string;
}

const RankRoom: React.FC = () => {
  const { roomUUID } = useParams();
  const client = useRef<any>({});
  const [chatLog, setChatLog] = useState<Chat[]>([]);
  // TODO 라운드 정보 추가
  const [round, setRound] = useState<number>(0);
  const [problemDescription, setProblemDescription] = useState<string>();
  const [contentURL, setContentURL] = useState<string>("");
  const [chat, setChat] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [players, setPlayers] = useState<string[]>([]);
  const [playersStatus, setPlayersStatus] = useState<boolean[]>([]);
  const [playersScore, setPlayersScore] = useState<number[]>([]);
  const [showStartButton, setShowStartButton] = useState<boolean>();

  useEffect(() => {
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyPress);

    let timeout;
    client.current = new Client({
      brokerURL: `${process.env.REACT_APP_WEBSOCKET_SERVER_URL}`,
      connectHeaders: {
        AccessToken: `${process.env.REACT_APP_TEST_ACCESS_TOKEN}`,
      },
      onConnect: () => {
        client.current.subscribe(
          `/sub/rankroom/${roomUUID}`,
          (message: any) => {
            const message_body = JSON.parse(message.body);
            const message_type = message_body.rankRoomMessageType;
            console.log(message_body);
            if (message_type === "ENTER") {
              setPlayers(message_body.players);
              setPlayersStatus(message_body.playersStatus);
              const newChat = {
                sender: "System",
                message: message_body.payload,
              };
              setChatLog((chatLog) => [...chatLog, newChat]);
            } else if (message_type === "CHAT") {
              const parseMessage = message_body.payload.split(":");
              const newChat = {
                sender: parseMessage[0],
                message: parseMessage[1],
              };
              setChatLog((chatLog) => [...chatLog, newChat]);
            } else if (message_type === "STATUS") {
              setPlayersStatus(message_body.playersStatus);
            } else if (message_type === "VIEW") {
              if (message_body.payload === "COUNT-DOWN") {
                setProblemDescription("5초 후에 문제가 나옵니다!");
              } else if (message_body.payload === "GUESS") {
                setProblemDescription("정답을 맞춰보세요!");
                setContentURL(message_body.imageURL);
              } else if (message_body.payload === "SCORE") {
                setProblemDescription(
                  message_body.players[message_body.scorePlayerIdx] + "님 정답!"
                );
                setPlayers(message_body.players);
                setPlayersScore(playersScore);
              } else if (message_body.payload === "NO_SCORE") {
                const newChat = {
                  sender: "System",
                  message: "아무도 정답을 맞추지 못했습니다..",
                };
                setChatLog((chatLog) => [...chatLog, newChat]);
              } else if (message_body.payload === "RESULT") {
                const scores = message_body.playersScore;
                const bestPlayerIdx = scores.indexOf(Math.max(...scores));
                console.log(scores);
                console.log(bestPlayerIdx);
                setProblemDescription(
                  message_body.players[bestPlayerIdx] + "님 승리!"
                );
                timeout = setTimeout(() => {
                  setProblemDescription(undefined);
                }, 3000);
              }
            }
          }
        );
      },
    });

    client.current.activate();

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyPress);
      client.current.deactivate();
      clearTimeout(timeout);
    };
  }, [roomUUID]);

  useEffect(() => {
    if (
      playersStatus.length ===
        playersStatus.filter((element) => element === true).length &&
      playersStatus.length > 2
    )
      setShowStartButton(true);
    else setShowStartButton(false);
  }, [playersStatus]);

  const submitChat = () => {
    if (!client.current.connected)
      alert("서버와 연결이 끊어졌습니다. 재접속을 시도해주세요!");
    client.current.publish({
      destination: `/pub/rankroom/${roomUUID}`,
      body: chat,
    });
    setChat("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitChat();
    }
  };

  const changePlayerStatus = () => {
    axios
      .put(
        `${process.env.REACT_APP_RANK_URL}/rankroom/player-status`,
        {},
        {
          withCredentials: true,
        }
      )
      .catch((e) => {
        alert("서버와 통신에 실패했습니다.. 다시 한 번 시도해주세요!");
      });
  };

  const startRankGame = () => {
    axios
      .post(
        `${process.env.REACT_APP_RANK_URL}/rankroom/rankgame`,
        {},
        {
          withCredentials: true,
        }
      )
      .catch((e) => {
        alert("서버와 통신에 실패했습니다.. 다시 한 번 시도해주세요!");
      });
  };

  return (
    <div className="flex w-full m-auto">
      <div className="w-1/3">
        {players
          .filter((player, idx) => idx >= 1 && idx <= 3)
          .map((player, idx) => (
            <div
              key={player}
              className="items-center text-lg bg-white bg-opacity-70 rounded p-4 text-center w-1/1.5 h-1/5 m-4"
            >
              {player} <br /> <br />
              {playersStatus[idx + 1] ? "READY" : "NOT READY"}
            </div>
          ))}
      </div>
      <div className="relative flex flex-col justify-center items-center w-1/3 h-screen gap-4">
        <div className="flex justify-center items-center">
          <div className="flex items-center text-lg bg-white bg-opacity-70 rounded p-4 text-center">
            {round ? `현재 ${round} 라운드` : `방 제목`}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center text-lg font-semibold bg-white bg-opacity-70 rounded p-4 text-center">
            <div className="relative"></div>
            <span>
              ℹ️ &nbsp;
              {problemDescription
                ? problemDescription
                : `모두가 준비되면 시작합니다!`}
            </span>
            &nbsp;&nbsp;
            {!problemDescription && (
              <button
                onClick={changePlayerStatus}
                className="text-white bg-yellow-600 hover:bg-green-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-yellow-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-blue-800"
              >
                준비/해제
              </button>
            )}
          </div>
        </div>
        <div className="items-center text-lg bg-white bg-opacity-70 rounded p-4 text-center w-96 h-96">
          {contentURL && <img src={contentURL} alt="content" />}
        </div>
        <div className="items-center text-lg bg-white bg-opacity-70 rounded p-4 text-center w-96 h-30">
          <ChatLog messages={chatLog}></ChatLog>
        </div>
        <div className="flex flex-col items-center p-4 h-32">
          <form
            className="flex items-center h-full w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              ref={inputRef}
              value={chat}
              onChange={(e) => setChat(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`채팅 또는 정답 제출`}
              className="placeholder-gray-400 border-4 border-black w-full h-full px-4 py-2 rounded-md shadow-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </form>
          <div className="w-full text-sm text-center px-2">
            enter 키로 활성화, enter키로 정답 제출
          </div>
        </div>
        {showStartButton && (
          <button
            onClick={startRankGame}
            className="text-white bg-yellow-600 hover:bg-green-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-yellow-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-blue-800"
          >
            게임 시작!
          </button>
        )}
        {/* 테스트용 시작 버튼, 제거 예정 */}
        <button
          onClick={startRankGame}
          className="text-white bg-yellow-600 hover:bg-green-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-yellow-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-blue-800"
        >
          게임 시작!
        </button>
      </div>
      <div className="w-1/3">
        {players
          .filter((player, idx) => idx >= 4 && idx <= 6)
          .map((player) => (
            <div
              key={player}
              className="items-center text-lg bg-white bg-opacity-70 rounded p-4 text-center w-1/1.5 h-1/5 m-4"
            >
              {player}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RankRoom;
