import { useExpensesStore } from "@/store/useExpensesStore";
import DailyList from "./DailyList";
import { useRef, useEffect } from "react";
import { useTimeStore } from "@/store/useTimeStore";

const AllDailyList = () => {
  const dayList = useExpensesStore((state) => state.dayList);
  const currentDay = useTimeStore((state) => state.currentDay);
  const currentYear = useTimeStore((state) => state.currentYear);
  const currentMonth = useTimeStore((state) => state.currentMonth);
  const refs: any = useRef({});

  // 각각의 DailyList 에 대한 참조를 refs 객체에 추가
  const createRef = (day: string) => (el: HTMLDivElement) => {
    return (refs.current[day] = el);
  };

  useEffect(() => {
    setTimeout(() => {
    console.log("-------------");
    console.log("currentDay", currentDay);
    if (refs.current[currentDay] === undefined) {
      console.log("undefined일 때 :", refs);
    } else {
      refs.current[currentDay].scrollIntoView({ behavior: "smooth" });
      console.log("undefined가 아닐 때 :", refs);
    }
    console.log("refs.current[currentDay]", refs.current[currentDay]);
    console.log("refs", refs);
  }, 200);  // 지연 시간은 필요에 따라 조절 가능
  }, [currentDay, currentMonth, currentYear]);

  return (
    <>
      {Object.entries(dayList).map(([day, expenseList]) => (
        <DailyList ref={createRef(day.split(".")[1])} key={day} day={day} expenseList={expenseList} />
      ))}
    </>
  );
};

export default AllDailyList;
