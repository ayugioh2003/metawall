import axios from "../utils/axiosConfig";
const path = "/api/messages";
let token: string | null = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

export async function fetchMessages() {
  return await axios
    .get(`${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data.data.message)
    .catch(error => {
      console.log(error);
      return [];
    });
}
