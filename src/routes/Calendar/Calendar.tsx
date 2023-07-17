import MonthStatistics from "@/components/main/MonthStatistics";
import CalendarFormFullCalendar from "./CalendarFormFullCalendar";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

const Calendar = () => {
  const location = useLocation();

  return (
    <CalendarWrapper>
      <FirstRow>
        <h1>달력</h1>
        <Link to="/search" isActive={location.pathname === "/search"}>
          <StyledSearchOutlined />
        </Link>
      </FirstRow>
      <ContentWrapper>
        <MonthStatistics />
        <CalendarFormFullCalendar />
      </ContentWrapper>
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.div`
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
  font-size : 1.8rem;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export default Calendar