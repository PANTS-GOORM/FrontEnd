import create from "zustand";
import axios from "axios";

interface GuestStudyContent {
  vocabulary: string;
  description: string;
  contentURL: string;
  problemDescription: string;
}

interface WordState {
  words: string[];
  addWord: (word: string) => void;
  removeWord: (word: string) => void;
  learnedWords: number;
  increaseLearnedWords: () => void;
  contents: GuestStudyContent[];
  loadContents: (type: string, amount: number) => Promise<void>;
  hearts: number; // 하트의 수
  round: number; // 라운드 수
  removeHeart: () => void; // 하트 제거
  nextRound: () => void; // 다음 라운드로 넘어가기
}

const learningStore = create<WordState>((set) => ({
  words: [],
  addWord: (word) => set((state) => ({ words: [...state.words, word] })),
  removeWord: (word) =>
    set((state) => ({ words: state.words.filter((w) => w !== word) })),
  learnedWords: 0,
  increaseLearnedWords: () =>
    set((state) => ({ learnedWords: state.learnedWords + 1 })),
  contents: [],
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
