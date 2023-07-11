import styled from "styled-components";
import { useUserStore } from "@/store/useUserStore";
import { Icon } from "@iconify/react";

const Account = () => {
  const userNickname = useUserStore((state) => state.userNickname);
  const userId = useUserStore((state) => state.userId);

  return (
    <>
      <Title>계정</Title>
      <AccountWrap>
        <ProfileWrap>
          <ProfileImage></ProfileImage>
          <Username>{userNickname}</Username>
          <Tag>#{userId?.substring(0, 4)}</Tag>
        </ProfileWrap>
        <InfoWrap>
          <InfoLeft>
            <InfoItem>모아요(MOAYO)</InfoItem>
            <InfoItem>김가은 김경원 김준희 정재현</InfoItem>
          </InfoLeft>
          <InfoRight>
            <InfoItem>
              <StyledIcon icon="devicon:github" />
            </InfoItem>
          </InfoRight>
        </InfoWrap>
      </AccountWrap>
    </>
  );
};

export default Account;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 900;
  align-self: flex-start;
  width: 100%;
  height: 50px;
  background-color: #f2f2f2;
`;

const AccountWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 340px;
  height: 680px;
  background-color: white;
  align-items: flex-start;
  border-radius: 13px;
`;

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  width: 100%;
`;

const ProfileImage = styled.div`
  width: 85%;
  height: 0;
  padding-bottom: 85%;
  border-radius: 50%;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Username = styled.p`
  margin-top: 30px;
  margin-bottom: 0;
  font-weight: 900;
`;

const Tag = styled.p`
  margin-top: 10px;
  margin-bottom: 0;
`;

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-bottom: 15px;
`;

const InfoLeft = styled.div`
  text-align: left;
  margin-left: 15px;
  margin-bottom: 0px;
`;

const InfoRight = styled.div`
  text-align: right;
  margin-right: 15px;
`;

const InfoItem = styled.p`
  font-weight: 900;
  margin: 0;
`;

const StyledIcon =styled(Icon)`
  width: 38px;
  height: 38px;
`