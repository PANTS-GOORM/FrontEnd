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
  contents: [],
  loadContents: async (type, amount) => {
    try {
      const response = await axios.get(
<<<<<<< HEAD
        `${process.env.REACT_APP_API_URL}/vocab/random?type=${type}&amount=${amount}`,
        {
          withCredentials: true,
        }
=======
        `${process.env.REACT_APP_API_URL}/vocab/random?type=${type}&amount=${amount}`
>>>>>>> 3d83ac67907f8c0f9b8f07a35a9a0062e24af411
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
