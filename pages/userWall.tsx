import { SearchOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import { useState } from "react";
import { Header } from "../stories/modules/header/Header";
import { Input } from "../stories/modules/input/Input";
import { OptionList } from "../stories/modules/optionList/OptionList";
import { Post } from "../stories/modules/Post/Post";
import { Select } from "../stories/modules/select/Select";
import bg from "../public/image/image.png";
import user1 from "../public/image/user.png";
import user4 from "../public/image/user4.png";
import user5 from "../public/image/user5.png";
import user51 from "../public/image/user5-1.png";
import dayjs from "dayjs";
import { FollowTitle } from "../stories/modules/followTitle/FollowTitle";
import { useForm } from "react-hook-form";

export const UserWallPage: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const [options, setOptions] = useState([{ name: "邊緣小杰", icon: user1 }]);
  const handleSearch = (data: any) => {
    console.log(data);
  };
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
      <div className="flex justify-center min-h-screen h-full pt-12 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-3/4 pr-7">
            <FollowTitle
              src={user4}
              followName="阿爾敏"
              followQuantity={"987,987"}
              className="mb-4"
            />
            <form
              onSubmit={handleSubmit(handleSearch)}
              className="flex mb-4"
            >
              <Select
                className="mr-3"
                register={register("postType")}
              />
              <Input
                placeholder="搜尋......"
                className="mb-4"
                register={register("search")}
              />
              <div>
                <button className="bg-primary w-12 h-12 border-2 border-dark border-solid">
                  <SearchOutlined className="text-white text-xl flex items-center justify-center" />
                </button>
              </div>
            </form>
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
          <div className="w-1/4">
            <OptionList options={options} />
          </div>
        </main>
      </div>
    </>
  );
};

export default UserWallPage;
