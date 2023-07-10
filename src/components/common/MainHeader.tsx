import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

const MainHeader = () => {
  return (
    <>
      <MainHeaderFirstRow>
        <div>2003년7월</div>
        <StyledLink to="/search">
          <SearchOutlined />
        </StyledLink>
      </MainHeaderFirstRow>
      <MainHeaderSecondRow>
        <StyledLink to="/main/daily">
          <div>일일</div>
        </StyledLink>
        <StyledLink to="/main/weekly">
          <div>주간</div>
        </StyledLink>
        <StyledLink to="/main/monthly">
          <div>월간</div>
        </StyledLink>
        <StyledLink to="/main/all">
          <div>전체</div>
        </StyledLink>
      </MainHeaderSecondRow>
    </>
  );
};

export default MainHeader;
const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: var(--base-color-black);
  display: block;
  align-items: center;
  
  & > div {
    position: relative;
    padding-bottom: 0px; 
  }
  
  & > div::after {
    content: "";
    position: absolute;
    left: -15px;  
    right: -15px; 
    bottom: -15px;
    height: 4px; 
    width: auto;  
    /* background-color: transparent; */
    transition: background-color 0.3s ease;
  }

  &:hover > div {
    font-weight: 900;
  }

  &:hover > div::after {
    background-color: var(--point-color-red);
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
  & > div {
    font-weight : 900;
  }
  /* background-color: skyblue;
  border: 1px solid black; */

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
  /* background-color: var(--base-color-white); */
  /* border: 1px solid black; */
  border-radius: 10px;
  margin-top: 10px;
`;
