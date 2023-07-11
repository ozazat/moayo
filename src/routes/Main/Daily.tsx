import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import MonthStatistics from "@/components/main/monthstatistics";

const Daily = () => {
  const userId = useUserStore((state) => state.userId);
  const userNickname = useUserStore((state) => state.userNickname);
  const initializeUserId = useUserStore((state) => state.initializeUserId);

  useEffect(() => {
    initializeUserId();
  }, [initializeUserId]);

  return (
    <>
      <div>
        <MonthStatistics />
        <p>Daily!!</p>
        <span>환영합니다 </span>
        <span style={{ color: "red" }}>{userNickname}</span>
        <span>님!</span>
        <p>#{userId?.substring(0, 4)}</p>
      </div>
    </>
  );
};

export default Daily;
