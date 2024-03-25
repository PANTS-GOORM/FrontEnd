import create from "zustand";

interface WordState {
  words: string[];
  addWord: (word: string) => void;
  removeWord: (word: string) => void;
  learnedWords: number;
  increaseLearnedWords: () => void;
}

const useStore = create<WordState>((set) => ({
  words: [],
  addWord: (word) => set((state) => ({ words: [...state.words, word] })),
  removeWord: (word) =>
    set((state) => ({ words: state.words.filter((w) => w !== word) })),
  learnedWords: 0,
  increaseLearnedWords: () =>
    set((state) => ({ learnedWords: state.learnedWords + 1 })),
}));

export default useStore;
