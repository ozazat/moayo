import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useTimeStore } from "@/store/useTimeStore";
import { useExpensesStore } from "@/store/useExpensesStore";
import { searchExpenses } from "@/api/index";

dayjs.extend(customParseFormat);
dayjs.locale("ko");

const MainHeader = () => {
  const location = useLocation();
  const defaultDate = dayjs().format("YYYY년 M월");

  const totalLists = useExpensesStore((state) => state.totalLists);
  const setTotalLists = useExpensesStore((state) => state.setTotalLists);

  const currentYear = useTimeStore((state) => state.currentYear);
  const currentMonth = useTimeStore((state) => state.currentMonth);
  const setCurrentYear = useTimeStore((state) => state.setCurrentYear);
  const setCurrentMonth = useTimeStore((state) => state.setCurrentMonth);
  const setMonthList = useExpensesStore((state) => state.setMonthList);

  useEffect(() => {
    searchExpenses("", "ozazat").then((res) => {
      setTotalLists(res);
    });
    // setDayList({});
    setMonthList([]);
  }, []);

  useEffect(() => {
    // setDayList({});
    setMonthList([]);
    const currentYearMonth = `${currentYear}-${currentMonth}`;
    const filteredList = [...totalLists].filter((list) => {
      return list.date.includes(currentYearMonth);
    });
    setMonthList(filteredList);
  }, [totalLists, currentMonth, currentYear]);

  return (
    <>
      <MainHeaderFirstRow>
        <div>
          <StyledDatePicker
            picker="month"
            bordered={false}
            defaultValue={dayjs(defaultDate, "YYYY년 M월")}
            format="YYYY년 M월"
            allowClear={false}
            size={"large"}
            onChange={(date: any) => {
              setCurrentYear(String(date.$y));
              setCurrentMonth(String(date.$M + 1));
            }}
          />
        </div>
        <StyledLink to="/search" isActive={location.pathname === "/search"}>
          <SearchOutlined />
        </StyledLink>
      </MainHeaderFirstRow>
      <MainHeaderSecondRow>
        <StyledLink to="/main/daily" isActive={location.pathname === "/main/daily"}>
          <div>일일</div>
        </StyledLink>
        <StyledLink to="/main/weekly" isActive={location.pathname === "/main/weekly"}>
          <div>주간</div>
        </StyledLink>
        <StyledLink to="/main/monthly" isActive={location.pathname === "/main/monthly"}>
          <div>월간</div>
        </StyledLink>
        <StyledLink to="/main/all" isActive={location.pathname === "/main/all"}>
          <div>전체</div>
        </StyledLink>
      </MainHeaderSecondRow>
    </>
  );
};

export default MainHeader;

const StyledDatePicker = styled(DatePicker)`
  .ant-picker-input > input {
    font-size: 1.6rem;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #888;
    }
  }

  // 아이콘 숨기기
  .ant-picker-suffix {
    display: none;
  }

  // 빈 공백 줄이기
  .ant-picker-input {
    padding-right: 0px !important;
  }
`;

type StyledLinkProps = {
  isActive: boolean;
};

const StyledLink = styled(Link)<StyledLinkProps>`
  text-decoration: none;
  color: var(--base-color-black);
  display: block;
  div {
    position: relative;
    padding-bottom: 0px;
    font-weight: ${(props) => (props.isActive ? 900 : "normal")};
    &::after {
      content: "";
      position: absolute;
      left: -15px;
      right: -15px;
      bottom: -15px;
      height: 4px;
      width: auto;
      background-color: ${(props) => (props.isActive ? "var(--point-color-red)" : "transparent")};
      transition: background-color 0.3s ease;
    }
    &:hover {
      font-weight: 900;

      &::after {
        background-color: var(--point-color-red);
      }
    }
  }
`;

const MainHeaderFirstRow = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  width: 350px;
  height: 40px;
  padding: 0 10px;
  div {
    font-weight: 900;
  }
`;

const MainHeaderSecondRow = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 50px;
  padding: 0 30px;
  background-color: white;
  border-radius: 10px;
  margin-top: 10px;
`;
