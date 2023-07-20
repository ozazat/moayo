import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useExpensesStore } from "@/store/useExpensesStore";
import MonthStatistics from "@/components/main/MonthStatistics";
import { useTimeStore } from "@/store/useTimeStore";
import { PostBtn } from "@/components/PostBtn";
import AllDailyList from "@/components/main/AllDailyList";
import styled from "styled-components";
import { createList } from "@/scripts/createList";

const Daily = () => {
  const userId = useUserStore((state) => state.userId);
  const userNickname = useUserStore((state) => state.userNickname);
  const initializeUserId = useUserStore((state) => state.initializeUserId);
  const totalLists = useExpensesStore((state) => state.totalLists);
  const setDayList = useExpensesStore((state) => state.setDayList);
  const monthList = useExpensesStore((state) => state.monthList);
  const currentYear = useTimeStore((state) => state.currentYear);
  const currentMonth = useTimeStore((state) => state.currentMonth);
  const currentDay = useTimeStore((state) => state.currentDay);

  // currentDay와 dayList의 day가 일치하는 것 찾기
  // useRef로 해당 dayList 요소로 스크롤 이동
  useEffect(() => {}, [currentDay]);
  useEffect(() => {
    initializeUserId();
  }, [initializeUserId]);

  useEffect(() => {
    createList(monthList, setDayList);
  }, [monthList, currentYear, currentMonth]);

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
