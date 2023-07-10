import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavBar = () => {
  return (
    <>
      <NavContainer>
        <Link to="/main/daily">
          <div>메인</div>
        </Link>
        <Link to="/sub/calendar">
          <div>캘린더</div>
        </Link>
        <Link to="/sub/chart">
          <div>통계</div>
        </Link>
        <Link to="/sub/account">
          <div>계정</div>
        </Link>
      </NavContainer>
    </>
  );
};

const NavContainer = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  top : 770px;
  max-height: 80px;
  padding: 0 20px;
  background-color: #ffffff;
`;
