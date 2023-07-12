import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { useExpensesStore } from "@/store/useExpensesStore";
import MonthStatistics from "@/components/main/MonthStatistics";
import { searchExpenses } from "@/api/index";
import { ExpenseList } from "@/components/ExpenseList";

const Daily = () => {
  const userId = useUserStore((state) => state.userId);
  const userNickname = useUserStore((state) => state.userNickname);
  const initializeUserId = useUserStore((state) => state.initializeUserId);
  const totalLists = useExpensesStore((state) => state.totalLists);
  const setTotalLists = useExpensesStore((state) => state.setTotalLists);

  useEffect(() => {
    initializeUserId();
  }, [initializeUserId]);

  useEffect(() => {
    searchExpenses("", "ozazat").then((res) => {
      setTotalLists(res);
    });
  }, []);
  console.log("확인용", totalLists);

  return (
    <>
      <div>
        <MonthStatistics />
        <p>Daily!!</p>
        <span>환영합니다 </span>
        <span style={{ color: "red" }}>{userNickname}</span>
        <span>님!</span>
        <p>#{userId?.substring(0, 4)}</p>
        <div>
          {totalLists.map((list, i) => (
            <ExpenseList key={i} amount={list.amount} category={list.category} date={list.date} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Daily;
