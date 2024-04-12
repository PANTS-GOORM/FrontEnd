import create from "zustand";
import axios from "axios";

interface StudyContent {
  vocabulary: string; // 정답
  contentURL: string; // 이미지
  problemDescription: string; // 설명
}

interface WordState {
  learnedWords: number;
  increaseLearnedWords: () => void;
  contents: StudyContent[];
  loadContents: (type: string, amount: number) => Promise<void>;
  hearts: number; // 하트의 수
  round: number; // 라운드 수
  removeHeart: () => void; // 하트 제거
  nextRound: () => void; // 다음 라운드로 넘어가기
}

const learningStore = create<WordState>((set) => ({
  learnedWords: 0,
  increaseLearnedWords: () =>
    set((state) => ({ learnedWords: state.learnedWords + 1 })),
  contents: [
    {
      vocabulary: "1라운드",
      contentURL:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbmxKXWtkUK3IrPeJrE1rcHRpnYtBg7OsTrnJyihDYI41eTl_uW8RK_BWKdzWUuVaSagbBffI7FEKjZzeFGwxF6w7YO=w958-h910",
      problemDescription: "쉽게 할 수 있는 일",
    },
    {
      vocabulary: "2라운드",
      contentURL:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbmxKXWtkUK3IrPeJrE1rcHRpnYtBg7OsTrnJyihDYI41eTl_uW8RK_BWKdzWUuVaSagbBffI7FEKjZzeFGwxF6w7YO=w958-h910",
      problemDescription: "쉽게 할 수 있는 일",
    },
    {
      vocabulary: "3라운드",
      contentURL:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbmxKXWtkUK3IrPeJrE1rcHRpnYtBg7OsTrnJyihDYI41eTl_uW8RK_BWKdzWUuVaSagbBffI7FEKjZzeFGwxF6w7YO=w958-h910",
      problemDescription: "쉽게 할 수 있는 일",
    },
  ],
  loadContents: async (type, amount) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/vocab/random?type=${type}&amount=${amount}`
      );
      set({ contents: response.data });
    } catch (error) {
      console.error("Error loading contents:", error);
    }
  },
  hearts: 3,
  round: 1, // 라운드 수 초기화
  removeHeart: () =>
    set((state) => ({ hearts: Math.max(0, state.hearts - 1) })),
  nextRound: () => set((state) => ({ round: state.round + 1, hearts: 3 })), // 다음 라운드로 넘어가며 하트 수도 초기화
}));

export default learningStore;
