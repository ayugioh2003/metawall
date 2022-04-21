import type { NextPage } from "next";
import { useState } from "react";
import { Header } from "../stories/modules/header/Header";
import { OptionList } from "../stories/modules/optionList/OptionList";
import { Post } from "../stories/modules/Post/Post";
import bg from "../public/image/image.png";
import user1 from "../public/image/user.png";
import user4 from "../public/image/user4.png";
import user5 from "../public/image/user5.png";
import user51 from "../public/image/user5-1.png";
import dayjs from "dayjs";
import { Toolbar } from "../stories/modules/toolbar/Toolbar";
import { SearchBar } from "../stories/modules/searchBar/SearchBar";

export const PostPage: NextPage = () => {
  const [options, setOptions] = useState([{ name: "杰哥後援會", icon: user5 }]);
  const mockData = [
    {
      userName: "邊緣小杰",
      userIcon: user1,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      content: "外面看起來就超冷.... 我決定回被窩繼續睡....>.<",
      src: bg,
      comments: [
        {
          userName: "希琳",
          userIcon: user4,
          content: "真的～我已經準備冬眠了",
          date: dayjs().format("YYYY/MM/DD HH:mm"),
        },
        {
          userName: "波吉",
          userIcon: user51,
          content: "會嗎？我沒穿衣服都不覺得冷",
          date: dayjs().format("YYYY/MM/DD HH:mm"),
        },
      ],
    },
    {
      userName: "波吉",
      userIcon: user51,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      content: "我一定要成為很棒棒的國王！",
      like: 3,
    },
    {
      userName: "阿爾敏",
      userIcon: user5,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      content: "各位我有一個作戰計畫",
    },
  ];
  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-4 px-3 pb-20 md:px-0 md:pt-12 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-full md:w-3/4 md:pr-7">
            <SearchBar />
            {mockData.map(data => (
              <Post
                key={data.userName}
                userName={data.userName}
                content={data.content}
                src={data.src}
                userIcon={data.userIcon}
                date={data.date}
                like={data.like}
                comments={data.comments}
                className="mb-4"
              />
            ))}
          </div>
          <div className="hidden md:block md:w-1/4">
            <OptionList options={options} />
          </div>
          <Toolbar className="md:hidden fixed bottom-10 left-2/4 transform -translate-x-1/2" />
        </main>
      </div>
    </>
  );
};

export default PostPage;
