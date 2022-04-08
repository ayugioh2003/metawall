import React from "react";
import Image, { StaticImageData } from "next/image";

interface UserProps {
  userName: string;
  src: StaticImageData;
  width?: string;
  height?: string;
  date?: string;
  bottomLine?: boolean;
  className?: string;
  follow?: string;
  post?: string;
}

/**
 * Primary UI component for user interaction
 */
export const User = ({
  userName = "Member",
  src,
  width = "30px",
  height = "30px",
  bottomLine,
  date,
  className,
  follow,
  post,
}: UserProps) => (
  <div className={`flex mr-2.5 ${className}`}>
    <div className="flex justify-center items-center mr-4">
      <Image width={width} height={height} src={src}></Image>
    </div>
    <div
      className={`flex flex-col justify-center ${
        bottomLine ? "border-b-2 border-b-solid border-b-dark" : ""
      }`}
    >
      <p className="font-bold hover:text-primary hover:underline">{userName}</p>
      {date && <p className="text-xs text-light">{date}</p>}
      {follow && <p className="text-xs text-light">您已追蹤{follow}天</p>}
      {post && <p className="text-xs text-light">發文時間：{post}</p>}
    </div>
  </div>
);
