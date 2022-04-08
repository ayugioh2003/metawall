import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { Header } from "../stories/modules/header/Header";
import { OptionList } from "../stories/modules/optionList/OptionList";
import Image from "next/image";
import user1 from "../public/image/user.png";
import { Title } from "../stories/modules/title/Title";
import { Button } from "../stories/modules/button/Button";

export const CreatePostPage: NextPage = () => {
  const [options, setOptions] = useState([{ name: "邊緣小杰", icon: user1 }]);
  const [content, setContent] = useState("");
  const [isError, setIsError] = useState(false);
  const [image, setImage] = useState({
    imageFile: {},
    imagePreview: "",
    imageSize: 0,
  });
  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
      setImage({
        imageFile: e.target.files[0],
        imagePreview: URL.createObjectURL(e.target.files[0]),
        imageSize: e.target.files[0].size,
      });
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-12 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-3/4 pr-7">
            <Title text="張貼動態" className="mb-8" />
            <div className="bg-white border-2 border-solid border-dark rounded-lg flex flex-col items-center p-8">
              <div className="w-full">
                <p className="text-dark mb-1">貼文內容</p>
                <textarea
                  value={content}
                  placeholder="輸入您的貼文內容"
                  rows={6}
                  onChange={e => setContent(e.target.value)}
                  className="w-full h-40 text-dark border-2 border-solid border-dark resize-none p-4 mb-4"
                />
                <label htmlFor="uploadImage">
                  <div className="w-[128px] flex justify-center items-center bg-dark text-white rounded py-1 mb-4">
                    上傳新圖片
                  </div>
                  <input
                    type="file"
                    accept="image/jpg,image/jpeg,image/png"
                    id="uploadImage"
                    className="h-0"
                    onChange={e => uploadImage(e)}
                  />
                </label>
                {image.imagePreview && (
                  <div className="relative h-40 overflow-hidden rounded-lg border-2 border-dark border-solid mb-6">
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
                  label="送出新貼文"
                  disable={!content}
                  onButtonClick={() => setIsError(!isError)}
                />
              </div>
            </div>
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
