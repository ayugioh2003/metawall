import React, { useEffect, useState } from "react";
import { LikeOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { getLikes, toggleLike } from "../../../api/likes";
import { loadingState, userState } from "../../../store/states";

interface LikeButtonProps {
  postId: string;
}

/**
 * Primary UI component for user interaction
 */
export const LikeButton = ({
  postId,
}: LikeButtonProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const [likeCount, setLikeCount] = useState(0);
  const [likeUsers, setLikeUsers] = useState([""]);

  useEffect(() => {
    getLikesData();
  }, [postId])

  const getLikesData = async () => {
    setIsLoading(true);
    await getLikes(postId).then(data => {
      setLikeCount(data.likeCount);
      setLikeUsers(data.post.likes);
    });
    setIsLoading(false);
  }

  const toggle = async () => {
    setIsLoading(true);
    const changeToLike = likeUsers.indexOf(userInfo._id) < 0;
    await toggleLike({ postId, changeToLike }).then(data => {
      setLikeCount(data.likeCount);
      setLikeUsers(data.post.likes);
    })
    setIsLoading(false);
  }

  return (
    postId ?
      <div
        className={`flex items-center mb-5${likeUsers.indexOf(userInfo._id) < 0 ? " text-light" : ""}`}
        onClick={toggle}
      >
        <LikeOutlined className="text-xl flex items-center mr-2" />
        <span>{likeCount ? likeCount.toString() : "成為第一個按讚的朋友"}</span>
      </div> : null
  )
}