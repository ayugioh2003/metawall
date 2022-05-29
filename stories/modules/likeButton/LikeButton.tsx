import React, { useEffect, useState } from "react";
import { LikeOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { getLikes, toggleLike } from "../../../api/likes";
import { loadingState, userState } from "../../../store/states";
import { ToggleLikeParam } from '../../../pages/post';

interface LikeButtonProps {
  postId: string;
  likes: string[];
  isMyLike: boolean;
  togglePostLike: (arg0: ToggleLikeParam) => void;
}

/**
 * Primary UI component for user interaction
 */
export const LikeButton = ({
  postId,
  likes,
  isMyLike,
  togglePostLike,
}: LikeButtonProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);

  return (
    <div
      className={`flex items-center mb-5${!isMyLike ? " text-light" : ""}`}
      onClick={() => togglePostLike({ postId, changeToLike: !isMyLike })}
    >
      <LikeOutlined className="text-xl flex items-center mr-2" />
      <span>{likes.length > 0 ? likes.length.toString() : "成為第一個按讚的朋友"}</span>
    </div>
  )
}