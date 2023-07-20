import { useEffect, useState } from "react";
import styled from "styled-components";
import { useExpensesStore } from "@/store/useExpensesStore";
import { search, ObjectData } from "@/types/apiTypes";
import DailyList from "@/components/main/DailyList";
import { PostBtn } from "@/components/PostBtn";
import MonthStatistics from "@/components/main/MonthStatistics";

const All = () => {
  const totalLists = useExpensesStore((state) => state.totalLists);
  const [allLists, setAllLists] = useState<ObjectData>({});

  useEffect(() => {
    createAllList();
  }, [totalLists]);

  const createAllList = () => {
    const newDayList: { [key: string]: search[] } = {};
    totalLists.forEach((list) => {
      const date = list.date;
      const [year, month, dayTime] = date.split("-");
      const day = dayTime.split("T")[0];
      const formattedDay = `${year}.${month}.${day}`;
      if (newDayList[formattedDay]) {
        newDayList[formattedDay].push(list);
      } else {
        newDayList[formattedDay] = [list];
      }
    });
    // console.log("newDayList", newDayList);
    const keysArray: string[] = Object.keys(newDayList);

    // 키 값을 내림차순으로 정렬합니다.
    keysArray.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    // 정렬된 키를 기반으로 새로운 객체를 생성합니다.
    const sortedData: ObjectData = {};
    keysArray.forEach((key) => {
      sortedData[key] = newDayList[key];
    });

    console.log("sortedData", sortedData);
    setAllLists(sortedData);
  };

  return (
    <MainContainer>
      <MonthStatistics />
      <AllListContainer>
        {Object.entries(allLists).map(([day, list]) => (
          <DailyList key={day} day={day} expenseList={list} />
        ))}
      </AllListContainer>
      <PostBtn />
    </MainContainer>
  );
};

export default All;

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 390px;
  height: 680px;
  max-height: 800px;
`;
const AllListContainer = styled.div`
  position: absolute;
  top: 190px;
  display: flex;
  flex-direction: column;
  height: 460px;
  overflow-y: scroll;
  div {
    p {
      font-weight: 600;
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
