import { useEffect, useState } from "react";
import { useExpensesStore } from "@/store/useExpensesStore";
import { search } from "@/types/apiTypes";

const All = () => {
  // const totalLists = useExpensesStore((state) => state.totalLists);

  // useEffect(() => {
  //   createAllList();
  // });

  // const createAllList = () => {
  //   const newDayList: { [key: string]: search[] } = {};
  //   totalLists.forEach((list) => {
  //     const date = list.date;
  //     const [, month, dayTime] = date.split("-");
  //     const day = dayTime.split("T")[0];
  //     const formattedDay = `${month}.${day}`;
  //     if (newDayList[formattedDay]) {
  //       newDayList[formattedDay].push(list);
  //     } else {
  //       newDayList[formattedDay] = [list];
  //     }
  //   });
  //   // console.log("newDayList", newDayList);
  //   const keysArray: string[] = Object.keys(newDayList);

  //   // 키 값을 내림차순으로 정렬합니다.
  //   keysArray.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  //   // 정렬된 키를 기반으로 새로운 객체를 생성합니다.
  //   interface SortedData {
  //     [date: string]: search[];
  //   }
  //   const sortedData: SortedData = {};
  //   keysArray.forEach((key) => {
  //     sortedData[key] = newDayList[key];
  //   });

  //   // console.log(Object.entries(sortedData));
  //   setAllLists(sortedData);
  // };
  return <div>All!!!</div>;
};

export default All;
