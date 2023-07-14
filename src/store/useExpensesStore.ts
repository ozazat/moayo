import { create } from "zustand";
import { searchRes } from "@/types/apiTypes";
import { useTimeStore } from "@/store/useTimeStore";

type Store = {
  totalLists: searchRes;
  setTotalLists: (lists: searchRes) => void;
  monthList: searchRes;
  setMonthList: (lists: searchRes) => void;
};

export const useExpensesStore = create<Store>((set) => ({
  totalLists: [],
  setTotalLists: (lists: searchRes) => set({ totalLists: lists }),
  monthList: [],
  setMonthList: (lists: searchRes) => set({ monthList: lists })
}));
