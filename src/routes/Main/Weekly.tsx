import MonthStatistics from "@/components/main/MonthStatistics";
import { PostBtn } from "@/components/PostBtn";
import { useExpensesStore } from "@/store/useExpensesStore";
// import ExpenseList from "@/components/ExpenseList";
import styled from "styled-components";
import WeeklyList from "@/components/main/WeeklyList";

const Weekly = () => {
  const monthList = useExpensesStore((state) => state.monthList);

  return (
    <WeeklyContainer>
      <MonthStatistics />
      <WeeklyList />
      {monthList.map((month) => {
        return <div>{month.date}</div>;
      })}
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
