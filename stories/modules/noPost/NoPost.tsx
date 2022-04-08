import React from "react";

interface NoPostProps {}

/**
 * Primary UI component for user interaction
 */
export const NoPost = ({}: NoPostProps) => (
  <div className="bg-white border-2 border-b-4 border-dark border-solid rounded-lg w-full min-w-[300px] h-[132px]">
    <div className="w-full h-6 border-b-2 border-b-solid border-dark flex items-center">
      <div className="w-[9px] h-[9px] bg-noPost1 rounded-full ml-4 mr-1.5"></div>
      <div className="w-[9px] h-[9px] bg-noPost2 rounded-full mr-1.5"></div>
      <div className="w-[9px] h-[9px] bg-noPost3 rounded-full"></div>
    </div>
    <div className="flex justify-center items-center h-[100px]">
      <p className="text-light">目前尚無動態，新增一則貼文吧！</p>
    </div>
  </div>
);
