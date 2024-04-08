// 파일 경로: src/components/UserActivity.tsx
import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
const UserActivity: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4">
      <h3 className="text-lg leading-6 font-medium text-gray-900">내 정보</h3>
      <ul className="mt-2 space-y-2">
        {/* 각 활동 링크를 리스트 아이템으로 구성합니다. */}
        <li>
          <a
            href="/words"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            어휘목록
          </a>
        </li>
        <li>
          <a
            href="/mypage/mysetting"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            설정
          </a>
        </li>
        <li>
          <span className="flex-1 mr-2">경험치</span>
          <LinearProgress
            variant="determinate"
            value={50}
            valueBuffer={100}
            className="flex-2"
          />
        </li>
      </ul>
    </div>
  );
};

export default UserActivity;
