import { Outlet } from "react-router-dom";
import { NavBar } from "@/components/common/NavBar";
import styled from "styled-components";

const SubLayout = () => {
  return (
    <Sub>
      <SubContainer>
        <main>
          <Outlet />
        </main>
      </SubContainer>
      <NavBar />
    </Sub>
  );
};
export default SubLayout;

const Sub = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 390px;
  max-height: 844px;
`;

const SubContainer = styled.div`
  display: flex;
  position: relative;
  top: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 390px;
`;
