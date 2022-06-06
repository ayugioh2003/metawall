import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { Header } from "../../stories/modules/header/Header";
import { OptionList } from "../../stories/modules/optionList/OptionList";
import { Post } from "../../stories/modules/Post/Post";
import { FollowTitle } from "../../stories/modules/followTitle/FollowTitle";
import { SearchBar } from "../../stories/modules/searchBar/SearchBar";
import { useRecoilState } from "recoil";
import { loadingState, postState } from "../../store/states";
import { PostProps } from "../post";
import { ToggleLikeParam } from "../post";
import { fetchUser } from "../../api/user";
import { getPosts } from "../../api/posts";

export const UserWallPage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [_isLoading, setIsLoading] = useRecoilState(loadingState);
  const [options, setOptions] = useState([]);
  const [postData, setPostData] = useRecoilState(postState);
  const [userData, setUserData] = useState({
    _id: '',
    name: '',
    avatar: '',
    follower: 0,
  });

  const togglePostLike = async ({ postId, changeToLike }: ToggleLikeParam) => {
    console.log(postId, changeToLike);
  };

  const fetchUserData = useCallback(
    async () => {
      setIsLoading(true);
      await fetchUser(userId as string).then(res => {
        if (res && res.data)
          setUserData(res.data.data);
      });
      setIsLoading(false);
    }, [userId, setIsLoading]
  );

  const fetchPost = useCallback(
    async () => {
      setIsLoading(true);
      await getPosts(`user_id=${userId}`).then(data => {
        setPostData(data);
      });
      setIsLoading(false);
    }, [userId, setIsLoading, setPostData]
  );

  useEffect(() => {
    fetchUserData();
    fetchPost();
  }, [fetchUserData, fetchPost])

  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-12 px-4 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-3/4 pr-7">
            <FollowTitle
              src={userData.avatar}
              followName={userData.name}
              followQuantity={userData.follower || 0}
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
                togglePostLike={togglePostLike}
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
