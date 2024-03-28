import React from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";
import useStore from "../../store/adminWord";

// interface Word {
//   id: number;
//   substance: string;
//   description: string;
//   type: string;
//   createdDate: string;
// }

function AdminWordList() {
  // const [words, setWords] = useState<Word[]>([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/wordlist") // 더미
  //     .then((response) => {
  //       setWords(response.data);
  //     })
  //     .catch((e) => {
  //       console.error("데이터 로딩 오류", e);
  //     });
  // }, []);

  const { words } = useStore((state) => state);

  return (
    <div className="flex justify-center">
      <div>
        <h1 className="mb-10">관리자 어휘 목록 페이지</h1>
        <ul>
          {words.map((word, idx) => (
            <li key={word}>{idx + 1 + ". " + word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminWordList;
