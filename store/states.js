import { atom } from "recoil";
import user1 from "../public/image/user.png";
import user4 from "../public/image/user4.png";
import user5 from "../public/image/user5.png";
import user51 from "../public/image/user5-1.png";
import dayjs from "dayjs";

export const loginState = atom({
  key: "loginState",
  default: {
    isLogin: false,
  },
});

export const loadingState = atom({
  key: "loadingState",
  default: false,
});

export const userState = atom({
  key: "userState",
  default: {
    _id: "628b4816313de1e5a54387f9",
    name: "Jay",
    email: "jay@gmail.com",
    password: "1234qwer",
    avatar: "https://mopcon.org/api/2019/speaker/images/web/speaker_38",
    gender: "male",
  },
});

export const postState = atom({
  key: "postState",
  default: [],
});

export const followListState = atom({
  key: "followListState",
  default: [
    {
      userName: "波吉",
      userIcon: user1,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      followTime: dayjs().format("DD"),
      followFromTime: dayjs().format("YYYY/MM/DD HH:mm"),
    },
    {
      userName: "多魯米",
      userIcon: user51,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      followTime: dayjs().format("DD"),
      followFromTime: dayjs().format("YYYY/MM/DD HH:mm"),
    },
    {
      userName: "卡克",
      userIcon: user4,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      followTime: dayjs().format("DD"),
      followFromTime: dayjs().format("YYYY/MM/DD HH:mm"),
    },
    {
      userName: "希琳",
      userIcon: user5,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      followTime: dayjs().format("DD"),
      followFromTime: dayjs().format("YYYY/MM/DD HH:mm"),
    },
    {
      userName: "多瑪斯",
      userIcon: user1,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      followTime: dayjs().format("DD"),
      followFromTime: dayjs().format("YYYY/MM/DD HH:mm"),
    },
  ],
});

export const likePostState = atom({
  key: "likePostState",
  default: [
    {
      userName: "波吉",
      userIcon: user1,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      postFromTime: dayjs().format("YYYY/MM/DD HH:mm"),
    },
    {
      userName: "多魯米",
      userIcon: user51,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      postFromTime: dayjs().format("YYYY/MM/DD HH:mm"),
    },
    {
      userName: "卡克",
      userIcon: user4,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      postFromTime: dayjs().format("YYYY/MM/DD HH:mm"),
    },
    {
      userName: "希琳",
      userIcon: user5,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      postFromTime: dayjs().format("YYYY/MM/DD HH:mm"),
    },
    {
      userName: "多瑪斯",
      userIcon: user1,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      postFromTime: dayjs().format("YYYY/MM/DD HH:mm"),
    },
  ],
});

export const searchState = atom({
  key: "searchState",
  default: {
    postType: "newest",
    search: "",
  },
});
