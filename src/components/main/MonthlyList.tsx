import { useTimeStore } from "@/store/useTimeStore";
import { useExpensesStore } from "@/store/useExpensesStore";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { search, ObjectData } from "@/types/apiTypes";
import { getWeeksOfMonth, getMonthRange } from "@/utils/date";

const MonthlyList = () => {
  const yearList = useExpensesStore((state) => state.yearList);
  const currentYear = useTimeStore((state) => state.currentYear);
  const [monthList, setMonthList] = useState<ObjectData>({});
  const [weekRange, setWeekRange] = useState<{ [key: number]: string[] }>({});
  const [isClicked, setIsClicked] = useState<boolean[]>([]);

  useEffect(() => {
    createMonthList();
  }, [yearList]);

  useEffect(() => {
    const isClickedArray = monthList ? Object.keys(monthList) : [];
    setIsClicked(new Array(isClickedArray.length).fill(false));
  }, [monthList]);

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

  // 클릭 이벤트에, getWeeksofMonth를 생성. useState로 set해주기 : Weeks, setWeeks ✅
  const monthListClickHandler = (month: string, index: number) => {
    setIsClicked(isClicked.map((clicked, clickedIndex) => (clickedIndex === index ? !clicked : clicked)));
    const weekRanges = getWeeksOfMonth(Number(currentYear), Number(month.replace("월", "")));
    setWeekRange((prevWeekRange) => ({ ...prevWeekRange, [index]: [...weekRanges] }));
  };

  useEffect(() => {
    console.log("weekRange", weekRange);
  }, [weekRange]);
  // monthList 에서 map 돌려서, month = "5월", lists = search[] 배열
  // 주간 데이터를 얻으려면, 5월을 getWeeksofMonth에 넣어 [11~11, 11~11, 11~11]이런 형태의 배열 데이터를 받아와야함.
  // MonthlyListContainer를 클릭했을 때, 펼쳐지면서 나오자.✅

  // lists에서 weeks를 돌면서, 해당 기간 안에 있는 list들의 amount 합 구하기.
  const filterListsByRange = (lists: search[], range: string) => {
    const [start, end] = range.split(" ~ ");
    const startDate = new Date(`${currentYear}-${start}`);
    const endDate = new Date(`${currentYear}-${end}`);
    return lists.filter((list) => {
      const listDate = new Date(list.date);
      return listDate >= startDate && listDate <= endDate;
    });
  };
  return (
    <Container>
      {Object.entries(monthList).map(([month, lists], index) => (
        <div key={month}>
          <MonthlyListContainer
            className={isClicked[index] ? "active" : ""}
            onClick={() => monthListClickHandler(month, index)}
          >
            <MonthlyPeriod>
              <div>{month}</div>
              <span>{getMonthRange(Number(currentYear), Number(month.replace("월", "")))}</span>
            </MonthlyPeriod>
            <MonthlyConsume>
              {lists
                .filter((list: search) => list.amount < 0)
                .reduce((acc: number, cur: search) => acc + cur.amount, 0)
                .toLocaleString()}
            </MonthlyConsume>
            <MonthlyIncome>
              {lists
                .filter((list) => list.amount > 0)
                .reduce((acc, cur) => acc + cur.amount, 0)
                .toLocaleString()}
            </MonthlyIncome>
          </MonthlyListContainer>
          <WeeklyListContainer className={isClicked[index] ? "active" : ""}>
            {isClicked[index] &&
              weekRange[index] &&
              weekRange[index].map((range) => {
                const filteredLists = filterListsByRange(lists, range);
                return (
                  <WeeklyLists key={range}>
                    <span>{range.replaceAll("-", ".")}</span>
                    <WeeklyAmounts>
                      <Consume>
                        {filteredLists
                          .filter((list) => list.amount < 0)
                          .reduce((acc, cur) => acc + cur.amount, 0)
                          .toLocaleString()}
                      </Consume>
                      <Income>
                        {filteredLists
                          .filter((list) => list.amount > 0)
                          .reduce((acc, cur) => acc + cur.amount, 0)
                          .toLocaleString()}
                      </Income>
                    </WeeklyAmounts>
                  </WeeklyLists>
                );
              })}
          </WeeklyListContainer>
        </div>
      ))}
    </Container>
  );
};

export default MonthlyList;

const Container = styled.div`
  position: relative;
  top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 350px;
  height: 440px;
  max-width: 350px;
  max-height: 700px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MonthlyListContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  gap: 28px;
  min-width: 330px;
  min-height: 60px;
  max-width: 330px;
  max-height: 60px;
  border-radius: 10px;
  padding: 0 18px 0;
  margin-bottom: 10px;
  background-color: #ffffff;
  text-align: center;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--point-color-yellow);
  }
  &.active {
    box-shadow: 1px 2px 1px var(--point-color-yellow);
    position: relative;
    top: 4px;
  }
`;

const MonthlyPeriod = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
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

const WeeklyListContainer = styled.div`
  display: none;
  &.active {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    top: 10px;
    min-width: 330px;
    max-width: 330px;
    max-height: 260px;
    border-radius: 10px;
    margin-bottom: 30px;
    background-color: #eaeaea;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const WeeklyLists = styled.div`
  display: flex;
  width: 300px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 5px 10px;
  span {
    font-size: 16px;
  }
`;
const WeeklyAmounts = styled.div`
  display: flex;
`;

const Consume = styled.div`
  color: var(--point-color-red);
  margin-right: 10px;
`;

const Income = styled.div`
  color: var(--point-color-green);
`;
