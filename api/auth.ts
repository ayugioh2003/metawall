import axios from "../utils/axiosConfig";

const path = "/api/auth";

interface LoginParam {
  email: string;
  password: string;
}

export async function fetchLogin(data?: LoginParam) {
  return await axios
    .post(`${path}/login`, data)
    .then(response => response)
    .catch(error => error);
}

export async function signup(data: string) {
  return await axios
    .post(`${path}/signup`)
    .then(response => response)
    .catch(error => error);
}

export const check = async (token: string) => {
  return await axios
    .get(`${path}/check`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response)
    .catch(error => error);
};
