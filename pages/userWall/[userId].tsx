import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { Header } from "../../stories/modules/header/Header";
import { OptionList } from "../../stories/modules/optionList/OptionList";
import { Post } from "../../stories/modules/Post/Post";
import { FollowTitle } from "../../stories/modules/followTitle/FollowTitle";
import { SearchBar } from "../../stories/modules/searchBar/SearchBar";
import { useRecoilState } from "recoil";
import { loadingState, postState, toastState } from "../../store/states";
import { PostProps } from "../post";
import { ToggleLikeParam } from "../post";
import { getPosts } from "../../api/posts";
import { getFollowings, toggleFollow } from "../../api/followings";
import { toggleLike } from "../../api/likes";
import Swal from "sweetalert2";

export const UserWallPage: NextPage = () => {
  const router = useRouter();
  const { userId, donateFrom, donateTo, comment, amt } = router.query;
  const [_toast, setToast] = useRecoilState(toastState);
  const [_isLoading, setIsLoading] = useRecoilState(loadingState);
  const [options, _setOptions] = useState([]);
  const [postData, setPostData] = useRecoilState(postState);
  const [type, setType] = useState<"follow" | "unfollow">("follow");
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    avatar: "",
    followQuantity: 0,
  });

  const togglePostLike = async ({ postId, changeToLike }: ToggleLikeParam) => {
    setIsLoading(true);
    await toggleLike({ postId, changeToLike }).then(data => fetchPost());
    setIsLoading(false);
  };

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    await getFollowings(userId as string).then(res => {
      if (res) {
        const user = res[0];
        setUserData({
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          followQuantity: user.followers.length,
        });
      }
    });
    setIsLoading(false);
  }, [userId, setIsLoading]);

  const fetchPost = useCallback(async () => {
    setIsLoading(true);
    await getPosts(`user_id=${userId}`).then(data => {
      setPostData(data);
    });
    setIsLoading(false);
  }, [userId, setIsLoading, setPostData]);

  useEffect(() => {
    fetchUserData();
    fetchPost();
  }, [fetchUserData, fetchPost]);

  useEffect(() => {
    if (donateFrom && amt && comment) {
      setToast(`${donateFrom}成功贊助${donateTo} ${amt} 元\n${comment}`);
      router.replace(`/userWall/${userId}`);
    }
  }, []);

  const changeFollow = async () => {
    setIsLoading(true);
    await toggleFollow({
      userId: userData._id,
      changeToFollow: type === "follow",
    }).then(async res => {
      if (res) {
        setType(type === "follow" ? "unfollow" : "follow");
        fetchUserData();
        Swal.fire({
          title: "Success!",
          text: "變更追蹤成功",
          icon: "success",
          confirmButtonText: "我知道了",
        });
      }
    });
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-12 px-4 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-3/4 pr-7">
            <FollowTitle
              userId={userData._id}
              src={userData.avatar}
              followName={userData.name}
              followQuantity={userData.followQuantity || 0}
              className="mb-4"
              type={type}
              setType={setType}
              changeFollow={changeFollow}
            />
            <SearchBar />
            {postData.map((data: PostProps) => (
              <Post
                key={data._id}
                _id={data?._id}
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
