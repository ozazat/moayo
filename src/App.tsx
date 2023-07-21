import GlobalStyles from "@/styles/GlobalStyles.styles";
import { Route, Routes, Navigate } from "react-router-dom";
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
import Edit from "@/routes/Edit/Edit";
import Search from "@/routes/Search/Search";
import styled from "styled-components";

const App = () => {
  return (
    <Section>
      <GlobalStyles />
      <Routes>
        <Route path="/main/" element={<MainLayout />}>
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
        <Route path="/edit/:_id" element={<Edit />} />
        <Route path="/search" element={<Search />} />

        <Route path="/" element={<Navigate to="/main/daily" replace />} />
        <Route path="*" element={<Navigate to="/main/daily" replace />} />
      </Routes>
    </Section>
  );
};
export default App;

const Section = styled.section`
  position: relative;
  width: 390px;
  height: 844px;
  background-color: var(--base-color-lightgrey);
  border: 1.5px solid var(--base-color-grey);
  z-index: 1;
`;
