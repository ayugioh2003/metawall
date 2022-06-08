import React from "react";
import { useRecoilState } from "recoil";
import { loadingState } from "../../../store/states";
import { toggleFollow } from "../../../api/followings";
import Swal from "sweetalert2";

interface FollowButtonProps {
  userId: string;
  className?: string;
  type: "follow" | "unfollow";
  setType: (type: "follow" | "unfollow") => void;
}

/**
 * Primary UI component for user interaction
 */
export const FollowButton = ({
  userId,
  className,
  type,
  setType,
}: FollowButtonProps) => {
  const [_isLoading, setIsLoading] = useRecoilState(loadingState);

  const changeFollow = async () => {
    setIsLoading(true);
    await toggleFollow({ userId, changeToFollow: type === "follow" })
      .then(async res => {
        if (res) {
          setType(type === "follow" ? "unfollow" : "follow")
          Swal.fire({
            title: "Success!",
            text: "變更追蹤成功",
            icon: "success",
            confirmButtonText: "我知道了",
          });
        }
      });
    setIsLoading(false);
  }

  return (
    <button
      type="button"
      className={` border-2 border-b-4 border-solid border-dark text-black font-bold rounded-lg py-1.5 ${type === "follow" ? "bg-active w-[96px]" : "bg-c-bg w-[128px]"
        } ${className}`}
      onClick={() => changeFollow()}
    >
      {type === "follow" ? "追蹤" : "取消追蹤"}
    </button>
  )
};
