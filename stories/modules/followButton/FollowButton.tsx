import React from "react";

interface FollowButtonProps {
  className?: string;
  /**
   * Button contents
   */
  type: "follow" | "unfollow";
  /**
   * Optional click handler
   */
  onButtonClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const FollowButton = ({
  type,
  className,
  onButtonClick,
}: FollowButtonProps) => (
  <>
    <button
      type="button"
      className={` border-2 border-b-4 border-solid border-dark text-black font-bold rounded-lg py-1.5 ${
        type === "follow" ? "bg-active w-[96px]" : "bg-c-bg w-[128px]"
      } ${className}`}
      onClick={onButtonClick}
    >
      {type === "follow" ? "追蹤" : "取消追蹤"}
    </button>
  </>
);
