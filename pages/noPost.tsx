import { SearchOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import { useState } from "react";
import { Header } from "../stories/modules/header/Header";
import { Input } from "../stories/modules/input/Input";
import { NoPost } from "../stories/modules/noPost/NoPost";
import { OptionList } from "../stories/modules/optionList/OptionList";
import { Select } from "../stories/modules/select/Select";
import user1 from "../public/image/user.png";

export const NoPostPage: NextPage = () => {
  const [options, setOptions] = useState([{ name: "邊緣小杰", icon: user1 }]);
  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-12 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-3/4 pr-7">
            <div className="flex mb-4">
              <Select className="mr-3" />
              <Input onChange={() => {}} />
              <div>
                <button className="bg-primary w-12 h-12 border-2 border-dark border-solid">
                  <SearchOutlined className="text-white text-xl flex items-center justify-center" />
                </button>
              </div>
            </div>
            <NoPost />
          </div>
          <div className="w-1/4">
            <OptionList options={options} />
          </div>
        </main>
      </div>
    </>
  );
};

export default NoPostPage;
