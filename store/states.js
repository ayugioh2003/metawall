import { atom } from "recoil";
import user1 from "../public/image/user.png";

export const userState = atom({
    key: 'userState',
    default: {
        name: '邊緣小杰',
        email: 'jay@metawall.com',
        password: 'jay123',
        avatar: user1,
        gender: 'male',
    }
});

export const searchState = atom({
    key: 'searchState',
    default: {
        postType: 'newest',
        search: ''
    }
});