import axios from "../utils/axiosConfig";
import Swal from "sweetalert2";

const path = "/api/comments";
interface AddCommentParam {
  post_id?: string;
  content: string;
}

export async function fetchGetComment(postId?: string) {
  let token: string | null = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  return await axios
    .get(`${path}/${postId}`, {
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

export async function fetchAddComment(data: AddCommentParam) {
  let token: string | null = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  return await axios
    .post(path, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res)
    .catch(error => {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "新增評論失敗，請稍後再試",
        icon: "error",
        confirmButtonText: "我知道了",
      });
    });
}
