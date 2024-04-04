import create from "zustand";
import { persist } from "zustand/middleware";

interface User {
  userEmail: string;
  userToken: string;
  userName: string;
  profileImg: string;
  isAdmin: boolean;
}

interface UserState {
  user: User | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
}

const userStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      loginUser: (user) => set({ user }),
      logoutUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // 로컬 스토리지에 저장될 때 사용될 키 이름
      getStorage: () => localStorage, // 사용할 스토리지 타입 지정, 여기서는 로컬 스토리지를 사용합니다.
    }
  )
);

export default userStore;
