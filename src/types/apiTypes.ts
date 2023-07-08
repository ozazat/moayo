// 소비 기록 작성 api
/*
POST /expenses
Content-Type: application/json
*/
export interface ExpenseReq {
  amount: number;
  userId: string;
  category: string;
  date: string;
}
//응답데이터
export interface ExpenseRes {
  message: string;
}

// 소비 품목 목록 API Request
// GET /categories?userId={userId}
// requestBody 없음
//응답데이터
export type categoryRes = string[];

//검색어에 해당하는 소비 항목 및 금액 조회 api
//GET /expenses/search?q={keyword}&userId={userId}
//requestBody 없음
//응답데이터

export type searchRes = search[];
interface search {
  _id: string;
  amount: number;
  userId: string;
  category: string;
  date: string;
}

//일별, 주별, 월별 소비 조회
// GET /expenses/summary?period={period}&userId={userId}
// period : daily, weekly, monthly
// 요청데이터 없음
//응답데이터
export type periodRes = period[];
interface period {
  _id: string;
  totalAmount: number;
}

// 소비기록 수정
// PUT /expenses/${search._Id}
// 요청데이터
export interface editExpenseReq {
  amount: number;
  userId: string;
  category: string;
  date: string;
}
//응답데이터
export interface editExpenseRes {
  message: "Expense updated successfully";
}

// 소비기록 삭제
// DELETE /expenses/${search._Id}
// 요청데이터 없음
// 응답 데이터
export interface removeExpenseRes {
  message: "Expense updated successfully";
}

// 소비기록 달력 호출
// GET /expenses/calendar?year=2023&month=7&userId={userId}
// 요청 데이터 없음
// 응답 데이터
export interface calendarRes {
  [key: string]: ExpenseReq[];
}
