import axios from "../utils/axiosConfig";

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
  return await axios
    .post(path, {
      ...data,
      userContent: data.content,
    })
    .then(res => console.log(res))
    .catch(error => console.log(error));
}
