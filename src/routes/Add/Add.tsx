import { postExpense } from "@/api";
import { useState } from "react";
import { styled } from "styled-components";

const Add = () => {
  const [category, setCategory] = useState("");

  const postBtnHandler = (category: string) => {
    const body = {
      amount: 9900,
      userId: "ozazat",
      category: category,
      date: new Date().toString()
    };
    postExpense(body).then((res) => console.log(res));
  };

  const categoryInputHandler = (e: any) => {
    setCategory(e.target.value);
  };

  return (
    <Test>
      <input type="text" onChange={(e) => categoryInputHandler(e)} />
      <button onClick={() => postBtnHandler(category)}>등록하기</button>
    </Test>
  );
};

export default Add;

const Test = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 390px;
  height: auto;
  margin-top: 100px;
`;
