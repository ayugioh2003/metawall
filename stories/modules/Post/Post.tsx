import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { User } from "../user/User";
import { LikeOutlined } from "@ant-design/icons";
import { Input } from "../input/Input";
import user1 from "../../../public/image/user.png";
import loadingGif from "../../../public/image/loading.gif";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/states";

interface PostProps {
  userName: string;
  content: string;
  src?: StaticImageData;
  userIcon: StaticImageData;
  date?: string;
  className?: string;
  like?: number;
  comments?: any[];
}

/**
 * Primary UI component for user interaction
 */
export const Post = ({
  userName,
  userIcon,
  content,
  src,
  date,
  className,
  like,
  comments,
}: PostProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const handleCommand = (data: any) => {
    console.log(data);
  };
  return (
    <div className={`bg-white border-2 border-b-4 border-dark border-solid rounded-lg w-full min-w-[300px] p-6 ${className}`}>
      <User
        userName={userName}
        width="45px"
        height="45px"
        src={userIcon}
        date={date}
        className="mb-4"
      />
      <p className="mb-4">{content}</p>
      {src && (
        <div className="relative h-[157px] mb-5">
          <Image src={src ?? ""} layout="fill" />
        </div>
      )}
      {like ? (
        <div className="flex items-center mb-5">
          <LikeOutlined className="text-xl flex items-center mr-2" /> {like}
        </div>
      ) : (
        <div className="flex items-center mb-5">
          <LikeOutlined className="text-xl flex items-center mr-2" />
          成為第一個按讚的朋友
        </div>
      )}
      <form onSubmit={handleSubmit(handleCommand)} className="flex mb-4 w-full">
        <div className=" mr-3">
          <Image width="40px" height="40px" src={userInfo.avatar} />
        </div>
        <Input
          size="small"
          placeholder="留言......"
          register={register("commentContent")}
        />
        <div className="w-[128px] relative">
          <button
            type="submit"
            className={`w-full h-10 border-solid border-dark border-2 ${loading ? "bg-active text-dark" : "bg-primary text-white"
              }`}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false)
                setValue("commentContent", "", {
                  shouldValidate: true,
                  shouldDirty: true
                })
              }, 2000)
            }}
          >
            留言
            {loading && (
              <span className="absolute top-2 right-5">
                <Image width="12px" height="12px" src={loadingGif} />
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
              src={comment.userIcon}
              date={comment.date}
              className="mb-4"
            />
            <p className="ml-16">{comment.content}</p>
          </div>
        ))}
    </div>
  );
};
