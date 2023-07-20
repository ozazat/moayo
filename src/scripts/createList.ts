import { search, ObjectData } from "@/types/apiTypes";

export const createList = (lists: search[], setnewLists: (lists: ObjectData) => void) => {
  const newDayList: { [key: string]: search[] } = {};
  lists.forEach((list) => {
    const date = list.date;
    const [year, month, dayTime] = date.split("-");
    const day = dayTime.split("T")[0];
    const formattedDay = `${year}.${month}.${day}`;
    if (newDayList[formattedDay]) {
      newDayList[formattedDay].push(list);
    } else {
      newDayList[formattedDay] = [list];
    }
  });
  const keysArray: string[] = Object.keys(newDayList);

  // 키 값을 내림차순으로 정렬합니다.
  keysArray.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // 정렬된 키를 기반으로 새로운 객체를 생성합니다.
  const sortedData: ObjectData = {};
  keysArray.forEach((key) => {
    sortedData[key] = newDayList[key];
  });

  console.log("sortedData", sortedData);
  setnewLists(sortedData);
};
