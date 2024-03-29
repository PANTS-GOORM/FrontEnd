// src/stores/wordStore.js
import create from "zustand";
import axios from "axios"; // Axios 직접 사용

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
  contents: GuestStudyContent[]; // DTO의 전체 데이터를 저장할 상태 추가
  loadContents: (type: string, amount: number) => Promise<void>; // 서버로부터 내용 목록을 가져오는 함수 추가
}

const wordStore = create<WordState>((set) => ({
  words: [],
  addWord: (word) => set((state) => ({ words: [...state.words, word] })),
  removeWord: (word) =>
    set((state) => ({ words: state.words.filter((w) => w !== word) })),
  learnedWords: 0,
  increaseLearnedWords: () =>
    set((state) => ({ learnedWords: state.learnedWords + 1 })),
  contents: [], // 초기 상태는 빈 배열
  loadContents: async (type, amount) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/vocab/random?type=${type}&amount=${amount}`
      );
      set({ contents: response.data });
      console.log("됨?");
    } catch (error) {
      console.error("Error loading contents:", error);
    }
  },
}));

export default wordStore;
