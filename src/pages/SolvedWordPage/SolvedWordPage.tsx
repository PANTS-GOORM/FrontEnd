import React from "react";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

const SolvedWordPage: React.FC = () => {
  const solvedProblems = [
    {
      id: 1,
      title: "고진감래",
      description:
        "괴로움이 다하면 달콤함이 온다는 뜻으로 고생 끝에 낙이 온다는 말",
      solvedMonth: 1, // 숫자 형태로 변경
    },
    {
      id: 2,
      title: "구사일생",
      description:
        "아홉 번 죽을 뻔하다 한 번 살아난다는 뜻으로 죽을 고비를 여러 번 넘기고 간신히 목숨을 건진다는 말",
      solvedMonth: 1,
    },
    {
      id: 3,
      title: "과유불급",
      description: "정도가 지나친 것은 부족한 것보다 못하다는 말",
      solvedMonth: 1,
    },
    {
      id: 4,
      title: "대기만성",
      description:
        "큰 기회는 늦게 온다는 뜻으로, 큰 일을 이루는 데는 오랜 시간이 걸린다는 말",
      solvedMonth: 1,
    },
    {
      id: 5,
      title: "마이동풍",
      description:
        "마음이 통하면 서로 얼굴을 보지 않아도 알 수 있다는 뜻으로, 뜻이 맞는 사람끼리는 서로 의사소통이 잘된다는 말",
      solvedMonth: 3,
    },
    {
      id: 6,
      title: "사면초가",
      description:
        "사방이 초원이라는 뜻으로, 사방이 막힌 데다 위기에 처해 있다는 말",
      solvedMonth: 4,
    },
    {
      id: 7,
      title: "일석이조",
      description:
        "한 가지 일을 하면서 두 가지 이익을 얻는다는 뜻으로, 하나의 행동이나 선택이 여러 가지 긍정적 결과를 가져온다는 말",
      solvedMonth: 4,
    },
    {
      id: 8,
      title: "입신양명",
      description:
        "신분을 높여 이름을 드높인다는 뜻으로, 스스로 노력하여 사회적으로 성공하고 명성을 얻는다는 말",
      solvedMonth: 2,
    },
  ];

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // 문제를 월별로 그룹화
  const problemsByMonth = solvedProblems.reduce((acc, problem) => {
    const month = `${problem.solvedMonth}월`; // 숫자를 다시 월로 변환
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(problem);
    return acc;
  }, {});

  // 월별 정렬 순서 매핑
  const monthOrder = months.reduce((acc, month, index) => {
    acc[`${month}월`] = index + 1;
    return acc;
  }, {});

  // 사용된 월만 추출하고 정렬
  const usedMonths = Object.keys(problemsByMonth).sort(
    (a, b) => monthOrder[a] - monthOrder[b]
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
            {problemsByMonth[month].map((problem) => (
              <div
                key={problem.id}
                className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                <h3 className="text-xl font-semibold mb-3 text-blue-700">
                  {problem.title}
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
