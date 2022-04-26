// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from './axiosConfig';

const handleError = (res: NextApiResponse, error: any) => {
  res.status(400).json({
    status: "failed",
    message: "請求錯誤，請重新確認",
    error
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result = { status: "success" };
  if (req.method === 'GET') {
    await axios.get('/posts')
      .then(response => response.data.data)
      .then(data =>
        res.status(200).json({
          ...result,
          posts: data
        })
      )
      .catch(error => handleError(res, error));
  } else if (req.method === 'POST') {
    let newData = {
      userName: '測試人員',
      userContent: '測試內容'
    }
    axios.post('/posts', newData)
      .then(response =>
        res.status(200).json({
          ...result,
          posts: response.data
        })
      )
      .catch(error => handleError(res, error));
  }
}
