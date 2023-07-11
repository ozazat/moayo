import { create } from "zustand";
import { searchRes } from "@/types/apiTypes";

type Store = {
  totalLists: searchRes;
  setTotalLists: (lists: searchRes) => void;
};

export const useExpensesStore = create<Store>((set) => ({
  totalLists: [],
  setTotalLists: (lists: searchRes) => set({ totalLists: lists })
}));
