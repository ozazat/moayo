import { useState, useEffect } from "react";
import { Container, Title, DivideContainer, Consumption, Income } from "./MonthStatistics.style";
import { getPeriodSummary } from "@/api";
import { search } from "@/types/apiTypes";
import { useExpensesStore } from "@/store/useExpensesStore";
import { useTimeStore } from "@/store/useTimeStore";

const MonthStatistics = () => {
  const [title, setTitle] = useState("가계부를 작성해 주세요~");
  const [totalAmount, setTotalAmount] = useState(0);
  const totalLists = useExpensesStore((state) => state.totalLists);
  const [consumption, setConsumption] = useState(0);
  const [income, setIncome] = useState(0);
  const currentYear = useTimeStore((state) => state.currentYear);
  const currentMonth = useTimeStore((state) => state.currentMonth);

  useEffect(() => {
    getTotalAmount();
    totalLists.length === 0
      ? setTitle("가계부를 작성해주세요~")
      : totalAmount > 0
      ? setTitle(`💰 ${totalAmount.toLocaleString()}원 남았어요!`)
      : setTitle(`💰 ${Math.abs(totalAmount)}원 사용했네요!`);

    const currentYearMonth = `${currentYear}-${currentMonth}`;

    setConsumption(
      totalLists
        .filter((item) => item.date.includes(currentYearMonth))
        .filter((item) => item.amount < 0)
        .reduce((sum: number, item: search) => {
          return sum + item.amount;
        }, 0)
    );

    setIncome(
      totalLists
        .filter((item) => item.date.includes(currentYearMonth))
        .filter((item) => item.amount > 0)
        .reduce((sum: number, item: search) => {
          return sum + item.amount;
        }, 0)
    );
  }, [currentYear, currentMonth, totalAmount, totalLists]);

  const getTotalAmount = () => {
    getPeriodSummary("monthly", "ozazat").then((res) => {
      console.log("totalAmountRes", res);
      const filteredItem = res.filter((item: search) => item._id === `${currentYear}-${currentMonth}`);
      console.log("filteredItem", filteredItem);
      setTotalAmount(filteredItem[0].totalAmount);
    });
  };

  return (
    <Container>
      <Title>{title}</Title>
      <DivideContainer>
        <Consumption>
          <p>지출</p>
          <p>₩ {consumption ? consumption.toLocaleString().slice(1) : 0}</p>
        </Consumption>
        <Income>
          <p>수입</p>
          <p>₩ {income.toLocaleString()}</p>
        </Income>
      </DivideContainer>
    </Container>
  );
};

export default MonthStatistics;
