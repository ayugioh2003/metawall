import axios from "../utils/axiosConfig";

const path = "/api/upload";

export async function fetchUploadImage(image: any) {
  const formdata = new FormData();
  formdata.append("image", image);
  return await axios
    .post(`${path}/image`, formdata)
    .then(res => res)
    .catch(error => error);
}
