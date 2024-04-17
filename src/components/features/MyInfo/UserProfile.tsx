import React from "react";
import userStore from "../../../store/user"; // 스토어 가져오기

const UserProfile: React.FC = () => {
  const { user } = userStore(); // Zustand 스토어에서 user 상태를 가져옵니다.

  return user ? (
    <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
      <img
        className="h-12 w-12 rounded-full"
        src={user.profileImg}
        alt={`${user.nickname}'s profile`} // 닉네임을 alt 텍스트로 사용
      />
      <div>
        <p className="text-lg font-medium text-gray-900">{user.nickname}</p>{" "}
        {/* 닉네임을 표시 */}
        <p className="text-sm text-gray-600">{user.email}</p>{" "}
        {/* 이메일을 표시 */}
        {user.isAdmin && <p className="text-sm text-red-500">Admin</p>}
      </div>
    </div>
  ) : null;
};

export default UserProfile;
