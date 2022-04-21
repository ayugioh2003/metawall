import type { NextPage } from "next";
import { useState } from "react";
import { Header } from "../stories/modules/header/Header";
import { OptionList } from "../stories/modules/optionList/OptionList";
import user1 from "../public/image/user.png";
import { Title } from "../stories/modules/title/Title";
import { Tag } from "../stories/modules/tag/Tag";

export const UpdateUsertPage: NextPage = () => {
  const [options, setOptions] = useState([]);
  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-12 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-3/4 pr-7">
            <Title text="修改個人資料" className="mb-8" />
            <Tag />
          </div>
          <div className="w-1/4">
            <OptionList options={options} />
          </div>
        </main>
      </div>
    </>
  );
};

export default UpdateUsertPage;
