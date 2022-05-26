import type { NextPage } from "next";
import { useState } from "react";
import { Header } from "../stories/modules/header/Header";
import { OptionList } from "../stories/modules/optionList/OptionList";
import { Title } from "../stories/modules/title/Title";
import { User } from "../stories/modules/user/User";
import { LikeOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { likePostState } from "../store/states";

export const LikePostPage: NextPage = () => {
  const [options, setOptions] = useState([]);
  const [likePost, setLikePost] = useRecoilState(likePostState);
  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-12 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-3/4 pr-7">
            <Title text="我按讚的貼文" className="mb-8" />
            {likePost.map(post => (
              <div
                key={post.userName}
                className="flex justify-between items-center border-2 border-solid border-dark border-b-4 bg-white rounded-lg p-4 mb-4"
              >
                <User
                  userName={post.userName}
                  post={post.postFromTime}
                  avatar={post.userIcon}
                />
                <ul className="flex mr-6">
                  <li className="flex flex-col mr-9">
                    <LikeOutlined className="text-xl mb-1" />
                    <p className="text-dark text-sm font-bold">取消</p>
                  </li>
                  <li className="flex flex-col">
                    <RightCircleOutlined className="text-xl mb-1" />
                    <p className="text-dark text-sm font-bold">查看</p>
                  </li>
                </ul>
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

export default LikePostPage;
