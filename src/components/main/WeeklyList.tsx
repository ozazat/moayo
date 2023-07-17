import styled from "styled-components";
import { search } from "@/types/apiTypes";
import { useExpensesStore } from "@/store/useExpensesStore";
import { getWeekNumber, getWeekRange } from "@/utils/date";
import { useTimeStore } from "@/store/useTimeStore";
import { useEffect, useState } from "react";
import DailyList from "@/components/main/DailyList";

const WeeklyList = () => {
  const dayList = useExpensesStore((state) => state.dayList);
  const currentYear = useTimeStore((state) => state.currentYear);
  const [weekList, setWeekList] = useState<{ [key: string]: search[] }>();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    console.log(dayList);
    createWeekList();
  }, [dayList]);

  const createWeekList = () => {
    const newWeekList: { [key: string]: search[] } = {};
    Object.entries(dayList).forEach(([day, expenseList]) => {
      console.log("expenseList", expenseList);
      const newDay = `${currentYear}.${day}`;
      const formattedNewDay = new Date(newDay);
      const newWeekNumber = getWeekNumber(formattedNewDay);
      const [start, end] = getWeekRange(formattedNewDay, newWeekNumber);
      // const formatWeekRange =
      if (start.getDate() <= Number(day.split(".")[1]) && end.getDate() >= Number(day.split(".")[1])) {
        if (!newWeekList[`${start.toLocaleDateString()} ~ ${end.toLocaleDateString()}`]) {
          newWeekList[`${start.toLocaleDateString()} ~ ${end.toLocaleDateString()}`] = [];
        }
        newWeekList[`${start.toLocaleDateString()} ~ ${end.toLocaleDateString()}`].push(...expenseList);
        console.log("newWeekList", newWeekList);
        setWeekList(newWeekList);
      }
    });
  };

  const ContainerClickHandler = (day: string) => {
    console.log(day);
    setIsClicked(!isClicked);

    const dates: number[] = day.match(/\d+/g)?.map(Number) || [];
    const start = dates[1];
    const end = dates[5];
  };
  return (
    <>
      {weekList &&
        Object.entries(weekList).map(([day, lists]) => (
          <>
            <WeeklyListContainer onClick={() => ContainerClickHandler(day)} key={day}>
              <WeeklyTitle>
                <WeeklyPeriod>{day}</WeeklyPeriod>
                <WeeklyConsume>
                  {lists.filter((list) => list.amount < 0).reduce((acc, cur) => acc + cur.amount, 0)}
                </WeeklyConsume>
                <WeeklyIncome>
                  {lists.filter((list) => list.amount > 0).reduce((acc, cur) => acc + cur.amount, 0)}
                </WeeklyIncome>
              </WeeklyTitle>
            </WeeklyListContainer>
            {/* {isClicked &&
              Object.entries(dayList)
                .filter(([day]) => {
                  Number(day.split(".")[1]) >= weekStart && Number(day.split(".")[1]) <= weekEnd;
                })
                .map(([day, lists]) => <DailyList key={day} day={day} expenseList={lists} />)} */}
          </>
        ))}
    </>
  );
};

export default WeeklyList;

const WeeklyListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  min-width: 330px;
  min-height: 60px;
  max-width: 330px;
  max-height: 60px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    border: 1.8px solid var(--base-color-grey);
  }
`;
const WeeklyTitle = styled.div`
  display: flex;
`;
const WeeklyPeriod = styled.div`
  font-weight: 600;
`;

const WeeklyConsume = styled.div`
  font-size: 0.9em;
  color: var(--point-color-red);
`;

const WeeklyIncome = styled.div`
  font-size: 0.9em;
  color: var(--point-color-green);
`;
