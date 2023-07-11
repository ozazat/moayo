import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

const MainHeader = () => {
  const location = useLocation();

  return (
    <>
      <MainHeaderFirstRow>
        <div>2003년7월</div>
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

const StyledLink = styled(Link)`
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
