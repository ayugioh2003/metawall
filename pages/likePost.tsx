import type { NextPage } from "next";
import { useState } from "react";
import { Header } from "../stories/modules/header/Header";
import { OptionList } from "../stories/modules/optionList/OptionList";
import user1 from "../public/image/user.png";
import user4 from "../public/image/user4.png";
import user5 from "../public/image/user5.png";
import user51 from "../public/image/user5-1.png";
import dayjs from "dayjs";
import { Title } from "../stories/modules/title/Title";
import { User } from "../stories/modules/user/User";
import { LikeOutlined, RightCircleOutlined } from "@ant-design/icons";

export const LikePostPage: NextPage = () => {
  const [options, setOptions] = useState([]);
  const mockData = [
    {
      userName: "波吉",
      userIcon: user1,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      postFromTime: dayjs().format("YYYY/MM/DD HH:mm"),
    },
    {
      userName: "多魯米",
      userIcon: user51,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      postFromTime: dayjs().format("YYYY/MM/DD HH:mm"),
    },
    {
      userName: "卡克",
      userIcon: user4,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      postFromTime: dayjs().format("YYYY/MM/DD HH:mm"),
    },
    {
      userName: "希琳",
      userIcon: user5,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      postFromTime: dayjs().format("YYYY/MM/DD HH:mm"),
    },
    {
      userName: "多瑪斯",
      userIcon: user1,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      followTime: dayjs().format("DD"),
      followFromTime: dayjs().format("YYYY/MM/DD HH:mm"),
    },
  ];
  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-12 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-3/4 pr-7">
            <Title text="我按讚的貼文" className="mb-8" />
            {mockData.map(post => (
              <div
                key={post.userName}
                className="flex justify-between items-center border-2 border-solid border-dark border-b-4 bg-white rounded-lg p-4 mb-4"
              >
                <User
                  userName={post.userName}
                  post={post.postFromTime}
                  src={post.userIcon}
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
