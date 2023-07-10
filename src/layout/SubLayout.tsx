import { Outlet } from "react-router-dom";
import { NavBar } from "@/components/common/NavBar";
import styled from "styled-components";

const SubLayout = () => {
  return (
    <div>
      <SubContainer>
        <main>
          <Outlet />
        </main>
      </SubContainer>
        <NavBar />
    </div>
  );
};
export default SubLayout;

const SubContainer = styled.div`
  display: flex;
  position: relative;
  top: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 390px;
  /* background-color: yellow; */
`;

