import { atom } from "recoil";
import user1 from "../public/image/user.png";
import user4 from "../public/image/user4.png";
import user5 from "../public/image/user5.png";
import user51 from "../public/image/user5-1.png";
import bg from "../public/image/image.png";
import dayjs from "dayjs";

export const userState = atom({
  key: "userState",
  default: {
    name: "邊緣小杰",
    email: "jay@metawall.com",
    password: "jay123",
    avatar: user1,
    gender: "male",
  },
});

export const postState = atom({
  key: "postState",
  default: [
    {
      userName: "邊緣小杰",
      userIcon: user1,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      content: "外面看起來就超冷.... 我決定回被窩繼續睡....>.<",
      src: bg,
      comments: [
        {
          userName: "希琳",
          userIcon: user4,
          content: "真的～我已經準備冬眠了",
          date: dayjs().format("YYYY/MM/DD HH:mm"),
        },
        {
          userName: "波吉",
          userIcon: user51,
          content: "會嗎？我沒穿衣服都不覺得冷",
          date: dayjs().format("YYYY/MM/DD HH:mm"),
        },
      ],
    },
    {
      userName: "波吉",
      userIcon: user51,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      content: "我一定要成為很棒棒的國王！",
      like: 3,
    },
    {
      userName: "阿爾敏",
      userIcon: user5,
      date: dayjs().format("YYYY/MM/DD HH:mm"),
      content: "各位我有一個作戰計畫",
    },
  ],
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
