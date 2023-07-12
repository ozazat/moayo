import { useState, useEffect } from "react";
import { Container, Title, DivideContainer, Consumption, Income } from "./MonthStatistics.style";
import { getPeriodSummary } from "@/api";

const MonthStatistics = () => {
  const [title, setTitle] = useState("가계부를 작성해 주세요~");
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    getPeriodSummary("monthly", "ozazat").then((res) => {
      const filteredItem = res.filter((item) => item._id === "2023-07");
      setTotalAmount(filteredItem[0].totalAmount);
    });
  }, []);

  return (
    <Container>
      <Title>{totalAmount}</Title>
      <DivideContainer>
        <Consumption>
          <p>지출</p>
          <p>₩ 0</p>
        </Consumption>
        <Income>
          <p>수입</p>
          <p>₩ 10000000</p>
        </Income>
      </DivideContainer>
    </Container>
  );
};

export default MonthStatistics;
