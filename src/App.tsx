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

const App = () => {
  console.log("helloWorld");
  return (
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
  );
};
export default App;
