import axios from "../utils/axiosConfig";
const path = "/api/messages";

export async function fetchMessages() {
  let token: string | null = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
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
