import axios from '../utils/axiosConfig';

const path = '/posts';

export async function getPosts() {
  return await axios.get(path)
    .then(response =>
      response.data.data.map((post: any) => ({
        ...post,
        content: post.userContent
      }))
    )
    .catch(error => console.log(error));
}

export async function addPost(data: any) {
  await axios.post(path, {
    ...data,
    userContent: data.content
  })
    .then(res => console.log(res))
    .catch(error => console.log(error));
}