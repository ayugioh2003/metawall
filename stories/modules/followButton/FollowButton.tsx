import React, { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { loadingState } from "../../../store/states";
import { getFollowings, toggleFollow } from "../../../api/followings";
import Swal from "sweetalert2";

interface FollowButtonProps {
  userId: string;
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const FollowButton = ({
  userId,
  className,
}: FollowButtonProps) => {
  const [_isLoading, setIsLoading] = useRecoilState(loadingState);
  const [type, setType] = useState<"follow" | "unfollow">("follow");

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

  const fetchFollowing = useCallback(async () => {
    setIsLoading(true);
    await getFollowings().then(res => {
      if (res) {
        const currentUserfollowings = res[0].followings.map((x: any) => x.user.id)
        setType(currentUserfollowings.indexOf(userId) > -1 ? "unfollow" : "follow")
      }
    })
    setIsLoading(false);
  }, [setIsLoading, setType, userId])


  useEffect(() => {
    fetchFollowing();
    // setIsLoading(true);
    // const followings = userInfo.followings.map((x: any) => x.user);
    // setType(followings.indexOf(userId) > -1 ? "unfollow" : "follow")
    // setIsLoading(false);
  }, [fetchFollowing])

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
