import type { NextPage } from "next";
import { useState } from "react";
import { Header } from "../stories/modules/header/Header";
import { OptionList } from "../stories/modules/optionList/OptionList";
import Image from "next/image";
import { useRouter } from "next/router";
import { Title } from "../stories/modules/title/Title";
import { Button } from "../stories/modules/button/Button";
import { useForm } from "react-hook-form";
import { uploadImage } from '../utils/utils';
import { addPost } from "../api/posts";
import { useRecoilState } from "recoil";
import { userState } from "../store/states";

export const CreatePostPage: NextPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm({ mode: 'onChange' });
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [options, setOptions] = useState([]);
  const [isError, setIsError] = useState(false);
  const defaultImage = {
    imageFile: {},
    imagePreview: "",
    imageSize: 0,
  };
  const [image, setImage] = useState(defaultImage);

  const onSubmit = (data: any) => {
    addPost({
      content: data.content,
      userName: userInfo.name,
    });

    setValue("content", "");
    setValue("uploadImage", "");
    setImage(defaultImage);

    router.push("/post");
    router.reload;
  }

  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-12 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-3/4 pr-7">
            <Title text="張貼動態" className="mb-8" />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white border-2 border-solid border-dark rounded-lg flex flex-col items-center p-8"
            >
              <div className="w-full">
                <p className="text-dark mb-1">貼文內容</p>
                <textarea
                  rows={6}
                  className="w-full h-40 text-dark border-2 border-solid border-dark resize-none p-4"
                  placeholder="輸入您的貼文內容"
                  {...register("content", { required: true })}
                />
                {errors.content?.type === "required" &&
                  <p className="w-full text-sm text-error mt-1 mb-4">
                    發表貼文需要有文字內容
                  </p>
                }

                <label htmlFor="uploadImage">
                  <div className="w-[128px] flex justify-center items-center bg-dark text-white rounded py-1">
                    上傳新圖片
                  </div>
                  <input
                    type="file"
                    accept="image/jpg,image/jpeg,image/png"
                    id="uploadImage"
                    className="h-0"
                    {...register("uploadImage")}
                    onChange={e => uploadImage(e, setIsError, setImage)}
                  />
                </label>
                {image.imagePreview && (
                  <div className="relative w-40 h-40 overflow-hidden rounded-lg border-2 border-dark border-solid mb-6">
                    <Image
                      src={image.imagePreview}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
              </div>
              {isError && (
                <p className="text-error text-sm mb-4">
                  圖片檔案過大，僅限 1mb 以下檔案
                </p>
              )}
              <div className="w-3/5">
                <Button
                  type="submit"
                  label="送出新貼文"
                  disable={isError || !isValid}
                />
              </div>
            </form>
          </div>
          <div className="w-1/4">
            <OptionList options={options} />
          </div>
        </main>
      </div>
    </>
  );
};

export default CreatePostPage;
