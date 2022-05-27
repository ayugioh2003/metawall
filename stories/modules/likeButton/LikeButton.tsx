import React, { useEffect, useState } from "react";
import { LikeOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { getLikes, toggleLike } from "../../../api/likes";
import { loadingState, userState } from "../../../store/states";

interface LikeButtonProps {
  postId: string;
  likes?: string[];
}

/**
 * Primary UI component for user interaction
 */
export const LikeButton = ({
  postId,
  likes,
}: LikeButtonProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const [likeCount, setLikeCount] = useState(likes ? likes.length : 0);
  const [isMyLike, setIsMyLike] = useState(likes.indexOf(userInfo._id) > -1);

  const toggle = async () => {
    setIsLoading(true);
    const changeToLike = !isMyLike;
    await toggleLike({ postId, changeToLike }).then(data => {
      setLikeCount(data.likeCount);
      setIsMyLike(data.post.likes.indexOf(userInfo._id) > -1);
    })
    setIsLoading(false);
  }

  return (
    <div
      className={`flex items-center mb-5${!isMyLike ? " text-light" : ""}`}
      onClick={toggle}
    >
      <LikeOutlined className="text-xl flex items-center mr-2" />
      <span>{likeCount ? likeCount.toString() : "成為第一個按讚的朋友"}</span>
    </div>
  )
}