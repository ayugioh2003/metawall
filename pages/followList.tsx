import type { NextPage } from "next";
import { useState } from "react";
import { Header } from "../stories/modules/header/Header";
import { OptionList } from "../stories/modules/optionList/OptionList";
import { Title } from "../stories/modules/title/Title";
import { User } from "../stories/modules/user/User";
import { useRecoilState } from "recoil";
import { followListState } from "../store/states";

export const FollowListPage: NextPage = () => {
  const [options, setOptions] = useState([]);
  const [followList, setFollowList] = useRecoilState(followListState);
  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-12 px-4 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-3/4 pr-7">
            <Title text="追蹤名單" className="mb-8" />
            {followList.map(follow => (
              <div
                key={follow.userName}
                className="flex justify-between items-center border-2 border-solid border-dark border-b-4 bg-white rounded-lg p-4 mb-4"
              >
                <User
                  id={follow.id}
                  userName={follow.userName}
                  follow={follow.followTime}
                  avatar={follow.userIcon}
                />
                <p className="text-dark">追蹤時間：{follow.followFromTime}</p>
              </div>
            ))}
          </div>
          <div className="w-1/4">
            <OptionList options={options} />
          </div>
        </main>
      </div>
    </>
  );
};

export default FollowListPage;
