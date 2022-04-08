import React from "react";
import Image, { StaticImageData } from "next/image";
import {
  BellOutlined,
  HomeOutlined,
  LikeOutlined,
  PlusOutlined,
} from "@ant-design/icons";

interface ToolbarProps {
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Toolbar = ({ className }: ToolbarProps) => (
  <div
    className={`flex justify-center min-w-[300px] border-[3px] border-dark border-solid bg-c-bg rounded-[32px] px-11 ${className}`}
  >
    <div className="flex justify-center items-center w-12 h-12 rounded-full border-[3px] border-solid border-dark bg-white mr-6 my-2">
      <HomeOutlined className="flex justify-center items-center text-xl" />
    </div>
    <div className="flex justify-center items-center w-12 h-12 rounded-full border-[3px] border-solid border-dark bg-white mr-6 my-2">
      <BellOutlined className="flex justify-center items-center text-xl" />
    </div>
    <div className="flex justify-center items-center w-12 h-12 rounded-full border-[3px] border-solid border-dark bg-white mr-6 my-2">
      <LikeOutlined className="flex justify-center items-center text-xl" />
    </div>
    <div className="flex justify-center items-center w-12 h-12 rounded-full border-[3px] border-solid border-dark bg-primary my-2">
      <PlusOutlined className="flex justify-center items-center text-xl text-white" />
    </div>
  </div>
);
