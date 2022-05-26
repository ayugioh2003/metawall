import axios from "../utils/axiosConfig";
import Swal from "sweetalert2";

const path = "/api/likes";
let token: string | null = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

export async function getLikes(postId: string) {
  return await axios
    .get(
      `${path}?post_id=${postId}`,
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

export async function toggleLike(data: any) {
  const type = data.changeToLike ? "add" : "remove";

  return await axios
    .patch(
      `${path}?post_id=${data.postId}&toggle_type=${type}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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