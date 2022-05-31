import axios from "../utils/axiosConfig";
import Swal from "sweetalert2";

const path = "/api/posts";
let token: string | null = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

export async function getPosts(query?: string) {
  return await axios
    .get(`${path}${query ? `?${query}` : ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data.data)
    .catch(error => {
      console.log(error);
      return [];
    });
}

export async function addPost(data: any) {
  return await axios
    .post(path, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => console.log(res))
    .catch(error => {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "新增貼文失敗，請稍後再試",
        icon: "error",
        confirmButtonText: "我知道了",
      });
    });
}

export async function getUserLikes() {
  return await axios
    .get(
      `${path}/likes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    .then(response => response.data.data)
    .catch(error => {
      console.log(error);
    });
}
