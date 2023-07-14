import styled from "styled-components";

const WeeklyList = ({ date }) => {
  return (
    <>
      <WeeklyListContainer>
        <div>{}</div>
      </WeeklyListContainer>
    </>
  );
};

export default WeeklyList;

const WeeklyListContainer = styled.div`
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
