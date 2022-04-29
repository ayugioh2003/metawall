import React from "react";

interface ButtonProps {
  className?: string;
  /**
   * Button contents
   */
  label: string;
  disable?: boolean;
  active?: boolean;
  type?: "button" | "submit" | "reset";
  /**
   * Optional click handler
   */
  onButtonClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  label,
  className,
  disable,
  active,
  type,
  onButtonClick,
}: ButtonProps) => (
  <button
    type={type}
    className={`w-full border-2 border-solid  rounded-lg font-bold text-white py-3 ${
      disable ? "bg-disable border-disable-border" : "bg-primary border-dark"
    } ${active ? "bg-active text-black" : ""} ${className}`}
    disabled={disable}
    onClick={onButtonClick}
  >
    {label}
  </button>
);
