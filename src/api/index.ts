import axios from "axios";
import { ExpenseReq } from "@/types/apiTypes";

const baseApi = axios.create({
  baseURL: "http://52.78.195.183:3003/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 소비 기록 작성
const postExpense = async 