import { useEffect, useState } from "react";
import { useExpensesStore } from "@/store/useExpensesStore";
import { ObjectData } from "@/types/apiTypes";
import { createList } from "@/scripts/createList";
import { PostBtn } from "@/components/PostBtn";
import DailyList from "@/components/main/DailyList";
import MonthStatistics from "@/components/main/MonthStatistics";
import styled from "styled-components";

const All = () => {
  const totalLists = useExpensesStore((state) => state.totalLists);
  const [allLists, setAllLists] = useState<ObjectData>({});

  useEffect(() => {
    createList(totalLists, setAllLists);
  }, [totalLists]);

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
