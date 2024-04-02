import create from "zustand";
import { persist } from "zustand/middleware";

interface User {
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

const imgURL: string =
  "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbmxKXWtkUK3IrPeJrE1rcHRpnYtBg7OsTrnJyihDYI41eTl_uW8RK_BWKdzWUuVaSagbBffI7FEKjZzeFGwxF6w7YO=w958-h910";
const exUser: User = {
  userToken: "123asdzxc",
  userName: "KimMinBeom",
  profileImg: `${imgURL}`,
  isAdmin: false,
};

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
