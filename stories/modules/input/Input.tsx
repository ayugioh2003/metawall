import React from "react";
import style from "./input.module.css";

interface InputProps {
  type?: string;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  size?: string;
  register?: any;
  error?: any;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  type = "text",
  defaultValue = "",
  placeholder = "",
  value = "",
  className,
  size,
  register,
  error,
  onChange,
  disabled,
}: InputProps) => (
  <>
    <input
      defaultValue={defaultValue}
      // value={value}
      placeholder={placeholder}
      type={type}
      className={`${style.input} border-2 border-solid border-dark rounded-none w-full pl-6 ${size === "small" ? "h-10" : "h-12"} ${className ? className : ""}`}
      onChange={onChange}
      disabled={disabled}
      {...register}
    />
    {error && (
      <p className="w-full text-sm text-error mt-1">
        {error[`${error.errors?.type}Error`]}
      </p>
    )}
  </>
);
