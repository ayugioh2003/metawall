import axios from "../utils/axiosConfig";
import Swal from "sweetalert2";

const path = "/api/users";
let token: string | null = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

export async function fetchUser(userId:string) {
  return await axios
    .get(`${path}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response)
    .catch(error => error);
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

export async function resetPassword(data: any) {
  return await axios
    .patch(`${path}/reset-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      Swal.fire({
        title: "Success!",
        text: "修改密碼成功",
        icon: "success",
        confirmButtonText: "我知道了",
      })
    })
    .catch(error => {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "修改密碼失敗，請稍後再試",
        icon: "error",
        confirmButtonText: "我知道了",
      });
    });
}

export async function resetUserinfo(data: any) {
  return await axios
    .patch(`${path}/current-userinfo`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(error => {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "修改個人資料失敗，請稍後再試",
        icon: "error",
        confirmButtonText: "我知道了",
      });
    });
}
