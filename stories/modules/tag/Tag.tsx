import React, { useState, useEffect } from "react";
import Image from "next/image";
import userDefault from "../../../public/image/user_default.png";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { useForm } from "react-hook-form";
import { uploadImage } from "../../../utils/utils";
import style from "./tag.module.css";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/states";

interface TagProps {}

/**
 * Primary UI component for user interaction
 */
export const Tag = ({}: TagProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [mode, setMode] = useState("updateName");
  const [isError, setIsError] = useState(false);
  const [image, setImage] = useState({
    imageFile: {},
    imagePreview: "",
    imageSize: 0,
  });
  const updateUserData = (data: any) => {
    const { uploadAvatar, userName, gender } = data;
    console.log({ uploadAvatar, userName, gender });
    setIsError(!isError);
  };
  const updatePassword = (data: any) => {
    const { password } = data;
    console.log(password);
  };
  useEffect(() => {
    setValue("gender", userInfo.gender);
    setValue("userName", userInfo.name);
  }, [setValue, userInfo]);

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
      <form
        className="flex flex-col items-center bg-white border-2 border-solid border-dark py-8"
        onSubmit={handleSubmit(
          mode === "updateName" ? updateUserData : updatePassword
        )}
      >
        {mode === "updateName" ? (
          <>
            <div className="mb-4">
              <Image
                className={style.avatar}
                width="107px"
                height="107px"
                src={image.imagePreview || userDefault}
                alt="avatar"
              />
            </div>
            <label
              htmlFor="uploadAvatar"
              className="bg-dark w-[128px] h-10 text-white py-2 px-6 mb-3"
            >
              <span>上傳大頭照</span>
              <input
                type="file"
                accept="image/jpg,image/jpeg,image/png"
                id="uploadAvatar"
                className="h-0"
                {...register("uploadAvatar")}
                onChange={e => uploadImage(e, setIsError, setImage)}
              />
            </label>
            <div className="w-3/5 flex flex-col ">
              <p className="text-dark mb-1">暱稱</p>
              <Input
                placeholder="UserName"
                className="mb-4"
                register={register("userName", { required: true })}
                error={{
                  errors: errors.userName,
                  requiredError: "請輸入暱稱",
                }}
              />
              <p className="text-dark mb-2">性別</p>
              <div className="flex items-center mb-9">
                <input
                  {...register("gender", { required: true })}
                  type="radio"
                  value="male"
                  id="male"
                  className={`${
                    watch("gender") === "male" &&
                    "after:w-2.5 after:h-2.5 after:bg-dark after:absolute after:top-[3px] after:left-[3.5px] after:rounded-full"
                  } relative w-5 h-5 border-2 border-solid border-dark rounded-full mr-3 appearance-none`}
                />
                <label htmlFor="male" className="mr-6">
                  男性
                </label>
                <input
                  {...register("gender", { required: true })}
                  type="radio"
                  value="female"
                  id="female"
                  className={`${
                    watch("gender") === "female" &&
                    "after:w-2.5 after:h-2.5 after:bg-dark after:absolute after:top-[3px] after:left-[3.5px] after:rounded-full"
                  } relative w-5 h-5 border-2 border-solid border-dark rounded-full mr-3 appearance-none`}
                />
                <label htmlFor="female" className="mr-6">
                  女性
                </label>
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
                type="submit"
                label="送出更新"
                active={!isError}
                disable={!isValid}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-3/5">
              <p className="text-dark">輸入新密碼</p>
              <Input
                placeholder="請輸入新密碼"
                className="mt-1"
                register={register("password", {
                  required: true,
                  minLength: 6,
                })}
                error={{
                  errors: errors.password,
                  requiredError: "請輸入密碼",
                  minLengthError: "密碼長度應大於6個字元",
                }}
              />
              <p className="text-dark mt-4">再次輸入</p>
              <Input
                placeholder="再次輸入新密碼"
                className="mt-1"
                register={register("repeatPassword", {
                  required: true,
                  minLength: 6,
                })}
                error={{
                  errors: errors.repeatPassword,
                  requiredError: "請重新輸入密碼",
                  minLengthError: "密碼長度應大於6個字元",
                }}
              />
              {watch("password") !== watch("repeatPassword") && (
                <p className="w-full text-sm text-error mt-1">密碼不一致</p>
              )}
              <Button
                className="mt-6"
                type="submit"
                label="重設密碼"
                disable={
                  !isValid || watch("password") !== watch("repeatPassword")
                }
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};
