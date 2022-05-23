import axios from "../utils/axiosConfig";
import Swal from "sweetalert2";

const path = "/api/posts";

export async function getPosts(query?: string) {
  return await axios
    .get(`${path}${query ? `?${query}` : ""}`)
    .then(response =>
      response.data.data.map((post: any) => ({
        ...post,
        content: post.userContent,
      }))
    )
    .catch(error => {
      console.log(error);
      return [];
    });
}

export async function addPost(data: any) {
  const token = localStorage.getItem("token");

  return await axios
    .post(path, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => console.log(res))
    .catch(error => {
      console.log(error)
      Swal.fire({
        title: "Error!",
        text: "新增貼文失敗，請稍後再試",
        icon: "error",
        confirmButtonText: "我知道了",
      });
    });
}
