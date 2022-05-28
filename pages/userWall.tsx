import type { NextPage } from "next";
import { useState } from "react";
import { Header } from "../stories/modules/header/Header";
import { OptionList } from "../stories/modules/optionList/OptionList";
import { Post } from "../stories/modules/Post/Post";
import user4 from "../public/image/user4.png";
import { FollowTitle } from "../stories/modules/followTitle/FollowTitle";
import { SearchBar } from "../stories/modules/searchBar/SearchBar";
import { useRecoilState } from "recoil";
import { postState } from "../store/states";
import { PostProps } from "./post";

export const UserWallPage: NextPage = () => {
  const [options, setOptions] = useState([]);
  const [postData, setPostData] = useRecoilState(postState);
  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-12 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-3/4 pr-7">
            <FollowTitle
              src={user4}
              followName="阿爾敏"
              followQuantity={"987,987"}
              className="mb-4"
            />
            <SearchBar />
            {postData.map((data: PostProps) => (
              <Post
                key={data._id}
                user={data.user}
                content={data.content}
                image={data.image}
                createdAt={data.createdAt}
                likes={data.likes}
                comments={data.comments}
                className="mb-4"
              />
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

export default UserWallPage;
