import React from "react";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg ">
        <div className="flex justify-center mt-3 mb-14">
          <h1 className="text-5xl font-bold ">관리자 페이지</h1>
        </div>
        <ul className="flex justify-center mb-4 space-x-20 text-2xl">
          <li>
            <Link
              to="/admin/wordlist"
              className="text-blue-500 transition-colors duration-300 hover:text-blue-700"
            >
              관리자 어휘 목록 페이지
            </Link>
          </li>
          <li>
            <Link
              to="/admin/wordregist"
              className="text-blue-500 transition-colors duration-300 hover:text-blue-700"
            >
              관리자 어휘 등록 페이지
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Admin;
