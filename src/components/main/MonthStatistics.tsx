import { useState, useEffect } from "react";
import { Container, Title, DivideContainer, Consumption, Income } from "./MonthStatistics.style";

const MonthStatistics = () => {
  const [title, setTitle] = useState("가계부를 작성해 주세요~");

  return (
    <Container>
      <Title>{title}</Title>
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
