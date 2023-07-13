import { postExpense } from "@/api";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Button } from "antd";
import BackBtn from "@/components/common/BackBtn";

const Add = () => {
  const [expense, setExpense] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [amount, setAmount] = useState(0);
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [inputCheck, setInputCheck] = useState([true, true, false, false, false] as boolean[]);
  const [isActive, SetIsActive] = useState(false);

  const ConsumptionTags = [
    "선택해 주세요!",
    "🍔 식비",
    "📱 통신비",
    "🚍 교통비",
    "🏠 관리비",
    "🏥 병원",
    "🚀 여행",
    "💖 취미",
    "📚 학업",
    "⚙️ 기타"
  ];

  const IncomeTags = ["선택해 주세요!", "💰 월급", "🎉 상여금", "💵 부수입", "🤑 용돈", "🪙 금융/투자", "⚙️ 기타"];
  // useEffect(() => {
  //   console.log("지출/수입", expense);
  //   console.log("날짜", date);
  //   console.log("시간", time);
  //   console.log("금액", amount);
  //   console.log("태그", tag);
  //   console.log("내용", content);
  // }, [expense, date, time, amount, tag, content]);

  useEffect(() => {
    console.log("날짜", new Date().toLocaleDateString());
    console.log("시간", new Date().toLocaleTimeString());
  }, []);

  useEffect(() => {
    if (inputCheck.every((input) => input === true)) {
      SetIsActive(true);
    } else {
      SetIsActive(false);
    }
  }, [inputCheck]);

  // input 내용 입력 시 버튼 active 핸들러
  const inputCheckHandler = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    if (e.target.value) {
      const updatedInputs = [...inputCheck];
      updatedInputs[index] = true;
      setInputCheck(updatedInputs);
      console.log("내용이 있을때", updatedInputs);
    } else {
      const updatedInputs = [...inputCheck];
      updatedInputs[index] = false;
      setInputCheck(updatedInputs);
      console.log("내용이 없을때", updatedInputs);
    }
  };

  // 저장 버튼 핸들러
  const postBtnHandler = (tag: string) => {
    const body = {
      amount: amount,
      userId: "ozazat",
      category: `${tag}+${content}`,
      date: `${date}T${time}:00.000Z` //"2023-07-04T10:30:00.000Z"
    };
    postExpense(body).then((res) => {
      console.log(res);
      setInputCheck([true, true, false, false, false] as boolean[]);
      SetIsActive(false);
      setDate(new Date().toISOString().substring(0, 10));
      setTime(new Date().toTimeString().slice(0, 5));
      setAmount(0);
      setTag("");
      setContent("");
    });
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
  const dateInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const timeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  // 금액 핸들러
  const amountInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    expense ? setAmount(Number(e.target.value)) : setAmount(Number(-e.target.value));
  };

  // 태그 핸들러
  const tagInputHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTag(e.target.value);
  };

  // 내용 핸들러
  const contentInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <>
      <BackBtn />
      <AddContainer>
        <ExpenseBtns>
          <ConsumeButton $expense={expense} onClick={() => expenseConsumeHandler()}>
            지출
          </ConsumeButton>
          <IncomeButton $expense={expense} onClick={() => expenseIncomeHandler()}>
            수입
          </IncomeButton>
        </ExpenseBtns>
        <FormContainer action="">
          <FormElement>
            <label htmlFor="date">날짜</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => {
                inputCheckHandler(e, 0);
                dateInputHandler(e);
              }}
            />
          </FormElement>
          <FormElement>
            <label htmlFor="time">시간</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => {
                inputCheckHandler(e, 1);
                timeInputHandler(e);
              }}
            />
          </FormElement>
          <FormElement>
            <label htmlFor="amount">금액</label>
            <input
              type="number"
              id="amount"
              pattern="\d*"
              placeholder="₩4,500"
              value={amount === 0 ? "" : amount}
              onChange={(e) => {
                inputCheckHandler(e, 2);
                amountInputHandler(e);
              }}
            />
          </FormElement>
          <FormElement>
            <label htmlFor="tag">태그</label>
            <select
              id="tag"
              value={tag}
              onChange={(e) => {
                inputCheckHandler(e, 3);
                tagInputHandler(e);
              }}
            >
              {expense
                ? ConsumptionTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))
                : IncomeTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
            </select>
          </FormElement>
          <FormElement>
            <label htmlFor="content">내용</label>
            <input
              type="text"
              id="content"
              placeholder="스타벅스 아이스 아메리카노"
              value={content}
              onChange={(e) => {
                inputCheckHandler(e, 4);
                contentInputHandler(e);
              }}
            />
          </FormElement>
        </FormContainer>
        <SubmitBtn $isActive={isActive}>
          <Button type="primary" disabled={!isActive} onClick={() => postBtnHandler(tag)}>
            저장하기
          </Button>
        </SubmitBtn>
      </AddContainer>
    </>
  );
};

export default Add;

interface ButtonProps {
  $expense: boolean;
}
interface SubmitBtnProps {
  $isActive: boolean;
}

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

const ConsumeButton = styled.button<ButtonProps>`
  width: 100px;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: ${(props) => (props.$expense ? "var(--point-color-red)" : "var(--base-color-grey)")};
  color: #ffffff;
`;

const IncomeButton = styled.button<ButtonProps>`
  width: 100px;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: ${(props) => (props.$expense ? "var(--base-color-grey)" : "var(--point-color-green)")};
  color: #ffffff;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  width: 280px;
  height: auto;
`;

const FormElement = styled.div`
  label {
    margin-right: 20px;
    font-weight: 600;
  }
  input,
  select {
    width: 200px;
    height: 30px;
    border: none;
    border-bottom: 1px solid var(--base-color-grey);
    background-color: transparent;
  }
`;

const SubmitBtn = styled.div<SubmitBtnProps>`
  Button {
    width: 300px;
    height: 50px;
    border-radius: 10px;
    background-color: ${(props) => (props.$isActive ? "var(--point-color-yellow)" : "var(--base-color-grey)")};
  }
`;
