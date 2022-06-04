import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { Header } from "../stories/modules/header/Header";
import { OptionList } from "../stories/modules/optionList/OptionList";
import { Post } from "../stories/modules/Post/Post";
import user5 from "../public/image/user5.png";
import { Toolbar } from "../stories/modules/toolbar/Toolbar";
import { SearchBar } from "../stories/modules/searchBar/SearchBar";
import { useRecoilState } from "recoil";
import { postState, loadingState } from "../store/states";
import { getPosts } from "../api/posts";
import { toggleLike } from "../api/likes";
import { StaticImageData } from "next/image";

export interface PostProps {
  _id?: string;
  user: {
    name: string;
    avatar: string | StaticImageData;
  };
  content: string;
  image?: string | StaticImageData;
  createdAt?: string;
  className?: string;
  likes?: string[];
  comments?: any[];
  togglePostLike: (arg0: ToggleLikeParam) => void;
}

export interface ToggleLikeParam {
  postId: string;
  changeToLike: boolean;
}

export const PostPage: NextPage = () => {
  const [options, _setOptions] = useState([]);
  const [postData, setPostData] = useRecoilState(postState);
  const [_isLoading, setIsLoading] = useRecoilState(loadingState);

  const getData = () => {
    getPosts().then(data => {
      setPostData(data);
    });
  };

  const togglePostLike = async ({ postId, changeToLike }: ToggleLikeParam) => {
    setIsLoading(true);
    await toggleLike({ postId, changeToLike }).then(data => getData());
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-4 px-4 pb-20 md:pt-12 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-full md:w-3/4 md:pr-7">
            <SearchBar />
            {postData.length > 0 &&
              postData.map((data: PostProps) => (
                <Post
                  key={data?._id}
                  _id={data?._id}
                  user={data?.user}
                  content={data?.content}
                  image={data?.image}
                  createdAt={data?.createdAt}
                  likes={data?.likes}
                  comments={data?.comments}
                  className="mb-4"
                  togglePostLike={togglePostLike}
                />
              ))}
          </div>
          <div className="hidden md:block md:w-1/4">
            <OptionList options={options} />
          </div>
          <Toolbar className="md:hidden fixed bottom-10 left-2/4 transform -translate-x-1/2" />
        </main>
      </div>
    </>
  );
};

export default PostPage;
