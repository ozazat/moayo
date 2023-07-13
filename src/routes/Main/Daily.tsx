import { useUserStore } from "@/store/useUserStore";
import { useState, useEffect } from "react";
import { useExpensesStore } from "@/store/useExpensesStore";
import MonthStatistics from "@/components/main/MonthStatistics";
import { searchExpenses } from "@/api/index";
import { ExpenseList } from "@/components/ExpenseList";
import styled from "styled-components";
import { useTimeStore } from "@/store/useTimeStore";
import { search } from "@/types/apiTypes";

const Daily = () => {
  const userId = useUserStore((state) => state.userId);
  const userNickname = useUserStore((state) => state.userNickname);
  const initializeUserId = useUserStore((state) => state.initializeUserId);
  const totalLists = useExpensesStore((state) => state.totalLists);
  const setTotalLists = useExpensesStore((state) => state.setTotalLists);
  const currentYear = useTimeStore((state) => state.currentYear);
  const currentMonth = useTimeStore((state) => state.currentMonth);
  const [monthList, setMonthList] = useState<search[]>([]);
  const [dayList, setDayList] = useState<{ [key: string]: search[] }>({});

  useEffect(() => {
    initializeUserId();
  }, [initializeUserId]);

  useEffect(() => {
    searchExpenses("", "ozazat").then((res) => {
      setTotalLists(res);
    });
  }, []);

  useEffect(() => {
    setDayList({});
    // totalLists에서 2023-07에 해당하는 date만 뽑기 = MonthList라고 하자
    const currentYearMonth = `${currentYear}-${currentMonth}`;
    console.log("여기", currentYear, currentMonth);
    const filteredList = [...totalLists].filter((list) => {
      console.log(list.date.includes(currentYearMonth));
      return list.date.includes(currentYearMonth);
    });
    console.log("나와", filteredList);
    setMonthList(filteredList);
  }, [totalLists, currentMonth, currentYear]);

  useEffect(() => {
    createDayList();
  }, [totalLists, monthList]);

  const createDayList = () => {
    const newDayList = { ...dayList };
    monthList.forEach((list) => {
      const date = list.date;
      const [year, month, dayTime] = date.split("-");
      const day = dayTime.split("T")[0];
      const formattedDay = `${month}.${day}`;
      if (newDayList[formattedDay]) {
        newDayList[formattedDay].push(list);
      } else {
        newDayList[formattedDay] = [list];
      }
    });
    setDayList(newDayList);
    console.log(dayList);
  };

  return (
    <>
      <MainDailyContainer>
        <MonthStatistics />
        <p>Daily!!</p>
        <span>환영합니다 </span>
        <span style={{ color: "red" }}>{userNickname}</span>
        <span>님!</span>
        <p>#{userId?.substring(0, 4)}</p>
        <DailyListContainer>
          {Object.entries(dayList).map(([day, expenseList]) => (
            <div key={day}>
              <p>{day.slice(0, 5)}</p>
              {expenseList.map((list, i) => (
                <ExpenseList key={i} amount={list.amount} category={list.category} date={list.date} />
              ))}
            </div>
          ))}
        </DailyListContainer>
      </MainDailyContainer>
    </>
  );
};

export default Daily;

const MainDailyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 390px;
  max-height: 844px;
`;

const DailyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  overflow-y: scroll;
  div {
    p {
      font-weight: 600;
    }
  }
`;
