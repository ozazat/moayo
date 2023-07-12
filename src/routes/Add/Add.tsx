import { postExpense } from "@/api";
import { useState } from "react";
import { styled } from "styled-components";
import { Button } from "antd";

const Add = () => {
  const [expense, setExpense] = useState(true);
  const [amount, setAmount] = useState(0);
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [inputCheck, setInputCheck] = useState([false, false, false, false, false] as boolean[]);
  const [isActive, SetIsActive] = useState(false);

  const ConsumptionTags = [
    "선택해 주세요!",
    "🍔 식비",
    "📱 통신",
    "🚍 교통",
    "🏠 관리",
    "🏥 병원",
    "🚀 여행",
    "💖 취미",
    "📚 학업",
    "⚙️ 기타"
  ];

  // 저장 버튼 핸들러
  const postBtnHandler = (category: string) => {
    const body = {
      amount: amount,
      userId: "ozazat",
      category: tag + content,
      date: new Date().toString()
    };
    postExpense(body).then((res) => console.log(res));
  };

  // 지출/수입 버튼 핸들러
  const expenseConsumeHandler = () => {
    setExpense(true);
    console.log("지출버튼", expense);
  };

  const expenseIncomeHandler = () => {
    setExpense(false);
    console.log("수입버튼", expense);
  };

  // 날짜/시간 핸들러
  const dateInputHandler = () => {};
  const timeInputHandler = () => {};

  // 금액 핸들러
  const amountInputHandler = (e) => {
    expense ? setAmount(e.target.value) : setAmount(-e.target.value);
  };

  // 태그 핸들러
  const categoryHandler = (e) => {
    setTag(e.target.value);
  };

  // 내용 핸들러
  const contentInputHandler = (e: any) => {
    setContent(e.target.value);
  };

  return (
    <AddContainer>
      <ExpenseBtns>
        <ConsumeButton expense={expense} onClick={() => expenseConsumeHandler()}>
          지출
        </ConsumeButton>
        <IncomeButton expense={expense} onClick={() => expenseIncomeHandler()}>
          수입
        </IncomeButton>
      </ExpenseBtns>

      <FormContainer action="">
        <div>
          <label htmlFor="date">날짜</label>
          <input type="date" id="date" onChange={dateInputHandler} />
          <label htmlFor="time" onChange={timeInputHandler}>
            시간
          </label>
          <input type="time" id="time" />
        </div>
        <div>
          <label htmlFor="amount">금액</label>
          <input type="number" id="amount" pattern="\d*" onChange={(e) => amountInputHandler(e)} />
        </div>
        <div>
          <label htmlFor="">태그</label>
          <select value={tag} onChange={(e) => categoryHandler(e)}>
            {ConsumptionTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <input type="text" id="content" onChange={(e) => contentInputHandler(e)} />
        </div>
      </FormContainer>

      <SubmitBtn>
        <Button type="primary" onClick={() => postBtnHandler(tag)}>
          저장하기
        </Button>
      </SubmitBtn>
    </AddContainer>
  );
};

export default Add;

const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 390px;
  height: auto;
  margin-top: 100px;
`;

const ExpenseBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #ffffff;
`;

const ConsumeButton = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: ${(props) => (props.expense ? "var(--point-color-red)" : "var(--base-color-grey)")};
  color: #ffffff;
`;

const IncomeButton = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: ${(props) => (props.expense ? "var(--base-color-grey)" : "var(--point-color-green)")};
  color: #ffffff;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const SubmitBtn = styled.div`
  Button {
    width: 300px;
    height: 50px;
    border-radius: 10px;
    background-color: var(--base-color-grey);
  }
`;
