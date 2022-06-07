import type { NextPage } from "next";
import { useState } from "react";
import { Header } from "../stories/modules/header/Header";
import { NoPost } from "../stories/modules/noPost/NoPost";
import { OptionList } from "../stories/modules/optionList/OptionList";
import { SearchBar } from "../stories/modules/searchBar/SearchBar";

export const NoPostPage: NextPage = () => {
  const [options, setOptions] = useState([]);
  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-12 px-4 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-3/4 pr-7">
            <SearchBar />
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
