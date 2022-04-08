import React from "react";
import style from "./settingButton.module.css";

interface SettingButtonProps {
  text: string;
  icon: React.ReactNode;
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const SettingButton = ({
  text,
  icon,
  className,
}: SettingButtonProps) => {
  return (
    <div className={`${style.settingButton} flex ${className}`}>
      <div
        className={`${style.icon} flex justify-center items-center h-12 w-12 border-2 border-dark border-solid rounded-full mr-4 
          bg-setting-icon text-black`}
      >
        {icon}
      </div>
      <div className={`flex flex-col justify-center`}>
        <p className={`${style.text} font-bold  text-black`}>{text}</p>
      </div>
    </div>
  );
};
