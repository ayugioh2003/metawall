import { atom } from "recoil";
import user1 from "../public/image/user.png";
import user4 from "../public/image/user4.png";
import user5 from "../public/image/user5.png";
import user51 from "../public/image/user5-1.png";
import dayjs from "dayjs";

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const connectState = atom({
  key: "connectState",
  default: false,
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
    followings: [],
    followers: [],
  },
});

export const postState = atom({
  key: "postState",
  default: [],
});

export const followListState = atom({
  key: "followListState",
  default: [],
});

export const likePostState = atom({
  key: "likePostState",
  default: [],
});

export const searchState = atom({
  key: "searchState",
  default: {
    postType: "newest",
    search: "",
  },
});

export const paymentState = atom({
  key: "paymentState",
  default: {
    MerchantID: "",
    MerchantOrderNo: 0,
    PayGateWay: "https://ccore.newebpay.com/MPG/mpg_gateway",
    TradeInfo: "",
    TradeSha: "",
    Version: 1.5,
  },
});

export const messageState = atom({
  key: "messageState",
  default: [],
});

export const toastState = atom({
  key: "toastState",
  default: "",
});
