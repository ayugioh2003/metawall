import type { NextPage } from "next";
import { useEffect, useState, useCallback } from "react";
import { Header } from "../stories/modules/header/Header";
import { OptionList } from "../stories/modules/optionList/OptionList";
import { Title } from "../stories/modules/title/Title";
import { User } from "../stories/modules/user/User";
import { LikeOutlined, RightCircleOutlined } from "@ant-design/icons";
import { getUserLikes } from "../api/posts";
import { toggleLike } from "../api/likes";
import { useRecoilState } from "recoil";
import { likePostState, loadingState } from "../store/states";
import { PostProps, ToggleLikeParam } from "./post";

export const LikePostPage: NextPage = () => {
  const [options, setOptions] = useState([]);
  const [likePost, setLikePost] = useRecoilState(likePostState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const getLikePosts = useCallback(async () => {
    setIsLoading(true);
    await getUserLikes()
      .then(data => setLikePost(data))
      .catch(err => console.log(err))
    setIsLoading(false);
  }, [setLikePost, setIsLoading]);

  const togglePostLike = async ({ postId, changeToLike }: ToggleLikeParam) => {
    setIsLoading(true);
    await toggleLike({ postId, changeToLike })
      .then(() => {
        const arr = likePost.filter((x: any) => x._id !== postId);
        setLikePost(arr);
      })
      .catch(err => console.log(err))
    setIsLoading(false);
  }

  useEffect(() => {
    getLikePosts();
  }, [getLikePosts])

  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-12 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-3/4 pr-7">
            <Title text="我按讚的貼文" className="mb-8" />
            {likePost.map((post: PostProps) => (post &&
              <div
                key={post._id}
                className="flex justify-between items-center border-2 border-solid border-dark border-b-4 bg-white rounded-lg p-4 mb-4"
              >
                <User
                  userName={post.user.name}
                  postCreateAt={post.createdAt}
                  avatar={post.user.avatar}
                />
                <ul className="flex mr-6">
                  <li className="flex flex-col mr-9 cursor-pointer" onClick={() => togglePostLike({ postId: post._id ?? "", changeToLike: false })}>
                    <LikeOutlined className="text-xl mb-1" />
                    <p className="text-dark text-sm font-bold">取消</p>
                  </li>
                  <li className="flex flex-col">
                    <RightCircleOutlined className="text-xl mb-1" />
                    <p className="text-dark text-sm font-bold">查看</p>
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <div className="w-1/4">
            <OptionList options={options} />
          </div>
        </main>
      </div>
    </>
  );
};

export default LikePostPage;
