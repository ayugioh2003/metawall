import { DownOutlined } from "@ant-design/icons";
import React from "react";

interface SelectProps {
  className?: string;
  register?: any;
}

/**
 * Primary UI component for user interaction
 */
export const Select = ({ className, register }: SelectProps) => (
  <div className={`relative ${className}`}>
    <select {...register} className="w-full md:w-[156px] py-2.5 px-4 border-2 border-solid border-dark appearance-none">
      <option value="newest">最新貼文</option>
      <option value="most-good">讚數最多</option>
      <option value="most-command">留言最多</option>
    </select>
    <DownOutlined className="absolute top-1/3 right-3" />
  </div>
);
