import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { FollowButton } from "../followButton/FollowButton";

interface FollowTitleProps {
  src: StaticImageData;
  followName: string;
  followQuantity: string;
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const FollowTitle = ({
  src,
  followName,
  followQuantity,
  className,
}: FollowTitleProps) => {
  const [type, setType] = useState<"follow" | "unfollow">("follow");
  return (
    <div className={`relative w-full min-w-[500px] h-20 ${className}`}>
      <div className="absolute top-0 left-0 w-full flex justify-between items-center text-xl text-dark font-bold h-20 border-2 border-solid border-dark z-10 bg-white pr-4">
        <div className="flex">
          <div className="flex justify-center items-center min-w-[80px] h-20 border-r-2 border-r-dark border-r-solid relative overflow-hidden mr-4">
            <Image width="76px" height="76px" src={src} />
          </div>
          <div className="flex flex-col justify-center">
            <p>{followName}</p>
            <p>{followQuantity}人追蹤</p>
          </div>
        </div>
        <FollowButton
          type={type}
          onButtonClick={() =>
            setType(type === "follow" ? "unfollow" : "follow")
          }
        />
      </div>
      <div className="absolute -bottom-1 -left-1 w-full h-20 border-2 border-solid border-dark"></div>
    </div>
  );
};
