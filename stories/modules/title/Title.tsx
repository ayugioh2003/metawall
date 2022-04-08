import React from "react";

interface TitleProps {
  text: string;
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Title = ({ text, className }: TitleProps) => (
  <div className={`relative w-full min-w-[350px] h-16 ${className}`}>
    <div className="absolute top-0 left-0 w-full flex justify-center items-center text-xl text-dark font-bold h-16 border-2 border-solid border-dark z-10 bg-white">
      {text}
    </div>
    <div className="absolute -bottom-1 -left-1 w-full h-16 border-2 border-solid border-dark"></div>
  </div>
);
