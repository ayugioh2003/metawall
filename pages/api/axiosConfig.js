import axios from 'axios'

const AUTH_TOKEN = "Token String";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'https://metawall-backend.vercel.app'
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default instance;