import React, { useState } from "react";
import { useRouter } from "next/router";
import { User } from "../user/User";
import userDefault from "../../../public/image/user_default.png";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/states";

interface HeaderProps {
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Header = ({ className }: HeaderProps) => {
  const router = useRouter();
  const [dropDown, setDropdown] = useState(false);
  const [userInfo, _setUserInfo] = useRecoilState(userState);
  return (
    <header
      className={`w-full bg-white border-b-[3px] border-b-solid border-b-header-border flex justify-center ${className}`}
    >
      <div className="max-w-[1200px] w-full flex justify-between py-3">
        <p
          className="text-2xl text-dark font-paytone font-black leading-1.4 cursor-pointer"
          onClick={() => router.push("/post")}
        >
          MetaWall
        </p>
        <div
          className="relative"
          onMouseOver={() => setDropdown(true)}
          onMouseLeave={() => setDropdown(false)}
        >
          <User
            userName={userInfo.name}
            avatar={userInfo.avatar ?? userDefault}
            bottomLine
          />
          <div
            className={`${
              !dropDown && "invisible"
            } absolute -bottom-32 right-1 w-[178px] border-2 border-solid border-dark bg-white z-10`}
          >
            <p
              className="py-2 border-b-2 border-b-solid border-b-dark text-center hover:bg-c-bg cursor-pointer"
              onClick={() => router.push("/userWall")}
            >
              我的貼文牆
            </p>
            <p
              className="py-2 border-b-2 border-b-solid border-b-dark text-center hover:bg-c-bg cursor-pointer"
              onClick={() => router.push("/updateUser")}
            >
              修改個人資料
            </p>
            <p
              className="py-2 text-center hover:bg-c-bg cursor-pointer"
              onClick={() => router.push("/")}
            >
              登出
            </p>
          </div>
          <div
            className={`${
              !dropDown && "invisible"
            } absolute -bottom-[132px] right-0 w-[178px] h-32 border-2 border-solid border-dark bg-white`}
          ></div>
        </div>
      </div>
    </header>
  );
};
