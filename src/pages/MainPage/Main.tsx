import React from "react";

const Main = () => {
  const main_menu = [
    {
      title: "어휘 학습",
      link: "/learning/select",
      logo: "learning_logo.png",
    },
    {
      title: "경쟁 학습",
      link: "/ranking",
      logo: "ranking_logo.png",
    },
  ];

  return (
    <div className="flex justify-around min-h-screen">
      <div className="flex space-x-60">
        {main_menu.map((data) => (
          <div className="p-10 mx-auto my-auto bg-white rounded-full opacity-80">
            <a className="flex flex-col gap-auto" href={data.link}>
              <img src={"img/" + data.logo} alt="어휘 학습 서비스 로고" />
              <div className="flex justify-center">
                <p className="inline-block md:text-center">{data.title}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
