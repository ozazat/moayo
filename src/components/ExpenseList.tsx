import styled from "styled-components";

type Props = {
  amount: number;
  category: string;
  date: string;
};

const ExpenseList = ({ amount, category, date }: Props) => {
  return (
    <>
      <ExpenseListContainer>
        <TextInfo>
          <span>{category.split("+")[0]}</span>
          <span>{date.slice(5, 10)}</span>
        </TextInfo>
        <ExpenseInfo>
          <span>{category.split("+")[1]}</span>
          <ExpenseAmount>₩{amount.toLocaleString()}</ExpenseAmount>
        </ExpenseInfo>
      </ExpenseListContainer>
    </>
  );
};
export default ExpenseList;

const ExpenseListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 330px;
  min-height: 60px;
  max-width: 330px;
  max-height: 60px;
  padding: 0 20px 0;
  border-radius: 10px;
  margin-bottom: 10px;
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
