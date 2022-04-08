import { DownOutlined } from "@ant-design/icons";
import React from "react";

interface SelectProps {
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Select = ({ className }: SelectProps) => (
  <div className={`relative ${className}`}>
    <select className="w-full md:w-[156px] py-2.5 px-4 border-2 border-solid border-dark appearance-none">
      <option value="">最新貼文</option>
    </select>
    <DownOutlined className="absolute top-1/3 right-3" />
  </div>
);
