import type { NextPage } from "next";
import { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { Header } from "../stories/modules/header/Header";
import { OptionList } from "../stories/modules/optionList/OptionList";
import { Title } from "../stories/modules/title/Title";
import { User } from "../stories/modules/user/User";
import { useRecoilState } from "recoil";
import { followListState, loadingState } from "../store/states";
import { getFollowings } from "../api/followings";

export const FollowListPage: NextPage = () => {
  const [options, _setOptions] = useState([]);
  const [followList, setFollowList] = useRecoilState(followListState);
  const [_isLoading, setIsLoading] = useRecoilState(loadingState);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    await getFollowings().then(res => {
      if (res) {
        setFollowList(res[0].followings.map((x: any) => {
          const differTime = (new Date()).getTime() - (new Date(Number(x.createdAt))).getTime();
          return ({
            id: x.user.id,
            name: x.user.name,
            avatar: x.user.avatar,
            followTime: x.createdAt,
            followDays: differTime > 0 ? Math.floor(differTime / 1000 / 60 / 60 / 24) : 0
          })
        }))
      }
    })
    setIsLoading(false);
  }, [setIsLoading, setFollowList])

  useEffect(() => {
    fetch();
  }, [fetch])

  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-12 px-4 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-3/4 pr-7">
            <Title text="追蹤名單" className="mb-8" />
            {followList.map(follow => (
              <div
                key={follow.name}
                className="flex justify-between items-center border-2 border-solid border-dark border-b-4 bg-white rounded-lg p-4 mb-4"
              >
                <User
                  id={follow.id}
                  userName={follow.name}
                  followTime={dayjs(Number(follow.followTime)).format("YYYY/MM/DD HH:mm")}
                  avatar={follow.avatar}
                />
                <p className="text-dark">{`您已追蹤${follow.followDays}天！`}</p>
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