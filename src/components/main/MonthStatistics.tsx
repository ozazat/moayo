import { useState, useEffect } from "react";
import { Container, Title, DivideContainer, Consumption, Income } from "./MonthStatistics.style";
import { getPeriodSummary } from "@/api";
import { search } from "@/types/apiTypes";
import { useExpensesStore } from "@/store/useExpensesStore";

const MonthStatistics = () => {
  const [title, setTitle] = useState("가계부를 작성해 주세요~");
  const [totalAmount, setTotalAmount] = useState(0);
  const totalLists = useExpensesStore((state) => state.totalLists);
  const [consumption, setConsumption] = useState(0);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    getPeriodSummary("monthly", "ozazat").then((res) => {
      const filteredItem = res.filter((item: search) => item._id === "2023-07");
      setTotalAmount(filteredItem[0].totalAmount);
    });
    totalLists.length === 0
      ? setTitle("가계부를 작성해주세요~")
      : totalAmount > 0
      ? setTitle(`💰 ${totalAmount} 원 남았어요!`)
      : setTitle(`💰 ${Math.abs(totalAmount)} 원 사용했네요!`);

    setConsumption(
      totalLists
        .filter((item) => item.amount < 0)
        .reduce((sum: number, item: search) => {
          return sum + item.amount;
        }, 0)
    );
    setIncome(
      totalLists
        .filter((item) => item.amount > 0)
        .reduce((sum: number, item: search) => {
          return sum + item.amount;
        }, 0)
    );
  }, [totalLists]);

  return (
    <Container>
      <Title>{title}</Title>
      <DivideContainer>
        <Consumption>
          <p>지출</p>
          <p>₩ {consumption.toLocaleString()}</p>
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
