import MonthStatistics from "@/components/main/MonthStatistics";
import { PostBtn } from "@/components/PostBtn";
import { useExpensesStore } from "@/store/useExpensesStore";
// import ExpenseList from "@/components/ExpenseList";
import styled from "styled-components";

const Weekly = () => {
  const monthList = useExpensesStore((state) => state.monthList);

  return (
    <WeeklyContainer>
      <MonthStatistics />
      <div>Weekly!!</div>
      {monthList.map((month) => {
        return <div>{month.date}</div>;
      })}
      <PostBtn />
    </WeeklyContainer>
  );
};

export default Weekly;

const WeeklyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
