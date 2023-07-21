import MonthStatistics from "@/components/main/MonthStatistics";
import CalendarFormFullCalendar from "./CalendarFormFullCalendar";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { PostBtn } from "@/components/PostBtn";
import styled from "styled-components";

const Calendar = () => {
  return (
    <CalendarWrapper>
      <FirstRow>
        <h1>달력</h1>
        <Link to="/search">
          <StyledSearchOutlined />
        </Link>
      </FirstRow>
      <ContentWrapper>
        <MonthStatistics />
        <CalendarFormFullCalendar />
      </ContentWrapper>
      <PostBtnWrapper>
        <PostBtn />
      </PostBtnWrapper>
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  width: 350px;
  height: 40px;
  padding: 0 10px;
`;

const StyledSearchOutlined = styled(SearchOutlined)`
  font-size: 1.8rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-top: -18px;
`;

const PostBtnWrapper = styled.div`
  position: absolute;
  bottom: -758px; // 화면에서 수동으로 때려 박음.
  left: 152px; // 화면에서 수동으로 때려 박음.
  z-index: 2;
`;

export default Calendar;
