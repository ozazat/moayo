import styled from "styled-components";

const MonthlyList = () => {
  return (
    <>
      <MonthlyListContainer>
        <MonthlyPeriod>
          <div>7월</div>
          <span>7월 1일 ~ 31일</span>
        </MonthlyPeriod>
        <MonthlyConsume>-100,000</MonthlyConsume>
        <MonthlyIncome>+210,000</MonthlyIncome>
      </MonthlyListContainer>
    </>
  );
};

export default MonthlyList;

const MonthlyListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  min-width: 330px;
  min-height: 60px;
  max-width: 330px;
  max-height: 60px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    border: 1.8px solid var(--base-color-grey);
  }
`;

const MonthlyPeriod = styled.div`
  div {
    font-weight: 600;
  }
  span {
    font-size: 0.8em;
  }
`;

const MonthlyConsume = styled.div`
  font-size: 0.9em;
  color: var(--point-color-red);
`;

const MonthlyIncome = styled.div`
  font-size: 0.9em;
  color: var(--point-color-green);
`;
