import { useEffect } from "react";
import MonthStatistics from "@/components/main/MonthStatistics";
import { PostBtn } from "@/components/PostBtn";
import { useExpensesStore } from "@/store/useExpensesStore";
import { useTimeStore } from "@/store/useTimeStore";
import WeeklyList from "@/components/main/WeeklyList";
import styled from "styled-components";
import { search } from "@/types/apiTypes";

const Weekly = () => {
  const monthList = useExpensesStore((state) => state.monthList);

  const setDayList = useExpensesStore((state) => state.setDayList);
  const currentYear = useTimeStore((state) => state.currentYear);
  const currentMonth = useTimeStore((state) => state.currentMonth);

  useEffect(() => {
    createDayList();
  }, [monthList, currentYear, currentMonth]);

  const createDayList = () => {
    const newDayList: { [key: string]: search[] } = {};
    monthList.forEach((list) => {
      const date = list.date;
      const [, month, dayTime] = date.split("-");
      const day = dayTime.split("T")[0];
      const formattedDay = `${month}.${day}`;
      if (newDayList[formattedDay]) {
        newDayList[formattedDay].push(list);
      } else {
        newDayList[formattedDay] = [list];
      }
      setDayList(newDayList);
    });
  };

  return (
    <WeeklyContainer>
      <MonthStatistics />
      <WeeklyList />
      <PostBtn />
    </WeeklyContainer>
  );
};
export default Weekly;

const WeeklyContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 390px;
  height: 680px;
  max-height: 800px;
`;
