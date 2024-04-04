// 파일 경로: src/pages/MyPage.tsx
import React from "react";
import UserProfile from "../../components/features/MyInfo/UserProfile";
import UserActivity from "../../components/features/MyInfo/UserActivity";
import UserNotification from "../../components/features/MyInfo/UserNotification";

const MyPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-10 p-4">
      <UserProfile />
      <UserActivity />
      <UserNotification />
    </div>
  );
};

export default MyPage;
