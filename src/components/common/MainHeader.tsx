import { Link } from "react-router-dom";
import styled from "styled-components";

const MainHeader = () => {
  return (
    <>
    <MainHeaderContainer>
      <Link to="/main/daily">
        <div>일일</div>
      </Link>
      <Link to="/main/weekly">
        <div>주간</div>
      </Link>
      <Link to="/main/monthly">
        <div>월간</div>
      </Link>
      <Link to="/main/all">
        <div>전체</div>
      </Link>
    </MainHeaderContainer>
  </>
  )
};

export default MainHeader;

const MainHeaderContainer = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 390px;
  max-height: 80px;
  padding: 0 20px;
  background-color: #ffffff;
`;


