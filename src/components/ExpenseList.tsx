import styled from "styled-components";

export const ExpenseList = () => {
  return (
    <>
      <ExpenseListContainer>
        <TextInfo>
          <span>🍔 식비</span>
          <span>12:00</span>
        </TextInfo>
        <ExpenseInfo>
          <span>지코바 순살 양념</span>
          <ExpenseAmount>₩9,000</ExpenseAmount>
        </ExpenseInfo>
      </ExpenseListContainer>
    </>
  );
};

const ExpenseListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 330px;
  height: 60px;
  max-width: 330px;
  max-height: 60px;
  padding: 0 20px 0;
  border-radius: 10px;
  background-color: #ffffff;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  text-align: center;
  color: #9b9b9b;
`;

const ExpenseInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  text-align: right;
  color: var(--base-color-black);
`;

const ExpenseAmount = styled.span`
  color: var(--point-color-red);
`;
