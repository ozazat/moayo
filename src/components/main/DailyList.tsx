import ExpenseList from "@/components/ExpenseList";
import { search } from "@/types/apiTypes";
import { forwardRef } from "react";

interface Props {
  day: string;
  expenseList: search[];
  searchText?: string;
}

const DailyList = forwardRef(({ day, expenseList, searchText }: Props, ref) => {
  // console.log("day", day.split(".")[1]);
  return (
    <div ref={ref} key={day}>
      <p>{day.slice(0, 5)}</p>
      {expenseList.map((list: search, i: number) => (
        <ExpenseList
          key={i}
          _id={list._id}
          amount={list.amount}
          category={list.category}
          date={list.date}
          searchText={searchText}
        />
      ))}
    </div>
  );
});

export default DailyList;
