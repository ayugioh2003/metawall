import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Input } from "../../../stories/modules/input/Input";
import { Select } from "../../../stories/modules/select/Select";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { postState, searchState } from "../../../store/states";
import { getPosts } from "../../../api/posts";

interface SearchBarProps {
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const SearchBar = ({ className }: SearchBarProps) => {
  const [searchData, setSearchData] = useRecoilState(searchState);
  const [postData, setPostData] = useRecoilState(postState);
  const { register, handleSubmit, watch } = useForm();
  const handleSearch = (data: any) => {
    getPosts(`q=${data.search}`).then(data => {
      setPostData(data);
    });
  };
  useEffect(() => {
    const subscription = watch(value => {
      setSearchData({
        postType: value.postType as string,
        search: value.search as string,
      });
      console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, setSearchData]);
  return (
    <form onSubmit={handleSubmit(handleSearch)} className="flex">
      <Select
        defaultValue={searchData.postType}
        className="mr-3"
        register={register("postType")}
      />
      <Input
        defaultValue={searchData.search}
        placeholder="搜尋......"
        className="mb-4 w-full"
        register={register("search")}
      />
      <div>
        <button
          type="submit"
          className="bg-primary w-12 h-12 border-2 border-dark border-solid"
        >
          <SearchOutlined className="text-white text-xl flex items-center justify-center" />
        </button>
      </div>
    </form>
  );
};
