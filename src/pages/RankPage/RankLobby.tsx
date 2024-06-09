import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RankLobby.css";

interface RankRoomInfo {
  roomUUID: string;
  roomName: string;
  headCount: number;
}

const RankLobby: React.FC = () => {
  const [RankRoomInfos, setRankRoomInfos] = useState<RankRoomInfo[]>([]);
  const [showCreateRoomPopup, setShowCreateRoomPopup] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const navigate = useNavigate();

  // 경쟁방 리스트를 서버로부터 받아와 초기화
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_RANK_URL}/lobby`, {
        withCredentials: true,
      })
      .then((res) => {
        setRankRoomInfos(res.data);
      })
      .catch((e) => {
        alert("서버와 통신에 실패했습니다.. 다시 한 번 시도해주세요!");
      });
  }, []);

  const createRankRoom = (roomName: string) => {
    axios
      .post(`${process.env.REACT_APP_RANK_URL}/lobby/rankroom`, roomName, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        withCredentials: true,
      })
      .then((res) => {
        alert("방 생성에 성공했습니다. 게임방으로 이동합니다.");
        navigate("/rankroom/" + res.data);
      })
      .catch((e) => {
        alert("방 생성에 실패했습니다. 다시 시도해주세요!");
      });
  };

  const handleRoomClick = (room: RankRoomInfo) => {
    navigate("/rankroom/" + room.roomUUID);
  };

  const handleCreateRoomClick = () => {
    setShowCreateRoomPopup(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createRankRoom(newRoomName);
  };

  return (
    <div className="rank-lobby-container">
      <h2>게임방 리스트</h2>
      <div>
        <button
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleCreateRoomClick}
        >
          새로운 게임방 만들기
        </button>
        {showCreateRoomPopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2>방 제목 입력</h2>
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="방 제목"
                  required
                />
                <button
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  type="submit"
                >
                  방 만들기
                </button>
                <button
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => setShowCreateRoomPopup(false)}
                >
                  취소
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="footer">
        <p>접속 중인 유저 수 : {RankRoomInfos.length * 1}</p>
      </div>
      <div className="rank-lobby">
        <div className="grid">
          {RankRoomInfos.map((room) => (
            <div
              key={room.roomUUID}
              className="room"
              onClick={() => handleRoomClick(room)}
            >
              {room.roomName} ( {room.headCount} / 6 )
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankLobby;
