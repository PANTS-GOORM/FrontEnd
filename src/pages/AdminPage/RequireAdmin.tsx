import React from "react";
import { useNavigate } from "react-router-dom";
import userStore from "../../store/user";

interface RequireAdminProps {
  children: React.ReactNode;
}

const RequireAdmin: React.FC<RequireAdminProps> = ({ children }) => {
  const user = userStore((state) => state.user);

  const navigate = useNavigate();

  if (!user || !user.isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative w-1/3 p-4 text-white bg-red-500 rounded h-1/5">
          <div className="flex justify-center mt-2 text-4xl">
            관리자만 접근 가능한 페이지입니다.
          </div>
          <button
            className="absolute px-4 py-2 mt-4 text-white bg-blue-500 rounded bottom-4 right-4 hover:bg-blue-600"
            onClick={() => navigate(-1)}
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default RequireAdmin;
