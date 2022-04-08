import React from "react";

interface ButtonProps {
  className?: string;
  /**
   * Button contents
   */
  label: string;
  disable?: boolean;
  active?: boolean;
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
  onButtonClick,
}: ButtonProps) => (
  <button
    type="button"
    className={`w-full border-2 border-solid  rounded-lg font-bold text-white py-3 ${
      disable ? "bg-disable border-disable-border" : "bg-primary border-dark"
    } ${active ? "bg-active text-black" : ""} ${className}`}
    onClick={onButtonClick}
  >
    {label}
  </button>
);
