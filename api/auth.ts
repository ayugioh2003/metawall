import axios from "../utils/axiosConfig";

const path = "/api/auth";

export async function login(data?: string) {
  return await axios
    .post(`${path}/login`)
    .then(response => response)
    .catch(error => console.log(error));
}

export async function signup(data: string) {
  return await axios
    .post(`${path}/signup`)
    .then(response => response)
    .catch(error => console.log(error));
}
