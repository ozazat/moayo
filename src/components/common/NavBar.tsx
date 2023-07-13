import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import styled from "styled-components";

export const NavBar = () => {
  return (
    <>
      <NavContainer>
        <MainNav className={({ isActive }: ClassNameProps) => (isActive ? "active" : "")} to="/main/daily">
          <MainIcon>
            <Icon icon="iconoir:piggy-bank" />
          </MainIcon>
        </MainNav>
        <CalendarNav className={({ isActive }: ClassNameProps) => (isActive ? "active" : "")} to="/sub/calendar">
          <CalendarIcon>
            <Icon icon="ep:calendar" />
          </CalendarIcon>
        </CalendarNav>
        <ChartNav className={({ isActive }: ClassNameProps) => (isActive ? "active" : "")} to="/sub/chart">
          <ChartIcon>
            <Icon icon="octicon:graph-24" />
          </ChartIcon>
        </ChartNav>
        <UserNav className={({ isActive }: ClassNameProps) => (isActive ? "active" : "")} to="/sub/account">
          <AccountIcon>
            <Icon icon="la:user" />
          </AccountIcon>
        </UserNav>
      </NavContainer>
    </>
  );
};

interface ClassNameProps {
  isActive: boolean;
}

const MainNav = styled(NavLink)`
  &.active {
    svg {
      path {
        color: var(--point-color-red);
      }
    }
  }
`;

const CalendarNav = styled(NavLink)`
  &.active {
    svg {
      path {
        color: var(--point-color-blue);
      }
    }
  }
`;

const ChartNav = styled(NavLink)`
  &.active {
    svg {
      path {
        color: var(--point-color-yellow);
      }
    }
  }
`;

const UserNav = styled(NavLink)`
  &.active {
    svg {
      path {
        color: var(--point-color-green);
      }
    }
  }
`;

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
      color: #333333;
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
      color: #333333;
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
      color: #333333;
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
      color: #333333;
    }
  }
`;
