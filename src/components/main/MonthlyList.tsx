import { useTimeStore } from "@/store/useTimeStore";
import { useExpensesStore } from "@/store/useExpensesStore";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { search } from "@/types/apiTypes";
import { getWeeksOfMonth, getMonthRange } from "@/utils/date";

const MonthlyList = () => {
  const yearList = useExpensesStore((state) => state.yearList);
  const currentYear = useTimeStore((state) => state.currentYear);
  const [monthList, setMonthList] = useState({});

  useEffect(() => {
    createMonthList();
  }, [yearList]);

  console.log(getWeeksOfMonth(Number(currentYear), 8));

  const createMonthList = () => {
    const newMonthList: { [key: string]: search[] } = {};
    yearList.forEach((list) => {
      const date = list.date;
      const [, month] = date.split("-");
      const formattedDay = `${month}월`;
      if (newMonthList[formattedDay]) {
        newMonthList[formattedDay].push(list);
      } else {
        newMonthList[formattedDay] = [list];
      }
    });
    // console.log("newDayList", newDayList);
    const keysArray: string[] = Object.keys(newMonthList);
    // 키 값을 내림차순으로 정렬합니다.
    keysArray.sort((a, b) => Number(b.replace("월", "")) - Number(a.replace("월", "")));

    // 정렬된 키를 기반으로 새로운 객체를 생성합니다.
    interface SortedData {
      [date: string]: search[];
    }
    const sortedData: SortedData = {};
    keysArray.forEach((key) => {
      sortedData[key] = newMonthList[key];
    });
    console.log("sortedData", sortedData);
    console.log("ArraySorted", Object.entries(sortedData));
    setMonthList(sortedData);
    console.log(monthList);
  };

  return (
    <>
      {Object.entries(monthList).map(([month, lists]) => (
        <MonthlyListContainer>
          <>
            <MonthlyPeriod>
              <div>{month}</div>
              <span>{getMonthRange(Number(currentYear), Number(month.replace("월", "")))}</span>
            </MonthlyPeriod>
            <MonthlyConsume>
              {lists
                .filter((list) => list.amount < 0)
                .reduce((acc, cur) => acc + cur.amount, 0)
                .toLocaleString()}
            </MonthlyConsume>
            <MonthlyIncome>
              {lists
                .filter((list) => list.amount > 0)
                .reduce((acc, cur) => acc + cur.amount, 0)
                .toLocaleString()}
            </MonthlyIncome>
          </>
        </MonthlyListContainer>
      ))}
    </>
  );
};

export default MonthlyList;

const MonthlyListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
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

const MonthlyPeriod = styled.div`
  display: flex;
  flex-direction: column;

  div {
    font-weight: 600;
  }
  span {
    font-size: 0.8em;
  }
`;

const MonthlyConsume = styled.div`
  font-size: 0.9em;
  color: var(--point-color-red);
`;

const MonthlyIncome = styled.div`
  font-size: 0.9em;
  color: var(--point-color-green);
`;
