import { Icon } from "@iconify/react";
import styled from "styled-components";

export const PostBtn = () => {
  return (
    <PostBtnContainer>
      <Icon icon="mdi-light:plus" />
    </PostBtnContainer>
  );
};

const PostBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: var(--point-color-yellow);
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.5);
  svg {
    width: 34px;
    height: 34px;
    path {
      color: #ffffff;
    }
  }
`;
