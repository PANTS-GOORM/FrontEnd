import create from "zustand";
import axios from "axios";

interface StudyContent {
  vocabulary: string; // 정답
  contentURL: string; // 이미지
  problemDescription: string; // 설명
}

interface WordState {
  learnedWordCount: number;
  amount: number;
  setAmount: (newAmount: number) => void;
  increaseLearnedWords: () => void;
  contents: StudyContent[];
  loadContents: (type: string, amount: number) => Promise<void>;
  hearts: number; // 하트의 수
  round: number; // 라운드 수
  removeHeart: () => void; // 하트 제거
  resetRound: () => void;
  nextRound: () => void; // 다음 라운드로 넘어가기
}

const learningStore = create<WordState>((set) => ({
  learnedWordCount: 0,
  amount: 0,
  setAmount: (newAmount: number) => set(() => ({ amount: newAmount })),
  increaseLearnedWords: () =>
    set((state) => ({ learnedWordCount: state.learnedWordCount + 1 })),
  contents: [],
  loadContents: async (type, amount) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/vocab/random?type=${type}&amount=${amount}`,
        {
          withCredentials: true,
        }
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
  resetRound: () => set(() => ({ round: 1 })),
  nextRound: () => set((state) => ({ round: state.round + 1, hearts: 3 })), // 다음 라운드로 넘어가며 하트 수도 초기화
}));

export default learningStore;
