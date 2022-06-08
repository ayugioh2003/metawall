import { useEffect, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import { useRecoilState } from "recoil";
import { userState, loadingState } from "../../../store/states";
import { FollowButton } from "../followButton/FollowButton";
import { DonateButton } from "../donateButton/DonateButton";
import userDefault from "../../../public/image/user_default.png";
import { getFollowings } from "../../../api/followings";

interface FollowTitleProps {
  userId: string;
  src: StaticImageData | string;
  followName: string;
  followQuantity: number;
  className?: string;
  type: "follow" | "unfollow";
  setType: (type: "follow" | "unfollow") => void;
  changeFollow: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const FollowTitle = ({
  userId,
  src,
  followName,
  followQuantity,
  className,
  type,
  setType,
  changeFollow,
}: FollowTitleProps) => {
  const [userInfo, _setUserInfo] = useRecoilState(userState);
  const [_isLoading, setIsLoading] = useRecoilState(loadingState);
  const size = '76px'

  const fetchFollowing = useCallback(async () => {
    setIsLoading(true);
    await getFollowings().then(res => {
      if (res) {
        const currentUserfollowings = res[0].followings.map((x: any) => x.user.id)
        setType(currentUserfollowings.indexOf(userId) > -1 ? "unfollow" : "follow")
      }
    })
    setIsLoading(false);
  }, [setIsLoading, setType, userId])

  useEffect(() => {
    fetchFollowing();
  }, [fetchFollowing])

  return (
    <div className={`relative w-full min-w-[500px] h-20 ${className}`}>
      <div className="absolute top-0 left-0 w-full flex justify-between items-center text-xl text-dark font-bold h-20 border-2 border-solid border-dark z-10 bg-white pr-4">
        <div className="flex">
          <div className="flex justify-center items-center min-w-[80px] h-20 border-r-2 border-r-dark border-r-solid relative overflow-hidden mr-4">
            {typeof src !== "string" || !src || src === " " ? (
              <Image
                className="rounded-full"
                width={size}
                height={size}
                src={!!src && src !== " " ? src : userDefault}
                alt="avatar" />
            ) : (
              <img
                className="rounded-full"
                width={size}
                height={size}
                alt="avatar"
                src={src}
              />
            )}
          </div>
          <div className="flex flex-col justify-center">
            <p>{followName}</p>
            <p>{followQuantity}人追蹤</p>
          </div>
        </div>
        {userInfo._id !== userId &&
          <div>
            <DonateButton userId={userId} userName={followName} />
            <FollowButton type={type} changeFollow={changeFollow} />
          </div>
        }
      </div>
      <div className="absolute -bottom-1 -left-1 w-full h-20 border-2 border-solid border-dark"></div>
    </div>
  );
};
