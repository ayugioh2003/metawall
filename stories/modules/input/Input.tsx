import React from "react";
import style from "./input.module.css";

interface InputProps {
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  register?: any;
  error?: any;
}

export const Input = ({
  type = "text",
  defaultValue = "",
  placeholder = "",
  className,
  register,
  error,
}: InputProps) => (
  <>
    <input
      defaultValue={defaultValue}
      placeholder={placeholder}
      type={type}
      className={`${style.input} border-2 border-solid border-dark rounded-none w-full h-12 pl-6 ${className}`}
      {...register}
    />
    {error &&
      <p className="w-full text-sm text-error mt-1">
        {error[`${error.errors?.type}Error`]}
      </p>
    }
  </>
);
