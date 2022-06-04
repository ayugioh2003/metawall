import React from "react";
import { Button } from "../button/Button";
import { User } from "../user/User";
import { SettingButton } from "../settingButton/SettingButton";
import { BellOutlined, LikeOutlined } from "@ant-design/icons";
import { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/states";

interface OptionListProps {
  options: { name: string; icon: StaticImageData }[];
}

/**
 * Primary UI component for user interaction
 */
export const OptionList = ({ options }: OptionListProps) => {
  const router = useRouter();
  const [userInfo, _setUserInfo] = useRecoilState(userState);
  const newOptions = [
    { name: userInfo.name, icon: userInfo.avatar },
    ...options,
  ];

  return (
    <div className="border-dark border-2 border-solid flex flex-col justify-center items-center px-6 py-8">
      <Button
        label="張貼動態"
        className="hover:bg-active hover:text-black mb-6"
        onButtonClick={() => router.push("/createPost")}
      />
      <div className="w-full flex flex-col pl-2">
        {newOptions.map(option => (
          <User
            className="mt-4"
            key={option.name}
            userName={option.name}
            avatar={option.icon}
            width="50px"
            height="50px"
          />
        ))}
        <SettingButton
          text="追蹤名單"
          icon={
            <BellOutlined className="text-xl flex justify-center items-center" />
          }
          className="my-5"
          onButtonClick={() => router.push("/followList")}
        />
        <SettingButton
          text="我按讚的文章"
          icon={
            <LikeOutlined className="text-xl flex justify-center items-center" />
          }
          onButtonClick={() => router.push("/likePost")}
        />
      </div>
    </div>
  );
};
