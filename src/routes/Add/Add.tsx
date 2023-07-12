import { postExpense } from "@/api";
import { useState } from "react";
import { styled } from "styled-components";
import { Button } from "antd";

const Add = () => {
  const [expense, setExpense] = useState("consume");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const cagtegories = [
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
      category: category,
      date: new Date().toString()
    };
    postExpense(body).then((res) => console.log(res));
  };

  // 지출/수입 핸들러
  const expenseConsumeHandler = () => {
    setExpense("consume");
    console.log("지출버튼", expense);
  };

  const expenseIncomeHandler = () => {
    setExpense("income");
    console.log("수입버튼", expense);
  };

  // 금액 핸들러
  const amountInputHandler = () => {
    expense === "consume" ? (amount += "+") : (amount += "-");
    setAmount(amount);
    console.log("금액", amount);
  };

  // 카테고리 핸들러
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  // 내용 핸들러
  const contentInputHandler = (e: any) => {
    setContent(e.target.value);
  };

  return (
    <AddContainer>
      <ExpenseBtns>
        <Button className="consume" type="primary" onClick={() => expenseConsumeHandler()}>
          지출
        </Button>
        <Button className="income" type="primary" onClick={() => expenseIncomeHandler()}>
          수입
        </Button>
      </ExpenseBtns>

      <FormContainer action="">
        <div>
          <label htmlFor="date">날짜</label>
          <input type="date" id="date" />
          <input type="time" id="time" />
        </div>
        <div>
          <label htmlFor="amount">금액</label>
          <input type="number" id="amount" pattern="\d*" />
        </div>
        <div>
          <label htmlFor="">태그</label>
          <select value={category} onChange={(e) => categoryHandler(e)}>
            {cagtegories.map((category) => (
              <option key={category} value={category}>
                {category}
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
        <Button type="primary" onClick={() => postBtnHandler(category)}>
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
  Button {
    width: 100px;
    height: 30px;
    border-radius: 10px;
    background-color: var(--base-color-grey);
    .consume {
      background-color: var(--point-color-red);
    }
  }
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
