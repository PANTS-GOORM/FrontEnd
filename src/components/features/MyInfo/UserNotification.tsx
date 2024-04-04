// 파일 경로: src/components/NotificationBanner.tsx
import React from "react";

const UserNotification: React.FC = () => {
  return (
    <div className="bg-blue-500 text-white p-4 mt-4 rounded-lg">
      <p className="text-sm font-medium">
        새로운 이벤트가 있어요!{" "}
        <a href="/events" className="underline">
          이벤트 보러가기
        </a>
      </p>
    </div>
  );
};

export default UserNotification;
