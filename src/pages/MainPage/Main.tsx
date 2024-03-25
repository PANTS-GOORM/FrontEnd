import React from "react";
import { Link } from "react-router-dom";
import useStore from "../../store/learning"; // 상태를 가져오기 위한 useStore 훅을 임포트합니다.
import TypeModalButton from "../../components/Button/TypeModalButton";

function Main() {
  return (
    <div>
      <h1>메인 페이지</h1>
      <Link to="/learning">Learning</Link>
      <TypeModalButton />
    </div>
  );
}

export default Main;
