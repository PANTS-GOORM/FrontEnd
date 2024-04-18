import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Word {
  id: number;
  vocabulary: string;
  description: string;
  type: string;
  createdDate: string;
}

function AdminWordList() {
  const [words, setWords] = useState<Word[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/wordlist`, {
        withCredentials: true,
      })
      .then((response) => {
        setWords(response.data);
      })
      .catch((e) => {
        console.error("데이터 로딩 오류", e);
      });
  }, []);

  // 현재 페이지에 보여줄 항목들 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = words.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지네이션을 위한 페이지 번호들 계산
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(words.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // 날짜 파싱
  const formatCreatedDate = (createdDate: string) => {
    const date = new Date(createdDate);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24시간제 사용
    }).format(date);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-4xl">
        <h1 className="mb-10 text-3xl font-bold text-center">
          등록된 어휘 목록
        </h1>
        <table className="min-w-full bg-white rounded-lg shadow-md table-fixed">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-left">번호</th>
              <th className="px-4 py-3 text-left">어휘</th>
              <th className="px-4 py-3 text-left">설명</th>
              <th className="px-4 py-3 text-left">타입</th>
              <th className="px-4 py-3 text-left">생성일자</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((word, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="px-4 py-4">
                  {idx + 1 + (currentPage - 1) * itemsPerPage}.
                </td>
                <td className="px-4 py-4">{word.vocabulary}</td>
                <td className="px-4 py-4">
                  {word.description.length > 30
                    ? word.description.substring(0, 30) + "..."
                    : word.description}
                </td>
                <td className="px-4 py-4">{word.type}</td>
                <td className="px-4 py-4">
                  {formatCreatedDate(word.createdDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav className="flex justify-center mt-4">
          {pageNumbers.map((number) => (
            <div
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-2 mx-1 text-white rounded hover:bg-blue-700 ${
                currentPage === number ? "bg-blue-700" : "bg-gray-500"
              }`}
            >
              {number}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default AdminWordList;
