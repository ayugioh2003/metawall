import axios from "../utils/axiosConfig";

const path = "/api/users";
let token: string | null = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

export async function fetchCurrentUser() {
  return await axios
    .get(`${path}/current-userinfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response)
    .catch(error => error);
}
