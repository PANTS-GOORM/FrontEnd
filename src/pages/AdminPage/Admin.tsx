import React from "react";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <>
      <h1>관리자 페이지</h1>
      <li>
        <Link to="/admin/wordlist">관리자 어휘 목록 페이지</Link>
      </li>
      <li>
        <Link to="/admin/wordregist">관리자 어휘 등록 페이지</Link>
      </li>
    </>
  );
}

export default Admin;
