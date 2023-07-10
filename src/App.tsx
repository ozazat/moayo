import GlobalStyles from "@/styles/GlobalStyles.styles";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Daily from "@/routes/Main/Daily";
import Weekly from "./routes/Main/Weekly";
import Monthly from "./routes/Main/Monthly";
import All from "./routes/Main/All";
import SubLayout from "@/layout/SubLayout";
import Calendar from "./routes/Calendar/Calendar";
import Chart from "./routes/Chart/Chart";
import Account from "@/routes/Account/Account";
import Add from "@/routes/Add/Add";
import Edit from "./routes/Edit/Edit";
import Search from "@/routes/Search/Search";
import styled from "styled-components";
import iphone from "@/assets/iPhone12_Clay_Shadow.png";

const App = () => {
  return (
    <Section>
      <IPhoneImg>
        <img src={iphone} alt="iphone" />
      </IPhoneImg>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/main" element={<MainLayout />}>
            <Route path="/main/daily" element={<Daily />} />
            <Route path="/main/weekly" element={<Weekly />} />
            <Route path="/main/monthly" element={<Monthly />} />
            <Route path="/main/all" element={<All />} />
          </Route>
          <Route path="/sub" element={<SubLayout />}>
            <Route path="/sub/calendar" element={<Calendar />} />
            <Route path="/sub/chart" element={<Chart />} />
            <Route path="/sub/account" element={<Account />} />
          </Route>
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </Section>
  );
};
export default App;

const Section = styled.section`
  width: 390px;
  height: 844px;
  background-color : var(--base-color-lightgrey);
  border: 1.5px solid var(--point-color-green); // 추후 삭제하기!!!!!!
	border-radius: 50px;
  z-index : -1;
`

const IPhoneImg = styled.div/*css*/ `
  position: absolute;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 80%; // 추후 삭제하기!!!!!!!
  img {
    width: 690px;
    height: auto;
  }
`;
