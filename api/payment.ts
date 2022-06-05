import axios from "../utils/axiosConfig";
import Swal from "sweetalert2";

const path = "https://metawall-backend-git-feature-newebpay-ayugioh2003.vercel.app/api";
let token: string | null = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

export async function getPayment(data: any) {
  const API = `${path}/newebpay/create-payment`;
  return await axios
    .post(API, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(error => {
      console.log(error)
      Swal.fire({
        title: "Error!",
        text: "贊助失敗，請洽網站管理員",
        icon: "error",
        confirmButtonText: "我知道了",
      });
    });
}