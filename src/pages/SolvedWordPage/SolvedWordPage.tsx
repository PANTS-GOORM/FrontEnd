import React, { useEffect, useState } from "react";
import { Link, Element } from "react-scroll";
import useApiAxios from "../../hook/useApiAxios";
import userStore from "../../store/user";

interface Problem {
  substance: string; // 문제 제목
  description: string; // 문제 설명
  month: number; // 문제가 해결된 월
}

const SolvedWordPage: React.FC = () => {
  const axios = useApiAxios();
  const [solvedProblems, setSolvedProblems] = useState<Problem[]>([]);

  const { user } = userStore();

  const fetchSolvedVocabulary = async () => {
    try {
      const response = await axios.get(
        `/solved/vocabularylist?userEmail=${user?.email}`
      );
      setSolvedProblems(response.data);
    } catch (error) {
      console.error("Failed to fetch solved problems:", error);
    }
  };

  useEffect(() => {
    fetchSolvedVocabulary();
  }, [fetchSolvedVocabulary]);

  // 문제를 월별로 그룹화
  const problemsByMonth = solvedProblems.reduce((acc, problem) => {
    const month = `${problem.month}월`;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(problem);
    return acc;
  }, {});

  // 사용된 월만 추출하고 정렬
  const usedMonths = Object.keys(problemsByMonth).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  return (
    <div className="p-5 via-blue-500 to-purple-600 min-h-screen">
      <div className="flex justify-center space-x-3 mb-4">
        {usedMonths.map((month, index) => (
          <Link
            key={index}
            to={month}
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="cursor-pointer text-gray-700 hover:text-yellow-300 font-bold text-lg transition duration-300 ease-in-out transform hover:scale-110"
          >
            {month}
          </Link>
        ))}
      </div>
      {usedMonths.map((month) => (
        <Element name={month} key={month} className="my-6">
          <h2 className="inline-block text-3xl font-bold mb-4 text-white bg-blue-500 px-6 py-3 rounded-full shadow-lg">
            {month}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemsByMonth[month].map((problem, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                <h3 className="text-xl font-semibold mb-3 text-blue-700">
                  {problem.substance}
                </h3>
                <p className="text-gray-600">{problem.description}</p>
              </div>
            ))}
          </div>
        </Element>
      ))}
    </div>
  );
};

export default SolvedWordPage;
