import { create } from "zustand";

interface WordState {
  words: string[];
  addWord: (word: string) => void;
}

const useStore = create<WordState>((set) => ({
  words: [],
  addWord: (word) => set((state) => ({ words: [...state.words, word] })),
}));

export default useStore;
