import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://metawall-backend.vercel.app'
});

// 暫時先拿掉，不然使用假 token 會出現 CORS 錯誤
// instance.defaults.headers.common['Authorization'] = "AUTH_TOKEN";

export default instance;