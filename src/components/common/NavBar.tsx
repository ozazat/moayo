import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import styled from "styled-components";

export const NavBar = () => {
  const [mainColor, setMainColor] = useState("#333333");
  const [calendarColor, setCalendarColor] = useState("#333333");
  const [chartColor, setChartColor] = useState("#333333");
  const [accountColor, setAccountColor] = useState("#333333");

  const MainIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(390px / 4);
    height: 100%;
    svg {
      width: 28px;
      height: 28px;
      path {
        color: ${mainColor};
      }
    }
  `;

  const CalendarIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(390px / 4);
    height: 100%;
    svg {
      width: 28px;
      height: 28px;
      path {
        color: ${calendarColor};
      }
    }
  `;

  const ChartIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(390px / 4);
    height: 100%;
    svg {
      width: 28px;
      height: 28px;
      path {
        color: ${chartColor};
      }
    }
  `;

  const AccountIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(390px / 4);
    height: 100%;
    svg {
      width: 28px;
      height: 28px;
      path {
        color: ${accountColor};
      }
    }
  `;

  return (
    <>
      <NavContainer>
        <NavLink
          style={({ isActive }) => (isActive ? setMainColor("#ff7473") : setMainColor("#333333"))}
          to="/main/daily"
        >
          <MainIcon>
            <Icon icon="iconoir:piggy-bank" />
          </MainIcon>
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? setCalendarColor("#47b8e0") : setCalendarColor("#333333"))}
          to="/sub/calendar"
        >
          <CalendarIcon>
            <Icon icon="ep:calendar" />
          </CalendarIcon>
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? setChartColor("#ffc952") : setChartColor("#333333"))}
          to="/sub/chart"
        >
          <ChartIcon>
            <Icon icon="octicon:graph-24" />
          </ChartIcon>
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? setAccountColor("#34be3a") : setAccountColor("#333333"))}
          to="/sub/account"
        >
          <AccountIcon>
            <Icon icon="la:user" />
          </AccountIcon>
        </NavLink>
      </NavContainer>
    </>
  );
};

const NavContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 390px;
  height: 60px;
  max-width: 390px;
  max-height: 80px;
  background-color: #ffffff;
  // z-index: 9;
`;
