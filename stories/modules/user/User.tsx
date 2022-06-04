import React from "react";
import Image, { StaticImageData } from "next/image";
import dayjs from "dayjs";
import userDefault from "../../../public/image/user_default.png";
import { useRouter } from "next/router";

interface UserProps {
  userName: string;
  avatar: StaticImageData | string;
  width?: string;
  height?: string;
  date?: string;
  bottomLine?: boolean;
  className?: string;
  follow?: string;
  postCreateAt?: string;
}

/**
 * Primary UI component for user interaction
 */
export const User = ({
  userName = "Member",
  avatar,
  width = "30px",
  height = "30px",
  bottomLine,
  date,
  className,
  follow,
  postCreateAt,
}: UserProps) => {
  const router = useRouter();
  return (
    <div className={`flex mr-2.5 ${className}`}>
      <div
        className="flex justify-center items-center mr-4 cursor-pointer"
        onClick={() => router.push("/userWall")}
      >
        {typeof avatar !== "string" || !avatar || avatar === " " ? (
          <Image
            className="rounded-full"
            width={width}
            height={height}
            alt="avatar"
            src={!!avatar && avatar !== " " ? avatar : userDefault}
          />
        ) : (
          <img
            className="rounded-full"
            width={width}
            height={height}
            alt="avatar"
            src={avatar}
          />
        )}
      </div>
      <div
        className={`flex flex-col justify-center ${
          bottomLine ? "border-b-2 border-b-solid border-b-dark" : ""
        }`}
      >
        <p className="font-bold hover:text-primary hover:underline">
          {userName}
        </p>
        {date && (
          <p className="text-xs text-light">
            {dayjs(date).format("YYYY/MM/DD HH:mm")}
          </p>
        )}
        {follow && <p className="text-xs text-light">您已追蹤{follow}天</p>}
        {postCreateAt && (
          <p className="text-xs text-light">
            發文時間：{dayjs(postCreateAt).format("YYYY/MM/DD HH:mm")}
          </p>
        )}
      </div>
    </div>
  );
};
