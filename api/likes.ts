import axios from "../utils/axiosConfig";
import Swal from "sweetalert2";
import { ToggleLikeParam } from "../pages/post";

const path = "/api/likes";

export async function getLikes(postId: string) {
  let token: string | null = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  return await axios
    .get(`${path}?post_id=${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data.data)
    .catch(error => {
      console.log(error);
    });
}

export async function toggleLike({ postId, changeToLike }: ToggleLikeParam) {
  let token: string | null = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  return await axios
    .patch(
      `${path}?post_id=${postId}&toggle_type=${
        changeToLike ? "add" : "remove"
      }`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(res => res.data.data)
    .catch(error => {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "修改按讚失敗",
        icon: "error",
        confirmButtonText: "我知道了",
      });
    });
}
