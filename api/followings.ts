import axios from "../utils/axiosConfig";
import Swal from "sweetalert2";

const path = "/api/followings";
let token: string | null = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

interface ToggleFollowParam {
  userId: string;
  changeToFollow: boolean;
}

export async function getFollowings() {
  return await axios
    .get(
      `${path}`,
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

export async function toggleFollow({ userId, changeToFollow }: ToggleFollowParam) {
  return await axios(
    `${path}/${userId}`,
    {
      method: changeToFollow ? "POST" : "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data.data)
    .catch(error => {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "變更追蹤失敗",
        icon: "error",
        confirmButtonText: "我知道了",
      });
    });
}