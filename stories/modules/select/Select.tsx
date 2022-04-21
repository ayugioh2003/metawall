import { DownOutlined } from "@ant-design/icons";
import React from "react";

interface SelectProps {
  className?: string;
  defaultValue?: string;
  register?: any;
}

/**
 * Primary UI component for user interaction
 */
export const Select = ({ className, register, defaultValue }: SelectProps) => (
  <div className={`relative ${className}`}>
    <select defaultValue={defaultValue}   {...register} className="w-full md:w-[156px] py-2.5 px-4 border-2 border-solid border-dark appearance-none">
      <option value="newest">最新貼文</option>
      <option value="most-good">讚數最多</option>
      <option value="most-command">留言最多</option>
    </select>
    <DownOutlined className="absolute top-1/4 right-3" />
  </div>
);
