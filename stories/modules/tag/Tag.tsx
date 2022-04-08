import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import userDefault from "../../../public/image/user_default.png";
import { Input } from "../input/Input";
import { Button } from "../button/Button";

interface TagProps {}

/**
 * Primary UI component for user interaction
 */
export const Tag = ({}: TagProps) => {
  const [mode, setMode] = useState("updateName");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [isError, setIsError] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  return (
    <div className={`flex flex-col min-w-[500px]`}>
      <div>
        <button
          type="button"
          className={`${
            mode === "updateName"
              ? "bg-dark text-white"
              : "border-2 border-solid border-dark border-b-0"
          } bg-white px-6 py-2 rounded-t-lg ml-4`}
          onClick={() => setMode("updateName")}
        >
          暱稱修改
        </button>
        <button
          type="button"
          className={`${
            mode === "updatePassword"
              ? "bg-dark text-white"
              : "border-2 border-solid border-dark border-b-0"
          } bg-white px-6 py-2 rounded-t-lg`}
          onClick={() => setMode("updatePassword")}
        >
          重設密碼
        </button>
      </div>
      <div className="flex flex-col items-center bg-white border-2 border-solid border-dark py-8">
        {mode === "updateName" ? (
          <>
            <div className="mb-4">
              <Image width="107px" height="107px" src={userDefault} />
            </div>
            <button type="button" className="bg-dark text-white py-2 px-6 mb-3">
              上傳大頭照
            </button>
            <div className="w-3/5 flex flex-col ">
              <p className="text-dark mb-1">暱稱</p>
              <Input
                className="mb-4"
                value={userName}
                onChange={e => setUserName(e.target.value)}
              />
              <p className="text-dark mb-2">性別</p>
              <div className="flex items-center mb-9">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={e => setGender(e.target.value)}
                  className={`${
                    gender === "male" &&
                    "after:w-2.5 after:h-2.5 after:bg-dark after:absolute after:top-[3px] after:left-[3.5px] after:rounded-full"
                  } relative w-5 h-5 border-2 border-solid border-dark rounded-full mr-3 appearance-none`}
                />
                <span className="mr-6">男性</span>
                <input
                  type="radio"
                  name="gender"
                  value="famale"
                  checked={gender === "famale"}
                  onChange={e => setGender(e.target.value)}
                  className={`${
                    gender === "famale" &&
                    "after:w-2.5 after:h-2.5 after:bg-dark after:absolute after:top-[3px] after:left-[3.5px] after:rounded-full"
                  } relative w-5 h-5 border-2 border-solid border-dark rounded-full mr-3 appearance-none`}
                />
                女性
              </div>
              {isError && (
                <div className="mb-4 flex flex-col justify-center items-center">
                  <p className="text-error text-sm">
                    1.圖片寬高比必需為 1:1,請重新輸入
                  </p>
                  <p className="text-error text-sm">
                    2.解析度寬度至少 300像素以上,請重新輸入
                  </p>
                </div>
              )}
              <Button
                label="送出更新"
                active={!isError}
                onButtonClick={() => setIsError(!isError)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-3/5">
              <p className="text-dark mb-1">輸入新密碼</p>
              <Input
                className="mb-4"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="請輸入新密碼"
              />
              <p className="text-dark mb-1">再次輸入</p>
              <Input
                className="mb-6"
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
                placeholder="再次輸入新密碼"
              />
              <Button label="重設密碼" disable={!password || !repeatPassword} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
