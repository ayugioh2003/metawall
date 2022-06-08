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
import { fetchAddComment, fetchGetComment } from "../../../api/comment";
import Swal from "sweetalert2";

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
  const [commentData, setCommentData] = useState(comments);
  const [open, setOpen] = useState(false);
  const handleCommand = async (data: any) => {
    const { commentContent } = data;
    const addComment = await fetchAddComment({
      post_id: _id,
      content: commentContent,
    });
    if (addComment?.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: "新增評論失敗，請稍後再試",
        icon: "error",
        confirmButtonText: "我知道了",
      });
      return;
    }
    const getComment = await fetchGetComment(_id);
    if (!getComment) {
      Swal.fire({
        title: "Error!",
        text: "更新評論失敗，請稍後再試",
        icon: "error",
        confirmButtonText: "我知道了",
      });
      return;
    }
    setCommentData(getComment);
  };
  return (
    <div
      className={`bg-white border-2 border-b-4 border-dark border-solid rounded-lg w-full min-w-[300px] p-6 ${className}`}
    >
      <User
        id={user.id}
        userName={user.name}
        width="45px"
        height="45px"
        avatar={user.avatar}
        date={createdAt}
        className="mb-4"
      />
      <p className="mb-4">{content}</p>
      {image && (
        <>
          <div
            className="relative h-[157px] mb-5 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Image
              src={image ?? "/"}
              layout="fill"
              objectFit="cover"
              alt="postImage"
            />
          </div>
          {open && (
            <div
              className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/30 z-20"
              onClick={() => setOpen(false)}
            >
              <div className="w-[90vw] h-[90vh] relative flex justify-center items-center">
                <Image
                  src={image ?? "/"}
                  layout="fill"
                  objectFit="contain"
                  alt="postImage"
                />
              </div>
            </div>
          )}
        </>
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
      <div className="max-h-[280px] overflow-auto">
        {commentData &&
          commentData.map((comment, index) => (
            <div key={index} className="bg-c-bg/30 p-4 mb-4">
              <User
                id={comment.user.id}
                userName={comment.user.name}
                width="45px"
                height="45px"
                avatar={comment.user.avatar}
                date={comment.date}
                className="mb-4"
              />
              <p className="ml-16">{comment.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
