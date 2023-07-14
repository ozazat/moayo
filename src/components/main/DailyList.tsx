import ExpenseList from "@/components/ExpenseList";
import { search } from "@/types/apiTypes";

interface Props {
  day: string;
  expenseList: search[];
}

const DailyList = ({ day, expenseList }: Props) => {
  return (
    <div key={day}>
      <p>{day.slice(0, 5)}</p>
      {expenseList.map((list: search, i: number) => (
        <ExpenseList key={i} _id={list._id} amount={list.amount} category={list.category} date={list.date} />
      ))}
    </div>
  );
};

export default DailyList;
