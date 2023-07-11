import { create } from "zustand";
import { searchRes } from "@/types/apiTypes";

type Store = {};

export const useExpensesStore = create<Store>(() => ({
  totalAmount: 0,
  totalLists: []
}));
