import React, { useState } from "react";
import Image from "next/image";
import { User } from "../user/User";
import { LikeButton } from "../likeButton/LikeButton";
import { LikeOutlined } from "@ant-design/icons";
import { Input } from "../input/Input";
import loadingGif from "../../../public/image/loading.gif";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/states";
import { PostProps } from "../../../pages/post";
import userDefault from "../../../public/image/user_default.png";

/**
 * Primary UI component for user interaction
 */
export const Post = ({
  user,
  content,
  image,
  createdAt,
  className,
  likes,
  comments,
  _id,
  togglePostLike,
}: PostProps) => {
  const [userInfo, _setUserInfo] = useRecoilState(userState);
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const handleCommand = (data: any) => {
    console.log(data);
  };
  return (
    <div
      className={`bg-white border-2 border-b-4 border-dark border-solid rounded-lg w-full min-w-[300px] p-6 ${className}`}
    >
      <User
        userName={user.name}
        width="45px"
        height="45px"
        avatar={user.avatar}
        date={createdAt}
        className="mb-4"
      />
      <p className="mb-4">{content}</p>
      {image && (
        <div className="relative h-[157px] mb-5">
          <Image
            src={image ?? "/"}
            layout="fill"
            objectFit="cover"
            alt="postImage"
          />
        </div>
      )}
      {_id && likes && (
        <LikeButton
          postId={_id ?? ""}
          likes={likes ?? []}
          togglePostLike={togglePostLike}
          isMyLike={likes.indexOf(userInfo._id) > -1}
        />
      )}
      <form onSubmit={handleSubmit(handleCommand)} className="flex mb-4 w-full">
        <div className=" mr-3">
          <Image
            className="rounded-full"
            width="40px"
            height="40px"
            src={
              userInfo.avatar && userInfo.avatar !== " "
                ? userInfo.avatar
                : userDefault
            }
          />
        </div>
        <Input
          size="small"
          placeholder="留言......"
          register={register("commentContent")}
        />
        <div className="w-[128px] relative">
          <button
            type="submit"
            className={`w-full h-10 border-solid border-dark border-2 ${
              loading ? "bg-active text-dark" : "bg-primary text-white"
            }`}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setValue("commentContent", "", {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }, 2000);
            }}
          >
            留言
            {loading && (
              <span className="absolute top-2 right-5">
                <Image
                  width="12px"
                  height="12px"
                  src={loadingGif}
                  alt="loading"
                />
              </span>
            )}
          </button>
        </div>
      </form>
      {comments &&
        comments.map((comment, index) => (
          <div key={index} className="bg-c-bg/30 p-4 mb-4">
            <User
              userName={comment.userName}
              width="45px"
              height="45px"
              avatar={comment.userIcon}
              date={comment.date}
              className="mb-4"
            />
            <p className="ml-16">{comment.content}</p>
          </div>
        ))}
    </div>
  );
};
