import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { useExpensesStore } from "@/store/useExpensesStore";
import MonthStatistics from "@/components/main/MonthStatistics";
import { useTimeStore } from "@/store/useTimeStore";
import { search } from "@/types/apiTypes";
import { PostBtn } from "@/components/PostBtn";
import AllDailyList from "@/components/main/AllDailyList";
import styled from "styled-components";

const Daily = () => {
  const userId = useUserStore((state) => state.userId);
  const userNickname = useUserStore((state) => state.userNickname);
  const initializeUserId = useUserStore((state) => state.initializeUserId);
  const totalLists = useExpensesStore((state) => state.totalLists);
  const setDayList = useExpensesStore((state) => state.setDayList);
  const monthList = useExpensesStore((state) => state.monthList);
  const currentYear = useTimeStore((state) => state.currentYear);
  const currentMonth = useTimeStore((state) => state.currentMonth);

  useEffect(() => {
    initializeUserId();
  }, [initializeUserId]);

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
    });
    setDayList(newDayList);
  };

  return (
    <>
      <MainDailyContainer>
        <MonthStatistics />
        {!totalLists.length ? (
          <>
            <span>환영합니다</span>
            <span>{userNickname}님!</span>
            <p>#{userId?.substring(0, 4)}</p>
          </>
        ) : (
          <></>
        )}
        <DailyListContainer>
          <AllDailyList />
        </DailyListContainer>
        <PostBtn />
      </MainDailyContainer>
    </>
  );
};

export default Daily;

const MainDailyContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 390px;
  height: 680px;
  max-height: 800px;
`;

const DailyListContainer = styled.div`
  position: absolute;
  top: 180px;
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
