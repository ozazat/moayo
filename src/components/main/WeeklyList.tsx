import styled from "styled-components";

const WeeklyList = () => {
  return (
    <>
      <WeeklyListContainer>
        <WeeklyPeriod>07-24 ~ 07-31</WeeklyPeriod>
        <WeeklyConsume>-100,000</WeeklyConsume>
        <WeeklyIncome>+210,000</WeeklyIncome>
      </WeeklyListContainer>
    </>
  );
};

export default WeeklyList;

const WeeklyListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
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

const WeeklyPeriod = styled.div`
  font-weight: 600;
`;

const WeeklyConsume = styled.div`
  font-size: 0.9em;
  color: var(--point-color-red);
`;

const WeeklyIncome = styled.div`
  font-size: 0.9em;
  color: var(--point-color-green);
`;
