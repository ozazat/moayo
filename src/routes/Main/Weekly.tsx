import { useEffect } from "react";
import MonthStatistics from "@/components/main/MonthStatistics";
import { PostBtn } from "@/components/PostBtn";
import { useExpensesStore } from "@/store/useExpensesStore";
import { useTimeStore } from "@/store/useTimeStore";
import WeeklyList from "@/components/main/WeeklyList";
import styled from "styled-components";
// import type { CollapseProps } from "antd";
// import { Collapse } from "antd";
import { getWeekNumber, getWeekRange } from "@/utils/date";
import DailyList from "@/components/main/DailyList";
import { search } from "@/types/apiTypes";

const Weekly = () => {
  const monthList = useExpensesStore((state) => state.monthList);
  // const currentFullDate = useTimeStore((state) => state.currentFullDate);
  const dayList = useExpensesStore((state) => state.dayList);
  const setDayList = useExpensesStore((state) => state.setDayList);
  const currentYear = useTimeStore((state) => state.currentYear);
  const currentMonth = useTimeStore((state) => state.currentMonth);

  // const items: CollapseProps["items"] = [
  //   {
  //     key: "1",
  //     label: "07-23 ~ 07-31",
  //     children: <><DailyList key={day} day={day} expenseList={expenseList} /></>
  //   },
  //   {
  //     key: "2",
  //     label: "07-16 ~ 07-22",
  //     children: <p>22222</p>
  //   },
  //   {
  //     key: "3",
  //     label: "This is panel header 3",
  //     children: <p>33333</p>
  //   }
  // ];
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

  console.log("dayList", Object.entries(dayList));
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

// const CollapseContainer = styled(Collapse)``;
