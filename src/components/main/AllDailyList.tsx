import { useExpensesStore } from "@/store/useExpensesStore";
import DailyList from "./DailyList";

const AllDailyList = () => {
  const dayList = useExpensesStore((state) => state.dayList);

  return (
    <>
      {Object.entries(dayList).map(([day, expenseList]) => (
        <DailyList key={day} day={day} expenseList={expenseList} />
      ))}
    </>
  );
};

export default AllDailyList;
